<?php

namespace App\Http\Controllers;

use App\Models\Guild;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    public function index()
    {
        // Retorna todas as guildas
        return response()->json(Guild::all());
    }

    public function store(Request $request)
    {
        // Cria uma nova guilda
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $guild = Guild::create($request->all());
        return response()->json($guild, 201);
    }

    public function show($id)
    {
        // Exibe detalhes de uma guilda específica
        return response()->json(Guild::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        // Atualiza informações de uma guilda
        $guild = Guild::findOrFail($id);
        $guild->update($request->all());
        return response()->json($guild);
    }

    public function destroy($id)
    {
        // Deleta uma guilda
        Guild::destroy($id);
        return response()->json(null, 204);
    }
}