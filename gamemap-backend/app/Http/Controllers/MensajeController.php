<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;

class MensajeController extends Controller
{
    public function index()
    {
        return Mensaje::with(['emisor', 'receptor'])
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($msg) {
                return [
                    'id' => $msg->id,
                    'conversation_id' => $msg->conversation_id,
                    'contenido' => $msg->contenido,
                    'fecha' => $msg->created_at,
                    'emisor' => $msg->emisor ? [
                        'id' => $msg->emisor->id,
                        'full_name' => $msg->emisor->full_name,
                        'avatar_url' => $msg->emisor->avatar_url,
                    ] : null,
                    'receptor' => $msg->receptor ? [
                        'id' => $msg->receptor->id,
                        'full_name' => $msg->receptor->full_name,
                        'avatar_url' => $msg->receptor->avatar_url,
                    ] : null,
                ];
            });
    }


    public function store(Request $request)
    {
        $data = $request->validate([
            'conversation_id' => 'required|string',
            'emisor_id' => 'required|exists:usuarios,id',
            'receptor_id' => 'required|exists:usuarios,id|different:emisor_id',
            'contenido' => 'required|string',
        ]);

        $mensaje = Mensaje::create($data);

        return response()->json([
            'id' => $mensaje->id,
            'conversation_id' => $mensaje->conversation_id,
            'contenido' => $mensaje->contenido,
            'fecha' => $mensaje->created_at,
            'emisor_id' => $mensaje->emisor_id,
            'receptor_id' => $mensaje->receptor_id,
        ], 201);
    }

    public function show($id)
    {
        $mensaje = Mensaje::find($id);
        if (!$mensaje)
            return response()->json(['message' => 'Mensaje no encontrado'], 404);
        return response()->json($mensaje, 200);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje::find($id);
        if (!$mensaje)
            return response()->json(['message' => 'Mensaje no encontrado'], 404);
        $data = $request->validate([
            'contenido' => 'required|string',
            'leido' => 'nullable|boolean'
        ]);
        $mensaje->update($data);
        return response()->json($mensaje, 200);
    }

    public function destroy($id)
    {
        $mensaje = Mensaje::find($id);
        if (!$mensaje)
            return response()->json(['message' => 'Mensaje eliminado'], 404);
        $mensaje->delete();
        return response()->json(['message' => 'Mensaje eliminado'], 200);
    }
}
