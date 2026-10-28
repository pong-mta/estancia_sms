<?php

namespace App\Http\Controllers\Messages;

use App\Http\Controllers\Controller;
use App\Models\Contact;
use App\Models\SmsMessage;
use App\Models\SmsRecipient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class MessagesController extends Controller
{
    public function index()
    {
        $contacts = Contact::where('user_id', auth()->id())
            ->where('status', 'active')
            ->orderBy('first_name')
            ->get();

        return Inertia::render('messages/Index', [
            'contacts' => $contacts,
        ]);
    }

    /**
     * Save SMS to Queue
     */
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'message' => ['required', 'string', 'max:160'],
    //         'contacts' => ['required', 'array', 'min:1'],
    //         'contacts.*' => ['integer', 'exists:contacts,id'],
    //     ]);

    //     DB::transaction(function () use ($validated) {

    //         $sms = SmsMessage::create([
    //             'user_id' => Auth::id(),
    //             'message' => $validated['message'],
    //             'status' => 'pending',
    //         ]);

    //         $contacts = Contact::whereIn('id', $validated['contacts'])
    //             ->where('user_id', Auth::id())
    //             ->get();

    //         foreach ($contacts as $contact) {

    //             $sms->recipients()->create([
    //                 'contact_id' => $contact->id,
    //                 'mobile' => $contact->mobile,
    //                 'status' => 'pending',
    //             ]);
    //         }
    //     });

    //     return back()->with(
    //         'success',
    //         'SMS queued successfully.'
    //     );
    // }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'message' => ['required', 'string', 'max:160'],
            'contacts' => ['required', 'array', 'min:1'],
            'contacts.*' => ['integer', 'exists:contacts,id'],
        ]);

        // Get authenticated user
        $user = Auth::user();

        // Get only the user's selected contacts
        $contacts = Contact::whereIn('id', $validated['contacts'])
            ->where('user_id', $user->id)
            ->get();

        $requiredCredits = $contacts->count();

        // Check available credits
        if ($user->sms_tokens < $requiredCredits) {
            return back()->with(
                'error',
                'You do not have enough SMS credits.'
            );
        }

        DB::transaction(function () use ($validated, $contacts, $user) {

            // Lock user row to prevent concurrent credit deduction
            $user = User::lockForUpdate()->findOrFail($user->id);

            $sms = SmsMessage::create([
                'user_id' => $user->id,
                'message' => $validated['message'],
                'status' => 'pending',
            ]);

            foreach ($contacts as $contact) {
                $sms->recipients()->create([
                    'contact_id' => $contact->id,
                    'mobile' => $contact->mobile,
                    'status' => 'pending',
                ]);
            }

            // Deduct credits after queueing
            $user->decrement('sms_tokens', $contacts->count());
        });

        return back()->with(
            'success',
            'SMS queued successfully.'
        );
    }

    //Recylce or make failed to marked as fresh message
    public function failed_to_fresh()
    {
        DB::transaction(function () {

            SmsMessage::where('status', 'failed')
                ->update([
                    'status'  => 'pending',
                    'sent_at' => null,
                ]);

            SmsRecipient::where('status', 'failed')
                ->update([
                    'status'        => 'pending',
                    'device'        => null,
                    'processing_at' => null,
                    'response'      => null,
                    'sent_at'       => null,
                ]);
        });

        return response()->json([
            'success' => true,
            'message' => 'All failed SMS have been recycled successfully.',
        ]);
    }
}
