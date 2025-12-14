import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/ui/Button";
import { Card, CardContent } from "../components/ui/Card";
import { Input, Label } from "../components/ui/Input";
import { Gamepad2, Mail, Lock, Eye, EyeOff, User, AtSign } from "lucide-react";
import { motion } from "framer-motion";

function Registro() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        gamertag: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password_confirmation) {
            alert("Las contraseñas no coinciden");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error en el registro");
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
                window.location.href = "/Dashboard";
            } else {
                alert("Registro exitoso, pero no se recibió token");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al registrar la cuenta");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-600/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-600/20 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
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
                    <p className="text-slate-400 mt-2">Crea tu cuenta de jugador</p>
                </div>

                <Card className="bg-slate-900/80 border-purple-500/30 backdrop-blur-xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name */}
                            <div>
                                <Label htmlFor="full_name" className="text-white mb-2 block">
                                    Nombre Completo
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="full_name"
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) => handleChange("full_name", e.target.value)}
                                        placeholder="Tu nombre"
                                        className="bg-slate-800/50 border-slate-700 text-white pl-10 h-12"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Gamertag */}
                            <div>
                                <Label htmlFor="gamertag" className="text-white mb-2 block">
                                    Gamertag
                                </Label>
                                <div className="relative">
                                    <AtSign className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="gamertag"
                                        type="text"
                                        value={formData.gamertag}
                                        onChange={(e) => handleChange("gamertag", e.target.value)}
                                        placeholder="Tu nombre de jugador"
                                        className="bg-slate-800/50 border-slate-700 text-white pl-10 h-12"
                                        required
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Este será tu nombre público en la plataforma</p>
                            </div>

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
                                        className="bg-slate-800/50 border-slate-700 text-white pl-10 h-12"
                                        required
                                    />
                                </div>
                            </div>
                            {/* Password */}
                            <div>
                                <Label htmlFor="password" className="text-white mb-2 block">
                                    Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-slate-800/50 border-slate-700 text-white pl-10 pr-10 h-12"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-1">Mínimo 8 caracteres</p>
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <Label htmlFor="password_confirmation" className="text-white mb-2 block">
                                    Confirmar Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-500" />
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={formData.password_confirmation}
                                        onChange={(e) => handleChange("password_confirmation", e.target.value)}
                                        placeholder="••••••••"
                                        className="bg-slate-800/50 border-slate-700 text-white pl-10 pr-10 h-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-start gap-3">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-800 text-purple-600 focus:ring-purple-500"
                                />
                                <label htmlFor="terms" className="text-sm text-slate-400">
                                    Acepto los{" "}
                                    <a href="#" className="text-purple-400 hover:text-purple-300">Términos de Servicio</a>
                                    {" "}y la{" "}
                                    <a href="#" className="text-purple-400 hover:text-purple-300">Política de Privacidad</a>
                                </label>
                            </div>
                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold text-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creando cuenta...
                                    </div>
                                ) : (
                                    "Crear Cuenta"
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900 text-slate-500">o regístrate con</span>
                                </div>
                            </div>

                            {/* Social Register */}
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-slate-700 text-white hover:bg-slate-800"
                                >
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    Google
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="h-12 border-slate-700 text-white hover:bg-slate-800"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                                    </svg>
                                    Discord
                                </Button>
                            </div>
                        </form>

                        {/* Login Link */}
                        <p className="text-center mt-8 text-slate-400">
                            ¿Ya tienes cuenta?{" "}
                            <Link to="/Login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                                Inicia sesión
                            </Link>
                        </p>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center mt-6 text-slate-500 text-sm">
                    © 2025 GameMap - Joel Martínez Expósito
                </p>
            </motion.div>
        </div>
    );
}

export default Registro;



