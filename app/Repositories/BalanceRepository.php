<?php

namespace App\Repositories;

use App\Models\Guild;
use App\Models\GuildPlayer;

class BalanceRepository
{
    public function getAll()
    {
        return Guild::has('players')->with('players')->get();
    }

    public function create(array $data)
    {
        return GuildPlayer::create($data);
    }

    public function delete($id)
    {
        return GuildPlayer::where('guild_id', $id)->delete();
    }
}
