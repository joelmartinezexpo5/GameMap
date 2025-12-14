<?php

namespace App\Http\Controllers;

use App\Models\Suscripcion;
use Illuminate\Http\Request;

class SuscripcionController extends Controller
{
    public function index() {
        return response()->json(Suscripcion::all(),200);
    }

    public function store(Request $request) {
        $data = $request->validate([
            'id_usuario'=>'required|exists:usuarios,id_usuario',
            'tipo'=>'required|in:premium,basico',
            'fecha_inicio'=>'nullable|date',
            'fecha_fin'=>'nullable|date|after_or_equal:fecha_inicio',
            'activo'=>'nullable|boolean'
        ]);
        $suscripcion = Suscripcion::create($data);
        return response()->json($suscripcion,201);
    }

    public function show($id) {
        $suscripcion = Suscripcion::find($id);
        if(!$suscripcion) return response()->json(['message'=>'Suscripción no encontrada'],404);
        return response()->json($suscripcion,200);
    }

    public function update(Request $request,$id) {
        $suscripcion = Suscripcion::find($id);
        if(!$suscripcion) return response()->json(['message'=>'Suscripción no encontrada'],404);
        $data = $request->validate([
            'tipo'=>'nullable|in:premium,basico',
            'fecha_inicio'=>'nullable|date',
            'fecha_fin'=>'nullable|date|after_or_equal:fecha_inicio',
            'activo'=>'nullable|boolean'
        ]);
        $suscripcion->update($data);
        return response()->json($suscripcion,200);
    }

    public function destroy($id) {
        $suscripcion = Suscripcion::find($id);
        if(!$suscripcion) return response()->json(['message'=>'Suscripción eliminada'],404);
        $suscripcion->delete();
        return response()->json(['message'=>'Suscripción eliminada'],200);
    }
}
