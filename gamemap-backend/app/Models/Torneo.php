<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Torneo extends Model
{
    protected $table = 'torneos';
    protected $primaryKey = 'id_torneo';
    public $timestamps = false;

    protected $fillable = [
        'id_evento',
        'id_juego',
        'nombre_torneo',
        'tipo_torneo',
        'rondas',
        'premio',
        'reglas',
        'precio_inscripcion',
        'comision_platform',
        'patrocinado',
        'nombre_patrocinador'
    ];

    public function evento()
    {
        return $this->belongsTo(Evento::class, 'id_evento');
    }

    public function juego()
    {
        return $this->belongsTo(Juego::class, 'id_juego');
    }

    public function resultados()
    {
        return $this->hasMany(Resultado::class, 'id_torneo');
    }
}
