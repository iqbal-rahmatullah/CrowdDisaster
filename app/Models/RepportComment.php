<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepportComment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'repport_id',
        'comment',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function repport()
    {
        return $this->belongsTo(Repport::class);
    }
}
