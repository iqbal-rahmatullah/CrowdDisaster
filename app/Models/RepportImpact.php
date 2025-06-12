<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepportImpact extends Model
{
    protected $fillable = [
        'repport_id',
        'victim_died',
        'victim_injured',
        'damaged_house',
        'damaged_building',
        'damaged_village',
    ];

    public function repport()
    {
        return $this->belongsTo(Repport::class);
    }
}
