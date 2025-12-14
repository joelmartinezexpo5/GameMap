import { apiFetch } from "./http";

export const UsuariosAPI = {
    getProfile: () => apiFetch("/user"),
    update: (id, data) => apiFetch(`/usuarios/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
    }),
};
