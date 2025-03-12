<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepportProof extends Model
{
    protected $fillable = [
        'repport_id',
        'file_path',
        'file_type',
    ];

    public function repport()
    {
        return $this->belongsTo(Repport::class);
    }
}
