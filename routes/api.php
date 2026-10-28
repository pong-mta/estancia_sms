<?php

use App\Http\Controllers\Api\FirmwareController;
use App\Http\Controllers\Api\GatewayCommandController;
use App\Http\Controllers\Api\SmsApiController;
use App\Http\Controllers\Messages\MessagesController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json([
        'success' => true,
        'message' => 'SMS API is working.',
    ]);
});



Route::prefix('sms')->group(function () {
    Route::get('/pending', [SmsApiController::class, 'pending']);
    Route::post('/update', [SmsApiController::class, 'update']);
    Route::post('/ping', [SmsApiController::class, 'ping']);
});

Route::get(
    '/firmware/latest',
    [FirmwareController::class, 'latest']
);

Route::post('/gateway/command', [GatewayCommandController::class, 'store']);
Route::get('/gateway/commands', [GatewayCommandController::class, 'get']);
Route::post('/gateway/commands/result', [GatewayCommandController::class, 'result']);


Route::get('/test-url', function () {
    return [
        'app_url' => config('app.url'),
        'asset' => asset('storage/test.bin'),
    ];
});

Route::get('/test', [MessagesController::class, 'failed_to_fresh']);



Route::prefix('v1')->group(function () {
    Route::post('/send', [SmsApiController::class, 'send']);
});
