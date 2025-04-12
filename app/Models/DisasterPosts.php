<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DisasterPosts extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'quota',
        'contact',
        'address',
        'latitude',
        'longitude',
    ];

    public function disasterPostsProgression()
    {
        return $this->hasMany(DisasterPostsProgression::class);
    }

    public function disasterPostsProof()
    {
        return $this->hasMany(DisasterPostsProof::class);
    }

    public function disasterPostsRefugees()
    {
        return $this->hasMany(DisasterPostsRefugees::class);
    }
}
