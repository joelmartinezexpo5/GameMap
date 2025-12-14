import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/registro">Registro</Link></li>
                <li><Link to="/panel-usuario">Panel Usuario</Link></li>
                <li><Link to="/explorador-eventos">Explorador Eventos</Link></li>
                <li><Link to="/crear-evento">Crear Evento</Link></li>
                <li><Link to="/perfil-usuario">Perfil Usuario</Link></li>
                <li><Link to="/mensajes-amigos">Mensajes y Amigos</Link></li>
                <li><Link to="/panel-admin">Panel Admin</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
