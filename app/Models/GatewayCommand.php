<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GatewayCommand extends Model
{
    protected $fillable = [
        'device',
        'command',
        'payload',
        'status',
        'response',
        'executed_at',
    ];

    protected $casts = [
        'payload' => 'array',
        'executed_at' => 'datetime',
    ];
}
