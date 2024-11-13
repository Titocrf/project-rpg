<?php

namespace App\Repositories;

use App\Models\Guild;

class GuildRepository
{
    public function getAll()
    {
        return Guild::orderBy('id')->get();
    }

    public function findById($id)
    {
        return Guild::findOrFail($id);
    }

    public function create(array $data)
    {
        return Guild::create($data);
    }

    public function update(Guild $guild, array $data)
    {
        return $guild->update($data);
    }

    public function getAllGuilds()
    {
        return Guild::doesntHave('players')->get();
    }

    public function delete($id)
    {
        return Guild::destroy($id);
    }
}
