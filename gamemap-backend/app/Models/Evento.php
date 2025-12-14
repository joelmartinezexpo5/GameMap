<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $casts = [
        'fecha_inicio' => 'datetime:Y-m-d\TH:i:s',
        'fecha_fin' => 'datetime:Y-m-d\TH:i:s',
    ];
    protected $table = 'eventos';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'descripcion',
        'juego_id',
        'plataforma_id',
        'tipo_evento',
        'visibilidad',
        'fecha_inicio',
        'fecha_fin',
        'ubicacion',
        'max_participantes',
        'premio',
        'banner_url',
        'latitud',
        'longitud',
        'codigo_acceso',
        'reglas',
        'organizador_id',
        'estado'
    ];


    public function juego()
    {
        return $this->belongsTo(Juego::class, 'juego_id', 'id');
    }


    public function creador()
    {
        return $this->belongsTo(Usuario::class, 'organizador_id', 'id');
    }

    public function participaciones()
    {
        return $this->hasMany(Participacion::class, 'evento_id');
    }

    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class, 'id_evento');
    }

    public function mapa()
    {
        return $this->hasOne(Mapa::class, 'id_evento');
    }

    public function torneos()
    {
        return $this->hasMany(Torneo::class, 'id_evento');
    }

    public function plataforma()
    {
        return $this->belongsTo(Plataforma::class, 'plataforma_id', 'id');
    }
}
