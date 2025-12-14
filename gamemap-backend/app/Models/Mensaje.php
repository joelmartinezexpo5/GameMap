<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    protected $table = 'mensajes';
    protected $fillable = ['conversation_id', 'emisor_id', 'receptor_id', 'contenido', 'leido'];

    public function emisor()
    {
        return $this->belongsTo(Usuario::class, 'emisor_id', 'id');
    }

    public function receptor()
    {
        return $this->belongsTo(Usuario::class, 'receptor_id', 'id');
    }
}
