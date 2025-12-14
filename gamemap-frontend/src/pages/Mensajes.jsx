import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Badge } from "../components/ui/Badge";
import {
    MessageSquare,
    Send,
    Users,
    UserPlus,
    LogOut
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import { getToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { MessagesAPI } from "../services/api";

function Messages() {
    const navigate = useNavigate();
    const [conversaciones, setConversaciones] = useState([]);
    const [selectedConv, setSelectedConv] = useState(null);
    const [amistades, setAmistades] = useState([]);
    const [nuevoMensaje, setNuevoMensaje] = useState("");
    const [usuarioActual, setUsuarioActual] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const [resultadosBusqueda, setResultadosBusqueda] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/Login");
            return;
        }

        MessagesAPI.getUser(token)
            .then(data => setUsuarioActual(data))
            .catch(err => console.error("Error cargando usuario:", err));
    }, [navigate]);

    useEffect(() => {
        if (!usuarioActual) return;
        const token = localStorage.getItem("token");

        MessagesAPI.getMensajes(token)
            .then(data => {
                const grouped = data.reduce((acc, msg) => {
                    const otroUsuario =
                        msg.emisor.id === usuarioActual.id ? msg.receptor : msg.emisor;
                    if (!otroUsuario) return acc;

                    const userId = otroUsuario.id;
                    if (!acc[userId]) {
                        acc[userId] = { usuario: otroUsuario, mensajes: [] };
                    }
                    acc[userId].mensajes.push(msg);
                    return acc;
                }, {});
                setConversaciones(Object.values(grouped));
            })
            .catch(err => console.error("Error cargando mensajes:", err));

        MessagesAPI.getAmistades(token)
            .then(data => setAmistades(data))
            .catch(err => console.error("Error cargando amistades:", err));
    }, [usuarioActual]);

    const enviarMensaje = async () => {
        if (!selectedConv || !nuevoMensaje.trim() || !usuarioActual) return;
        const token = localStorage.getItem("token");

        try {
            const msg = await MessagesAPI.sendMensaje({
                conversation_id: `conv_${usuarioActual.id}_${selectedConv.usuario.id}`,
                emisor_id: usuarioActual.id,
                receptor_id: selectedConv.usuario.id,
                contenido: nuevoMensaje,
            }, token);

            setNuevoMensaje("");
            setSelectedConv(prev => ({
                ...prev,
                mensajes: [...prev.mensajes, msg],
            }));
        } catch (err) {
            console.error("Error enviando mensaje:", err);
        }
    };

    const buscarUsuarios = async () => {
        if (!busqueda.trim()) return;
        const token = localStorage.getItem("token");

        try {
            const data = await MessagesAPI.searchUsuarios(busqueda, token);
            setResultadosBusqueda(data);
        } catch (err) {
            console.error("Error buscando usuarios:", err);
        }
    };

    const agregarAmigo = async (usuarioId) => {
        const token = localStorage.getItem("token");
        try {
            const data = await MessagesAPI.addAmigo(usuarioId, token);
            setAmistades(prev => [...prev, data]);
        } catch (err) {
            console.error("Error agregando amigo:", err);
        }
    };

    const abrirChat = (amigo) => {
        const convExistente = conversaciones.find(c => c.usuario.id === amigo.id);
        if (convExistente) {
            setSelectedConv(convExistente);
        } else {
            setSelectedConv({ usuario: amigo, mensajes: [] });
        }
    };


