import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";

// Importar páginas
import Inicio from "@/pages/Inicio";
import Login from "@/pages/Login";
import Registro from "@/pages/Registro";
import Dashboard from "@/pages/Dashboard";
// import BrowseEvents from "@/pages/BrowseEvents";
// import EventMap from "@/pages/EventMap";
// import CreateEvent from "@/pages/CreateEvent";
// import UserProfile from "@/pages/UserProfile";
// import Messages from "@/pages/MensajesAmigos";
// import AdminPanel from "@/pages/PanelAdmin";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Páginas con layout */}
        {/* <Route
          path="/dashboard"
          element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>}
        /> */}
        {/* <Route
          path="/explorar"
          element={<Layout currentPageName="BrowseEvents"><BrowseEvents /></Layout>}
        />
        <Route
          path="/mapa-evento"
          element={<Layout currentPageName="EventMap"><EventMap /></Layout>}
        />
        <Route
          path="/crear-evento"
          element={<Layout currentPageName="CreateEvent"><CreateEvent /></Layout>}
        />
        <Route
          path="/perfil"
          element={<Layout currentPageName="UserProfile"><UserProfile /></Layout>}
        />
        <Route
          path="/mensajes"
          element={<Layout currentPageName="Messages"><Messages /></Layout>}
        />
        <Route
          path="/admin"
          element={<Layout currentPageName="AdminPanel"><AdminPanel /></Layout>}
        /> */}
      </Routes>
    </Router>
  );
}
