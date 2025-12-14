import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/Select";
import { MapPin, Search, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import { EventosAPI } from "../services/api";

function ExplorarEventos() {
    const [eventos, setEventos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState("");
    const [filtroTipo, setFiltroTipo] = useState("all");
    const [filtroEstado, setFiltroEstado] = useState("all");
    const [filtroPlataforma, setFiltroPlataforma] = useState("all");

    useEffect(() => {
        const cargarEventos = async () => {
            try {
                const data = await EventosAPI.getAll();
                setEventos(data);
            } catch (err) {
                console.error("Error cargando eventos:", err);
            } finally {
                setCargando(false);
            }
        };
        cargarEventos();
    }, []);

    //  Aplicar filtros
    const eventosFiltrados = eventos.filter((evento) => {
        const coincideBusqueda = evento.nombre?.toLowerCase().includes(busqueda.toLowerCase());
        const coincideTipo = filtroTipo === "all" || evento.tipo_evento === filtroTipo;
        const coincideEstado = filtroEstado === "all" || evento.estado === filtroEstado;
        const coincidePlataforma =
            filtroPlataforma === "all" || (evento.plataforma?.nombre || "").includes(filtroPlataforma);

        return coincideBusqueda && coincideTipo && coincideEstado && coincidePlataforma;
    });

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-black text-white mb-2">
                                Explorar Eventos
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Descubre torneos y eventos de videojuegos
                            </p>
                        </div>
                        <Link to="/mapa">
                            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                                <MapPin className="w-4 h-4 mr-2" />
                                Ver Mapa
                            </Button>
                        </Link>
                    </div>
                </motion.div>

                {/* Busqueda y filtros */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6 mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Búsqueda */}
                        <div className="lg:col-span-2 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <Input
                                placeholder="Buscar eventos o juegos..."
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                                className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
                            />
                        </div>

                        {/* Filtro tipo */}
                        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                <SelectValue placeholder="Tipo" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="all">Todos los tipos</SelectItem>
                                <SelectItem value="tournament">Torneo</SelectItem>
                                <SelectItem value="casual">Casual</SelectItem>
                                <SelectItem value="ranked">Competitivo</SelectItem>
                                <SelectItem value="championship">Campeonato</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Filtro estado */}
                        <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                <SelectValue placeholder="Estado" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="all">Todos los estados</SelectItem>
                                <SelectItem value="upcoming">Próximos</SelectItem>
                                <SelectItem value="ongoing">En curso</SelectItem>
                                <SelectItem value="completed">Completados</SelectItem>
                            </SelectContent>
                        </Select>

                        {/* Filtro plataforma */}
                        <Select value={filtroPlataforma} onValueChange={setFiltroPlataforma}>
                            <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                                <SelectValue placeholder="Plataforma" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="PC">PC</SelectItem>
                                <SelectItem value="PlayStation">PlayStation</SelectItem>
                                <SelectItem value="Xbox">Xbox</SelectItem>
                                <SelectItem value="Nintendo Switch">Nintendo Switch</SelectItem>
                                <SelectItem value="Mobile">Mobile</SelectItem>
                                <SelectItem value="Cross-platform">Cross-platform</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700">
                        <p className="text-slate-400 text-sm">
                            {eventosFiltrados.length} evento
                            {eventosFiltrados.length !== 1 ? "s" : ""} encontrado
                            {eventosFiltrados.length !== 1 ? "s" : ""}
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setBusqueda("");
                                setFiltroTipo("all");
                                setFiltroEstado("all");
                                setFiltroPlataforma("all");
                            }}
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                        >
                            Limpiar filtros
                        </Button>
                    </div>
                </motion.div>

                {/* Grid de eventos */}
                {cargando ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                    </div>
                ) : eventosFiltrados.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12 max-w-md mx-auto">
                            <Filter className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">
                                No se encontraron eventos
                            </h3>
                            <p className="text-slate-400 mb-4">
                                Intenta ajustar los filtros de búsqueda
                            </p>
                            <Button
                                onClick={() => {
                                    setBusqueda("");
                                    setFiltroTipo("all");
                                    setFiltroEstado("all");
                                    setFiltroPlataforma("all");
                                }}
                                className="bg-gradient-to-r from-purple-600 to-cyan-600"
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {eventosFiltrados.map((evento, index) => (
                            <motion.div
                                key={evento.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <EventCard event={evento} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ExplorarEventos;
