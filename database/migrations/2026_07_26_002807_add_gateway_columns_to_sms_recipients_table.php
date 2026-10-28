<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('sms_recipients', function (Blueprint $table) {
            $table->string('device')->nullable()->after('status');

            $table->timestamp('processing_at')->nullable()->after('device');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sms_recipients', function (Blueprint $table) {
            $table->dropColumn([
                'device',
                'processing_at',
            ]);
        });
    }
};
