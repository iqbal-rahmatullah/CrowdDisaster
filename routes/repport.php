<?php

use App\Http\Controllers\Admin\RepportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('repports')->group(function () {
    Route::controller(RepportController::class)->group(function () {
        Route::get('map', 'indexRepportMap')->name('repports.map');
    });
});
