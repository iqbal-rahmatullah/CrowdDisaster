<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RepportSupport extends Model
{
    protected $fillable = [
        'repport_id',
        'user_id'
    ];

    public function repport()
    {
        return $this->belongsTo(Repport::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
