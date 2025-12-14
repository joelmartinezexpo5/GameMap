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
        Schema::create('valoraciones', function (Blueprint $table) {
            $table->increments('id_valoracion');
            $table->unsignedInteger('id_evento');
            $table->unsignedInteger('id_usuario');
            $table->integer('puntuacion')->nullable();
            $table->text('comentario')->nullable();
            $table->timestamp('fecha')->useCurrent();

            $table->foreign('id_evento')->references('id_evento')->on('eventos')->onDelete('cascade');
            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
        });
        */

        
        Schema::create('comentarios', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evento_id')->constrained('eventos')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->text('contenido');
            $table->tinyInteger('puntuacion')->nullable(); // fusiona ratings
            $table->boolean('editado')->default(false);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('valoraciones');
    }
};
