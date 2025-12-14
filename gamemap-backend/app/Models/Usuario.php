<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'usuarios';
    protected $primaryKey = 'id';
    public $timestamps = true;

    // ⚠️ Usa "password" en lugar de "contraseña"
    protected $hidden = [
        'password',
    ];

    protected $fillable = [
        'role',
        'email',
        'password',
        'full_name',
        'gamertag',
        'bio',
        'avatar_url',
        'favorite_games',
        'total_events_joined',
        'total_events_created',
        'wins',
        'preferred_platform',
        'country',
        'discord_handle',
        'twitch_handle',
        'activo'
    ];

    // Relaciones
    public function eventosCreados()
    {
        return $this->hasMany(Evento::class, 'id_creador');
    }

    public function participaciones()
    {
        return $this->hasMany(Participacion::class, 'id_usuario');
    }

    public function valoraciones()
    {
        return $this->hasMany(Valoracion::class, 'id_usuario');
    }

    public function amistadesEnviadas()
    {
        return $this->hasMany(Amistad::class, 'id_usuario1');
    }

    public function amistadesRecibidas()
    {
        return $this->hasMany(Amistad::class, 'id_usuario2');
    }

    public function mensajesEnviados()
    {
        return $this->hasMany(Mensaje::class, 'id_emisor');
    }

    public function mensajesRecibidos()
    {
        return $this->hasMany(Mensaje::class, 'id_receptor');
    }

    public function suscripcion()
    {
        return $this->hasOne(Suscripcion::class, 'id_usuario');
    }

    public function resultados()
    {
        return $this->hasMany(Resultado::class, 'id_usuario');
    }
}
