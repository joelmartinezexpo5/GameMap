<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call([
            UsuariosSeeder::class,
        JuegosSeeder::class,
        PlataformasSeeder::class,
        EventosSeeder::class,
        SuscripcionesSeeder::class,
        TorneosSeeder::class,
        ParticipacionesSeeder::class,
        ComentariosSeeder::class,
        AmistadesSeeder::class,
        MensajesSeeder::class,
        ]);
    }
}
