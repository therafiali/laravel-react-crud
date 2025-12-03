<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PageContentController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\PostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {    

    // ==========================
    // 1. PUBLIC ROUTES
    // ==========================

    // Auth
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // testing
    Route::apiResource('posts', PostController::class);

    // ==========================
    // 2. PROTECTED ROUTES (Require Token)
    // ==========================
    Route::middleware('auth:sanctum')->group(function () {

        // User / Profile
        Route::get('/user', function (Request $request) {
            return $request->user();
        });
        Route::post('/profile', [AuthController::class, 'profile']);
        Route::get('/me', [AuthController::class, 'getMe']);

        // page
        Route::get('/page', [PageController::class, 'getallpages']);
        Route::post('/pages/{page_key}/content', [PageContentController::class, 'store']);
        Route::get('/pages/{page_key}/content', [PageContentController::class, 'show']);

        // image upload
        Route::post('/pages/upload-image',[ImageUploadController::class, 'uploadImage']);
        Route::delete('/pages/delete-image',[ImageUploadController::class, 'deleteImage']);

        // Invoices
        Route::post('/invoice/generate', [InvoiceController::class, 'generateInvoice']);
        Route::get('/invoice/{id}/view', [InvoiceController::class, 'viewInvoice']);
    });
}); 
