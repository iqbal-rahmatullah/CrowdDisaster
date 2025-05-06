<?php

use App\Http\Controllers\Admin\RepportController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->prefix('repports')->group(function () {
    Route::controller(RepportController::class)->group(function () {
        Route::get('/map', 'indexRepportMap')->name('repports.map');
        Route::get('/{repport}', 'showRepport')->name('repports.show');
        Route::get('/', 'index')->name('repports.index');
        Route::put('/{repport}', 'editStatusRepport')->name('repports.edit.status');
        Route::delete('/{repport}', 'delete')->name('repports.delete');
        Route::post('/{repport}/comment', 'addComment')->name('repports.comment');
    });
});
