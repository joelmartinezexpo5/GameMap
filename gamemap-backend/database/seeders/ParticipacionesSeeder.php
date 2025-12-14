<?php

namespace Database\Seeders;

use App\Models\ParticipanteEvento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ParticipacionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ParticipanteEvento::create([
            'evento_id' => 1,
            'user_id' => 1,
            'estado' => 'confirmed',
            'fecha_union' => '2025-01-05 10:00:00',
            'equipo' => 'Team Phantom',
            'posicion' => 1,
            'puntos' => 100,
        ]);
    }
}
