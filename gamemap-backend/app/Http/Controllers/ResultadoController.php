<?php

namespace App\Http\Controllers;

use App\Models\Resultado;
use Illuminate\Http\Request;

class ResultadoController extends Controller
{
    public function index() {
        return response()->json(Resultado::all(),200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'id_torneo'=>'required|exists:torneos,id_torneo',
            'id_usuario'=>'required|exists:usuarios,id_usuario',
            'posicion'=>'nullable|integer|min:1',
            'puntuacion'=>'nullable|integer|min:0'
        ]);
        $resultado = Resultado::create($data);
        return response()->json($resultado,201);
    }

    public function show($id) {
        $resultado = Resultado::find($id);
        if(!$resultado) return response()->json(['message'=>'Resultado no encontrado'],404);
        return response()->json($resultado,200);
    }

    public function update(Request $request,$id) {
        $resultado = Resultado::find($id);
        if(!$resultado) return response()->json(['message'=>'Resultado no encontrado'],404);
        $data = $request->validate([
            'posicion'=>'nullable|integer|min:1',
            'puntuacion'=>'nullable|integer|min:0'
        ]);
        $resultado->update($data);
        return response()->json($resultado,200);
    }

    public function destroy($id) {
        $resultado = Resultado::find($id);
        if(!$resultado) return response()->json(['message'=>'Resultado eliminado'],404);
        $resultado->delete();
        return response()->json(['message'=>'Resultado eliminado'],200);
    }
}
