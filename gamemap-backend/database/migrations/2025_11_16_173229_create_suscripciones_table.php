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
        Schema::create('suscripciones', function (Blueprint $table) {
            $table->increments('id_suscripcion');
            $table->unsignedInteger('id_usuario');
            $table->enum('tipo', ['premium', 'basico'])->default('basico');
            $table->timestamp('fecha_inicio')->useCurrent();
            $table->dateTime('fecha_fin')->nullable();
            $table->boolean('activo')->default(true);

            $table->foreign('id_usuario')->references('id_usuario')->on('usuarios')->onDelete('cascade');
        });
        */

        
        Schema::create('suscripciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('usuarios')->onDelete('cascade');
            $table->string('tipo_plan');
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin');
            $table->string('estado');
            $table->string('metodo_pago')->nullable();
            $table->boolean('auto_renovacion')->default(false);
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('suscripciones');
    }
};
