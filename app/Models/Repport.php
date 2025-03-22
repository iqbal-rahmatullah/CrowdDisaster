<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repport extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'latitude',
        'longitude',
        'address',
        'title',
        'description',
        'status',
        'type',
        'radius',
        'additional_information',
    ];

    public function repportProofs()
    {
        return $this->hasMany(RepportProof::class);
    }

    public function repportComments()
    {
        return $this->hasMany(RepportComment::class);
    }

    public function repportImpacts()
    {
        return $this->hasMany(RepportImpact::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function repportSupports()
    {
        return $this->hasMany(RepportSupport::class);
    }
}
