<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Stockopen;
use App\Models\User;

class Itemstockin extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_id',
        'stock_code',
        'stock_in',
        'deliveryNote_in',
        'invoice_in',
        'created_by',
        'created_at',
    ];

    public function stockopen()
    {
        return $this->belongsTo(Stockopen::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}
