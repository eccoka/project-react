<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Item;
use App\Models\User;   

class Itempic extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'path',
        'alt',
        'title',
        'is_main',
        'is_active',
        'created_by',
        'updated_by',
        'created_at',
        'updated_at',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
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
