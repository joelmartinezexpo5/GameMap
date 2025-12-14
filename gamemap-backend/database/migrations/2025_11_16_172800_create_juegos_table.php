<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
        Schema::create('juegos', function (Blueprint $table) {
            $table->increments('id_juego');
            $table->string('nombre', 100);
            $table->string('genero', 50)->nullable();
            $table->string('desarrollador', 100)->nullable();
            $table->year('anio_lanzamiento')->nullable();
        });
        */

        
        Schema::create('juegos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('genero')->nullable();
            $table->string('desarrollador')->nullable();
            $table->year('anio_lanzamiento')->nullable();
            $table->string('imagen_url')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('juegos');
    }
};
