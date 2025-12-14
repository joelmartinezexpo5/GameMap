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
        Schema::create('participaciones', function (Blueprint $table) {
            $table->increments('id_participacion');
            $table->unsignedInteger('id_usuario');
            $table->unsignedInteger('id_evento');
            $table->timestamp('fecha_inscripcion')->useCurrent();
            $table->enum('estado', ['pendiente', 'aceptado', 'rechazado'])->default('pendiente');
            $table->boolean('pago_realizado')->default(false);
            $table->decimal('monto_pagado', 10, 2)->default(0.00);

            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
            $table->foreign('id_evento')->references('id_evento')->on('eventos')->onDelete('cascade');

            $table->unique(['id_usuario', 'id_evento']);
        });
        */


        Schema::create('participantes_evento', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evento_id')->constrained('eventos')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('estado')->default('registered'); // sustituye invitaciones
            $table->dateTime('fecha_union')->nullable();
            $table->string('equipo')->nullable();
            $table->integer('posicion')->nullable(); // sustituye results
            $table->integer('puntos')->nullable();   // sustituye results
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participantes_evento');
    }

};
