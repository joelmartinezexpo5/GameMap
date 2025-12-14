<?php

namespace App\Http\Controllers;

use App\Models\Juego;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;

class JuegoController extends Controller
{
    public function index()
    {
        return response()->json(Juego::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'genero' => 'nullable|string',
            'desarrollador' => 'nullable|string',
            'anio_lanzamiento' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('juegos', 'public');
            $validated['imagen_url'] = $path;
        }

        $juego = Juego::create($validated);

        return response()->json($juego, 201);
    }

    public function show($id)
    {
        $juego = Juego::find($id);
        if (!$juego)
            return response()->json(['message' => 'Juego no encontrado'], 404);
        return response()->json($juego, 200);
    }

    public function update(Request $request, $id)
    {
        $juego = Juego::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'genero' => 'nullable|string',
            'desarrollador' => 'nullable|string',
            'anio_lanzamiento' => 'nullable|string',
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            // borrar imagen anterior si existe
            if ($juego->imagen_url) {
                Storage::disk('public')->delete($juego->imagen_url);
            }
            $path = $request->file('imagen')->store('juegos', 'public');
            $validated['imagen_url'] = $path;
        }

        $juego->update($validated);

        return response()->json($juego, 200);
    }

    public function destroy($id)
    {
        try {
            $juego = Juego::findOrFail($id);

            // Si quieres borrar la imagen asociada
            if ($juego->imagen_url) {
                Storage::disk('public')->delete($juego->imagen_url);
            }

            // ⚠️ Si hay eventos que dependen de este juego, hay que decidir:
            // O bien impedir el borrado, o bien borrarlos en cascada
            if ($juego->eventos()->count() > 0) {
                return response()->json([
                    'error' => 'No se puede eliminar el juego porque tiene eventos asociados'
                ], 400);
            }

            $juego->delete();

            return response()->json(['mensaje' => 'Juego eliminado correctamente'], 200);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error eliminando juego',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }
}
