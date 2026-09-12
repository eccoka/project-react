<?php

namespace App\Enums;

/**
 * Class UserRole
 *
 * @package App\Enums
 */
enum UserRole: string
{
    case ADMIN = 'admin';
    case MANAGER = 'manager';
    case EMPLOYEE = 'employee';
    case Leader = 'leader';

    public function getUserRole(): array
    {
        return [
            self::ADMIN->value => 'Admin',
            self::MANAGER->value => 'Manager',
            self::EMPLOYEE->value => 'Employee',
            self::Leader->value => 'Leader',
        ];
    }
    public function isAdmin(): bool
    {
        return $this->value === self::ADMIN->value;
    }

}