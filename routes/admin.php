<?php

use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\Management\UserManagementController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
  // Allow impersonated users to return to admin
  Route::post('/admin/return-to-admin', [AdminController::class, 'returnToAdmin'])->name('admin.return_to_admin');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
  Route::post('/admin/login-as/{user}', [AdminController::class, 'loginAs'])->name('admin.login_as');

  // User Management routes
  Route::get('/admin/users', [UserManagementController::class, 'index'])->name('admin.users.index');
  Route::post('/admin/users', [UserManagementController::class, 'store'])->name('admin.users.store');
  Route::put('/admin/users/{user}', [UserManagementController::class, 'update'])->name('admin.users.update');
  Route::delete('/admin/users/{user}', [UserManagementController::class, 'destroy'])->name('admin.users.destroy');

  // User Management bulk actions
  Route::patch('/admin/users/bulk/block', [UserManagementController::class, 'bulkBlock'])->name('admin.users.bulk.block');
  Route::patch('/admin/users/bulk/unblock', [UserManagementController::class, 'bulkUnblock'])->name('admin.users.bulk.unblock');
  Route::delete('/admin/users/bulk/delete', [UserManagementController::class, 'bulkDelete'])->name('admin.users.bulk.delete');

});
