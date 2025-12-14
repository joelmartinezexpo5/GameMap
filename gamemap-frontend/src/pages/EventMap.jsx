import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { MapPin, Calendar, Users, Trophy, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { EventMapAPI } from "../services/api";

// Configuración de iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function MapaEventos() {
    const [eventos, setEventos] = useState([]);
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    //  Consumir API de eventos
    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const data = await EventMapAPI.getAll();
                setEventos(data);
            } catch (err) {
                console.error("Error cargando eventos:", err);
            }
        };
        cargarEventos();
    }, []);

    return (
        <div className="flex-grow p-4 md:p-8">
            <div className="max-w-7xl mx-auto h-full flex flex-col">
                {/* Encabezado */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 flex items-center gap-3">
                            <MapPin className="w-10 h-10 text-purple-400" />
                            Mapa de Eventos
                        </h1>
                        <p className="text-slate-400">Descubre eventos presenciales cerca de ti</p>
                    </div>
                    <Link to="/eventos">
                        <Button
                            variant="outline"
                            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Ver Lista
                        </Button>
                    </Link>
                </div>

                <div className="flex-1 grid lg:grid-cols-3 gap-6">
                    {/* Mapa */}
                    <div className="lg:col-span-2 rounded-2xl overflow-hidden border-2 border-purple-500/20 shadow-xl">
                        <MapContainer
                            center={[40.4168, -3.7038]} // Madrid
                            zoom={6}
                            style={{ height: "100%", width: "100%" }}
                            className="z-0"
                        >
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {eventos
                                .filter(e => e.latitud && e.longitud)
                                .map(evento => (
                                    <Marker
                                        key={evento.id}
                                        position={[evento.latitud, evento.longitud]}
                                        eventHandlers={{
                                            click: () => setEventoSeleccionado(evento),
                                        }}
                                    >
                                        <Popup>
                                            <div className="p-2">
                                                <h3 className="font-bold mb-1">{evento.nombre}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{evento.juego}</p>
                                                <Link to={`/eventos/${evento.id}`}>
                                                    <Button size="sm" className="w-full">
                                                        Ver Detalles
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                        </MapContainer>
                    </div>

                    {/* Barra Lateral */}
                    <div className="overflow-y-auto">
                        {eventoSeleccionado ? (
                            <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                                <CardContent className="p-6">
                                    <div className="mb-4">
                                        {eventoSeleccionado.banner_url && (
                                            <img
                                                src={eventoSeleccionado.banner_url}
                                                alt={eventoSeleccionado.nombre}
                                                className="w-full h-32 object-cover rounded-lg mb-4"
                                            />
                                        )}
                                        <h2 className="text-2xl font-black text-white mb-2">
                                            {eventoSeleccionado.nombre}
                                        </h2>
                                        <p className="text-purple-400 font-semibold mb-4">
                                            {eventoSeleccionado.juego}
                                        </p>
                                    </div>

                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Calendar className="w-4 h-4 text-purple-400" />
                                            <span className="text-sm">
                                                {eventoSeleccionado.fecha_inicio
                                                    ? format(new Date(eventoSeleccionado.fecha_inicio), "d 'de' MMMM, yyyy", { locale: es })
                                                    : "Sin fecha"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <MapPin className="w-4 h-4 text-cyan-400" />
                                            <span className="text-sm">{eventoSeleccionado.ubicacion}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-300">
                                            <Users className="w-4 h-4 text-green-400" />
                                            <span className="text-sm">
                                                {eventoSeleccionado.participantes_actuales}/{eventoSeleccionado.max_participantes}
                                            </span>
                                        </div>
                                        {eventoSeleccionado.premio && (
                                            <div className="flex items-center gap-2 text-yellow-400">
                                                <Trophy className="w-4 h-4" />
                                                <span className="text-sm font-semibold">{eventoSeleccionado.premio}</span>
                                            </div>
                                        )}
                                    </div>

                                    {eventoSeleccionado.descripcion && (
                                        <p className="text-slate-400 text-sm mb-4">
                                            {eventoSeleccionado.descripcion}
                                        </p>
                                    )}

                                    <Link to={`/eventos/${eventoSeleccionado.id}`}>
                                        <Button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600">
                                            Ver Detalles Completos
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        ) : (
                            <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                                <CardContent className="p-12 text-center">
                                    <MapPin className="w-20 h-20 text-slate-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        Selecciona un Evento
                                    </h3>
                                    <p className="text-slate-400">
                                        Haz clic en un marcador del mapa para ver detalles
                                    </p>
                                    <div className="mt-6 p-4 bg-slate-800/50 rounded-lg">
                                        <p className="text-slate-300 text-sm">
                                            📍 {eventos.length} eventos con ubicación disponibles
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Lista de eventos */}
                        <div className="mt-6 space-y-3">
                            {eventos.slice(0, 5).map(evento => (
                                <Card
                                    key={evento.id}
                                    onClick={() => setEventoSeleccionado(evento)}
                                    className={`cursor-pointer transition-all ${eventoSeleccionado?.id === evento.id
                                        ? "bg-purple-900/50 border-purple-500/60"
                                        : "bg-slate-900/30 border-purple-500/20 hover:border-purple-500/40"
                                        }`}
                                >
                                    <CardContent className="p-4">
                                        <h4 className="font-bold text-white text-sm mb-1">
                                            {evento.nombre}
                                        </h4>
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <MapPin className="w-3 h-3" />
                                            {evento.ubicacion}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MapaEventos;
