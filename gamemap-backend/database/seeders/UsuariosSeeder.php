<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Usuario::create([
            'role' => 'admin',
            'email' => 'smrjoelmartinez@gmail.com',
            'password' => Hash::make('admin'),
            'full_name' => 'Joel Martínez Expósito',
            'gamertag' => 'ElCanelita02',
            'bio' => 'Desarrollador web...',
            'avatar_url' => 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            'favorite_games' => json_encode(['League of Legends','Valorant']),
            'total_events_joined' => 2,
            'total_events_created' => 5,
            'wins' => 1,
            'preferred_platform' => 'PC',
            'country' => 'España',
            'discord_handle' => 'Joel#1234',
            'twitch_handle' => 'joel_streams',
        ]);

        Usuario::create([
            'role' => 'user',
            'email' => 'segundo@usuario.com',
            'password' => Hash::make('admin'),
            'full_name' => 'Segundo Usuario',
            'gamertag' => 'PlayerTwo',
            'bio' => 'Jugador casual.',
            'avatar_url' => 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            'favorite_games' => json_encode(['FIFA','Minecraft']),
            'total_events_joined' => 0,
            'total_events_created' => 0,
            'wins' => 0,
            'preferred_platform' => 'PlayStation',
            'country' => 'España',
            'discord_handle' => 'PlayerTwo#5678',
            'twitch_handle' => 'player_two',
        ]);

        Usuario::create([
            'role' => 'user',
            'email' => 'tercero@usuario.com',
            'password' => Hash::make('admin'),
            'full_name' => 'Tercer Usuario',
            'gamertag' => 'ValorantKing',
            'bio' => 'Jugador competitivo de Valorant.',
            'avatar_url' => 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            'favorite_games' => json_encode(['Valorant','CS:GO']),
            'total_events_joined' => 3,
            'total_events_created' => 1,
            'wins' => 2,
            'preferred_platform' => 'PC',
            'country' => 'España',
            'discord_handle' => 'ValorantKing#9999',
            'twitch_handle' => 'valorant_king',
        ]);

        Usuario::create([
            'role' => 'user',
            'email' => 'cuarto@usuario.com',
            'password' => Hash::make('admin'),
            'full_name' => 'Cuarto Usuario',
            'gamertag' => 'CSMaster',
            'bio' => 'Jugador veterano de CS:GO.',
            'avatar_url' => 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            'favorite_games' => json_encode(['CS:GO','Fortnite']),
            'total_events_joined' => 5,
            'total_events_created' => 2,
            'wins' => 3,
            'preferred_platform' => 'PC',
            'country' => 'España',
            'discord_handle' => 'CSMaster#2222',
            'twitch_handle' => 'cs_master',
        ]);

        Usuario::create([
            'role' => 'user',
            'email' => 'quinto@usuario.com',
            'password' => Hash::make('admin'),
            'full_name' => 'Quinto Usuario',
            'gamertag' => 'FortnitePro',
            'bio' => 'Streamer de Fortnite.',
            'avatar_url' => 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
            'favorite_games' => json_encode(['Fortnite']),
            'total_events_joined' => 10,
            'total_events_created' => 4,
            'wins' => 6,
            'preferred_platform' => 'PlayStation',
            'country' => 'España',
            'discord_handle' => 'FortnitePro#3333',
            'twitch_handle' => 'fortnite_pro',
        ]);
    }
}
