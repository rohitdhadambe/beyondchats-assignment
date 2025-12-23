<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ArticleController; // ✅ Add this line

Route::apiResource('articles', ArticleController::class);
