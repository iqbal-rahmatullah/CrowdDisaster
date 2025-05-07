<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisasterPostsProgression extends Model
{
    protected $fillable = [
        'disaster_post_id',
        'user_id',
        'progression',
    ];

    public function disasterPosts()
    {
        return $this->belongsTo(DisasterPosts::class);
    }

    public function proof()
    {
        return $this->hasMany(DisasterPostsProgressionProof::class, 'disaster_posts_progressions_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
