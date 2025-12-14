<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Suscripcion;

class SuscripcionesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Suscripcion::create([
            'user_id' => 1,
            'tipo_plan' => 'pro',
            'fecha_inicio' => '2025-01-01 00:00:00',
            'fecha_fin' => '2026-01-01 00:00:00',
            'estado' => 'active',
            'metodo_pago' => 'credit_card',
            'auto_renovacion' => true,
        ]);
    }
}
