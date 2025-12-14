<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Hash;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index()
    {
        return response()->json(Usuario::all(), 200);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'full_name' => 'required|string|max:255',
            'gamertag' => 'required|string|max:255|unique:usuarios,gamertag',
            'email' => 'required|email|unique:usuarios,email',
            'password' => 'required|string|min:8',
            'role' => 'nullable|string|in:admin,moderador,user',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar_url'] = $path;
        }

        $data['password'] = Hash::make($data['password']);
        $data['activo'] = true;

        $usuario = Usuario::create($data);

        return response()->json($usuario, 201);
    }

    public function show($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario)
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        return response()->json($usuario, 200);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $data = $request->validate([
            'full_name' => 'sometimes|required|string|max:255',
            'gamertag' => 'sometimes|required|string|max:255|unique:usuarios,gamertag,' . $id,
            'email' => 'sometimes|required|email|unique:usuarios,email,' . $id,
            'password' => 'sometimes|required|string|min:8',
            'role' => 'nullable|string|in:admin,moderador,user',
            'bio' => 'nullable|string|max:1000',
            'country' => 'nullable|string|max:255',
            'favorite_games' => 'nullable|string|max:255',
            'discord_handle' => 'nullable|string|max:255',
            'twitch_handle' => 'nullable|string|max:255',
            'preferred_platform' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|max:2048',
        ]);

        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $data['avatar_url'] = $path;
        }

        // 👇 Forzar asignación de role si viene en la request
        if ($request->has('role')) {
            $usuario->role = $request->role;
        }

        $usuario->update($data);

        return response()->json($usuario, 200);
    }

    public function destroy($id)
    {
        $usuario = Usuario::find($id);
        if (!$usuario)
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado'], 200);
    }

    public function profile(Request $request)
    {
        $usuario = $request->user();

        if (!$usuario) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        return response()->json($usuario, 200);
    }

    public function login(Request $request)
    {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $usuario = Usuario::where('email', $data['email'])->first();

        if (!$usuario || !Hash::check($data['password'], $usuario->password)) {
            return response()->json(['message' => 'Credenciales inválidas'], 401);
        }

        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'usuario' => $usuario
        ], 200);
    }

    public function register(Request $request)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'gamertag' => 'required|string|max:255|unique:usuarios,gamertag',
            'email' => 'required|string|email|max:255|unique:usuarios,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = Usuario::create([
            'full_name' => $request->full_name,
            'gamertag' => $request->gamertag,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Si usas Sanctum o JWT, genera el token
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $usuario = $request->user(); // el usuario autenticado con Sanctum

        if (!$usuario) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        // Guardar imagen en storage/app/public/avatars
        $path = $request->file('avatar')->store('avatars', 'public');

        // Actualizar campo avatar_url en la BD
        $usuario->avatar_url = asset('storage/' . $path);
        $usuario->save();

        return response()->json([
            'message' => 'Avatar actualizado correctamente',
            'avatar_url' => $usuario->avatar_url,
        ], 200);
    }

    public function toggleActive($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->activo = !$usuario->activo;
        $usuario->save();

        return response()->json([
            'message' => 'Estado actualizado',
            'activo' => $usuario->activo
        ], 200);
    }

    public function updateRole(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $data = $request->validate([
            'role' => 'required|string|in:admin,moderador,user'
        ]);

        $usuario->role = $data['role'];
        $usuario->save();

        return response()->json([
            'message' => 'Rol actualizado',
            'role' => $usuario->role
        ], 200);
    }
}
