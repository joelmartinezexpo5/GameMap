<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resultado extends Model
{
    protected $table = 'resultados';
    protected $primaryKey = 'id_resultado';
    public $timestamps = false;

    protected $fillable = [
        'id_torneo',
        'id_usuario',
        'posicion',
        'puntuacion',
        'fecha'
    ];

    public function torneo()
    {
        return $this->belongsTo(Torneo::class, 'id_torneo');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'id_usuario');
    }
}
