<?php

use App\Http\Controllers\Admin\DisasterPostController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('disaster-posts')->group(function () {
    Route::controller(DisasterPostController::class)->group(function () {
        Route::post('/', 'store')->name('disaster-posts.store');
        Route::get('/', 'index')->name('disaster-posts.index');
        Route::get('/{disasterPost}', 'show')->name('disaster-posts.show');
    });
});
