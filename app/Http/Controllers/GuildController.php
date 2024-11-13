<?php

namespace App\Http\Controllers;

use App\Http\Resources\GuildResource;
use App\Services\GuildService;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    protected $guildService;

    public function __construct(GuildService $guildService)
    {
        $this->guildService = $guildService;
    }

    public function index()
    {
        $dados = $this->guildService->getAll();
        return response()->json(GuildResource::collection($dados));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'xp' => 'required|integer|min:1|max:100',
        ]);

        $dados = $this->guildService->create($data);
        return response()->json(new GuildResource($dados));
    }

    public function show($id)
    {
        $dados = $this->guildService->getById($id);
        return response()->json(new GuildResource($dados));
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $dados = $this->guildService->update($id, $data);
        return response()->json(new GuildResource($dados));
    }

    public function destroy($id)
    {
        $this->guildService->delete($id);
        return response()->json(null, 204);
    }
}
