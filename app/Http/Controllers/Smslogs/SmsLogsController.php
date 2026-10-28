<?php

namespace App\Http\Controllers\Smslogs;

use App\Http\Controllers\Controller;
use App\Models\SmsRecipient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SmsLogsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->search;

        $logs = SmsRecipient::with([
            'contact:id,first_name,last_name',
            'smsMessage:id,user_id,message',
        ])
            ->whereHas('smsMessage', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->when($search, function ($query) use ($search) {

                $query->where(function ($q) use ($search) {

                    $q->where('mobile', 'like', "%{$search}%")

                        ->orWhereHas('contact', function ($contact) use ($search) {

                            $contact->where('first_name', 'like', "%{$search}%")
                                ->orWhere('last_name', 'like', "%{$search}%");
                        })

                        ->orWhereHas('smsMessage', function ($sms) use ($search) {

                            $sms->where('message', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('sms-logs/index', [
            'logs' => $logs,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


    public function destroy(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['integer'],
        ]);

        SmsRecipient::whereIn('id', $request->ids)
            ->whereHas('smsMessage', function ($query) {
                $query->where('user_id', auth()->id());
            })
            ->delete();

        return back()->with('success', 'Selected SMS logs deleted successfully.');
    }
}
