<?php

namespace App\Helpers;

use App\Models\GatewayLog;

class GatewayLogger
{
    public static function log(
        string $device,
        string $level,
        string $event,
        ?string $message = null,
        array $context = []
    ): void {

        GatewayLog::create([

            'device' => $device,

            'level' => $level,

            'event' => $event,

            'message' => $message,

            'context' => $context,

        ]);
    }
}
