import React, { useEffect, useState } from "react";
import { EventosAPI, JuegosAPI, PlataformasAPI } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import { Input, Textarea, Label } from "../components/ui/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../components/ui/Select";
import { ArrowLeft, Trophy, Upload } from "lucide-react";
import { motion } from "framer-motion";

const formatDateTime = (val) => val ? val.replace("T", " ") + ":00" : null;

export default function CreateEvent() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [juegos, setJuegos] = useState([]);
    const [plataformas, setPlataformas] = useState([]);
    const [bannerFile, setBannerFile] = useState(null);

    const [formData, setFormData] = useState({
        nombre: "",
        juego_id: "",
        tipo_evento: "",
        plataforma_id: "",
        fecha_inicio: "",
        fecha_fin: "",
        ubicacion: "",
        max_participantes: "",
        premio: "",
        visibilidad: "",
        codigo_acceso: "",
        latitud: "",
        longitud: "",
        descripcion: "",
        reglas: "",
        banner_url: ""
    });

    const tiposEvento = [
        { value: "championship", label: "Campeonato" },
        { value: "casual", label: "Casual" },
        { value: "ranked", label: "Competitivo" },
        { value: "practice", label: "Práctica" },
    ];

    const opcionesVisibilidad = [
        { value: "public", label: "Público" },
        { value: "private", label: "Privado" },
    ];

    //  Cargar evento si estamos editando
    useEffect(() => {
        if (id) {
            const token = localStorage.getItem("token");
            EventosAPI.getById(id, token)
                .then(data =>
                    setFormData({
                        nombre: data.nombre || "",
                        juego_id: data.juego_id ? String(data.juego_id) : "",
                        tipo_evento: data.tipo_evento?.toLowerCase() || "",
                        plataforma_id: data.plataforma_id ? String(data.plataforma_id) : "",
                        fecha_inicio: data.fecha_inicio ? new Date(data.fecha_inicio).toISOString().slice(0, 16) : "",
                        fecha_fin: data.fecha_fin ? new Date(data.fecha_fin).toISOString().slice(0, 16) : "",
                        ubicacion: data.ubicacion || "",
                        max_participantes: data.max_participantes || "",
                        premio: data.premio || "",
                        visibilidad: data.visibilidad?.toLowerCase() || "",
                        codigo_acceso: data.codigo_acceso || "",
                        latitud: data.latitud || "",
                        longitud: data.longitud || "",
                        descripcion: data.descripcion || "",
                        reglas: data.reglas || "",
                        banner_url: data.banner_url || ""
                    })
                )
                .catch(err => console.error("Error cargando evento:", err));
        }
    }, [id]);

    //  Cargar lista de juegos
    useEffect(() => {
        JuegosAPI.getAll()
            .then(setJuegos)
            .catch(err => console.error("Error cargando juegos:", err));
    }, []);

    //  Cargar lista de plataformas
    useEffect(() => {
        PlataformasAPI.getAll()
            .then(data => setPlataformas(Array.isArray(data) ? data : data.data))
            .catch(err => console.error("Error cargando plataformas:", err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const form = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (value) form.append(key, value);
            });
            if (bannerFile) form.append("banner", bannerFile);

            const token = localStorage.getItem("token");
            const data = id
                ? await EventosAPI.update(id, form, token)
                : await EventosAPI.create(form, token);

            navigate(id ? "/admin" : `/eventos/${data.id}`);
        } catch (error) {
            console.error("Error en handleSubmit:", error);
            alert("Hubo un error al guardar el evento");
        }
    };


    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-6 text-slate-400 hover:text-white"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver
                </Button>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="bg-slate-900/50 border-purple-500/20 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-3xl font-black text-white">
                                <Trophy className="w-8 h-8 text-purple-400" />
                                {id ? "Editar Evento" : "Crear Nuevo Evento"}
                            </CardTitle>

                            <p className="text-slate-400 mt-2">
                                Organiza tu propio torneo o evento de videojuegos
                            </p>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-6" onSubmit={handleSubmit}>
                                {/* Banner Upload */}
                                <div>
                                    <Label className="text-white mb-2 block">
                                        Banner del Evento (Opcional)
                                    </Label>
                                    <div className="relative h-48 bg-slate-800/50 rounded-lg border-2 border-dashed border-slate-700 hover:border-purple-500/50 transition-colors overflow-hidden">
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <Upload className="w-12 h-12 text-slate-600 mb-2" />
                                            <p className="text-slate-500 text-sm">
                                                Click para subir banner
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            onChange={(e) => setBannerFile(e.target.files[0])}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Event Name */}
                                    <div>
                                        <Label htmlFor="nombre" className="text-white">
                                            Nombre del Evento <span className="text-red-400">*</span>
                                        </Label>
                                        <Input
                                            id="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            placeholder="Torneo de League of Legends"
                                            className="bg-slate-800 border-slate-700 text-white mt-2"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Juego */}
                                <div>
                                    <Label htmlFor="juego_id" className="text-white">
                                        Juego <span className="text-red-400">*</span>
                                    </Label>
                                    <Select
                                        value={formData.juego_id}
                                        onValueChange={(val) => setFormData({ ...formData, juego_id: val })}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                                            <SelectValue placeholder="Selecciona juego" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            {juegos.map((j) => (
                                                <SelectItem key={j.id} value={j.id.toString()}>
                                                    {j.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Event Type */}
                                <div>
                                    <Label className="text-white">Tipo de Evento</Label>
                                    <Select
                                        value={formData.tipo_evento}
                                        onValueChange={(val) => setFormData({ ...formData, tipo_evento: val })}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                                            <SelectValue
                                                placeholder="Selecciona tipo de evento"
                                                currentValue={formData.tipo_evento}
                                                options={tiposEvento}
                                            />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            {tiposEvento.map((t) => (
                                                <SelectItem key={t.value} value={t.value}>
                                                    {t.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Platform */}
                                <div>
                                    <Label className="text-white">Plataforma</Label>
                                    <Select
                                        value={formData.plataforma_id}
                                        onValueChange={(val) => setFormData({ ...formData, plataforma_id: val })}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                                            <SelectValue placeholder="Selecciona plataforma" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            {plataformas.map((p) => (
                                                <SelectItem key={p.id} value={p.id.toString()}>
                                                    {p.nombre}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                {/* Fecha inicio */}
                                <div>
                                    <Label htmlFor="fecha_inicio" className="text-white">
                                        Fecha y Hora de Inicio <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        id="fecha_inicio"
                                        type="datetime-local"
                                        value={formData.fecha_inicio}
                                        onChange={handleChange}
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                        required
                                    />
                                </div>

                                {/* End Date */}
                                <div>
                                    <Label htmlFor="fecha_fin" className="text-white">
                                        Fecha y Hora de Fin (Opcional)
                                    </Label>
                                    <Input
                                        id="fecha_fin"
                                        type="datetime-local"
                                        value={formData.fecha_fin}
                                        onChange={handleChange}
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                    />
                                </div>
                                {/* Location */}
                                <div>
                                    <Label htmlFor="ubicacion" className="text-white">
                                        Ubicación <span className="text-red-400">*</span>
                                    </Label>
                                    <Input
                                        id="ubicacion"
                                        value={formData.ubicacion}
                                        onChange={handleChange}
                                        placeholder="Online / Ciudad, País"
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                        required
                                    />
                                </div>

                                {/* Max Participants */}
                                <div>
                                    <Label htmlFor="max_participantes" className="text-white">
                                        Máximo de Participantes
                                    </Label>
                                    <Input
                                        id="max_participantes"
                                        type="number"
                                        min="2"
                                        value={formData.max_participantes}
                                        onChange={handleChange}
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                    />
                                </div>

                                {/* Prize Pool */}
                                <div>
                                    <Label htmlFor="premio" className="text-white">
                                        Premio (Opcional)
                                    </Label>
                                    <Input
                                        id="premio"
                                        value={formData.premio}
                                        onChange={handleChange}
                                        placeholder="$1,000 USD"
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                    />
                                </div>

                                {/* Visibility */}
                                <div>
                                    <Label className="text-white">Visibilidad</Label>
                                    <Select
                                        value={formData.visibilidad}
                                        onValueChange={(val) => setFormData({ ...formData, visibilidad: val })}
                                    >
                                        <SelectTrigger className="bg-slate-800 border-slate-700 text-white mt-2">
                                            <SelectValue placeholder="Selecciona visibilidad" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-800 border-slate-700">
                                            {opcionesVisibilidad.map((v) => (
                                                <SelectItem key={v.value} value={v.value}>
                                                    {v.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Access Code */}
                                <div>
                                    <Label htmlFor="codigo_acceso" className="text-white">
                                        Código de Acceso (Opcional)
                                    </Label>
                                    <Input
                                        id="codigo_acceso"
                                        value={formData.codigo_acceso}
                                        onChange={handleChange}
                                        placeholder="Código secreto"
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                    />
                                </div>

                                {/* Coordinates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="latitud" className="text-white">
                                            Latitud (Opcional)
                                        </Label>
                                        <Input
                                            id="latitud"
                                            type="number"
                                            step="0.000001"
                                            value={formData.latitud}
                                            onChange={handleChange}
                                            placeholder="40.4168"
                                            className="bg-slate-800 border-slate-700 text-white mt-2"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="longitud" className="text-white">
                                            Longitud (Opcional)
                                        </Label>
                                        <Input
                                            id="longitud"
                                            type="number"
                                            step="0.000001"
                                            value={formData.longitud}
                                            onChange={handleChange}
                                            placeholder="-3.7038"
                                            className="bg-slate-800 border-slate-700 text-white mt-2"
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">
                                    💡 Añade coordenadas para mostrar tu evento en el mapa interactivo
                                </p>
                                {/* Description */}
                                <div>
                                    <Label htmlFor="descripcion" className="text-white">Descripción</Label>
                                    <Textarea
                                        id="descripcion"
                                        value={formData.descripcion}
                                        onChange={handleChange}
                                        placeholder="Describe tu evento..."
                                        rows={4}
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                    />
                                </div>

                                {/* Rules */}
                                <div>
                                    <Label htmlFor="reglas" className="text-white">Reglas y Formato</Label>
                                    <Textarea
                                        id="reglas"
                                        value={formData.reglas}
                                        onChange={handleChange}
                                        placeholder="Define las reglas del torneo..."
                                        rows={4}
                                        className="bg-slate-800 border-slate-700 text-white mt-2"
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => navigate(-1)}
                                        className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                                        {id ? "Actualizar Evento" : "Crear Evento"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}



