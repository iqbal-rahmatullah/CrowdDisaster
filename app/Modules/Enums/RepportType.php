<?php

namespace App\Modules\Enums;

use Core\Enums\EnumToArray;

enum RepportType: string {
    use EnumToArray;

    case FLOOD = 'flood';
    case EARHTQUAKE = 'earthquake';
    case TORNADO = 'tornado';
    case LANDSLIDE = 'landslide';
    case VOLCANO = 'volcano';
    case TSUNAMI = 'tsunami';
    case FIRE = 'fire';
    case DROUGHT = 'drought';
}
