<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Stockopen;
use App\Models\ItemStockin;


class Stock extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_name',
        'stock_code',
        'address',
        'phone',
        'email',
        'image',
        'status',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at', 
    ];


    public function itemStocks()
    {
        return $this->hasMany(ItemStockin::class, 'stock_code');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'stock_code');
    }
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
