<?php

namespace App\Http\Controllers;

use App\Models\Amistad;
use Illuminate\Http\Request;

class AmistadController extends Controller
{
    public function index()
    {
        return Amistad::with(['usuario1', 'usuario2'])
            ->where('estado', 'aceptada') // usa el mismo valor que guardas
            ->get()
            ->map(function ($amistad) {
                return [
                    'id' => $amistad->id,
                    'usuario1' => $amistad->usuario1 ? [
                        'id' => $amistad->usuario1->id,
                        'nombre' => $amistad->usuario1->full_name,
                        'email' => $amistad->usuario1->email,
                        'avatar_url' => $amistad->usuario1->avatar_url,
                    ] : null,
                    'usuario2' => $amistad->usuario2 ? [
                        'id' => $amistad->usuario2->id,
                        'nombre' => $amistad->usuario2->full_name,
                        'email' => $amistad->usuario2->email,
                        'avatar_url' => $amistad->usuario2->avatar_url,
                    ] : null,
                    'estado' => $amistad->estado,
                    'created_at' => $amistad->created_at,
                ];
            });
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'friend_id' => 'required|exists:usuarios,id',
            'estado' => 'nullable|in:pendiente,aceptada,bloqueada'
        ]);

        $userId = auth()->user()->id; // ✅ PK es 'id'

        if ($validated['friend_id'] == $userId) {
            return response()->json(['message' => 'No puedes agregarte a ti mismo'], 422);
        }

        $amistad = Amistad::create([
            'user_id' => $userId,
            'friend_id' => $validated['friend_id'],
            'estado' => $validated['estado'] ?? 'pendiente',
        ]);

        return response()->json($amistad, 201);
    }

    public function show($id)
    {
        $amistad = Amistad::find($id);
        if (!$amistad)
            return response()->json(['message' => 'Amistad no encontrada'], 404);
        return response()->json($amistad, 200);
    }

    public function update(Request $request, $id)
    {
        $amistad = Amistad::find($id);
        if (!$amistad)
            return response()->json(['message' => 'Amistad no encontrada'], 404);
        $data = $request->validate([
            'estado' => 'nullable|in:pendiente,aceptada,bloqueada'
        ]);
        $amistad->update($data);
        return response()->json($amistad, 200);
    }

    public function destroy($id)
    {
        $amistad = Amistad::find($id);
        if (!$amistad)
            return response()->json(['message' => 'Amistad eliminada'], 404);
        $amistad->delete();
        return response()->json(['message' => 'Amistad eliminada'], 200);
    }
}
