<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Stock;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('stockopens', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Stock::class, 'stock_id')->constrained('stocks');
            $table->time('open_time_mo');
            $table->time('close_time_mo');
            $table->time('open_time_tu');
            $table->time('close_time_tu');
            $table->time('open_time_we');
            $table->time('close_time_we');
            $table->time('open_time_th');
            $table->time('close_time_th');
            $table->time('open_time_fr');
            $table->time('close_time_fr');
            $table->time('open_time_sa');
            $table->time('close_time_sa');
            $table->time('open_time_su');
            $table->time('close_time_su');
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
        Schema::dropIfExists('stockopens');
    }
};
