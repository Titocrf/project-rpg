<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guild extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function players()
    {
        return $this->belongsToMany(Player::class, 'guild_player', 'guild_id', 'player_id')->distinct();
    }
}