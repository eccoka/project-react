<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Stock;


class Stockopen extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'stock_id',
        'open_time_mo',
        'close_time_mo', 
        'open_time_tu',
        'close_time_tu',
        'open_time_we',
        'close_time_we',
        'open_time_th',
        'close_time_th',
        'open_time_fr',
        'close_time_fr',
        'open_time_sa',
        'close_time_sa',
        'open_time_su',
        'close_time_su',
        'created_by',
        'updated_by',
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class);
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
