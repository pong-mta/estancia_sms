<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DefaultUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@estancia.website'],
            [
                'name' => 'SMS Administrator',
                'password' => Hash::make('jokerpong006'),
                'email_verified_at' => now(),
                'api_key' => Str::random(64),
            ]
        );
    }
}
