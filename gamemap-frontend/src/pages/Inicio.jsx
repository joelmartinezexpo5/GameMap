import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
    ChevronRight,
    Calendar,
    MapPin,
    Users,
    Trophy,
    Gamepad2,
    Zap
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { InicioAPI } from "../services/api";

export default function Inicio() {
    const navigate = useNavigate();

    //  Estados para datos de la API
    const [events, setEvents] = useState([]);
    const [games, setGames] = useState([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const eventosData = await InicioAPI.getEventos();
                const juegosData = await InicioAPI.getJuegos();
                setEvents(eventosData);
                setGames(juegosData);
            } catch (err) {
                console.error("Error cargando datos de inicio:", err);
            }
        };
        cargarDatos();
    }, []);

    const handleLogin = () => {
        navigate("/login");
    };

    const STATIC_STATS = {
        totalUsers: "1,200+",
        totalEvents: "45+",
        completedTournaments: "30",
        totalPrizePool: "$10,000"
    };

    //  Features para la sección de Inicio
    const features = [
        {
            icon: Trophy,
            title: "Compite",
            description: "Participa en torneos épicos y demuestra tus habilidades contra jugadores de todo el mundo."
        },
        {
            icon: MapPin,
            title: "Descubre",
            description: "Encuentra eventos y torneos cerca de ti o explora competiciones internacionales."
        },
        {
            icon: Users,
            title: "Conecta",
            description: "Haz equipo con otros jugadores, crea comunidades y comparte tu pasión por los videojuegos."
        },
        {
            icon: Zap,
            title: "Progreso Rápido",
            description: "Accede a estadísticas, logros y recompensas que impulsan tu camino como gamer."
        }
    ];


    return (
        <div className="min-h-screen relative overflow-hidden flex flex-col">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                <div className="absolute w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse delay-1000"></div>
            </div>



            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="flex justify-center mb-8">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                            <div >
                                <img
                                    src="/logo_pequeño.png"
                                    alt="Mi Logo"
                                    className="w-22 h-24 object-contain"
                                />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-black mb-6">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                            GameMap
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        La plataforma definitiva para descubrir, crear y dominar torneos de videojuegos
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            onClick={handleLogin}
                            size="lg"
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 transition-all"
                        >
                            <Zap className="w-5 h-5 mr-2" />
                            Comenzar Ahora
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={handleLogin}
                            className="border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 px-8 py-6 text-lg rounded-xl"
                        >
                            Iniciar Sesión
                        </Button>
                    </div>
                </motion.div>

                {/* Features Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                            className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all hover:transform hover:scale-105"
                        >
                            <div className="bg-gradient-to-br from-purple-600/20 to-cyan-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                                <feature.icon className="w-7 h-7 text-purple-400" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                            <p className="text-slate-400">{feature.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Featured Events Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mb-20"
                >
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-white">Eventos Destacados</h2>
                        <Link to="/eventos">
                            <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
                                Ver todos <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {events.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                            >
                                <Card className="bg-slate-900/50 border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all hover:transform hover:scale-105 cursor-pointer"
                                    onClick={() => navigate(`/eventos?id=${event.id}`)}>
                                    <div className="relative h-40">
                                        <img
                                            src={`http://localhost:8000/storage/${event.banner_url}`}
                                            alt={event.nombre}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <Badge variant={event.estado === 'ongoing' ? 'success' : 'default'}>
                                                {event.estado === 'ongoing' ? 'En curso' : 'Próximamente'}
                                            </Badge>
                                        </div>
                                        {event.premio && (
                                            <div className="absolute top-3 right-3">
                                                <Badge variant="warning" className="flex items-center gap-1">
                                                    <Trophy className="w-3 h-3" />
                                                    {event.premio}
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-bold text-white text-lg mb-1 truncate">{event.nombre}</h3>
                                        <p className="text-purple-400 text-sm mb-3">{event.juego}</p>
                                        <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {event.fecha_inicio
                                                    ? format(new Date(event.fecha_inicio), "d MMM", { locale: es })
                                                    : "Sin fecha"}
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {event.ubicacion}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Users className="w-3 h-3" />
                                                {event.participantes_actuales}/{event.max_participantes}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Popular Games Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="mb-20"
                >
                    <h2 className="text-3xl font-bold text-white mb-8 text-center">Juegos Populares</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {games.map((game, index) => (
                            <motion.div
                                key={game.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                                className="group cursor-pointer"
                                onClick={() => navigate(`/BrowseEvents?game=${game.name}`)}
                            >
                                <div className="relative rounded-xl overflow-hidden aspect-square">
                                    <img
                                        src={`http://localhost:8000/storage/${game.imagen_url}`}
                                        alt={game.nombre}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-3">
                                        <p className="text-white font-bold text-sm text-center truncate">{game.nombre}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 backdrop-blur-sm border border-purple-500/20 rounded-3xl p-8 md:p-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                                {STATIC_STATS.totalUsers}
                            </div>
                            <div className="text-slate-400 text-sm md:text-lg">Jugadores</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                {STATIC_STATS.totalEvents}
                            </div>
                            <div className="text-slate-400 text-sm md:text-lg">Eventos</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                {STATIC_STATS.completedTournaments}
                            </div>
                            <div className="text-slate-400 text-sm md:text-lg">Torneos</div>
                        </div>
                        <div>
                            <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                {STATIC_STATS.totalPrizePool}
                            </div>
                            <div className="text-slate-400 text-sm md:text-lg">En Premios</div>
                        </div>
                    </div>
                </motion.div>


                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <h2 className="text-4xl font-bold text-white mb-4">
                        ¿Listo para la acción?
                    </h2>
                    <p className="text-xl text-slate-400 mb-8">
                        Únete a miles de jugadores y demuestra tus habilidades
                    </p>
                    <Button
                        onClick={handleLogin}
                        size="lg"
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-lg rounded-xl shadow-lg shadow-purple-500/50"
                    >
                        <Trophy className="w-5 h-5 mr-2" />
                        Unirse Gratis
                    </Button>
                </motion.div>
            </div>

        </div>
    );
}