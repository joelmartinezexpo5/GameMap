import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/Table";
import { Badge } from "../components/ui/Badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { Shield, Users, Calendar, Trash2, Ban, CheckCircle, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AdminAPI } from "../services/api";

function PanelAdmin() {
    const [usuarios, setUsuarios] = useState([]);
    const [eventos, setEventos] = useState([]);
    const [juegos, setJuegos] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        AdminAPI.getUsuarios(token).then(setUsuarios).catch(console.error);
        AdminAPI.getEventos(token).then(setEventos).catch(console.error);
        AdminAPI.getJuegos(token).then(setJuegos).catch(console.error);
        AdminAPI.getPlataformas(token).then(data => {
            setPlataformas(Array.isArray(data) ? data : data.data);
        }).catch(console.error);
    }, []);

    const aprobarEvento = async (id) => {
        const token = localStorage.getItem("token");
        const data = await AdminAPI.aprobarEvento(id, token);
        setEventos(prev => prev.map(ev => ev.id === id ? data : ev));
    };

    const eliminarEvento = async (id) => {
        const token = localStorage.getItem("token");
        await AdminAPI.deleteEvento(id, token);
        setEventos(prev => prev.filter(ev => ev.id !== id));
    };

    const eliminarJuego = async (id) => {
        const token = localStorage.getItem("token");
        await AdminAPI.deleteJuego(id, token);
        setJuegos(prev => prev.filter(j => j.id !== id));
    };

    const eliminarPlataforma = async (id) => {
        const token = localStorage.getItem("token");
        await AdminAPI.deletePlataforma(id, token);
        setPlataformas(prev => prev.filter(p => p.id !== id));
    };

    const eliminarUsuario = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
        const token = localStorage.getItem("token");
        await AdminAPI.deleteUsuario(id, token);
        setUsuarios(prev => prev.filter(u => u.id !== id));
    };

    const toggleActivo = async (id) => {
        const token = localStorage.getItem("token");
        await AdminAPI.toggleUsuario(id, token);
        setUsuarios(prev => prev.map(u => u.id === id ? { ...u, activo: !u.activo } : u));
    };

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2 flex items-center gap-3">
                        <Shield className="w-10 h-10 text-yellow-400" />
                        Panel de Administración
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Gestiona usuarios y eventos de la plataforma
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Usuarios</p>
                                    <p className="text-3xl font-black text-white">{usuarios.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-purple-600 to-cyan-600 p-3 rounded-xl">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Eventos</p>
                                    <p className="text-3xl font-black text-white">{eventos.length}</p>
                                </div>
                                <div className="bg-gradient-to-br from-yellow-500 to-orange-500 p-3 rounded-xl">
                                    <Calendar className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm mb-1">Admins</p>
                                    <p className="text-3xl font-black text-white">
                                        {usuarios.filter(u => u.rol === "admin").length}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl">
                                    <Shield className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tables */}
                <Tabs defaultValue="users" className="space-y-6">
                    <TabsList className="bg-slate-900/50 border border-purple-500/20 gap-8">
                        <TabsTrigger value="users" className="data-[state=active]:bg-purple-500/20 inline-flex items-center gap-2">
                            <Users className="w-4 h-4 flex-shrink-0 text-white" />
                            <span className="text-white">Usuarios</span>
                        </TabsTrigger>
                        <TabsTrigger value="events" className="data-[state=active]:bg-purple-500/20 inline-flex items-center gap-2">
                            <Calendar className="w-4 h-4 flex-shrink-0 text-white" />
                            <span className="text-white">Eventos</span>
                        </TabsTrigger>
                        <TabsTrigger value="games" className="data-[state=active]:bg-purple-500/20 inline-flex items-center gap-2">
                            <Trophy className="w-4 h-4 flex-shrink-0 text-white" />
                            <span className="text-white">Juegos</span>
                        </TabsTrigger>
                        <TabsTrigger value="platforms" className="data-[state=active]:bg-purple-500/20 inline-flex items-center gap-2">
                            <Shield className="w-4 h-4 flex-shrink-0 text-white" />
                            <span className="text-white">Plataformas</span>
                        </TabsTrigger>
                    </TabsList>

                    {/* Usuarios */}
                    <TabsContent value="users">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle className="text-white">Usuarios Registrados</CardTitle>
                                <Button
                                    onClick={() => navigate("/usuarios/create")}
                                    className="bg-purple-600 text-white"
                                >
                                    Crear Usuario
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-700">
                                                <TableHead className="text-slate-400">Usuario</TableHead>
                                                <TableHead className="text-slate-400">Email</TableHead>
                                                <TableHead className="text-slate-400">Rol</TableHead>
                                                <TableHead className="text-slate-400">Fecha de Registro</TableHead>
                                                <TableHead className="text-slate-400">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {usuarios.map(u => (
                                                <TableRow key={u.id} className="border-slate-700 hover:bg-slate-800/50">
                                                    <TableCell className="text-white font-medium">{u.gamertag}</TableCell>
                                                    <TableCell className="text-slate-400">{u.email}</TableCell>
                                                    <TableCell>
                                                        <Badge className={u.role === "admin"
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-blue-500/20 text-blue-400"}>
                                                            {u.role}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-slate-400">{u.created_at}</TableCell>
                                                    <TableCell className="flex gap-2">
                                                        <Button
                                                            onClick={() => navigate(`/usuarios/${u.id}/edit`)}
                                                            className="bg-blue-600 text-white"
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            onClick={() => toggleActivo(u.id)}
                                                            className={u.activo ? "bg-yellow-600 text-white" : "bg-green-600 text-white"}
                                                        >
                                                            {u.activo ? "Desactivar" : "Activar"}
                                                        </Button>
                                                        <Button
                                                            onClick={() => eliminarUsuario(u.id)}
                                                            className="bg-red-600 text-white"
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Eventos */}
                    <TabsContent value="events">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle className="text-white">Gestión de Eventos</CardTitle>
                                <Button
                                    onClick={() => navigate("/admin/eventos/crear")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Crear Evento
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-700">
                                                <TableHead className="text-slate-400">Evento</TableHead>
                                                <TableHead className="text-slate-400">Juego</TableHead>
                                                <TableHead className="text-slate-400">Organizador</TableHead>
                                                <TableHead className="text-slate-400">Estado</TableHead>
                                                <TableHead className="text-slate-400">Participantes</TableHead>
                                                <TableHead className="text-slate-400">Fecha</TableHead>
                                                <TableHead className="text-slate-400">Acciones</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {eventos.map(ev => (
                                                <TableRow key={ev.id} className="border-slate-700 hover:bg-slate-800/50">
                                                    <TableCell className="text-white font-medium">{ev.nombre}</TableCell>
                                                    <TableCell className="text-purple-400">{ev.juego}</TableCell>
                                                    <TableCell className="text-slate-400">{ev.creador?.email}</TableCell>
                                                    <TableCell>
                                                        <Badge className={
                                                            ev.estado === "upcoming" ? "bg-green-500/20 text-green-400" :
                                                                ev.estado === "ongoing" ? "bg-yellow-500/20 text-yellow-400" :
                                                                    ev.estado === "completed" ? "bg-blue-500/20 text-blue-400" :
                                                                        "bg-red-500/20 text-red-400"
                                                        }>
                                                            {ev.estado}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-slate-400">
                                                        {ev.participantes_actuales}/{ev.max_participantes}
                                                    </TableCell>
                                                    <TableCell className="text-slate-400">{ev.fecha_inicio}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => aprobarEvento(ev.id)}
                                                                className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                                                            >
                                                                <CheckCircle className="w-3 h-3" />
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => navigate(`/admin/eventos/${ev.id}/editar`)}
                                                                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => eliminarEvento(ev.id)}
                                                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    {/* Juegos */}
                    <TabsContent value="games">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle className="text-white">Juegos Registrados</CardTitle>
                                <Button
                                    onClick={() => navigate("/admin/juegos/crear")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Crear Juego
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-700">
                                                <TableHead className="text-slate-400">Nombre</TableHead>
                                                <TableHead className="text-slate-400">Género</TableHead>
                                                <TableHead className="text-slate-400">Desarrollador</TableHead>
                                                <TableHead className="text-slate-400">Año</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {juegos.map(j => (
                                                <TableRow key={j.id} className="border-slate-700 hover:bg-slate-800/50">
                                                    <TableCell className="text-white font-medium">{j.nombre}</TableCell>
                                                    <TableCell className="text-slate-400">{j.genero}</TableCell>
                                                    <TableCell className="text-slate-400">{j.desarrollador}</TableCell>
                                                    <TableCell className="text-slate-400">{j.anio_lanzamiento}</TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => navigate(`/admin/juegos/${j.id}/editar`)}
                                                                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => eliminarJuego(j.id)}
                                                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    {/* Plataformas */}
                    <TabsContent value="platforms">
                        <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                            <CardHeader className="flex items-center justify-between">
                                <CardTitle className="text-white">Plataformas Registradas</CardTitle>
                                <Button
                                    onClick={() => navigate("/admin/plataformas/crear")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Crear Plataforma
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="border-slate-700">
                                                <TableHead className="text-slate-400">Nombre</TableHead>
                                                <TableHead className="text-slate-400">Icono</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {plataformas.map(p => (
                                                <TableRow key={p.id} className="border-slate-700 hover:bg-slate-800/50">
                                                    <TableCell className="text-white font-medium">{p.nombre}</TableCell>
                                                    <TableCell>
                                                        <img src={`http://localhost:8000/storage/${p.icon_url}`} alt={p.nombre} className="w-6 h-6" />
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => navigate(`/admin/plataformas/${p.id}/editar`)}
                                                                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                                                            >
                                                                Editar
                                                            </Button>
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => eliminarPlataforma(p.id)}
                                                                className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                                                            >
                                                                Eliminar
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default PanelAdmin;


