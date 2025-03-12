<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepportImpact extends Model
{
    use HasFactory;

    protected $fillable = [
        'repport_id',
        'name',
        'value',
        'icon',
    ];

    public function repport()
    {
        return $this->belongsTo(Repport::class);
    }
}
