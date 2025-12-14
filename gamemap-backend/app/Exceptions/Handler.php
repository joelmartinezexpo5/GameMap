<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * Registra los callbacks de manejo de excepciones para la aplicación.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            // Aquí puedes añadir lógica para reportar errores (ej. logs, Sentry, etc.)
        });

        $this->renderable(function (Throwable $e, $request) {
            // Si quieres personalizar la respuesta JSON de errores en la API:
            if ($request->is('api/*')) {
                return response()->json([
                    'error' => $e->getMessage(),
                ], 500);
            }
        });
    }
}
