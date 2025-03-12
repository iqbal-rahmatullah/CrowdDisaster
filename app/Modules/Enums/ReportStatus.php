<?php

namespace App\Modules\Enums;

use Core\Enums\EnumToArray;

enum ReportStatus: string
{
    use EnumToArray;

    case NEED_SUPPORT = 'need_support';
    case NEED_RESPONSIBLE = 'need_responsible';
    case IN_PROGRESS = 'in_progress';
    case DONE = 'done';
}
