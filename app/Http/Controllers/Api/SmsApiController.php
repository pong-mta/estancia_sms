<?php

namespace App\Http\Controllers\Api;

use App\Helpers\GatewayLogger;
use App\Http\Controllers\Controller;
use App\Models\SmsDevice;
use App\Models\SmsMessage;
use App\Models\SmsRecipient;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SmsApiController extends Controller
{
    public function pending(Request $request)
    {
        $device = $request->query('device');

        if (!$device) {
            return response()->json([
                'success' => false,
                'message' => 'Device is required.'
            ], 400);
        }

        // Release stuck jobs (older than 2 minutes)
        SmsRecipient::where('status', 'processing')
            ->where('processing_at', '<', Carbon::now()->subMinutes(2))
            ->update([
                'status' => 'pending',
                'device' => null,
                'processing_at' => null,
            ]);

        $recipient = DB::transaction(function () use ($device) {

            $recipient = SmsRecipient::with('smsMessage')
                ->where('status', 'pending')
                ->lockForUpdate()
                ->orderBy('id')
                ->first();

            if (!$recipient) {
                return null;
            }

            $recipient->update([
                'status' => 'processing',
                'device' => $device,
                'processing_at' => now(),
            ]);

            return $recipient;
        });

        if (!$recipient) {
            return response()->json([
                'success' => false,
                'message' => 'No pending SMS.'
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => [
                'recipient_id' => $recipient->id,
                'message_id' => $recipient->sms_message_id,
                'mobile' => $recipient->mobile,
                'message' => $recipient->smsMessage->message,
            ]
        ]);
    }

    /*
        Update from esp32
    */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'recipient_id' => 'required|integer|exists:sms_recipients,id',
            'status' => 'required|in:sent,failed',
            'response' => 'nullable|string',
        ]);

        $recipient = SmsRecipient::findOrFail($validated['recipient_id']);

        $recipient->update([
            'status' => $validated['status'],
            'response' => $validated['response'] ?? null,
            'sent_at' => now(),
        ]);

        /*
    |--------------------------------------------------------------------------
    | Gateway Log
    |--------------------------------------------------------------------------
    */
        GatewayLogger::log(
            $recipient->device,
            $validated['status'] === 'sent' ? 'success' : 'error',
            $validated['status'] === 'sent' ? 'SMS Sent' : 'SMS Failed',
            $validated['response'] ?? null,
            [
                'recipient_id' => $recipient->id,
                'mobile'       => $recipient->mobile,
                'message_id'   => $recipient->sms_message_id,
            ]
        );

        // Update parent message if all recipients are finished
        $message = $recipient->smsMessage;

        $remaining = $message->recipients()
            ->whereIn('status', ['pending', 'processing'])
            ->count();

        if ($remaining == 0) {

            $hasFailed = $message->recipients()
                ->where('status', 'failed')
                ->exists();

            $message->update([
                'status' => $hasFailed ? 'failed' : 'completed',
                'sent_at' => now(),
            ]);
        }

        return response()->json([
            'success' => true,
        ]);
    }

    /*
        Ping from esp32
    */
    public function ping(Request $request)
    {
        $validated = $request->validate([
            'device' => 'required|string|max:100',
            'ip' => 'nullable|ip',
            'firmware_version' => 'nullable|string|max:50',
            'signal' => 'nullable|integer',
            'sim_operator' => 'nullable|string|max:100',
            'uptime' => 'nullable|integer',
            'free_heap' => 'nullable|integer',
            'queue_status' => 'nullable|string|max:50',
            'network_status' => 'nullable|string|max:50',
        ]);

        $device = SmsDevice::updateOrCreate(
            [
                'device' => $validated['device'],
            ],
            [
                'ip' => $validated['ip'] ?? $request->ip(),
                'status' => 'online',
                'last_seen' => now(),
                'firmware_version' => $validated['firmware_version'] ?? null,
                'signal' => $validated['signal'] ?? null,
                'sim_operator' => $validated['sim_operator'] ?? null,
                'network_status' => $validated['network_status'] ?? null,
                'uptime' => $validated['uptime'] ?? 0,
                'free_heap' => $validated['free_heap'] ?? 0,
                'queue_status' => $validated['queue_status'] ?? 'idle',
            ]
        );

        GatewayLogger::log(
            $device->device,
            'info',
            'Heartbeat',
            'Heartbeat received.',
            [
                'ip' => $device->ip,
                'signal' => $device->signal,
                'firmware' => $device->firmware_version,
            ]
        );

        return response()->json([
            'success' => true,
            'message' => 'Heartbeat received.',
            'device' => $device,
        ]);
    }


    /*
    Send from api users integrations
    */
    public function send(Request $request)
    {
        // Get API Key
        $apiKey = $request->header('X-API-KEY');

        if (empty($apiKey)) {
            return response()->json([
                'success' => false,
                'message' => 'API key is required.',
            ], 401);
        }

        // Authenticate User
        $user = User::where('api_key', $apiKey)->first();

        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid API key.',
            ], 401);
        }

        // Validate Request
        $validated = $request->validate([
            'mobile'  => ['required', 'string'],
            'message' => ['required', 'string', 'max:160'],
        ]);

        // Check Credits
        if ($user->sms_tokens < 1) {
            return response()->json([
                'success' => false,
                'message' => 'Insufficient SMS credits.',
            ], 403);
        }

        $sms = null;

        DB::transaction(function () use (&$sms, $validated, $user) {

            // Lock user row
            $user = User::lockForUpdate()->findOrFail($user->id);

            // Double-check credits inside transaction
            if ($user->sms_tokens < 1) {
                abort(response()->json([
                    'success' => false,
                    'message' => 'Insufficient SMS credits.',
                ], 403));
            }

            // Create SMS
            $sms = SmsMessage::create([
                'user_id' => $user->id,
                'message' => $validated['message'],
                'status'  => 'pending',
            ]);

            // Create Recipient
            $sms->recipients()->create([
                'contact_id' => null,
                'mobile'     => $validated['mobile'],
                'status'     => 'pending',
            ]);

            // Deduct Credit
            $user->decrement('sms_tokens', 1);
        });

        return response()->json([
            'success' => true,
            'message' => 'SMS queued successfully.',
            'queue_id' => $sms->id,
            'mobile' => $validated['mobile'],
            'remaining_credits' => $user->fresh()->sms_tokens,
        ]);
    }
}
