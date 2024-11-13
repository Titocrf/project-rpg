<?php

namespace App\Http\Controllers;

use App\Http\Resources\PlayerResource;
use App\Services\PlayerService;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    protected $playerService;

    public function __construct(PlayerService $playerService)
    {
        $this->playerService = $playerService;
    }

    public function index()
    {
        $dados = $this->playerService->getAll();
        return response()->json(PlayerResource::collection($dados));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'class_id' => 'required|exists:classes,id',
            'xp' => 'required|integer|min:1|max:100',
        ]);

        $dados = $this->playerService->create($data);
        return response()->json(new PlayerResource($dados));
    }

    public function show($id)
    {
        $dados = $this->playerService->getById($id);
        return response()->json(new PlayerResource($dados));
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();
        $dados = $this->playerService->update($id, $data);
        return response()->json(new PlayerResource($dados));
    }

    public function confirm($id)
    {
        $dados = $this->playerService->confirmPlayer($id, true);
        return response()->json(new PlayerResource($dados));
    }

    public function unconfirm($id)
    {
        $dados = $this->playerService->confirmPlayer($id, false);
        return response()->json(new PlayerResource($dados));
    }

    public function destroy($id)
    {
        $this->playerService->delete($id);
        return response()->json(null, 204);
    }
}
