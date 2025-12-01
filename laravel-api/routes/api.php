<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('post', PostController::class);

// Auth routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/profile', [AuthController::class, 'profile'])->middleware('auth:sanctum');
Route::get('/me', [AuthController::class, 'getMe'])->middleware('auth:sanctum');


// PDF
Route::post('/invoice/generate', [InvoiceController::class, 'generateInvoice']);
Route::get('/invoice/{id}/view', [InvoiceController::class, 'viewInvoice']);
