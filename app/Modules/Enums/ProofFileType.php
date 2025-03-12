<?php

namespace App\Modules\Enums;

use Core\Enums\EnumToArray;

enum ProofFileType: string {
    use EnumToArray;

    case IMAGE = 'image';
    case VIDEO = 'video';
}
