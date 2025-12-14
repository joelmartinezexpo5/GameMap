import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DashboardAPI } from "../services/api";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
    Trophy,
    Calendar,
    Users,
    Plus,
    TrendingUp,
    Clock,
    Zap,
    Crown,
    Target,
    MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import EventCard from "../components/EventCard";
import '../App.css';

export default function Tablero() {
    const [usuario, setUsuario] = useState(null);
    const [misEventos, setMisEventos] = useState([]);
    const [eventosProximos, setEventosProximos] = useState([]);
    const [eventosCreados, setEventosCreados] = useState([]);

    useEffect(() => {
        const obtenerDatos = async () => {
            try {
                const token = localStorage.getItem("token");

                const usuarioData = await DashboardAPI.getUser(token);
                const mis = await DashboardAPI.getMisEventos(token);
                const creados = await DashboardAPI.getEventosCreados(token);
                const proximos = await DashboardAPI.getEventosProximos(token);

                setUsuario(usuarioData);
                setMisEventos(mis);
                setEventosCreados(creados);
                setEventosProximos(proximos);
            } catch (error) {
                console.error("Error cargando datos del tablero:", error);
            }
        };
        obtenerDatos();
    }, []);

    const estadisticas = [
        {
            icono: Trophy,
            etiqueta: "Eventos Participados",
            valor: usuario?.total_events_joined || 0,
            claseColor: "yellow",
        },
        {
            icono: Calendar,
            etiqueta: "Eventos Creados",
            valor: usuario?.total_events_created || 0,
            claseColor: "purple",
        },
        {
            icono: Crown,
            etiqueta: "Victorias",
            valor: usuario?.wins || 0,
            claseColor: "cyan",
        },
        {
            icono: Target,
            etiqueta: "Próximos Eventos",
            valor: misEventos.filter(e => e.estado === 'upcoming').length,
            claseColor: "green",
        }
    ];

    const accionesRapidas = [
        {
            etiqueta: "Explorar Eventos",
            descripcion: "Encuentra nuevos torneos",
            icono: Zap,
            enlace: "/eventos",
            claseColor: "purple"
        },
        {
            etiqueta: "Crear Evento",
            descripcion: "Organiza tu torneo",
            icono: Plus,
            enlace: "/eventos/crear",
            claseColor: "cyan"
        },
        {
            etiqueta: "Mensajes",
            descripcion: "Conecta con jugadores",
            icono: Users,
            enlace: "/mensajes",
            claseColor: "green"
        },
        {
            etiqueta: "Mapa",
            descripcion: "Eventos cercanos",
            icono: MapPin,
            enlace: "/mapa",
            claseColor: "orange"
        }
    ];

    const obtenerColorIcono = (claseColor) => {
        const colores = {
            yellow: "bg-yellow-500/20 text-yellow-400",
            purple: "bg-purple-500/20 text-purple-400",
            cyan: "bg-cyan-500/20 text-cyan-400",
            green: "bg-green-500/20 text-green-400",
        };
        return colores[claseColor] || colores.purple;
    };

    const obtenerColorAccion = (claseColor) => {
        const colores = {
            purple: "from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700",
            cyan: "from-cyan-600 to-cyan-800 hover:from-cyan-500 hover:to-cyan-700",
            green: "from-green-600 to-green-800 hover:from-green-500 hover:to-green-700",
            orange: "from-orange-600 to-orange-800 hover:from-orange-500 hover:to-orange-700",
        };
        return colores[claseColor] || colores.purple;
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Sección de bienvenida */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                        Bienvenido, {usuario?.gamertag || usuario?.full_name || "Jugador"}
                    </h1>
                    <p className="text-slate-400 text-lg">
                        {format(new Date(), "EEEE, d 'de' MMMM 'de' yyyy", { locale: es })}
                    </p>
                </div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {estadisticas.map((stat, index) => (
                        <Card key={index} className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm">{stat.etiqueta}</p>
                                    <p className="text-3xl font-bold text-white">{stat.valor}</p>
                                </div>
                                <div className={`p-3 rounded-xl ${obtenerColorIcono(stat.claseColor)}`}>
                                    <stat.icono className="w-6 h-6" />
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Acciones rápidas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {accionesRapidas.map((accion, index) => (
                        <Link key={index} to={accion.enlace}>
                            <Card className={`bg-gradient-to-br ${obtenerColorAccion(accion.claseColor)} border-0 cursor-pointer transition-all hover:scale-105`}>
                                <CardContent className="p-4 flex items-center gap-3">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        <accion.icono className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{accion.etiqueta}</h3>
                                        <p className="text-white/70 text-sm">{accion.descripcion}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Mis eventos */}
                    <div className="lg:col-span-2">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Clock className="w-5 h-5 text-purple-400" />
                                    Mis Próximos Eventos
                                </CardTitle>
                                <Link to="/eventos">
                                    <Button variant="outline" size="sm" className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10">
                                        Ver Todos
                                    </Button>
                                </Link>
                            </CardHeader>
                            <CardContent>
                                {misEventos.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                        <p className="text-slate-400 mb-4">No estás registrado en ningún evento</p>
                                        <Link to="/eventos">
                                            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600">
                                                Explorar Eventos
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {misEventos.slice(0, 3).map((evento) => (
                                            <EventCard key={evento.id} event={evento} />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Barra lateral */}
                    <div className="space-y-6">
                        {/* Eventos creados */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                                    Mis Eventos Creados
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {eventosCreados.length === 0 ? (
                                    <div className="text-center py-6">
                                        <p className="text-slate-400 mb-3">No has creado eventos</p>
                                        <Link to="/eventos/crear">
                                            <Button size="sm" className="bg-gradient-to-r from-purple-600 to-cyan-600">
                                                Crear Evento
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {eventosCreados.slice(0, 3).map((evento) => (
                                            <Link key={evento.id} to={`/eventos/${evento.id}`} className="block p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                                                <p className="font-semibold text-white">{evento.nombre}</p>
                                                <p className="text-sm text-slate-400">
                                                    {evento.participantes_actuales} participantes
                                                </p>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Eventos destacados */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    Eventos Destacados
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {eventosProximos.slice(0, 3).map((evento) => (
                                        <Link key={evento.id} to={`/eventos/${evento.id}`} className="block p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                                            <p className="font-semibold text-white">{evento.nombre}</p>
                                            <div className="flex items-center gap-2 text-sm text-slate-400">
                                                <span>{evento.juego}</span>
                                                <span>•</span>
                                                <span>{evento.participantes_actuales}/{evento.max_participantes}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}