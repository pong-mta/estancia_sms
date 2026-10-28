<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GatewayLog extends Model
{
    protected $fillable = [

        'device',

        'level',

        'event',

        'message',

        'context',

    ];

    protected $casts = [

        'context' => 'array',

    ];
}
