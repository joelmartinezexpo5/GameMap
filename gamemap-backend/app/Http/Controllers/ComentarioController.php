<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comentario;

class ComentarioController extends Controller
{
    /**
     * Mostrar todos los comentarios
     */
    public function index(Request $request)
    {
        $eventoId = $request->query('evento_id');

        $comentarios = Comentario::with('usuario')
            ->when($eventoId, fn($q) => $q->where('evento_id', $eventoId))
            ->get();

        return response()->json($comentarios, 200);
    }


    /**
     * Crear un nuevo comentario
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'evento_id' => 'required|exists:eventos,id',
            'user_id' => 'required|exists:usuarios,id',
            'contenido' => 'required|string',
            'puntuacion' => 'nullable|integer|min:1|max:5',
        ]);

        $comentario = Comentario::create($validated);

        return response()->json($comentario, 201);
    }

    /**
     * Mostrar un comentario específico
     */
    public function show($id)
    {
        $comentario = Comentario::findOrFail($id);
        return response()->json($comentario, 200);
    }

    /**
     * Actualizar un comentario
     */
    public function update(Request $request, $id)
    {
        $comentario = Comentario::findOrFail($id);

        $validated = $request->validate([
            'contenido' => 'sometimes|string',
            'puntuacion' => 'nullable|integer|min:1|max:5',
            'editado' => 'boolean',
        ]);

        $comentario->update($validated);

        return response()->json($comentario, 200);
    }

    /**
     * Eliminar un comentario
     */
    public function destroy($id)
    {
        $comentario = Comentario::findOrFail($id);
        $comentario->delete();

        return response()->json(['message' => 'Comentario eliminado correctamente'], 200);
    }
}
