<?php

namespace App\Repositories;

use App\Models\Player;

class PlayerRepository
{
    public function getAll()
    {
        return Player::with('class')->orderBy('id')->get();
    }

    public function findById($id)
    {
        return Player::with('class')->findOrFail($id);
    }

    public function create(array $data)
    {
        return Player::create($data);
    }

    public function update(Player $player, array $data)
    {
        $player->update($data);
        return $player;
    }

    public function getConfirmedPlayersByIds(array $playerIds)
    {
        return Player::whereIn('id', $playerIds)
            ->where('confirmed', true)
            ->get();
    }

    public function delete($id)
    {
        return Player::destroy($id);
    }
}
