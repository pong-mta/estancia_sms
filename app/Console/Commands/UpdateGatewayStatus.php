<?php

namespace App\Console\Commands;

use App\Models\SmsDevice;
use App\Models\SmsMessage;
use App\Models\SmsRecipient;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class UpdateGatewayStatus extends Command
{
    protected $signature = 'gateway:update-status';

    protected $description = 'Update gateway status and recycle failed SMS';

    public function handle()
    {
        // Update gateway status
        SmsDevice::query()->each(function ($gateway) {

            if (!$gateway->last_seen) {
                $gateway->status = 'offline';
            } elseif ($gateway->last_seen->lt(now()->subMinutes(1))) {
                $gateway->status = 'offline';
            } else {
                $gateway->status = 'online';
            }

            $gateway->save();
        });

        // Recycle failed SMS after minutes
        DB::transaction(function () {

            SmsMessage::where('status', 'failed')
                ->update([
                    'status' => 'pending',
                    'sent_at' => null,
                ]);

            SmsRecipient::where('status', 'failed')
                ->update([
                    'status' => 'pending',
                    'device' => null,
                    'processing_at' => null,
                    'response' => null,
                    'sent_at' => null,
                ]);
        });

        $this->info('Gateway status updated. Failed SMS recycled.');

        return self::SUCCESS;
    }
}
