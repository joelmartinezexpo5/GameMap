<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use Illuminate\Http\Request;
use App\Models\ParticipanteEvento;

class ParticipacionController extends Controller
{
    /**
     * Mostrar todas las participaciones
     */
    public function index()
    {
        return response()->json(ParticipanteEvento::with(['evento', 'usuario'])->get(), 200);
    }

    /**
     * Crear una nueva participación
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'evento_id' => 'required|exists:eventos,id',
            'estado' => 'nullable|string',
            'fecha_union' => 'nullable|date',
            'equipo' => 'nullable|string',
            'posicion' => 'nullable|integer',
            'puntos' => 'nullable|integer',
        ]);

        $validated['user_id'] = auth()->id();
        $validated['estado'] = $validated['estado'] ?? 'confirmed';
        $validated['fecha_union'] = $validated['fecha_union'] ?? now();

        ParticipanteEvento::create($validated);

        // recarga el evento con participaciones
        $evento = Evento::with(['participaciones.usuario', 'plataforma', 'juego', 'creador'])
            ->findOrFail($validated['evento_id']);

        return response()->json([
            'id' => $evento->id,
            'nombre' => $evento->nombre,
            'descripcion' => $evento->descripcion,
            'juego' => $evento->juego->nombre ?? null,
            'estado' => $evento->estado,
            'fecha_inicio' => $evento->fecha_inicio,
            'fecha_fin' => $evento->fecha_fin,
            'ubicacion' => $evento->ubicacion,
            'participantes_actuales' => $evento->participaciones->count(), // 👈 contador real
            'max_participantes' => $evento->max_participantes ?? 0,
            'premio' => $evento->premio,
            'banner_url' => $evento->banner_url,
            'creador' => $evento->creador ? [
                'id' => $evento->creador->id,
                'gamertag' => $evento->creador->gamertag,
                'email' => $evento->creador->email,
            ] : null,
            'participaciones' => $evento->participaciones->map(function ($p) {
                return [
                    'id' => $p->id,
                    'user_id' => $p->user_id,
                    'estado' => $p->estado,
                    'equipo' => $p->equipo,
                    'usuario' => [
                        'id' => $p->usuario->id,
                        'full_name' => $p->usuario->full_name,
                        'gamertag' => $p->usuario->gamertag,
                        'avatar_url' => $p->usuario->avatar_url,
                    ],
                ];
            }),
        ], 201);
    }

    /**
     * Mostrar una participación específica
     */
    public function show($id)
    {
        $participacion = ParticipanteEvento::with(['evento', 'usuario'])->findOrFail($id);
        return response()->json($participacion, 200);
    }

    /**
     * Actualizar una participación
     */
    public function update(Request $request, $id)
    {
        $participacion = ParticipanteEvento::findOrFail($id);

        $validated = $request->validate([
            'estado' => 'sometimes|string',
            'fecha_union' => 'nullable|date',
            'equipo' => 'nullable|string',
            'posicion' => 'nullable|integer',
            'puntos' => 'nullable|integer',
        ]);

        $participacion->update($validated);

        return response()->json($participacion, 200);
    }

    /**
     * Eliminar una participación
     */
    public function destroy($id)
    {
        $participacion = ParticipanteEvento::where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        $eventoId = $participacion->evento_id;
        $participacion->delete();

        // recarga el evento actualizado
        $evento = Evento::with(['participaciones.usuario', 'plataforma', 'juego', 'creador'])
            ->findOrFail($eventoId);

        return response()->json([
            'id' => $evento->id,
            'nombre' => $evento->nombre,
            'participantes_actuales' => $evento->participaciones->count(), // 👈 contador real
            'max_participantes' => $evento->max_participantes ?? 0,
            'participaciones' => $evento->participaciones->map(function ($p) {
                return [
                    'id' => $p->id,
                    'user_id' => $p->user_id,
                    'estado' => $p->estado,
                    'equipo' => $p->equipo,
                    'usuario' => [
                        'id' => $p->usuario->id,
                        'full_name' => $p->usuario->full_name,
                        'gamertag' => $p->usuario->gamertag,
                        'avatar_url' => $p->usuario->avatar_url,
                    ],
                ];
            }),
        ], 200);
    }
}
