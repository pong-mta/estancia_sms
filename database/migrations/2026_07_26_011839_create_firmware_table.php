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
        Schema::create('firmware', function (Blueprint $table) {
            $table->id();
            $table->string('version')->unique();

            $table->string('filename');
            $table->string('file_path');

            $table->unsignedBigInteger('file_size')->nullable();

            $table->text('release_notes')->nullable();

            $table->boolean('active')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('firmware');
    }
};
