<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProblemRepport extends Model
{
    protected $table = 'problem_repport';

    protected $fillable = [
        'user_id',
        'reason',
        'repport_id'
    ];

    public function repport()
    {
        return $this->belongsTo(Repport::class);
    }
}
