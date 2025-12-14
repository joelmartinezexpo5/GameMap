<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Juego extends Model
{
    protected $table = 'juegos';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'genero',
        'desarrollador',
        'anio_lanzamiento',
        'imagen_url',
    ];

    public function plataformas()
    {
        return $this->belongsToMany(Plataforma::class, 'juegos_plataformas', 'id_juego', 'id_plataforma');
    }

    public function torneos()
    {
        return $this->hasMany(Torneo::class, 'id_juego');
    }

    public function eventos()
    {
        return $this->hasMany(Evento::class, 'juego_id');
    }

}
