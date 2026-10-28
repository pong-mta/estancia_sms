<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SmsDevice extends Model
{
    use HasFactory;

    protected $fillable = [
        'device',
        'ip',
        'status',
        'last_seen',
        'firmware_version',
        'signal',
        'sim_operator',
        'uptime',
        'free_heap',
        'last_restart',
        'queue_status',
        'network_status',
    ];

    protected $casts = [
        'last_seen' => 'datetime',
    ];
}
