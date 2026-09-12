<?php

namespace App\Enums;

/**
 * Class UserStatus
 *
* @package App\Enums
*/


enum UserStatus: string
{
    case ACTIVE = 'active';
    case INACTIVE = 'inactive';

    public function getUserStatus(): array
    {
        return [
            self::ACTIVE->value => 'Active',
            self::INACTIVE->value => 'Inactive',
        ];
    }
    
    public function isActive(): bool
    {
        return $this->value === self::ACTIVE->value;
    }
}
