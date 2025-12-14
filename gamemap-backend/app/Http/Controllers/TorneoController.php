<?php

namespace App\Http\Controllers;

use App\Models\Torneo;
use Illuminate\Http\Request;

class TorneoController extends Controller
{
    public function index() {
        return response()->json(Torneo::all(), 200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'id_evento'=>'required|exists:eventos,id_evento',
            'id_juego'=>'nullable|exists:juegos,id_juego',
            'nombre_torneo'=>'required|string|max:100',
            'tipo_torneo'=>'required|in:eliminación,liguilla,mixto',
            'rondas'=>'nullable|integer',
            'premio'=>'nullable|string|max:255',
            'reglas'=>'nullable|string',
            'precio_inscripcion'=>'required|numeric|min:0',
            'comision_platform'=>'required|numeric|min:0',
            'patrocinado'=>'required|boolean',
            'nombre_patrocinador'=>'nullable|string|max:100'
        ]);
        $torneo = Torneo::create($data);
        return response()->json($torneo,201);
    }

    public function show($id) {
        $torneo = Torneo::find($id);
        if(!$torneo) return response()->json(['message'=>'Torneo no encontrado'],404);
        return response()->json($torneo,200);
    }

    public function update(Request $request,$id) {
        $torneo = Torneo::find($id);
        if(!$torneo) return response()->json(['message'=>'Torneo no encontrado'],404);
        $data = $request->validate([
            'id_evento'=>'sometimes|required|exists:eventos,id_evento',
            'id_juego'=>'sometimes|nullable|exists:juegos,id_juego',
            'nombre_torneo'=>'sometimes|required|string|max:100',
            'tipo_torneo'=>'sometimes|required|in:eliminación,liguilla,mixto',
            'rondas'=>'nullable|integer',
            'premio'=>'nullable|string|max:255',
            'reglas'=>'nullable|string',
            'precio_inscripcion'=>'sometimes|required|numeric|min:0',
            'comision_platform'=>'sometimes|required|numeric|min:0',
            'patrocinado'=>'sometimes|required|boolean',
            'nombre_patrocinador'=>'nullable|string|max:100'
        ]);
        $torneo->update($data);
        return response()->json($torneo,200);
    }

    public function destroy($id) {
        $torneo = Torneo::find($id);
        if(!$torneo) return response()->json(['message'=>'Torneo no encontrado'],404);
        $torneo->delete();
        return response()->json(['message'=>'Torneo eliminado'],200);
    }
}
