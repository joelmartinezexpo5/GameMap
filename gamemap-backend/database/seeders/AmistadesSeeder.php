<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Amistad;

class AmistadesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Amistad::create([
            'user_id' => 1,
            'friend_id' => 2,
            'estado' => 'accepted',
        ]);
    }
}
