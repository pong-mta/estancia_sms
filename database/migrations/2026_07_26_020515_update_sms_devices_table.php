<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sms_devices', function (Blueprint $table) {

            $table->string('firmware_version')->nullable()->after('status');

            $table->integer('signal')->nullable()->after('firmware_version');

            $table->string('sim_operator')->nullable()->after('signal');

            $table->unsignedBigInteger('uptime')->default(0)->after('sim_operator');

            $table->unsignedBigInteger('free_heap')->default(0)->after('uptime');

            $table->timestamp('last_restart')->nullable()->after('free_heap');

            $table->string('queue_status')->default('idle')->after('last_restart');
        });
    }

    public function down(): void
    {
        Schema::table('sms_devices', function (Blueprint $table) {

            $table->dropColumn([
                'firmware_version',
                'signal',
                'sim_operator',
                'uptime',
                'free_heap',
                'last_restart',
                'queue_status',
            ]);
        });
    }
};
