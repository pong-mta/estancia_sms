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
        Schema::table('sms_devices', function (Blueprint $table) {
            $table->string('network_status')->nullable()->after('sim_operator');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sms_devices', function (Blueprint $table) {
            $table->dropColumn([
                'network_status'
            ]);
        });
    }
};
