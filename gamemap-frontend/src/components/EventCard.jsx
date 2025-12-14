import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { Calendar, MapPin, Users, Trophy, Gamepad2 } from "lucide-react";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export default function EventCard({ event }) {
    const statusColors = {
        upcoming: "bg-green-500/20 text-green-400 border-green-500/30",
        ongoing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
        completed: "bg-slate-500/20 text-slate-400 border-slate-500/30",
        cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    const typeColors = {
        tournament: "bg-purple-500/20 text-purple-400",
        casual: "bg-blue-500/20 text-blue-400",
        ranked: "bg-red-500/20 text-red-400",
        practice: "bg-green-500/20 text-green-400",
        championship: "bg-yellow-500/20 text-yellow-400",
    };

    // Formateo seguro de fecha
    let fechaFormateada = "Fecha no disponible";
    if (event.fecha_inicio) {
        const fecha = parseISO(event.fecha_inicio.replace(" ", "T"));
        if (!isNaN(fecha)) {
            fechaFormateada = format(fecha, "d 'de' MMMM, yyyy - HH:mm", { locale: es });
        }
    }

    return (
        <Link to={`/eventos/${event.id}`}>
            <Card className="bg-slate-800/50 border-purple-500/20 hover:border-purple-500/40 transition-all hover:transform hover:scale-[1.02] cursor-pointer overflow-hidden">
                <CardContent className="p-0">
                    {/* Banner */}
                    <div className="relative h-32 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 overflow-hidden">
                        {event.banner_url ? (
                            <img src={`http://localhost:8000/storage/${event.banner_url}`} alt={event.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Gamepad2 className="w-16 h-16 text-purple-400/30" />
                            </div>
                        )}
                        <div className="absolute top-2 right-2 flex gap-2">
                            <Badge className={statusColors[event.estado]}>
                                {event.estado === "upcoming"
                                    ? "Próximo"
                                    : event.estado === "ongoing"
                                        ? "En Curso"
                                        : event.estado === "completed"
                                            ? "Finalizado"
                                            : "Cancelado"}
                            </Badge>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                                <h3 className="font-bold text-white text-lg mb-1">{event.nombre}</h3>
                                <p className="text-purple-400 text-sm font-medium">{event.juego}</p>
                            </div>
                            <Badge className={typeColors[event.tipo_evento]}>
                                {event.tipo_evento === "tournament"
                                    ? "Torneo"
                                    : event.tipo_evento === "casual"
                                        ? "Casual"
                                        : event.tipo_evento === "ranked"
                                            ? "Competitivo"
                                            : event.tipo_evento === "practice"
                                                ? "Práctica"
                                                : "Campeonato"}
                            </Badge>
                        </div>

                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Calendar className="w-4 h-4" />
                                <span>{fechaFormateada}</span>
                            </div>

                            <div className="flex items-center gap-2 text-slate-400">
                                <MapPin className="w-4 h-4" />
                                <span>{event.ubicacion}</span>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Users className="w-4 h-4" />
                                    <span>
                                        {event.participantes_actuales}/{event.max_participantes} participantes
                                    </span>
                                </div>

                                {event.premio && (
                                    <div className="flex items-center gap-1 text-yellow-400">
                                        <Trophy className="w-4 h-4" />
                                        <span className="font-semibold text-sm">{event.premio}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
