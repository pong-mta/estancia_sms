<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Contact;
use Carbon\Carbon;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'api_key',
        'role',
        'subscribed',
        'subscription_plan',
        'subscription_expires_at',
        'sms_tokens',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    public function contacts(): HasMany
    {
        return $this->hasMany(Contact::class);
    }

    public function smsMessages()
    {
        return $this->hasMany(SmsMessage::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isUser(): bool
    {
        return $this->role === 'user';
    }
    public function hasActiveSubscription(): bool
    {
        // User has not subscribed
        if (! $this->subscribed) {
            return false;
        }

        // Lifetime subscription
        if ($this->subscription_expires_at === null) {
            return true;
        }

        // Subscription still valid
        return Carbon::parse($this->subscription_expires_at)->isFuture();
    }
}
