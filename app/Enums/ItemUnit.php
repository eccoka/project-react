<?php

namespace App\Enums;

/**
 * Class ItemUnit
 *
 * @package App\Enums
 */
enum ItemUnit: int
{
    case PIECE = 1;
    case KG = 2;
    case METER = 3;
    case LITER = 4;
    case BOX = 5;
    case SET = 6;

    public function getItemUnit(): array
    {
        return [
            self::PIECE->value => 'pcs',
            self::KG->value => 'kg',
            self::METER->value => 'm',
            self::LITER->value => 'l',
            self::BOX->value => 'Box',
            self::SET->value => 'Set',
        ];
    }

    public function getItemUnitName(): string
    {
        return $this->getItemUnit()[$this->value] ?? 'Unknown';
    }

}