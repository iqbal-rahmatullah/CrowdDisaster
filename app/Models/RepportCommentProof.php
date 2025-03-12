<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepportCommentProof extends Model
{
    protected $fillable = [
        'repport_comment_id',
        'file_path',
        'file_type',
    ];

    public function repportComment()
    {
        return $this->belongsTo(RepportComment::class);
    }
}
