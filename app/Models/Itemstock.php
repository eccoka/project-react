<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Stockopen;
use App\Models\User;

class Itemstock extends Model
{
    use HasFactory;

    protected $fillable = [
        'stock_name',
        'address',
        'phone',
        'stockopen_id',
        'created_by',
        'updated_by',
    ];

    public function stockopen()
    {
        return $this->belongsTo(Stockopen::class);
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
