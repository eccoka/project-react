<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property-write string|null $brand
 * @property-write string|null $group
 */
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

    public function brandRelation()
    {
        return $this->belongsTo(Brand::class, 'brandId');
    }

    public function groupRelation()
    {
        return $this->belongsTo(Itemgroup::class, 'groupId');
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
