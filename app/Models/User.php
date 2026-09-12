<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Enums\UserRole;
use App\Enums\UserStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Stock;
use App\Models\Stockopen;
use App\Models\Itemstockin;
use App\Models\Item;


class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'first_name',
        'last_name',
        'phone',
        'password',

    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => UserRole::class,
            'status' => UserStatus::class,
        ];
    }



    public function stocks(): HasMany
    {
        return $this->hasMany(Stock::class, 'created_by');
    }

    public function stockopens(): HasMany
    {
        return $this->hasMany(Stockopen::class, 'created_by');
    }
    public function itemstockouts(): HasMany
    {
        return $this->hasMany(Itemstockout::class, 'created_by');
    }
    public function itemstocks(): HasMany
    {
        return $this->hasMany(Itemstockin::class, 'created_by');
    }

    public function item(): HasMany
    {
        return $this->hasMany(Item::class, 'created_by');
    }


}
