<?php

use App\Http\Controllers\BalanceController;
use App\Http\Controllers\ClassController;
use App\Http\Controllers\GuildController;
use App\Http\Controllers\PlayerController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('players', PlayerController::class);
Route::resource('classes', ClassController::class);
Route::resource('guilds', GuildController::class);
Route::resource('balances', BalanceController::class);
Route::post('players/{id}/confirm', [PlayerController::class, 'confirm']);
Route::post('players/{id}/unconfirm', [PlayerController::class, 'unconfirm']);