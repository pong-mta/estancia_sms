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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();

            // Owner of the contact
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('first_name');
            $table->string('last_name')->nullable();

            // E.164 allows up to 15 digits, but 20 leaves room for formatting
            $table->string('mobile', 20);

            $table->string('email')->nullable();

            $table->string('company')->nullable();

            $table->text('address')->nullable();

            $table->date('birthday')->nullable();

            $table->enum('status', ['active', 'inactive'])
                ->default('active');

            $table->timestamps();

            // Prevent duplicate numbers for the same user
            $table->unique(['user_id', 'mobile']);

            $table->index('mobile');
            $table->index('company');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
