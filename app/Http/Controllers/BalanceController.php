<?php

namespace App\Http\Controllers;

use App\Http\Resources\BalanceResource;
use App\Services\BalanceService;
use Illuminate\Http\Request;

class BalanceController extends Controller
{
    protected $balanceService;

    public function __construct(BalanceService $balanceService)
    {
        $this->balanceService = $balanceService;
    }

    public function index()
    {
        $dados = $this->balanceService->getAll();
        return response()->json(BalanceResource::collection($dados));
    }

    public function store(Request $request)
    {
        $request->validate([
            'players' => 'required|array',
            'players.*.id' => 'required|exists:players,id',
        ]);

        return $this->balanceService->create($request);
    }

    public function destroy($id)
    {
        $this->balanceService->delete($id);
        return response()->json(null, 204);
    }
}
