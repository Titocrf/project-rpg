<?php

namespace App\Services;

use App\Repositories\GuildRepository;

class GuildService
{
    protected $guildRepository;

    public function __construct(GuildRepository $guildRepository)
    {
        $this->guildRepository = $guildRepository;
    }

    public function getAll()
    {
        return $this->guildRepository->getAll();
    }

    public function getById($id)
    {
        return $this->guildRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->guildRepository->create($data);
    }

    public function update($id, array $data)
    {
        $player = $this->guildRepository->findById($id);
        return $this->guildRepository->update($player, $data);
    }

    public function delete($id)
    {
        return $this->guildRepository->delete($id);
    }
}
