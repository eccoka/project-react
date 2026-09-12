<?php

use App\Models\Itemgroup;
use App\Models\User;
use App\Models\Brand;
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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->integer('groupId');
            $table->foreignIdFor(Brand::class,'brandId')->constrained('brands', 'id');
            $table->string('barcode')->nullable()->unique();
            $table->string('name');
            $table->string('website')->nullable();
            $table->string('parameter_ids')->nullable();
            $table->longText('description')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->decimal('price', 12, 2);
            $table->decimal('discount', 4, 2)->nullable();
            $table->integer('unit');
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
        Schema::dropIfExists('items');
    }
};
