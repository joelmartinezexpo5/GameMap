<?php

namespace App\Http\Controllers;

use App\Models\Valoracion;
use Illuminate\Http\Request;

class ValoracionController extends Controller
{
    public function index() {
        return response()->json(Valoracion::all(),200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'id_evento'=>'required|exists:eventos,id_evento',
            'id_usuario'=>'required|exists:usuarios,id_usuario',
            'puntuacion'=>'nullable|integer|min:0|max:10',
            'comentario'=>'nullable|string'
        ]);
        $valoracion = Valoracion::create($data);
        return response()->json($valoracion,201);
    }

    public function show($id) {
        $valoracion = Valoracion::find($id);
        if(!$valoracion) return response()->json(['message'=>'Valoración no encontrada'],404);
        return response()->json($valoracion,200);
    }

    public function update(Request $request,$id) {
        $valoracion = Valoracion::find($id);
        if(!$valoracion) return response()->json(['message'=>'Valoración no encontrada'],404);
        $data = $request->validate([
            'id_evento'=>'sometimes|required|exists:eventos,id_evento',
            'id_usuario'=>'sometimes|required|exists:usuarios,id_usuario',
            'puntuacion'=>'nullable|integer|min:0|max:10',
            'comentario'=>'nullable|string'
        ]);
        $valoracion->update($data);
        return response()->json($valoracion,200);
    }

    public function destroy($id) {
        $valoracion = Valoracion::find($id);
        if(!$valoracion) return response()->json(['message'=>'Valoración eliminada'],404);
        $valoracion->delete();
        return response()->json(['message'=>'Valoración eliminada'],200);
    }
}
