<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->controller(Web\AuthController::class)->group(function () {
    Route::get('/signup',           'signupForm');
    Route::get('/login',            'loginForm')->name('login');
    Route::get('/verify/notice',    'verifyEmail')->name('verification.notice');
    Route::get('/forgot',           'forgotForm');
    Route::get('link/sent',         'success')->name('linksent.success');
    Route::get('/reset',            'resetForm')->name('password.reset');

    Route::post('/signup',                  'signup')->name('auth.new');
    Route::post('/login',                   'login')->name('auth.login');
    Route::post('/logout',                  'logout')->name('auth.logout');
    Route::post('/send',                    'sendLink')->name('auth.sendLink');
    Route::post('/reset',                   'reset')->name('auth.reset');
    Route::get('/verify/{id}/{hash}',       'verify')->name('verification.verify'); // this get request is here because it performs a post like function
    Route::post('/reverify',                'reVerify')->name('verification.send');
});