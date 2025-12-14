<?php

namespace App\Http\Controllers;

use App\Models\Evento;
use App\Models\ParticipanteEvento;
use Illuminate\Http\Request;

class EventoController extends Controller
{
    public function index()
    {
        $eventos = Evento::with(['juego', 'plataforma', 'creador'])->get();

        return response()->json($eventos->map(function ($evento) {
            return [
                'id' => $evento->id,
                'nombre' => $evento->nombre,
                'descripcion' => $evento->descripcion,
                'juego_id' => $evento->juego_id, // 👈 ID para el select
                'juego' => $evento->juego ? $evento->juego->nombre : null,
                'plataforma_id' => $evento->plataforma_id, // 👈 ID para el select
                'plataforma' => $evento->plataforma ? $evento->plataforma->nombre : null,
                'tipo_evento' => $evento->tipo_evento,
                'estado' => $evento->estado,
                'fecha_inicio' => $evento->fecha_inicio,
                'fecha_fin' => $evento->fecha_fin,
                'ubicacion' => $evento->ubicacion,
                'participantes_actuales' => $evento->participaciones->count(),
                'max_participantes' => $evento->max_participantes ?? 0,
                'premio' => $evento->premio,
                'banner_url' => $evento->banner_url,
                'latitud' => $evento->latitud,
                'longitud' => $evento->longitud,
                'creador' => $evento->creador ? [
                    'id' => $evento->creador->id,
                    'gamertag' => $evento->creador->gamertag,
                    'email' => $evento->creador->email,
                ] : null,
            ];
        }));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'juego_id' => 'required|exists:juegos,id',
            'tipo_evento' => 'required|string|in:championship,casual,ranked,practice',
            'plataforma_id' => 'nullable|exists:plataformas,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'ubicacion' => 'nullable|string|max:150',
            'max_participantes' => 'nullable|integer|min:1',
            'premio' => 'nullable|string',
            'visibilidad' => 'required|string|in:public,private',
            'codigo_acceso' => 'nullable|string',
            'latitud' => 'nullable|numeric',
            'longitud' => 'nullable|numeric',
            'descripcion' => 'nullable|string',
            'reglas' => 'nullable|string',
            'banner' => 'nullable|image|max:2048', // 👈 validación de imagen
        ]);

        $data['organizador_id'] = auth()->id();

        if ($request->hasFile('banner')) {
            $path = $request->file('banner')->store('banners', 'public');
            $data['banner_url'] = $path;
        }

        $evento = Evento::create($data);

        return response()->json($evento, 201);
    }

    public function show($id)
    {
        $evento = Evento::with('juego', 'creador', 'participaciones.usuario', 'plataforma')->find($id);
        if (!$evento) {
            return response()->json(['mensaje' => 'Evento no encontrado'], 404);
        }

        return response()->json([
            'id' => $evento->id,
            'nombre' => $evento->nombre,
            'descripcion' => $evento->descripcion,
            'juego_id' => $evento->juego_id,
            'juego' => [
                'id' => $evento->juego->id,
                'nombre' => $evento->juego->nombre,
            ],
            'plataforma_id' => $evento->plataforma_id,
            'plataforma' => [
                'id' => $evento->plataforma->id,
                'nombre' => $evento->plataforma->nombre,
            ],
            'tipo_evento' => $evento->tipo_evento,
            'estado' => $evento->estado,
            'fecha_inicio' => $evento->fecha_inicio,
            'fecha_fin' => $evento->fecha_fin,
            'ubicacion' => $evento->ubicacion,
            'participantes_actuales' => $evento->participaciones->count(),
            'max_participantes' => $evento->max_participantes ?? 0,
            'premio' => $evento->premio,
            'banner_url' => $evento->banner_url,
            'latitud' => $evento->latitud,
            'longitud' => $evento->longitud,
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
        ], 200);
    }


    public function update(Request $request, $id)
    {
        $evento = Evento::findOrFail($id);

        $data = $request->validate([
            'nombre' => 'sometimes|required|string|max:100',
            'descripcion' => 'nullable|string',
            'juego_id' => 'sometimes|required|exists:juegos,id',
            'tipo_evento' => 'sometimes|required|string|in:championship,casual,ranked,practice',
            'plataforma_id' => 'nullable|exists:plataformas,id',
            'fecha_inicio' => 'nullable|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'ubicacion' => 'nullable|string|max:150',
            'max_participantes' => 'nullable|integer|min:1',
            'premio' => 'nullable|string',
            'visibilidad' => 'nullable|string|in:public,private',
            'codigo_acceso' => 'nullable|string',
            'latitud' => 'nullable|numeric',
            'longitud' => 'nullable|numeric',
            'descripcion' => 'nullable|string',
            'reglas' => 'nullable|string',
            'banner' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('banner')) {
            $path = $request->file('banner')->store('banners', 'public');
            $data['banner_url'] = $path;
        }

        $evento->update($data);

        return response()->json($evento, 200);
    }


    public function destroy($id)
    {
        $evento = Evento::find($id);
        if (!$evento)
            return response()->json(['message' => 'Evento no encontrado'], 404);
        $evento->delete();
        return response()->json(['message' => 'Evento eliminado'], 200);
    }

    public function misEventos(Request $request)
    {
        $userId = $request->user()->id;

        $eventos = Evento::with('juego')
            ->whereHas('participaciones', function ($q) use ($userId) {
                $q->where('user_id', $userId); // usa id_usuario
            })
            ->get()
            ->map(fn($evento) => [
                'id' => $evento->id,
                'nombre' => $evento->nombre,
                'descripcion' => $evento->descripcion,
                'juego' => $evento->juego->nombre ?? null,
                'estado' => $evento->estado,
                'fecha_inicio' => $evento->fecha_inicio,
                'fecha_fin' => $evento->fecha_fin,
                'participantes_actuales' => $evento->participantes_actuales ?? 0,
                'max_participantes' => $evento->max_participantes ?? 0,
            ]);

        return response()->json($eventos, 200);
    }

    public function creados(Request $request)
    {
        $userId = $request->user()->id;

        $eventos = Evento::with('juego')
            ->where('organizador_id', $userId) // usa id_creador
            ->get()
            ->map(fn($evento) => [
                'id' => $evento->id,
                'nombre' => $evento->nombre,
                'juego' => $evento->juego->nombre ?? null,
                'estado' => $evento->estado,
                'fecha_inicio' => $evento->fecha_inicio,
                'fecha_fin' => $evento->fecha_fin,
            ]);

        return response()->json($eventos, 200);
    }

    public function proximos()
    {
        $eventos = Evento::with('juego')
            ->where('estado', 'upcoming')
            ->orderBy('fecha_inicio')
            ->limit(5)
            ->get()
            ->map(fn($evento) => [
                'id' => $evento->id,
                'nombre' => $evento->nombre,
                'juego' => $evento->juego->nombre ?? null,
                'estado' => $evento->estado,
                'fecha_inicio' => $evento->fecha_inicio,
                'fecha_fin' => $evento->fecha_fin,
                'participantes_actuales' => $evento->participantes_actuales ?? 0,
                'max_participantes' => $evento->max_participantes ?? 0,
            ]);

        return response()->json($eventos, 200);
    }

    public function aprobar($id)
    {
        $evento = Evento::findOrFail($id);
        $evento->estado = 'upcoming';
        $evento->save();

        return response()->json($evento);
    }
}
