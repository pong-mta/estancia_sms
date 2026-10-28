<?php

namespace App\Http\Controllers\Api;

use App\Helpers\GatewayLogger;
use App\Http\Controllers\Controller;
use App\Models\Firmware;
use App\Models\GatewayCommand;
use Illuminate\Http\Request;

class GatewayCommandController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'device' => 'required',
            'command' => 'required|string',
        ]);


        $data = [
            'device' => $request->device,
            'command' => $request->command,
            'status' => 'pending',
        ];

        // Attach firmware information for OTA
        if ($request->command === 'ota') {

            $firmware = Firmware::where('active', true)->first();

            if (!$firmware) {
                return response()->json([
                    'success' => false,
                    'message' => 'No active firmware found.',
                ], 404);
            }

            $data['payload'] = [
                'version' => $firmware->version,
                // 'url' => asset('storage/' . $firmware->file_path),
                'url' => config('app.url') . '/storage/firmwares/' . $firmware->filename,
            ];
        }

        GatewayCommand::create($data);

        GatewayLogger::log(
            $request->device,
            'info',
            'Command Queued',
            $request->command . ' queued'
        );

        return response()->json([
            'success' => true,
        ]);
    }

    public function get(Request $request)
    {
        $request->validate([
            'device' => 'required|string',
        ]);

        $command = GatewayCommand::where('device', $request->device)
            ->where('status', 'pending')
            ->oldest()
            ->first();

        if (!$command) {
            return response()->json([
                'success' => false,
                'message' => 'No pending command.',
            ]);
        }

        $command->update([
            'status' => 'processing',
        ]);

        GatewayLogger::log(
            $command->device,
            'info',
            'Command Processing',
            "Gateway fetched '{$command->command}' command."
        );

        return response()->json([
            'success' => true,
            'command' => [
                'id' => $command->id,
                'command' => $command->command,
                'payload' => $command->payload,
            ],
        ]);
    }

    public function result(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:gateway_commands,id',
            'status' => 'required|string',
            'response' => 'nullable|string',
        ]);

        $command = GatewayCommand::findOrFail($validated['id']);

        $command->update([
            'status' => $validated['status'],
            'response' => $validated['response'],
            'executed_at' => now(),
        ]);

        GatewayLogger::log(
            $command->device,
            $validated['status'] === 'completed' ? 'success' : 'error',
            ucfirst($command->command),
            $validated['response']
        );

        return response()->json([
            'success' => true,
        ]);
    }
}
