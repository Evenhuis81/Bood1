<?php

use Illuminate\Http\Request;

Route::resource('groceries', 'GroceryController');
Route::post('groceries/add', 'GroceryController@add');

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
