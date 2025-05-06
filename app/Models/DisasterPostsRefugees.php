<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisasterPostsRefugees extends Model
{
    protected $table = 'disaster_posts_refugees';

    protected $fillable = [
        'disaster_post_id',
        'name',
        'phone',
        'nik',
        'gender',
    ];

    public function disasterPosts()
    {
        return $this->belongsTo(DisasterPosts::class);
    }
}
