<?php

namespace App\Http\Controllers;

use App\Models\Mapa;
use Illuminate\Http\Request;

class MapaController extends Controller
{
    public function index() {
        return response()->json(Mapa::all(),200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'id_evento'=>'required|exists:eventos,id_evento',
            'latitud'=>'required|numeric|between:-90,90',
            'longitud'=>'required|numeric|between:-180,180'
        ]);
        $mapa = Mapa::create($data);
        return response()->json($mapa,201);
    }

    public function show($id) {
        $mapa = Mapa::find($id);
        if(!$mapa) return response()->json(['message'=>'Mapa no encontrado'],404);
        return response()->json($mapa,200);
    }

    public function update(Request $request,$id) {
        $mapa = Mapa::find($id);
        if(!$mapa) return response()->json(['message'=>'Mapa no encontrado'],404);
        $data = $request->validate([
            'latitud'=>'nullable|numeric|between:-90,90',
            'longitud'=>'nullable|numeric|between:-180,180'
        ]);
        $mapa->update($data);
        return response()->json($mapa,200);
    }

    public function destroy($id) {
        $mapa = Mapa::find($id);
        if(!$mapa) return response()->json(['message'=>'Mapa eliminado'],404);
        $mapa->delete();
        return response()->json(['message'=>'Mapa eliminado'],200);
    }
}
