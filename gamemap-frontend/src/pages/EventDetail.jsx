import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { EventDetailAPI } from "../services/api";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input, Textarea } from "../components/ui/Input";
import { Badge } from "../components/ui/Badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import {
    Calendar,
    MapPin,
    Users,
    Trophy,
    ArrowLeft,
    UserPlus,
    UserMinus,
    MessageSquare,
    Star,
    Gamepad2
} from "lucide-react";
import { motion } from "framer-motion";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

function EventDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Comentarios y participantes
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [participants, setParticipants] = useState([]);

    // Estados de participación
    const [isParticipant, setIsParticipant] = useState(false);
    const [isOrganizer, setIsOrganizer] = useState(false);
    const [isJoining, setIsJoining] = useState(false);

    useEffect(() => {
        const fetchEvento = async () => {
            try {
                const token = localStorage.getItem("token");
                const data = await EventDetailAPI.getById(id, token);

                setEvent(data);
                setParticipants(data.participaciones || []);

                const currentUserId = Number(localStorage.getItem("user_id"));
                setIsParticipant(data.participaciones?.some(
                    p => Number(p.user_id) === currentUserId || Number(p.usuario?.id) === currentUserId
                ));
                setIsOrganizer(Number(data.organizador_id) === currentUserId);

                const comentariosData = await EventDetailAPI.getComments(id, token);
                setComments(comentariosData);
            } catch (error) {
                console.error(" Error en fetchEvento:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvento();
    }, [id]);

    const handleComment = async () => {
        const token = localStorage.getItem("token");
        const data = await EventDetailAPI.addComment({
            evento_id: event.id,
            user_id: Number(localStorage.getItem("user_id")),
            contenido: comment,
            puntuacion: rating
        }, token);

        setComments(prev => [...prev, data]);
        setComment("");
        setRating(0);
    };

    const handleJoin = async () => {
        const token = localStorage.getItem("token");
        const eventoActualizado = await EventDetailAPI.join(event.id, token);
        setEvent(eventoActualizado);
        setParticipants(eventoActualizado.participaciones || []);
        setIsParticipant(true);
    };

    const handleLeave = async () => {
        const token = localStorage.getItem("token");
        const currentUserId = localStorage.getItem("user_id");
        const participation = participants.find(
            p => p.user_id == currentUserId || p.usuario?.id == currentUserId
        );
        if (!participation) return;

        await EventDetailAPI.leave(participation.id, token);
        setIsParticipant(false);
        setParticipants(participants.filter(p => p.id !== participation.id));
        setEvent(prev => ({
            ...prev,
            participantes_actuales: Math.max(0, (prev.participantes_actuales || 1) - 1)
        }));
    };



    if (loading) return <h2 className="text-white p-6">Cargando evento...</h2>;
    if (!event) return <h2 className="text-white p-6">Evento no encontrado</h2>;

    const canJoin = !isParticipant && !isOrganizer && event.estado === "upcoming";
    const isFull = event.participantes_actuales >= event.max_participantes;
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-slate-400 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>

                {/* Event Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-6"
                >
                    {event.banner_url ? (
                        <img src={`http://localhost:8000/storage/${event.banner_url}`} alt={event.nombre} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-r from-purple-900/50 to-cyan-900/50 flex items-center justify-center">
                            <Gamepad2 className="w-24 h-24 text-purple-400/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Event Info */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardContent className="p-6">
                                <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                    <div>
                                        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">
                                            {event.nombre}
                                        </h1>
                                        <p className="text-xl text-purple-400 font-semibold">
                                            {event.juego?.nombre || "Juego desconocido"}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        {isOrganizer && <Badge variant="warning">Organizador</Badge>}
                                        {isParticipant && !isOrganizer && <Badge variant="success">Participando</Badge>}
                                        <Badge variant={event.estado === 'ongoing' ? 'success' : 'default'}>
                                            {event.estado === 'upcoming'
                                                ? 'Próximo'
                                                : event.estado === 'ongoing'
                                                    ? 'En curso'
                                                    : event.estado}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center gap-3 text-slate-300">
                                        <Calendar className="w-5 h-5 text-purple-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Inicio</p>
                                            <p className="font-semibold">
                                                {event.fecha_inicio
                                                    ? format(parseISO(event.fecha_inicio.replace(" ", "T")), "d 'de' MMMM, yyyy - HH:mm", { locale: es })
                                                    : "Fecha desconocida"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 text-slate-300">
                                        <MapPin className="w-5 h-5 text-cyan-400" />
                                        <div>
                                            <p className="text-sm text-slate-500">Ubicación</p>
                                            <p className="font-semibold">{event.ubicacion}</p>
                                        </div>
                                    </div>

                                    {event.plataforma && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Gamepad2 className="w-5 h-5 text-pink-400" />
                                            <div>
                                                <p className="text-sm text-slate-500">Plataforma</p>
                                                <p className="font-semibold">{event.plataforma?.nombre || "N/A"}</p>
                                            </div>
                                        </div>
                                    )}

                                    {event.premio && (
                                        <div className="flex items-center gap-3 text-slate-300">
                                            <Trophy className="w-5 h-5 text-yellow-400" />
                                            <div>
                                                <p className="text-sm text-slate-500">Premio</p>
                                                <p className="font-semibold">{event.premio}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {event.descripcion && (
                                    <div className="mb-6">
                                        <h3 className="text-lg font-bold text-white mb-2">Descripción</h3>
                                        <p className="text-slate-400 leading-relaxed">{event.descripcion}</p>
                                    </div>
                                )}

                                {event.reglas && (
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Reglas</h3>
                                        <p className="text-slate-400 leading-relaxed whitespace-pre-wrap">{event.reglas}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                        {/* Comments Section */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <MessageSquare className="w-5 h-5 text-purple-400" />
                                    Comentarios ({comments.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Add Comment */}
                                <div className="mb-6 p-4 bg-slate-800/50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-sm text-slate-400">Calificación:</span>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className="transition-transform hover:scale-110"
                                            >
                                                <Star
                                                    className={`w-5 h-5 ${star <= rating
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-slate-600"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <Textarea
                                        placeholder="Escribe tu comentario..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="bg-slate-900 border-slate-700 text-white mb-3"
                                    />
                                    <Button
                                        onClick={handleComment}
                                        disabled={!comment.trim()}
                                        className="bg-gradient-to-r from-purple-600 to-cyan-600"
                                    >
                                        Publicar
                                    </Button>
                                </div>

                                {/* Comments List */}
                                <div className="space-y-4">
                                    {comments.map((c) => (
                                        <div key={c.id} className="p-4 bg-slate-800/50 rounded-lg">
                                            <div className="flex items-start justify-between mb-2">
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="w-8 h-8 border-2 border-purple-500">
                                                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-xs">
                                                            {c.user_name?.[0] || "U"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-semibold text-white">{c.usuario?.gamertag || `Usuario #${c.user_id}`}</p>
                                                        <p className="text-xs text-slate-500">
                                                            {c.created_at
                                                                ? format(new Date(c.created_at), "d MMM yyyy, HH:mm", { locale: es })
                                                                : "Fecha desconocida"}
                                                        </p>
                                                    </div>
                                                </div>
                                                {c.puntuacion && (
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(c.puntuacion)].map((_, i) => (
                                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-slate-300">{c.contenido}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Join/Leave Button */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardContent className="p-6">
                                {isParticipant ? (
                                    <Button
                                        onClick={handleLeave}
                                        variant="outline"
                                        className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 py-6"
                                    >
                                        <UserMinus className="w-5 h-5 mr-2" />
                                        Abandonar Evento
                                    </Button>
                                ) : canJoin ? (
                                    <Button
                                        onClick={handleJoin}
                                        disabled={isJoining}
                                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-lg py-6"
                                    >
                                        <UserPlus className="w-5 h-5 mr-2" />
                                        {isJoining ? "Uniéndose..." : "Unirse al Evento"}
                                    </Button>
                                ) : isFull ? (
                                    <Button disabled className="w-full py-6">
                                        Evento Completo
                                    </Button>
                                ) : (
                                    <Button disabled className="w-full py-6">
                                        Evento No Disponible
                                    </Button>
                                )}

                                <div className="mt-4 p-4 bg-slate-800/50 rounded-lg">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-slate-400">Participantes</span>
                                        <span className="text-white font-bold">
                                            {event.participantes_actuales}/{event.max_participantes}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gradient-to-r from-purple-600 to-cyan-600 h-full transition-all"
                                            style={{
                                                width: `${Math.min(
                                                    100,
                                                    (event.participantes_actuales / event.max_participantes) * 100
                                                )}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Participants List */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Users className="w-5 h-5 text-cyan-400" />
                                    Participantes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {participants.length === 0 ? (
                                        <p className="text-slate-400 text-center py-4 text-sm">
                                            Aún no hay participantes
                                        </p>
                                    ) : (
                                        participants.map((p) => (
                                            <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-800/50">
                                                <Avatar className="w-8 h-8 border-2 border-purple-500">
                                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-xs">
                                                        {p.usuario?.full_name?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1">
                                                    <p className="text-white text-sm font-medium">{p.usuario?.full_name || "Usuario"}</p>
                                                    {p.equipo && (
                                                        <p className="text-xs text-purple-400">{p.equipo}</p>
                                                    )}
                                                </div>
                                                <Badge variant={p.estado === 'confirmed' ? 'success' : 'default'} className="text-xs">
                                                    {p.estado}
                                                </Badge>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventDetail;




