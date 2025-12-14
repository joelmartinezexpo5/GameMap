import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Home,
    Compass,
    Plus,
    User,
    MessageSquare,
    Settings,
    LogOut,
    Gamepad2,
    Shield,
    MapPin
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/Dropdown";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export default function Layout({ children, currentPageName }) {
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            return;
        }

        fetch("http://localhost:8000/api/user", {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
            },
        })
            .then(res => res.ok ? res.json() : null)
            .then(data => {
                setUser(data);
                setLoading(false);
            })
            .catch(() => {
                setUser(null);
                setLoading(false);
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    const publicPages = ["Home", "AuthLogin", "Register"];
    const isPublicPage = publicPages.includes(currentPageName);
    const isAuthPage = ["AuthLogin", "Register"].includes(currentPageName);

    if (loading && !isPublicPage) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 flex flex-col">
            <style>{`
        :root {
          --primary: 270 100% 60%;
          --accent: 280 100% 70%;
        }
      `}</style>

            {/* Public Header */}
            {isPublicPage && !isAuthPage && (
                <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link to="/" className="flex items-center gap-2 group">
                                <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
                                    <img
                                        src="/logo_pequeño.png"
                                        alt="Mi Logo"
                                        className="w-6 h-6 object-contain"
                                    />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    GameMap
                                </span>
                            </Link>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center gap-6">
                                <Link to="/Home" className="text-slate-300 hover:text-white transition-colors">
                                    Inicio
                                </Link>
                                <Link to="/eventos" className="text-slate-300 hover:text-white transition-colors">
                                    Eventos
                                </Link>
                                <Link to="/mapa" className="text-slate-300 hover:text-white transition-colors">
                                    Mapa
                                </Link>
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-3">
                                {user ? (
                                    <span className="text-slate-300">👤 {user.full_name}</span>
                                ) : (
                                    <>
                                        <Link to="/AuthLogin">
                                            <Button variant="ghost" className="text-slate-300 hover:text-white">
                                                Iniciar Sesión
                                            </Button>
                                        </Link>
                                        <Link to="/Register">
                                            <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500">
                                                Registrarse
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            )}
            {/* Navigation Bar (private pages) */}
            {!isPublicPage && user && (
                <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-purple-500/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <Link to="/dashboard" className="flex items-center gap-2 group">
                                <div>
                                    <img
                                        src="/logo_pequeño.png"
                                        alt="Mi Logo"
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                    GameMap
                                </span>
                            </Link>

                            {/* Navigation Links */}
                            <div className="hidden md:flex items-center gap-1">
                                <Link to="/dashboard">
                                    <Button
                                        variant="ghost"
                                        className={`gap-2 ${isActive("dashboard")
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <Home className="w-4 h-4" />
                                        Dashboard
                                    </Button>
                                </Link>

                                <Link to="/eventos">
                                    <Button
                                        variant="ghost"
                                        className={`gap-2 ${isActive("BrowseEvents")
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <Compass className="w-4 h-4" />
                                        Explorar
                                    </Button>
                                </Link>

                                <Link to="/mapa">
                                    <Button
                                        variant="ghost"
                                        className={`gap-2 ${isActive("EventMap")
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <MapPin className="w-4 h-4" />
                                        Mapa
                                    </Button>
                                </Link>

                                <Link to="/eventos/crear">
                                    <Button
                                        variant="ghost"
                                        className={`gap-2 ${isActive("CreateEvent")
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <Plus className="w-4 h-4" />
                                        Crear
                                    </Button>
                                </Link>

                                <Link to="/mensajes">
                                    <Button
                                        variant="ghost"
                                        className={`gap-2 ${isActive("Messages")
                                            ? "bg-purple-500/20 text-purple-400"
                                            : "text-slate-300 hover:text-white hover:bg-slate-800"
                                            }`}
                                    >
                                        <MessageSquare className="w-4 h-4" />
                                        Mensajes
                                    </Button>
                                </Link>
                            </div>
                            {/* User Menu */}
                            {user ? (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="gap-2">
                                            <Avatar className="w-8 h-8 border-2 border-purple-500">
                                                <AvatarImage src={user?.avatar_url} />
                                                <AvatarFallback className="bg-gradient-to-br from-purple-600 to-cyan-600 text-white">
                                                    {user?.gamertag?.[0] || user?.full_name?.[0] || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="hidden md:inline text-slate-300">
                                                {user?.gamertag || user?.full_name || "Usuario"}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-slate-900 border-purple-500/20">
                                        <DropdownMenuItem
                                            onClick={() => navigate("/perfil")}
                                            className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-800 flex items-center"
                                        >
                                            <User className="w-4 h-4 mr-2" />
                                            Mi Perfil
                                        </DropdownMenuItem>

                                        {user?.role === "admin" && (
                                            <DropdownMenuItem
                                                onClick={() => navigate("/admin")}
                                                className="cursor-pointer text-purple-400 hover:text-purple-300 hover:bg-slate-800 flex items-center"
                                            >
                                                <Shield className="w-4 h-4 mr-2" />
                                                Admin Panel
                                            </DropdownMenuItem>
                                        )}
                                        <DropdownMenuSeparator className="bg-purple-500/20" />

                                        <DropdownMenuItem
                                            onClick={handleLogout}
                                            className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-slate-800"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Cerrar Sesión
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                <Button
                                    onClick={() => navigate("/AuthLogin")}
                                    className="bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    Iniciar sesión
                                </Button>
                            )}
                        </div>
                    </div>
                </nav>
            )}

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer (only on authenticated pages) */}
            {!isPublicPage && user && (
                <footer className="bg-slate-950/50 backdrop-blur-sm border-t border-purple-500/20 py-8 mt-auto">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2 mb-3">
                                    <div>
                                        <img
                                            src="/logo_pequeño.png"
                                            alt="Mi Logo"
                                            className="w-12 h-12 object-contain"
                                        />
                                    </div>
                                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                        GameMap
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm">
                                    Conectando la comunidad gamer global
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2 text-sm">Enlaces Rápidos</h3>
                                <ul className="space-y-1 text-xs text-slate-400">
                                    <li>
                                        <Link to="/dashboard" className="hover:text-purple-400 transition-colors">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/eventos" className="hover:text-purple-400 transition-colors">
                                            Explorar Eventos
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/eventos/crear" className="hover:text-purple-400 transition-colors">
                                            Crear Evento
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-white font-semibold mb-2 text-sm">Legal</h3>
                                <ul className="space-y-1 text-xs text-slate-400">
                                    <li className="hover:text-purple-400 cursor-pointer transition-colors">Términos</li>
                                    <li className="hover:text-purple-400 cursor-pointer transition-colors">Privacidad</li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-purple-500/20 pt-4 text-center">
                            <p className="text-slate-500 text-xs">
                                © 2025 GameMap - Joel Martínez Expósito
                            </p>
                        </div>
                    </div>
                </footer>
            )}
        </div>
    );
}


