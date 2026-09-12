<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('itemgroups', function (Blueprint $table) {
            $table->id();
            $table->integer('position');
            $table->string('name');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->integer('level')->default(0);
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->string('image_path')->nullable();
            $table->foreignIdFor(User::class, 'created_by')->constrained('users');
            $table->foreignIdFor(User::class, 'updated_by')->constrained('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itemgroups');
    }
};
