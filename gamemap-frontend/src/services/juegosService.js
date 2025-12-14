import { fetchGet, fetchPost, fetchPut, fetchDelete } from './api';

export function getJuegos() {
    return fetchGet("juegos");
}

export function getJuego(id) {
    return fetchGet(`juegos/${id}`);
}

export function crearJuego(data) {
    return fetchPost("juegos", data);
}

export function actualizarJuego(id, data) {
    return fetchPut(`juegos/${id}`, data);
}

export function eliminarJuego(id) {
    return fetchDelete(`juegos/${id}`);
}
