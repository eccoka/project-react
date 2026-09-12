<?php

use App\Models\User;
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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title')->unique();
            $table->text('description')->nullable();
            $table->enum('usage',  ['public', 'private'])->default('private');
            $table->string('image_path')->nullable();
            $table->enum('visible', ['0', '1'])->default('1');
            $table->foreignIdFor(User::class, 'created_by')->constrained('users');
            $table->timestamp('created_at');
            $table->foreignIdFor(User::class, 'updated_by')->constrained('users');
            $table->timestamp('updated_at')->nullable();
            $table->timestamp('expire_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
