<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ParticipanteEvento extends Model
{
    use HasFactory;

    protected $table = 'participantes_evento';

    protected $fillable = [
        'evento_id',
        'user_id',
        'estado',
        'fecha_union',
        'equipo',
        'posicion',
        'puntos',
    ];

    public function evento()
    {
        return $this->belongsTo(Evento::class, 'evento_id', 'id');
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'user_id');
    }
}
