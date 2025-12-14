<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Juego;

class JuegosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Juego::create([
            'nombre' => 'Valorant',
            'genero' => 'FPS Táctico',
            'desarrollador' => 'Riot Games',
            'anio_lanzamiento' => 2020,
            'imagen_url' => 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
        ]);

        Juego::create([
            'nombre' => 'League of Legends',
            'genero' => 'MOBA',
            'desarrollador' => 'Riot Games',
            'anio_lanzamiento' => 2009,
            'imagen_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400',
        ]);

        Juego::create([
            'nombre' => 'FIFA',
            'genero' => 'Deportes',
            'desarrollador' => 'EA Sports',
            'anio_lanzamiento' => 1993,
            'imagen_url' => 'https://images.unsplash.com/photo-1604908177225-6f9f3f3a9f3a?w=400',
        ]);

        Juego::create([
            'nombre' => 'Counter-Strike: Global Offensive',
            'genero' => 'FPS',
            'desarrollador' => 'Valve',
            'anio_lanzamiento' => 2012,
            'imagen_url' => 'https://images.unsplash.com/photo-1526403226-eda5f9c9f9f9?w=400',
        ]);

        Juego::create([
            'nombre' => 'Fortnite',
            'genero' => 'Battle Royale',
            'desarrollador' => 'Epic Games',
            'anio_lanzamiento' => 2017,
            'imagen_url' => 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=400',
        ]);
    }
}
