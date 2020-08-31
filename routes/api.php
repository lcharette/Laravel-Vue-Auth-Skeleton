<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Auth routes
Route::post('login', 'AuthController@login');
Route::post('logout', 'AuthController@logout');
Route::post('refresh', 'AuthController@refresh');
Route::post('register', 'AuthController@register');
Route::get('user', 'AuthController@user');
