<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Torneo;

class TorneosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Torneo::create([
            'evento_id' => 1,
            'nombre' => 'Valorant Masters - Fase Principal',
            'tipo' => 'double_elimination',
            'rondas' => 6,
            'cuota_registro' => 25,
            'comision_plataforma' => 10,
            'patrocinado' => true,
            'patrocinador' => 'Red Bull Gaming',
        ]);
    }
}
