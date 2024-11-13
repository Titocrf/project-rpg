<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'class_id',
        'xp',
        'confirmed',
    ];

    protected $casts = [
        'confirmed' => 'boolean',
    ];

    public function class()
    {
        return $this->belongsTo(ClassModel::class);
    }

    public function guilds()
    {
        return $this->belongsToMany(Guild::class);
    }
}