<?php

namespace App\Services;

use App\Repositories\PlayerRepository;

class PlayerService
{
    protected $playerRepository;

    public function __construct(PlayerRepository $playerRepository)
    {
        $this->playerRepository = $playerRepository;
    }

    public function getAll()
    {
        return $this->playerRepository->getAll();
    }

    public function getById($id)
    {
        return $this->playerRepository->findById($id);
    }

    public function create(array $data)
    {
        return $this->playerRepository->create($data);
    }

    public function update($id, array $data)
    {
        $player = $this->playerRepository->findById($id);
        return $this->playerRepository->update($player, $data);
    }

    public function confirmPlayer($id, bool $confirmed)
    {
        $player = $this->playerRepository->findById($id);
        $player->confirmed = $confirmed;
        return $this->playerRepository->update($player, ['confirmed' => $confirmed]);
    }

    public function delete($id)
    {
        return $this->playerRepository->delete($id);
    }
}
