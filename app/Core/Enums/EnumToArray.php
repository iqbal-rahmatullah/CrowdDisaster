<?php

namespace Core\Enums;

trait EnumToArray {
    public static function names(): array {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array {
        return array_column(self::cases(), 'value');
    }

    public static function array(): array {
        return array_combine(self::names(), self::values());
    }
}
