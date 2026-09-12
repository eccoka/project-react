<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $fillable = [
        'name',
        'motto',
        'website',
        'description',
        'status',
        'logo',
        'created_by',
        'updated_by',
        'updated_at',
        'created_at',
    ];
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
