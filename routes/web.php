<?php

use App\Http\Controllers\ItemparamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemgroupController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\StockController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware(['auth', 'verified', 'role:admin'])->group(callback: function () {
    Route::get('/admin_dashboard', fn() => Inertia::render('admin_dashboard'))->name('admin_dashboard');
    Route::resource('survey', SurveyController::class);
    Route::resource('question', QuestionController::class);
    Route::resource('user', UserController::class);
    Route::resource('item', ItemController::class);
    Route::resource('itemgroup', ItemgroupController::class);
    Route::resource('brand', BrandController::class);
    Route::resource('stock', StockController::class);
    Route::resource('itemparam', ItemparamController::class);

});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
