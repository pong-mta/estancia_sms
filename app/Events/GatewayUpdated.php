<?php

namespace App\Events;

use App\Models\SmsDevice;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GatewayUpdated implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public SmsDevice $gateway;

    public function __construct(SmsDevice $gateway)
    {
        $this->gateway = $gateway;
    }

    public function broadcastOn(): array
    {
        return [
            new Channel('gateways'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'gateway.updated';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->gateway->id,
            'device' => $this->gateway->device,
            'status' => $this->gateway->status,
            'ip' => $this->gateway->ip,
            'firmware_version' => $this->gateway->firmware_version,
            'signal' => $this->gateway->signal,
            'queue_status' => $this->gateway->queue_status,
            'free_heap' => $this->gateway->free_heap,
            'uptime' => $this->gateway->uptime,
            'last_seen' => $this->gateway->last_seen,
        ];
    }
}
