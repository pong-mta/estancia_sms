<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SmsRecipient extends Model
{
    use HasFactory;

    protected $fillable = [
        'sms_message_id',
        'contact_id',
        'mobile',
        'status',
        'response',
        'sent_at',
        'device',
        'processing_at',
    ];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function smsMessage()
    {
        return $this->belongsTo(SmsMessage::class);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class);
    }
}
