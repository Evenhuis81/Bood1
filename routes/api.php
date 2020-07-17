<?php

use Illuminate\Http\Request;

Route::resource('groceries', 'GroceryController');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
