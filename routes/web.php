<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;


Route::get('/eloquent',[PostController::class,'eloquent_data_show'])->name('eloquent');





Route::get('/',[HomeController::class,'index'])->name('dashboard');

Route::get('/post',[PostController::class,'post'])->name('post');
Route::post('post/post-create',[PostController::class,'store'])->name('post-create');
Route::get('post/post-list',[PostController::class,'getPostList'])->name('post-list');
Route::get('post/post/list',[PostController::class,'postList'])->name('post.list');
Route::get('post/post-edit/{id}',[PostController::class,'postEdit'])->name('post.edit');
Route::post('post/post-update',[PostController::class,'postUpdate'])->name('post.update');
Route::get('post/delete-post/{id}',[PostController::class,'deletePost'])->name('post.delete');
Route::post('post/remove-post',[PostController::class,'removePost'])->name('post.remove');
Route::post('post/change-status',[PostController::class,'changeStatus'])->name('change.status');

Route::get('post/onchange-post-list',[PostController::class,'onChangePostList'])->name('onchange-post-list');



Route::get('/category',[PostController::class,'category'])->name('category');


