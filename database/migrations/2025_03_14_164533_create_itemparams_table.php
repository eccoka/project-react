<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Item;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('itemparams', function (Blueprint $table) {
            $table->id();
            $table->integer('groupid');
            $table->string('param_name');
            $table->string('value');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->foreignIdFor(User::class, 'created_by')->constrained('users');
            $table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itemparams');
    }
};