const API_URL = "http://localhost:8000/api";

// Helpers genéricos
async function get(endpoint, token = null) {
    const res = await fetch(`${API_URL}/${endpoint}`, {
        headers: {
            "Accept": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include"
    });
    if (!res.ok) throw new Error(`Error GET ${endpoint}: ${res.status}`);
    return res.json();
}

async function send(endpoint, method, body = null, token = null) {
    const res = await fetch(`${API_URL}/${endpoint}`, {
        method,
        headers: {
            "Accept": "application/json",
            ...(body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        credentials: "include",
        body: body instanceof FormData ? body : body ? JSON.stringify(body) : null
    });
    const data = await res.json();
    if (!res.ok) throw new Error(`Error ${method} ${endpoint}: ${res.status}`);
    return data;
}

//  Eventos
export const EventosAPI = {
    getAll: (token = null) => get("eventos", token),
    getById: (id, token = null) => get(`eventos/${id}`, token),
    create: (formData, token) => send("eventos", "POST", formData, token),
    update: (id, formData, token) => {
        formData.append("_method", "PUT");
        return send(`eventos/${id}`, "POST", formData, token);
    }
};

//  Juegos
export const JuegosAPI = {
    getAll: (token = null) => get("juegos", token),
    getById: (id, token = null) => get(`juegos/${id}`, token),

    create: (formData, token = null) => send("juegos", "POST", formData, token),

    update: (id, formData, token = null) => {
        formData.append("_method", "PUT"); 
        return send(`juegos/${id}`, "POST", formData, token);
    }
};

//  Plataformas
export const PlataformasAPI = {
    getAll: (token = null) => get("plataformas", token),

    getById: (id, token = null) => get(`plataformas/${id}`, token),

    create: (formData, token = null) => send("plataformas", "POST", formData, token),

    update: (id, formData, token = null) => {
        formData.append("_method", "PUT"); 
        return send(`plataformas/${id}`, "POST", formData, token);
    }
};

//  Comentarios
export const ComentariosAPI = {
    getByEvento: (eventoId, token = null) => get(`comentarios?evento_id=${eventoId}`, token),
    create: (data, token) => send("comentarios", "POST", data, token)
};

//  Participaciones
export const ParticipacionesAPI = {
    join: (eventoId, token) => send("participaciones", "POST", { evento_id: eventoId }, token),
    leave: (participacionId, token) => send(`participaciones/${participacionId}`, "DELETE", null, token)
};

//  Usuarios
export const UsuariosAPI = {
    getAll: (token = null) => get("usuarios", token),
    getById: (id, token = null) => get(`usuarios/${id}`, token),
    create: (formData, token = null) => send("usuarios", "POST", formData, token),
    update: (id, formData, token = null) => {
        formData.append("_method", "PUT");
        return send(`usuarios/${id}`, "POST", formData, token);
    },
    delete: (id, token = null) => send(`usuarios/${id}`, "DELETE", null, token)
};

//  Dashboard
export const DashboardAPI = {
    getUser: (token) => get("user", token),
    getMisEventos: (token) => get("eventos/mios", token),
    getEventosCreados: (token) => get("eventos/creados", token),
    getEventosProximos: (token) => get("eventos/proximos", token),
};

//  Detalle de eventos
export const EventDetailAPI = {
    // Obtener un evento por id
    getById: (id, token = null) => get(`eventos/${id}`, token),

    // Obtener comentarios de un evento
    getComments: (eventoId, token = null) => get(`comentarios?evento_id=${eventoId}`, token),

    // Crear comentario
    addComment: (data, token) => send("comentarios", "POST", data, token),

    // Unirse a un evento
    join: (eventoId, token) => send("participaciones", "POST", { evento_id: eventoId }, token),

    // Abandonar un evento
    leave: (participacionId, token) => send(`participaciones/${participacionId}`, "DELETE", null, token),
};

//  Mapa de eventos
export const EventMapAPI = {
    getAll: (token = null) => get("eventos", token),
};

//  Inicio
export const InicioAPI = {
    getEventos: (token = null) => get("eventos", token),
    getJuegos: (token = null) => get("juegos", token),
};

//  Autenticación
export const AuthAPI = {
    // Login
    login: async (email, password) => {
        const data = await send("login", "POST", { email, password });
        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user_id", data.usuario.id);
            localStorage.setItem("user", JSON.stringify(data.usuario));
        }
        return data;
    },

    // Registro
    register: async (formData) => {
        const data = await send("register", "POST", formData);
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user_id", data.user?.id);
            localStorage.setItem("user", JSON.stringify(data.user));
        }
        return data;
    },

    // Perfil del usuario autenticado
    profile: (token = null) => get("user", token),

    // Logout
    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("user");
    },
};

//  Mensajes y amistades
export const MessagesAPI = {
    // Usuario actual
    getUser: (token) => get("user", token),

    // Mensajes
    getMensajes: (token) => get("mensajes", token),

    // Enviar mensaje
    sendMensaje: (data, token) => send("mensajes", "POST", data, token),

    // Amistades
    getAmistades: (token) => get("amistades", token),

    // Agregar amigo
    addAmigo: (friendId, token) => send("amistades", "POST", { friend_id: friendId }, token),

    // Buscar usuarios
    searchUsuarios: (query, token) => get(`usuarios?search=${query}`, token),
};

//  Panel de administración
export const AdminAPI = {
    // Usuarios
    getUsuarios: (token = null) => get("usuarios", token),
    deleteUsuario: (id, token) => send(`usuarios/${id}`, "DELETE", null, token),
    toggleUsuario: (id, token) => send(`usuarios/${id}/toggle-active`, "PATCH", null, token),

    // Eventos
    getEventos: (token = null) => get("eventos", token),
    aprobarEvento: (id, token) => send(`eventos/${id}/aprobar`, "PUT", null, token),
    deleteEvento: (id, token) => send(`eventos/${id}`, "DELETE", null, token),

    // Juegos
    getJuegos: (token = null) => get("juegos", token),
    deleteJuego: (id, token) => send(`juegos/${id}`, "DELETE", null, token),

    // Plataformas
    getPlataformas: (token = null) => get("plataformas", token),
    deletePlataforma: (id, token) => send(`plataformas/${id}`, "DELETE", null, token),
};

//  Perfil de usuario
export const UserProfileAPI = {
    // Obtener perfil del usuario autenticado
    getProfile: (token = null) => get("user", token),

    // Obtener eventos del usuario
    getMisEventos: (token = null) => get("eventos/mios", token),

    // Actualizar perfil (sin avatar)
    updateProfile: (id, data, token = null) => {
        // Si es JSON simple
        if (!(data instanceof FormData)) {
            return send(`usuarios/${id}`, "PUT", data, token);
        }
        // Si es FormData (ej. avatar + otros campos)
        data.append("_method", "PUT");
        return send(`usuarios/${id}`, "POST", data, token);
    },

    // Subir avatar
    updateAvatar: (formData, token = null) => send("usuario/avatar", "POST", formData, token),
};
