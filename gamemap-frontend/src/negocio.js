export function calcularPrecioFinal(precio, comision) {
    return precio + (precio * comision) / 100;
}

export function esMayorDeEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    return edad >= 18;
}
