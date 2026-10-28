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
        Schema::create('sms_recipients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sms_message_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('contact_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('mobile');

            $table->enum('status', [
                'pending',
                'sending',
                'sent',
                'failed'
            ])->default('pending');

            $table->text('response')->nullable();

            $table->timestamp('sent_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sms_recipients');
    }
};
