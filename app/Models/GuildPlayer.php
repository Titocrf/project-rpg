<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GuildPlayer extends Model
{
    use HasFactory;

    protected $table = 'guild_player';

    protected $fillable = [
        'guild_id',
        'player_id',
    ];
}