<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Amistad extends Model
{
    protected $table = 'amistades';
    protected $primaryKey = 'id';
    public $timestamps = true;

    protected $fillable = [
        'user_id',
        'friend_id',
        'estado'
    ];

    public function usuario1()
    {
        return $this->belongsTo(Usuario::class, 'user_id', 'id');
    }

    public function usuario2()
    {
        return $this->belongsTo(Usuario::class, 'friend_id', 'id');
    }
}

