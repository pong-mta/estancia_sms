<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Contact extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'mobile',
        'email',
        'company',
        'address',
        'birthday',
        'status',
    ];

    protected $casts = [
        'birthday' => 'date',
    ];

    /**
     * Contact owner.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Full name accessor.
     */
    public function getFullNameAttribute(): string
    {
        return trim($this->first_name . ' ' . $this->last_name);
    }

    /**
     * Active scope.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Inactive scope.
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }

    public function smsRecipients()
    {
        return $this->hasMany(SmsRecipient::class);
    }
}
