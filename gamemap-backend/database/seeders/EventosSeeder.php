<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Evento;

class EventosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Evento::create([
            'organizador_id' => 1,
            'nombre' => 'Torneo League of Legends - Madrid Finals',
            'descripcion' => 'Gran final del campeonato regional de League of Legends.',
            'juego_id' => 2, // FK a LoL
            'tipo_evento' => 'championship',
            'estado' => 'upcoming',
            'visibilidad' => 'público',
            'fecha_inicio' => '2025-02-15 18:00:00',
            'fecha_fin' => '2025-02-15 23:00:00',
            'ubicacion' => 'Madrid Gaming Arena, Madrid',
            'max_participantes' => 10,
            'participantes_actuales' => 7,
            'premio' => '5.000€',
            'reglas' => 'Formato 5v5, mejor de 3 partidas.',
            'plataforma_id' => 1, // PC
            'banner_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
            'latitud' => 40.4168,
            'longitud' => -3.7038,
        ]);

        Evento::create([
            'organizador_id' => 2,
            'nombre' => 'Casual FIFA Night - Barcelona',
            'descripcion' => 'Partidas amistosas de FIFA entre amigos.',
            'juego_id' => 3, // FK a FIFA
            'tipo_evento' => 'casual',
            'estado' => 'ongoing',
            'visibilidad' => 'público',
            'fecha_inicio' => '2025-01-10 20:00:00',
            'fecha_fin' => '2025-01-10 23:00:00',
            'ubicacion' => 'Gaming Café Barcelona',
            'max_participantes' => 16,
            'participantes_actuales' => 12,
            'premio' => null,
            'reglas' => 'Partidas rápidas 1v1.',
            'plataforma_id' => 2, // Consola
            'banner_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
            'latitud' => 41.3874,
            'longitud' => 2.1686,
        ]);

        Evento::create([
            'organizador_id' => 3,
            'nombre' => 'Campeonato Valorant - Bilbao',
            'descripcion' => 'Competición de Valorant con equipos locales.',
            'juego_id' => 4, // FK a Valorant
            'tipo_evento' => 'ranked',
            'estado' => 'upcoming',
            'visibilidad' => 'privado',
            'fecha_inicio' => '2025-03-05 17:00:00',
            'fecha_fin' => '2025-03-05 22:00:00',
            'ubicacion' => 'Bilbao Esports Center',
            'max_participantes' => 20,
            'participantes_actuales' => 5,
            'premio' => '2.000€',
            'reglas' => 'Formato competitivo 5v5.',
            'plataforma_id' => 1, // PC
            'banner_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
            'latitud' => 43.2630,
            'longitud' => -2.9349,
        ]);

        Evento::create([
            'organizador_id' => 4,
            'nombre' => 'Práctica CS:GO - Sevilla',
            'descripcion' => 'Sesión de entrenamiento para equipos de CS:GO.',
            'juego_id' => 5, // FK a CS:GO
            'tipo_evento' => 'practice',
            'estado' => 'completed',
            'visibilidad' => 'público',
            'fecha_inicio' => '2024-12-01 19:00:00',
            'fecha_fin' => '2024-12-01 21:00:00',
            'ubicacion' => 'Sevilla Gaming Hub',
            'max_participantes' => 12,
            'participantes_actuales' => 12,
            'premio' => null,
            'reglas' => 'Entrenamiento libre.',
            'plataforma_id' => 1, // PC
            'banner_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
            'latitud' => 37.3891,
            'longitud' => -5.9845,
        ]);

        Evento::create([
            'organizador_id' => 5,
            'nombre' => 'Campeonato Fortnite - Valencia',
            'descripcion' => 'Gran torneo de Fortnite con premios en metálico.',
            'juego_id' => 5, // FK a Fortnite
            'tipo_evento' => 'championship',
            'estado' => 'upcoming',
            'visibilidad' => 'público',
            'fecha_inicio' => '2025-04-20 16:00:00',
            'fecha_fin' => '2025-04-20 22:00:00',
            'ubicacion' => 'Valencia Arena',
            'max_participantes' => 100,
            'participantes_actuales' => 45,
            'premio' => '10.000€',
            'reglas' => 'Battle Royale, eliminación directa.',
            'plataforma_id' => 3, // Multiplataforma
            'banner_url' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800',
            'latitud' => 39.4699,
            'longitud' => -0.3763,
        ]);
    }
}
