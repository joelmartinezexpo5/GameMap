<?php

use Illuminate\Http\Request;
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

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
| Todas las rutas de tu API RESTful.
| Se acceden bajo http://127.0.0.1:8000/api/...
*/

// ==========================
// Autenticación / Usuario
// ==========================

// CRUD de usuarios
Route::apiResource('usuarios', UsuarioController::class);

// Login de usuario (email + contraseña)
Route::post('/login', [UsuarioController::class, 'login']);
Route::post('/register', [UsuarioController::class, 'register']);

// Perfil del usuario autenticado (Dashboard)
Route::middleware('auth:sanctum')->get('/user', [UsuarioController::class, 'profile']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/usuario/profile', [UsuarioController::class, 'profile']);
    Route::post('/usuario/avatar', [UsuarioController::class, 'updateAvatar']); // ✅ nueva ruta
});
Route::patch('/usuarios/{id}/toggle-active', [UsuarioController::class, 'toggleActive']);

// ==========================
// Juegos
// ==========================
Route::apiResource('juegos', JuegoController::class);

// ==========================
// Plataformas
// ==========================
Route::apiResource('plataformas', PlataformaController::class);

// Endpoints adicionales de eventos
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/eventos/mios', [EventoController::class, 'misEventos']);
    Route::get('/eventos/creados', [EventoController::class, 'creados']);
    Route::get('/eventos/proximos', [EventoController::class, 'proximos']);
});

// ==========================
// Eventos
// ==========================
Route::apiResource('eventos', EventoController::class);

// Ruta personalizada para aprobar evento
Route::put('/eventos/{id}/aprobar', [EventoController::class, 'aprobar']);

// ==========================
// Eventos en panel de admin
// ==========================
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    Route::apiResource('eventos', EventoController::class);
    Route::put('/eventos/{id}/aprobar', [EventoController::class, 'aprobar']);
});

// ==========================
// Torneos
// ==========================
Route::apiResource('torneos', TorneoController::class);

// ==========================
// Participaciones
// ==========================
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('participaciones', ParticipacionController::class);
});


// ==========================
// Comentarios
// ==========================
Route::apiResource('comentarios', ComentarioController::class);

// ==========================
// Amistades
// ==========================
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('amistades', AmistadController::class);
});


// ==========================
// Mensajes
// ==========================
Route::apiResource('mensajes', MensajeController::class);

// ==========================
// Suscripciones
// ==========================
Route::apiResource('suscripciones', SuscripcionController::class);
