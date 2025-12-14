<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /*
        Schema::create('eventos', function (Blueprint $table) {
            $table->increments('id_evento');
            $table->unsignedInteger('id_creador');
            $table->string('nombre', 100);
            $table->text('descripcion')->nullable();
            $table->enum('tipo', ['público', 'privado'])->default('público');
            $table->string('ubicacion', 150)->nullable();
            $table->dateTime('fecha_inicio')->nullable();
            $table->dateTime('fecha_fin')->nullable();
            $table->integer('max_participantes')->nullable();
            $table->foreign('id_creador')->references('id_usuario')->on('usuarios')->onDelete('cascade');
        });
        */


        
        Schema::create('eventos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->text('descripcion')->nullable();
            $table->foreignId('juego_id')->nullable()->constrained('juegos')->onDelete('set null');
            $table->string('tipo_evento')->nullable();
            $table->string('estado')->nullable();
            $table->string('visibilidad')->nullable();
            $table->dateTime('fecha_inicio')->nullable();
            $table->dateTime('fecha_fin')->nullable();
            $table->string('ubicacion')->nullable(); // sin tabla mapas
            $table->integer('max_participantes')->nullable();
            $table->integer('participantes_actuales')->nullable();
            $table->string('premio')->nullable();
            $table->text('reglas')->nullable();
            $table->string('banner_url')->nullable();
            $table->foreignId('organizador_id')->nullable()->constrained('usuarios')->onDelete('set null');
            $table->foreignId('plataforma_id')->nullable()->constrained('plataformas')->onDelete('set null');
            $table->decimal('latitud', 10, 7)->nullable();
            $table->decimal('longitud', 10, 7)->nullable();
            $table->string('codigo_acceso')->nullable();
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos');
    }
};
