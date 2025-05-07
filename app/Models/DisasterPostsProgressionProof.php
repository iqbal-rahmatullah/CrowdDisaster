<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DisasterPostsProgressionProof extends Model
{
    protected $fillable = [
        'disaster_posts_progressions_id',
        'file_path',
        'file_type',
    ];

    public function disasterPostsProgression()
    {
        return $this->belongsTo(DisasterPostsProgression::class);
    }
}
