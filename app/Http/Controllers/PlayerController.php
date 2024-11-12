<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    public function index()
    {
        // Retorna todos os jogadores
        return response()->json(Player::all());
    }

    public function store(Request $request)
    {
        // Valida e cria um novo jogador
        $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'xp' => 'required|integer|min:1|max:100',
        ]);

        $player = Player::create($request->all());
        return response()->json($player, 201);
    }

    public function show($id)
    {
        // Retorna detalhes de um jogador específico
        return response()->json(Player::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        // Atualiza as informações de um jogador
        $player = Player::findOrFail($id);
        $player->update($request->all());
        return response()->json($player);
    }

    public function destroy($id)
    {
        // Deleta um jogador
        Player::destroy($id);
        return response()->json(null, 204);
    }
}