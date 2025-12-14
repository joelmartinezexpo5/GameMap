<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    JuegoController,
    EventoController,
    ParticipacionController,
    ComentarioController,
    AmistadController,
    MensajeController,
    SuscripcionController,
    TorneoController,
    PlataformaController,
    UsuarioController
};

// Página principal
Route::get('/', function () {
    return view('welcome');
});

// 🔗 Rutas API RESTful
/*
Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('juegos', JuegoController::class);
Route::apiResource('plataformas', PlataformaController::class);
Route::apiResource('eventos', EventoController::class);
Route::apiResource('torneos', TorneoController::class);
Route::apiResource('participaciones', ParticipacionController::class);
Route::apiResource('comentarios', ComentarioController::class);
Route::apiResource('amistades', AmistadController::class);
Route::apiResource('mensajes', MensajeController::class);
Route::apiResource('suscripciones', SuscripcionController::class);
*/