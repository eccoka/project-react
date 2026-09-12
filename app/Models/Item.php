<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Itemgroup;
use App\Models\User;
use App\Models\Brand;

class Item extends Model
{
    use HasFactory;

    protected $fillable = [
        'groupId',
        'brandId',
        'barcode',
        'name',
        'website',
        'parameter_ids',
        'description',
        'status',
        'price',
        'discount',
        'unit',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];


    public function brand()
    {
        return $this->belongsTo(Brand::class, 'id');
    }
    public function group()
    {
        return $this->belongsTo(Itemgroup::class, 'id');
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
