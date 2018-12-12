<?php

//use Illuminate\Http\Request;

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

//Route::middleware('auth:api')->get('/user', function (Request $request) {
//    return $request->user();
//});


//Route::group(["middleware" => "guest:api"], function () {
//    Route::post("/login", "AuthController@login");
//});

Route::post('/login', 'AuthController@login');

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/me', 'AuthController@me');
    Route::post('/logout', 'AuthController@logout');

    Route::resource('tasks', 'TasksController',
        ['only' => ['index', 'show', 'store', 'update', 'destroy']]
    );

    Route::resource('users', 'UsersController',
        ['only' => ['index', 'show', 'store', 'update', 'destroy']]
    );

    Route::resource('projects', 'ProjectsController',
        ['only' => ['index', 'show', 'store', 'update', 'destroy']]
    );
});