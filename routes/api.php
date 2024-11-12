<?php

use App\Http\Controllers\GuildController;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('players', PlayerController::class);
Route::resource('guilds', GuildController::class);
Route::post('guilds/balance', [GuildController::class, 'balance']);