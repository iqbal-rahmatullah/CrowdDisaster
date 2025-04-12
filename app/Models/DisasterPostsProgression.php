<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisasterPostsProgression extends Model
{
    protected $fillable = [
        'disaster_posts_id',
        'user_id',
        'progression',
    ];

    public function disasterPosts()
    {
        return $this->belongsTo(DisasterPosts::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
