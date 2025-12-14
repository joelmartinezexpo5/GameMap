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
        Schema::create('mensajes', function (Blueprint $table) {
            $table->increments('id_mensaje');
            $table->unsignedInteger('id_emisor');
            $table->unsignedInteger('id_receptor');
            $table->text('contenido');
            $table->timestamp('fecha_envio')->useCurrent();
            $table->boolean('leido')->default(false);

            $table->foreign('id_emisor')->references('id_usuario')->on('usuarios')->onDelete('cascade');
            $table->foreign('id_receptor')->references('id_usuario')->on('usuarios')->onDelete('cascade');
        });
        */

        
        Schema::create('mensajes', function (Blueprint $table) {
            $table->id();
            $table->string('conversation_id')->nullable();
            $table->foreignId('emisor_id')->constrained('usuarios')->onDelete('cascade');
            $table->foreignId('receptor_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('contenido');
            $table->boolean('leido')->default(false);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes');
    }
};
