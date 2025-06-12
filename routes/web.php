<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DisasterPostController;
use App\Http\Controllers\Admin\DisasterPostRefugeeController;
use App\Http\Controllers\Admin\DisasterProgressionController;
use App\Http\Controllers\Admin\RepportController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Repport Routes
    Route::prefix('repports')->group(function () {
        Route::controller(RepportController::class)->group(function () {
            Route::get('/map', 'indexRepportMap')->name('repports.map');
            Route::get('/{repport}', 'showRepport')->name('repports.show');
            Route::get('/', 'index')->name('repports.index');
            Route::put('/{repport}', 'editStatusRepport')->name('repports.edit.status');
            Route::delete('/{repport}', 'delete')->name('repports.delete');
            Route::post('/{repport}/comment', 'addComment')->name('repports.comment');
        });
    });

    // Disater Post Routes
    Route::prefix('disaster-posts')->group(function () {
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
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
