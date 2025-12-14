<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Plataforma;

class PlataformasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Plataforma::create([
            'nombre' => 'PC',
            'icon_url' => 'https://cdn-icons-png.flaticon.com/512/906/906324.png',
        ]);

        Plataforma::create([
            'nombre' => 'PlayStation 5',
            'icon_url' => 'https://cdn-icons-png.flaticon.com/512/5969/5969089.png',
        ]);

        Plataforma::create([
            'nombre' => 'Xbox Series X',
            'icon_url' => 'https://cdn-icons-png.flaticon.com/512/882/882704.png',
        ]);

        Plataforma::create([
            'nombre' => 'Multiplataforma',
            'icon_url' => 'https://cdn-icons-png.flaticon.com/512/1048/1048947.png',
        ]);
    }
}
