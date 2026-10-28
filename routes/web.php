<?php


use App\Http\Controllers\Contacts\ContactsController;
use App\Http\Controllers\Documentation\DocumentationController;
use App\Http\Controllers\Firmware\FirmwaresController;
use App\Http\Controllers\GatewayManager\GatewayManagerController;
use App\Http\Controllers\Messages\MessagesController;
use App\Http\Controllers\Smslogs\SmsLogsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


    // Contacts
    Route::get('/contacts', [ContactsController::class, 'index'])->name('contacts.index');
    Route::post('/contacts', [ContactsController::class, 'store'])->name('contacts.store');
    Route::put('/contacts/{contact}', [ContactsController::class, 'update'])->name('contacts.update');
    Route::delete('/contacts/{contact}', [ContactsController::class, 'destroy'])->name('contacts.destroy');


    //Messages
    Route::get('/messages', [MessagesController::class, 'index'])->name('messages.index');
    Route::post('/messages', [MessagesController::class, 'store'])->name('messages.store');

    //Firmware esp32
    Route::get('/firmwares', [FirmwaresController::class, 'index'])->name('firmwares.index');
    Route::post('/firmwares', [FirmwaresController::class, 'store'])->name('firmwares.store');
    Route::post('/firmwares/{firmware}/activate', [FirmwaresController::class, 'activate'])->name('firmwares.activate');
    Route::delete('/firmwares/{firmware}', [FirmwaresController::class, 'destroy'])->name('firmwares.destroy');

    Route::get('/gateway-manager', [GatewayManagerController::class, 'index'])->name('gateway-manager.index');
    Route::get('/gateway-manager/{device}', [GatewayManagerController::class, 'show'])->name('gateway-manager.show');

    //SMS LOGS
    Route::get('/sms-logs', [SmsLogsController::class, 'index'])->name('sms.index');
    Route::delete('/sms-logs', [SmsLogsController::class, 'destroy'])->name('sms.destroy');

    //Documentation
    Route::get('/documentation', [DocumentationController::class, 'index'])
        ->name('documentation');
});


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
