<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::get('/locations',  [LocationController::class, 'getLocations'])->name('locations');
Route::get('/categories', [AdController::class,       'getCategories'])->name('categories.search');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/advert/cost',   [AdController::class,       'getAdvertCost'])->name('advert.cost');
    Route::post('/advert/verify', [AdController::class,       'verifyPayment'])->name('advert.verify');
    Route::post('/advert/upload', [AdController::class,       'uploadAdvert'])->name('advert.upload');
});