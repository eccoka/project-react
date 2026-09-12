<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Item;

class Itemparam extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected $fillable = ['parent_groupid', 'name', 'value', 'status', 'created_by'];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

}
