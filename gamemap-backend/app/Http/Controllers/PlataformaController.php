<?php

namespace App\Http\Controllers;

use App\Models\Plataforma;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlataformaController extends Controller
{
    public function index()
    {
        return response()->json(Plataforma::all(), 200);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('plataformas', 'public');
            $validated['icon_url'] = $path;
        }

        $plataforma = Plataforma::create($validated);

        return response()->json($plataforma, 201);
    }

    public function show($id)
    {
        $plataforma = Plataforma::find($id);
        if (!$plataforma)
            return response()->json(['message' => 'Plataforma no encontrada'], 404);
        return response()->json($plataforma, 200);
    }

    public function update(Request $request, $id)
    {
        $plataforma = Plataforma::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'imagen' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('imagen')) {
            if ($plataforma->imagen_url) {
                Storage::disk('public')->delete($plataforma->imagen_url);
            }
            $path = $request->file('imagen')->store('plataformas', 'public');
            $validated['icon_url'] = $path;
        }

        $plataforma->update($validated);

        return response()->json($plataforma, 200);
    }

    public function destroy($id)
    {
        $plataforma = Plataforma::find($id);
        if (!$plataforma)
            return response()->json(['message' => 'Plataforma no encontrada'], 404);
        $plataforma->delete();
        return response()->json(['message' => 'Plataforma eliminada'], 200);
    }
}
