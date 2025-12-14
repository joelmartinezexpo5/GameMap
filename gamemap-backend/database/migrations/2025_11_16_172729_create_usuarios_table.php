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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->increments('id_usuario');
            $table->string('nombre_usuario', 50);
            $table->string('email', 100)->unique();
            $table->string('contraseña', 255);
            $table->string('avatar', 255)->nullable();
            $table->timestamp('fecha_registro')->useCurrent();
            $table->enum('rol', ['admin', 'creador', 'cliente'])->default('cliente');
        });
        */

        
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->enum('role', ['admin','moderador','user'])->default('user');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('full_name');
            $table->string('gamertag');
            $table->text('bio')->nullable();
            $table->string('avatar_url')->nullable();
            $table->json('favorite_games')->nullable();
            $table->unsignedInteger('total_events_joined')->default(0);
            $table->unsignedInteger('total_events_created')->default(0);
            $table->unsignedInteger('wins')->default(0);
            $table->enum('preferred_platform', ['PC','PlayStation','Xbox','Nintendo Switch','Mobile','All'])->default('All');
            $table->string('country')->nullable();
            $table->string('discord_handle')->nullable();
            $table->string('twitch_handle')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
};
