<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mapa extends Model
{
    protected $table = 'mapas';
    protected $primaryKey = 'id_mapa';
    public $timestamps = false;

    protected $fillable = [
        'id_evento',
        'latitud',
        'longitud'
    ];

    public function evento()
    {
        return $this->belongsTo(Evento::class, 'id_evento');
    }
}
