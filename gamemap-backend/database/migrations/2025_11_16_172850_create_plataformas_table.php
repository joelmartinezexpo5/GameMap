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
        Schema::create('plataformas', function (Blueprint $table) {
            $table->increments('id_plataforma');
            $table->string('nombre', 50);
            $table->string('fabricante', 100)->nullable();
        });
        */

        
        Schema::create('plataformas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('icon_url')->nullable();
            $table->timestamps();
        });

        Schema::create('juego_plataforma', function (Blueprint $table) {
            $table->id();
            $table->foreignId('juego_id')->constrained('juegos')->onDelete('cascade');
            $table->foreignId('pltaforma_id')->constrained('plataformas')->onDelete('cascade');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('plataformas');
    }
};
