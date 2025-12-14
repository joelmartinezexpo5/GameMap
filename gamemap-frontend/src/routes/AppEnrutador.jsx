import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "../pages/Inicio";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import BrowseEvents from "../pages/BrowseEvents";
import EventDetail from "../pages/EventDetail";
import CrearEvento from "../pages/CrearEvento";
import EventMap from "../pages/EventMap";
import UserProfile from "../pages/PerfilUsuario";
import Messages from "../pages/Mensajes";
import Layout from "../components/Layout";
import PanelAdmin from "../pages/PanelAdmin";
import CreateEvent from "../pages/CrearEvento";
import CrearJuego from "../pages/CrearJuego";
import CrearPlataforma from "../pages/CrearPlataforma";
import CrearUsuario from "../pages/CrearUsuario";

function AppEnrutador() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {/* Página principal */}
                    <Route path="/" element={<Inicio />} />

                    {/* Autenticación */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Registro />} />

                    {/* Dashboard */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Browse Events */}
                    <Route path="/eventos" element={<BrowseEvents />} />
                    <Route path="/eventos/:id" element={<EventDetail />} />
                    <Route path="/eventos/crear" element={<CrearEvento />} />

                    {/* Event Map */}
                    <Route path="mapa" element={<EventMap />} />

                    {/* Perfil Usuario */}
                    <Route path="perfil" element={<UserProfile />} />

                    {/* Mensajes */}
                    <Route path="mensajes" element={<Messages />} />

                    {/* Panel Admin */}
                    <Route path="/admin" element={<PanelAdmin />} />
                    <Route path="/admin/eventos/crear" element={<CreateEvent />} />
                    <Route path="/admin/eventos/:id/editar" element={<CreateEvent />} />
                    <Route path="/usuarios/create" element={<CrearUsuario />} />
                    <Route path="/usuarios/:id/edit" element={<CrearUsuario />} />


                    {/* Juegos */}
                    <Route path="/admin/juegos/crear" element={<CrearJuego />} />
                    <Route path="/admin/juegos/:id/editar" element={<CrearJuego />} />

                    {/* Plataformas */}
                    <Route path="/admin/plataformas/crear" element={<CrearPlataforma />} />
                    <Route path="/admin/plataformas/:id/editar" element={<CrearPlataforma />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default AppEnrutador;
