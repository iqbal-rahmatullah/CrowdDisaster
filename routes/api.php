<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\HomePageController;
use App\Http\Controllers\Api\PostDisasterController;
use App\Http\Controllers\Api\RepportController;
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

    Route::controller(RepportController::class)->group(function () {
        Route::get('/laporan/{id}', 'getLaporan');
        Route::post('/laporan/{id}/report', 'laporanReport');
        Route::post('/laporan/beri-dukungan/{id}/{lat}/{long}', 'beriDukungan');

        Route::post('/laporan/comment/{id}', 'commentLaporan');
        Route::post('/laporan/comment/{id}/delete', 'deleteCommentLaporan');
        Route::post('/laporan/comment/{id}/update', 'updateCommentLaporan');

        Route::get('/laporan/laporan-umum/{lat}/{long}/{status}', 'laporanUmum');

        Route::get('/laporan/laporan-anda/{status}', 'laporanAnda');

        Route::get('/laporan/diseluruh/dunia', 'allLaporan');

        Route::post('/laporan/buat-laporan/{lat}/{long}', 'buatLaporan');

        Route::get('/laporan/convert-alamat/{lat}/{long}', 'convertAlamat');
    });

    Route::controller(PostDisasterController::class)->prefix('post-disaster')->group(function () {
        Route::get('/', 'show');
        Route::get('/{id}', 'showById');
    });
});
