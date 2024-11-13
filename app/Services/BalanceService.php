<?php

namespace App\Services;

use App\Http\Resources\BalanceResource;
use App\Repositories\BalanceRepository;
use App\Repositories\GuildRepository;
use App\Repositories\PlayerRepository;

class BalanceService
{
    protected $balanceRepository;
    protected $playerRepository;
    protected $guildRepository;

    public function __construct(BalanceRepository $balanceRepository, PlayerRepository $playerRepository, GuildRepository $guildRepository)
    {
        $this->balanceRepository = $balanceRepository;
        $this->playerRepository = $playerRepository;
        $this->guildRepository = $guildRepository;
    }

    public function getAll()
    {
        return $this->balanceRepository->getAll();
    }

    public function create($data)
    {
        $guilds = $this->guildRepository->getAllGuilds();
        if ($guilds->isEmpty()) {
            return response()->json(['error' => 'Não há guildas para distribuir os jogadores.'], 400);
        }

        $players = $this->playerRepository->getConfirmedPlayersByIds($data->players);
        if ($players->isEmpty()) {
            return response()->json(['error' => 'Nenhum jogador confirmado para distribuição.'], 400);
        }

        $clerics = $players->where('class_id', 4);
        $warriors = $players->where('class_id', 1);
        $magesOrArchers = $players->whereIn('class_id', [2, 3]);

        if ($clerics->isEmpty() || $warriors->isEmpty() || $magesOrArchers->isEmpty()) {
            return response()->json([
                'error' => 'Não há jogadores suficientes para formar as guildas com a distribuição ideal.\nTente ajustar a quantidade de jogadores para garantir a formação completa.',
            ], 400);
        }

        $guildCount = $guilds->count();
        $playersPerGuild = ceil($players->count() / $guildCount);

        $playerIndex = 0;
        foreach ($guilds as $guild) {
            $guildPlayers = collect();

            if ($clerics->isNotEmpty()) {
                $guildPlayers->push($clerics->shift());
            }

            if ($warriors->isNotEmpty()) {
                $guildPlayers->push($warriors->shift());
            }

            if ($magesOrArchers->isNotEmpty()) {
                $guildPlayers->push($magesOrArchers->shift());
            }

            while ($guildPlayers->count() < $playersPerGuild && $playerIndex < $players->count()) {
                $guildPlayers->push($players->slice($playerIndex, 1)->first());
                $playerIndex++;
            }

            foreach ($guildPlayers as $player) {
                $guild->players()->attach($player->id);
            }
        }
        
        return response()->json(BalanceResource::collection($guilds));
    }

    public function delete($id)
    {
        return $this->balanceRepository->delete($id);
    }
}
