<?php

namespace Database\Seeders;

use App\Models\Comentario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComentariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Comentario::create([
            'evento_id' => 1,
            'user_id' => 1,
            'contenido' => '¡Muy emocionado por este torneo!',
            'puntuacion' => 5,
            'editado' => false,
        ]);
    }
}
