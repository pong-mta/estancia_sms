<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("
            ALTER TABLE sms_recipients
            MODIFY status ENUM(
                'pending',
                'processing',
                'sent',
                'failed'
            ) DEFAULT 'pending'
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("
            ALTER TABLE sms_recipients
            MODIFY status ENUM(
                'pending',
                'sent',
                'failed'
            ) DEFAULT 'pending'
        ");
    }
};
