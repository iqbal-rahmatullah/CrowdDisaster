<?php

namespace App\Modules\Enums;

use Core\Enums\EnumToArray;

enum GenderEnum: string
{
    use EnumToArray;

    case MALE = 'male';
    case FEMALE = 'female';
}
