<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Mensaje;

class MensajesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Mensaje::create([
            'conversation_id' => 'conv_1_2',
            'emisor_id' => 1,
            'receptor_id' => 2,
            'contenido' => 'Hey! ¿Listo para el torneo de Valorant?',
            'leido' => true,
        ]);

        Mensaje::create([
            'conversation_id' => 'conv_1_2',
            'emisor_id' => 2,
            'receptor_id' => 1,
            'contenido' => '¡Claro! He estado practicando mucho últimamente.',
            'leido' => true,
        ]);
    }
}
