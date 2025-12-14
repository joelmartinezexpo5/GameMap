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
        Schema::create('amistades', function (Blueprint $table) {
            $table->increments('id_amistad');
            $table->unsignedInteger('id_usuario1');
            $table->unsignedInteger('id_usuario2');
            $table->enum('estado', ['pendiente', 'aceptada', 'bloqueada'])->default('pendiente');
            $table->timestamp('fecha_solicitud')->useCurrent();

            $table->foreign('id_usuario1')->references('id_usuario')->on('usuarios')->onDelete('cascade');
            $table->foreign('id_usuario2')->references('id_usuario')->on('usuarios')->onDelete('cascade');

            $table->unique(['id_usuario1', 'id_usuario2']);
        });
        */

        
        Schema::create('amistades', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('friend_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('estado')->default('pending');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('amistades');
    }
};
