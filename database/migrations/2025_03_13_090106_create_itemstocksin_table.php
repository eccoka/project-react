<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Item;
use App\Models\Stock;
use App\Models\User;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('itemstocksin', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Item::class, 'item_id')->constrained('items');
            $table->foreignIdFor(Stock::class, 'stock_code')->constrained('stocks');
            $table->integer('stock_in')->nullable();
            $table->string('deliveryNote_in')->unique()->nullable();
            $table->string('invoice_in')->unique()->nullable();
            $table->foreignIdFor(User::class, 'created_by')->constrained('users');
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('itemstocksin');
    }
};
