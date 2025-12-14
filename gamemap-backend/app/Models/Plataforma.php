<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plataforma extends Model
{
    protected $table = 'plataformas';
    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'icon_url',
    ];

    public function juegos()
    {
        return $this->belongsToMany(Juego::class, 'juegos_plataformas', 'id_plataforma', 'id_juego');
    }
}

