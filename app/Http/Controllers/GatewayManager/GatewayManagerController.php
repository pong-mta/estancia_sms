<?php

namespace App\Http\Controllers\GatewayManager;

use App\Http\Controllers\Controller;
use App\Models\Firmware;
use App\Models\GatewayCommand;
use App\Models\GatewayLog;
use App\Models\SmsDevice;
use App\Models\SmsRecipient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GatewayManagerController extends Controller
{
    public function index()
    {
        $online = SmsDevice::where('status', 'online')->count();

        $offline = SmsDevice::where('status', 'offline')->count();

        $pending = SmsRecipient::where('status', 'pending')->count();

        $failed = SmsRecipient::where('status', 'failed')->count();

        $sentToday = SmsRecipient::whereDate(
            'sent_at',
            today()
        )->where('status', 'sent')->count();

        $activeFirmware = Firmware::where(
            'active',
            true
        )->first();

        $logs = GatewayLog::latest()
            ->take(5)
            ->get();

        return Inertia::render(
            'GatewayManager/Index',
            [
                'stats' => [

                    'online' => $online,

                    'offline' => $offline,

                    'pending' => $pending,

                    'failed' => $failed,

                    'sentToday' => $sentToday,

                    'firmware' => $activeFirmware?->version,

                ],

                'gateways' => SmsDevice::orderBy('device')->get(),

                'firmwares' => Firmware::latest()->get(),

                'logs' => $logs,

            ]
        );
    }

    public function show(string $device)
    {
        $gateway = SmsDevice::where('device', $device)->firstOrFail();

        $commands = GatewayCommand::where('device', $device)
            ->latest()
            ->take(10)
            ->get();

        $logs = GatewayLog::where('device', $device)
            ->latest()
            ->take(20)
            ->get();

        $smsHistory = SmsRecipient::where('device', $device)
            ->latest()
            ->take(20)
            ->get();

        return Inertia::render(
            'GatewayManager/Show',
            [
                'gateway' => $gateway,
                'commands' => $commands,
                'logs' => $logs,
                'smsHistory' => $smsHistory,
            ]
        );
    }
}
