<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Participacion extends Model
{
    protected $table = 'participantes_evento';
    protected $primaryKey = 'id_participacion';
    public $timestamps = false;

    protected $fillable = ['evento_id', 'user_id', 'estado', 'fecha_union', 'equipo', 'posicion', 'puntos'];

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }

    public function evento()
    {
        return $this->belongsTo(Evento::class, 'id_evento');
    }
}
