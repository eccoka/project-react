<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Item;


class Itemgroup extends Model
{
    use HasFactory;

    protected $fillable = [
        'position',
        'name',
        'status',
        'level',
        'parent_id',
        'image_path',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    public function parent()
    {
        return $this->belongsTo(Itemgroup::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Itemgroup::class, 'parent_id');
    }
    public function items()
    {
        return $this->hasMany(Item::class, 'groupId');
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
