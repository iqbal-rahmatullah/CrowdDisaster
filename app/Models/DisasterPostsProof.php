<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisasterPostsProof extends Model
{
    protected $fillable = [
        'disaster_posts_id',
        'file_path',
        'file_type',
    ];

    public function disasterPosts()
    {
        return $this->belongsTo(DisasterPosts::class);
    }
}