return (
    <div className="h-[calc(100vh-4rem)] p-4 md:p-8">
        <div className="max-w-7xl mx-auto h-full">
            <Tabs defaultValue="messages" className="h-full flex flex-col">
                <TabsList className="bg-slate-900/50 border border-purple-500/20 mb-4">
                    <TabsTrigger value="messages" className="data-[state=active]:bg-purple-500/20 text-white">
                        <MessageSquare className="w-4 h-4 mr-2" /> Mensajes
                    </TabsTrigger>
                    <TabsTrigger value="friends" className="data-[state=active]:bg-purple-500/20 text-white">
                        <Users className="w-4 h-4 mr-2" /> Amigos
                        <Badge className="ml-2 bg-red-500 text-white">{amistades.length}</Badge>
                    </TabsTrigger>
                </TabsList>

                {/* Conversaciones */}
                <TabsContent value="messages" className="flex-1 mt-0">
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm h-full flex flex-col">
                        <div className="grid md:grid-cols-3 flex-1 overflow-hidden">
                            {/* Lista de conversaciones */}
                            <div className="border-r border-purple-500/20 overflow-y-auto">
                                <CardHeader className="border-b border-purple-500/20">
                                    <CardTitle className="text-white text-lg">Conversaciones</CardTitle>
                                </CardHeader>
                                <div className="p-2 space-y-1">
                                    {conversaciones.map(conv => (
                                        <button
                                            key={conv.usuario.id}
                                            onClick={() => setSelectedConv(conv)}
                                            className="w-full p-3 rounded-lg text-left transition-colors hover:bg-slate-800/50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border-2 border-purple-500">
                                                    <AvatarImage src={conv.usuario.avatar_url || "/placeholder-avatar.png"} />
                                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white">
                                                        {conv.usuario.full_name?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-white truncate">{conv.usuario.full_name}</p>
                                                    <p className="text-sm text-slate-400 truncate">
                                                        {conv.mensajes[conv.mensajes.length - 1]?.contenido}
                                                    </p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            {/* Área de chat */}
                            <div className="md:col-span-2 flex flex-col">
                                {selectedConv ? (
                                    <>
                                        <CardHeader className="border-b border-purple-500/20">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border-2 border-purple-500">
                                                    <AvatarImage src={selectedConv.usuario.avatar_url || "/placeholder-avatar.png"} />
                                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white">
                                                        {selectedConv.usuario.full_name?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-white">{selectedConv.usuario.full_name}</p>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-20rem)] flex flex-col gap-4">
                                            {selectedConv.mensajes.map(msg => {
                                                const esPropio = msg.emisor?.id === usuarioActual?.id;
                                                return (
                                                    <motion.div
                                                        key={msg.id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`flex ${esPropio ? "justify-end" : "justify-start"}`}
                                                    >
                                                        <div
                                                            className={`max-w-[70%] rounded-2xl px-4 py-2 ${esPropio
                                                                ? "bg-gradient-to-r from-purple-600 to-cyan-600 text-white"
                                                                : "bg-slate-800 text-white"
                                                                }`}
                                                        >
                                                            <p>{msg.contenido}</p>
                                                            <p className={`text-xs mt-1 ${esPropio ? "text-right text-slate-200" : "text-slate-400"}`}>
                                                                {msg.fecha ? format(new Date(msg.fecha), "HH:mm", { locale: es }) : ""}
                                                            </p>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                        </div>

                                        <div className="p-4 border-t border-purple-500/20">
                                            <div className="flex gap-2">
                                                <Input
                                                    value={nuevoMensaje}
                                                    onChange={e => setNuevoMensaje(e.target.value)}
                                                    placeholder="Escribe un mensaje..."
                                                    className="bg-slate-800 border-slate-700 text-white"
                                                />
                                                <Button onClick={enviarMensaje} className="bg-gradient-to-r from-purple-600 to-cyan-600">
                                                    <Send className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex-1 flex items-center justify-center text-slate-400">
                                        Selecciona una conversación
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                </TabsContent>

                {/* Amigos / Amistades */}
                <TabsContent value="friends" className="flex-1 mt-0">
                    <div className="grid md:grid-cols-2 gap-6 h-full">
                        {/* Lista de amistades */}
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-white">Mis Amigos ({amistades.length})</CardTitle>
                            </CardHeader>
                            {/* Lista de amistades */}
                            <CardContent className="space-y-2 overflow-y-auto max-h-[600px]">
                                {amistades.map(amistad => {
                                    const yoId = usuarioActual?.id; // protege si usuarioActual aún no está cargado
                                    // si usuario1 existe y coincide con yoId, mostramos usuario2; si no, mostramos usuario1
                                    const amigo = amistad.usuario1?.id === yoId ? amistad.usuario2 : amistad.usuario1;

                                    if (!amigo) return null; // si no hay amigo definido, no renderizamos nada

                                    return (
                                        <div key={amistad.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border-2 border-purple-500">
                                                    <AvatarImage src={amigo.avatar_url || "/placeholder-avatar.png"} />
                                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white">
                                                        {amigo.nombre?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-white">{amigo.nombre}</p>
                                                    <p className="text-xs text-slate-400">{amigo.email}</p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-purple-600 hover:bg-purple-700"
                                                onClick={() => abrirChat(amigo)}
                                            >
                                                <MessageSquare className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </CardContent>

                            {/* Agregar amigos */}
                            <CardHeader>
                                <CardTitle className="text-white">Agregar Amigos</CardTitle>
                                <div className="flex gap-2 mt-4">
                                    <Input
                                        value={busqueda}
                                        onChange={e => setBusqueda(e.target.value)}
                                        placeholder="Buscar usuarios..."
                                        className="bg-slate-800 border-slate-700 text-white"
                                    />
                                    <Button onClick={buscarUsuarios} className="bg-purple-600 hover:bg-purple-700">
                                        Buscar
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2 overflow-y-auto max-h-[400px]">
                                {resultadosBusqueda.map(u => {
                                    // si viene anidado dentro de u.usuario, lo usamos; si no, usamos u directamente
                                    const usuario = u.usuario ? u.usuario : u;

                                    return (
                                        <div
                                            key={usuario.id}
                                            className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-10 h-10 border-2 border-purple-500">
                                                    <AvatarImage src={usuario.avatar_url || "/placeholder-avatar.png"} />
                                                    <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white">
                                                        {usuario.nombre?.[0] || "U"}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold text-white">{usuario.nombre}</p>
                                                    <p className="text-xs text-slate-400">{usuario.email}</p>
                                                </div>
                                            </div>
                                            <Button
                                                size="sm"
                                                className="bg-purple-600 hover:bg-purple-700"
                                                onClick={() => agregarAmigo(usuario.id)}
                                            >
                                                <UserPlus className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>
);
}

export default Messages;



