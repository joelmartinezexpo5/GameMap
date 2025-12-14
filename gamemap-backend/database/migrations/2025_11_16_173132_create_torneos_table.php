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
        Schema::create('torneos', function (Blueprint $table) {
            $table->increments('id_torneo');
            $table->unsignedInteger('id_evento');
            $table->unsignedInteger('id_juego')->nullable();
            $table->string('nombre_torneo', 100);
            $table->enum('tipo_torneo', ['eliminación', 'liguilla', 'mixto'])->default('eliminación');
            $table->integer('rondas')->nullable();
            $table->string('premio', 255)->nullable();
            $table->text('reglas')->nullable();
            $table->decimal('precio_inscripcion', 10, 2)->default(0.00);
            $table->decimal('comision_platform', 5, 2)->default(10.00);
            $table->boolean('patrocinado')->default(false);
            $table->string('nombre_patrocinador', 100)->nullable();

            $table->foreign('id_evento')->references('id_evento')->on('eventos')->onDelete('cascade');
            $table->foreign('id_juego')->references('id_juego')->on('juegos')->onDelete('set null');
        });
        */

        
        Schema::create('torneos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evento_id')->constrained('eventos')->onDelete('cascade');
            $table->string('nombre');
            $table->string('tipo');
            $table->integer('rondas')->nullable();
            $table->decimal('cuota_registro', 8, 2)->nullable();
            $table->decimal('comision_plataforma', 8, 2)->nullable();
            $table->boolean('patrocinado')->default(false);
            $table->string('patrocinador')->nullable();
            $table->json('bracket_data')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('torneos');
    }
};
