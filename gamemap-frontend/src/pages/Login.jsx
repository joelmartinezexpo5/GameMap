import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input, Label } from "../components/ui/Input";
import { Gamepad2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { AuthAPI } from "../services/api";

export default function Login() {
    const [mostrarContraseña, setMostrarContraseña] = useState(false);
    const [cargando, setCargando] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });

    const handleChange = (campo, valor) => {
        setFormData(prev => ({ ...prev, [campo]: valor }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const data = await AuthAPI.login(formData.email, formData.password);
            if (data.access_token) {
                window.location.href = "/Dashboard";
            } else {
                alert(data.message || "Error al iniciar sesión");
            }
        } catch (error) {
            console.error("Error en login:", error);
            alert("No se pudo conectar con el servidor");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Fondo animado */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-cyan-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/Home" className="inline-flex items-center gap-3 group">
                        <div>
                            <img
                                src="/logo_pequeño.png"
                                alt="Mi Logo"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <span className="text-4xl font-black bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            GameMap
                        </span>
                    </Link>
                    <p className="text-slate-400 mt-2">Inicia sesión en tu cuenta</p>
                </div>

                <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <Label htmlFor="email" className="text-white mb-2 block">
                                    Correo Electrónico
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="tu@email.com"
                                        className="bg-slate-800/50 border-slate-700 text-white pl-9 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Contraseña */}
                            <div>
                                <Label htmlFor="password" className="text-white mb-2 block">
                                    Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="password"
                                        type={mostrarContraseña ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-slate-800/50 border-slate-700 text-white pl-9 pr-12 h-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {mostrarContraseña ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Olvidé mi contraseña */}
                            <div className="text-right">
                                <a href="#" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            {/* Botón de enviar */}
                            <Button
                                type="submit"
                                disabled={cargando}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg"
                            >
                                {cargando ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Iniciando...
                                    </div>
                                ) : (
                                    "Iniciar Sesión"
                                )}
                            </Button>

                            {/* Separador */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900 text-slate-500">o continúa con</span>
                                </div>
                            </div>

                            {/* Login social */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-slate-700 text-white hover:bg-slate-800"
                                >
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-slate-700 text-white hover:bg-slate-800"
                                >
                                    Discord
                                </Button>
                            </div>
                        </form>

                        {/* Link a registro */}
                        <p className="text-center mt-8 text-slate-400">
                            ¿No tienes cuenta?{" "}
                            <Link to="/Register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                Regístrate gratis
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                {/* Pie de página */}
                <p className="text-center mt-6 text-slate-500 text-sm">
                    © 2025 GameMap - Joel Martínez Expósito
                </p>
            </motion.div>
        </div>
    );
}
