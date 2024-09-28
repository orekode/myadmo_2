<?php

namespace App\Http\Controllers\Web;


use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [GeneralController::class, 'home'])->name('home');

Route::get('/test', function () {
    return redirect(route('home'));
});

Route::get('/store', function () {
    return Inertia::render('Store/Store', []);
})->name('marketplace');

Route::get('/ads', function () {
    return Inertia::render('Ads/Scrolls', []);
})->name('ads');

Route::get('/ad', function () {
    return Inertia::render('Ads/Video', []);
})->name('ad');

Route::get('/ade', function () {
    return Inertia::render('Ads/Watch', []);
})->name('ade');





// Route::get('/ads', fn() => Inertia::render("Shorts/Videos"));

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile',        [ProfileController::class, 'profile'])->name('profile');
    Route::get('/profile/choose', [ProfileController::class, 'chooseProfile'])->name('profile.choose');
    Route::get('/profile/create', [ProfileController::class, 'createProfile'])->name('profile.create');
    
    Route::post('/profile/create', [ProfileController::class, 'create'])->name('profile.create');



    Route::get('/advert/create', [AdController::class, 'createAdvert'])->name('advert.create');

});


// 
Route::middleware('auth')->group(function () {

    Route::post('/advert/category/create', [Admin\AdController::class, 'createCategory'])->name('advert.category.create');

});


require __DIR__.'/auth.php';

