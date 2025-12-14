import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input, Textarea, Label } from "../components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Badge } from "../components/ui/Badge";
import { Trophy, Edit, Upload, Medal, Gamepad2, Save } from "lucide-react";
import { UsuariosAPI } from "../api/usuarios";
import { EventosAPI } from "../api/eventos";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import { UserProfileAPI } from "../services/api";

function UserProfile() {
    const [usuario, setUsuario] = useState(null);
    const [misEventos, setMisEventos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [editando, setEditando] = useState(false);
    const [guardando, setGuardando] = useState(false);
    const [nuevoAvatar, setNuevoAvatar] = useState(null);
    const [formData, setFormData] = useState({
        full_name: "",
        bio: "",
        country: "",
        favorite_games: "",
        discord_handle: "",
        twitch_handle: ""
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const token = localStorage.getItem("token");
                const dataUsuario = await UserProfileAPI.getProfile(token);
                setUsuario(dataUsuario);

                const dataEventos = await UserProfileAPI.getMisEventos(token);
                setMisEventos(Array.isArray(dataEventos) ? dataEventos : []);

                setUsuario(prev => prev ? { ...prev, event_count: dataEventos.length } : prev);

                setFormData({
                    full_name: dataUsuario.full_name || "",
                    bio: dataUsuario.bio || "",
                    country: dataUsuario.country || "",
                    favorite_games: dataUsuario.favorite_games || "",
                    discord_handle: dataUsuario.discord_handle || "",
                    twitch_handle: dataUsuario.twitch_handle || ""
                });
            } catch (err) {
                console.error("Error cargando datos:", err);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

    const handleGuardar = async () => {
        setGuardando(true);
        try {
            const token = localStorage.getItem("token");
            const actualizado = await UserProfileAPI.updateProfile(usuario.id, formData, token);
            setUsuario(actualizado);
            setEditando(false);
        } catch (err) {
            console.error("Error guardando perfil:", err);
        } finally {
            setGuardando(false);
        }
    };

    const handleFileChange = (e) => {
        setNuevoAvatar(e.target.files[0]);
    };

    const subirAvatar = async () => {
        if (!nuevoAvatar) return;
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("avatar", nuevoAvatar);

        try {
            const data = await UserProfileAPI.updateAvatar(formData, token);
            setUsuario(prev => ({ ...prev, avatar_url: data.avatar_url }));
            setNuevoAvatar(null);
        } catch (err) {
            console.error("Error subiendo avatar:", err);
        }
    };

    if (cargando) return <p className="text-center text-slate-400">Cargando perfil...</p>;
    if (!usuario) return <p className="text-center text-red-400">No se pudo cargar el perfil</p>;

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {/* Header del Perfil */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm mb-8">
                        <CardContent className="p-8">
                            <div className="flex flex-col md:flex-row items-center gap-6">
                                {/* Avatar */}
                                <div className="relative group">
                                    <Avatar className="w-32 h-32 border-4 border-purple-500">
                                        <AvatarImage src={usuario?.avatar_url || "/placeholder-avatar.png"} />
                                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white text-4xl">
                                            {usuario?.full_name?.[0] || "U"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Upload className="w-8 h-8 text-white" />
                                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                    </label>
                                </div>

                                {nuevoAvatar && (
                                    <Button onClick={subirAvatar} className="mt-2 bg-purple-600 hover:bg-purple-700">
                                        Guardar nueva imagen
                                    </Button>
                                )}


                                {/* Información del usuario */}
                                <div className="flex-1 text-center md:text-left">
                                    <h1 className="text-3xl font-black text-white mb-1">{usuario?.full_name}</h1>
                                    <p className="text-slate-400 mb-4">{usuario?.email}</p>

                                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                        <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                            <Gamepad2 className="w-3 h-3 mr-1" />
                                            {usuario?.favorite_games || "Sin juegos favoritos"}
                                        </Badge>
                                        <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                                            {usuario?.country || "España"}
                                        </Badge>
                                        <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                                            <Medal className="w-3 h-3 mr-1" />
                                            {usuario?.role || "Jugador"}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Botón Editar / Guardar */}
                                <Button
                                    onClick={() => editando ? handleGuardar() : setEditando(true)}
                                    disabled={guardando}
                                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                                >
                                    {editando ? (
                                        <>
                                            <Save className="w-4 h-4 mr-2" />
                                            {guardando ? "Guardando..." : "Guardar"}
                                        </>
                                    ) : (
                                        <>
                                            <Edit className="w-4 h-4 mr-2" />
                                            Editar Perfil
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Estadísticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                        <CardContent className="p-4 text-center">
                            <div className="bg-gradient-to-br from-purple-600 to-cyan-600 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <p className="text-2xl font-black text-white mb-1">{usuario?.event_count || 0}</p>
                            <p className="text-xs text-slate-400">Eventos</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Detalles del perfil */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Información Personal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {editando ? (
                                    <>
                                        <div>
                                            <Label className="text-white">Biografía</Label>
                                            <Textarea
                                                value={formData.bio}
                                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                                className="bg-slate-800 border-slate-700 text-white mt-2"
                                                rows={3}
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-white">Discord</Label>
                                            <Input
                                                value={formData.discord_handle}
                                                onChange={(e) => setFormData({ ...formData, discord_handle: e.target.value })}
                                                className="bg-slate-800 border-slate-700 text-white mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-white">Twitch</Label>
                                            <Input
                                                value={formData.twitch_handle}
                                                onChange={(e) => setFormData({ ...formData, twitch_handle: e.target.value })}
                                                className="bg-slate-800 border-slate-700 text-white mt-2"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-400 mb-1">Biografía</h3>
                                            <p className="text-white">{usuario?.bio || "Aquí va la biografía del usuario"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-400 mb-1">Discord</h3>
                                            <p className="text-purple-400">{usuario?.discord_handle || "usuario#1234"}</p>
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-400 mb-1">Twitch</h3>
                                            <p className="text-purple-400">{usuario?.twitch_handle || "@usuario"}</p>
                                        </div>
                                    </>
                                )}
                            </CardContent>
                        </Card>

                        {/* Historial de Eventos */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white flex items-center justify-between">
                                    <span>Mis Eventos</span>
                                    <Badge className="bg-purple-500/20 text-purple-400">{usuario?.event_count || 0}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {misEventos.length > 0 ? (
                                    <div className="space-y-4">
                                        {misEventos.map(ev => (
                                            <div key={ev.id} className="p-3 rounded-lg bg-slate-800/40 hover:bg-slate-800/60">
                                                <p className="text-white font-semibold">{ev.nombre}</p>
                                                <p className="text-slate-400 text-sm">
                                                    {ev.juego} • {ev.estado} • {ev.participantes_actuales}/{ev.max_participantes}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Trophy className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                                        <p className="text-slate-400">No has participado en ningún evento</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar de acciones rápidas */}
                    <div className="space-y-6">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">Acciones Rápidas</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link
                                    to="/eventos"
                                    className="w-full justify-start border-purple-500/50 text-purple-400 hover:bg-purple-500/10 flex items-center rounded-md px-3 py-2 no-underline"
                                >
                                    <Gamepad2 className="w-4 h-4 mr-2" />
                                    Explorar Eventos
                                </Link>

                                <Link
                                    to="/eventos/crear"
                                    className="w-full justify-start border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex items-center rounded-md px-3 py-2 no-underline"
                                >
                                    <Trophy className="w-4 h-4 mr-2" />
                                    Crear Evento
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
