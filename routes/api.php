<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomePageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('logout ', 'logout');
});

Route::middleware('auth:api')->group(function () {
    Route::controller(HomePageController::class)->group(function () {
        Route::get('/name/user', 'name');
        Route::get('/detail/user', 'detailUser');
        Route::get('/laporan/terdekat/{latitude}/{longitude}', 'laporanTerdekat');
        // Route::get('/notif/user', 'notifUser');
        // Route::post('/patch/notif/{id}', 'notifUserPatch');
    });
});
