<?php

use App\Http\Controllers\Admin\DisasterPostController;
use App\Http\Controllers\Admin\DisasterPostRefugeeController;
use App\Http\Controllers\Admin\DisasterProgressionController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('disaster-posts')->group(function () {
    Route::controller(DisasterPostController::class)->group(function () {
        Route::post('/', 'store')->name('disaster-posts.store');
        Route::get('/', 'index')->name('disaster-posts.index');
        Route::get('/{disasterPost}', 'show')->name('disaster-posts.show');
    });

    Route::controller(DisasterPostRefugeeController::class)->group(function () {
        Route::post('/{disasterPostId}/refugee', 'store')->name('disaster-posts.refugees.store');
        Route::delete('/{disasterPostId}/refugee/{id}', 'destroy')->name('disaster-posts.refugees.destroy');
        Route::put('/{disasterPostId}/refugee/{id}', 'edit')->name('disaster-posts.refugees.edit');
    });

    Route::controller(DisasterProgressionController::class)->group(function () {
        Route::post('/{disasterPost}/progression', 'store')->name('disaster-posts.progression.store');
    });
});
