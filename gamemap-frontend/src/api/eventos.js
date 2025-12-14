import { apiFetch } from "./http";

export const EventosAPI = {
  getAll: () => apiFetch("/eventos"),
  misEventos: () => apiFetch("/eventos/mios"),
  creados: () => apiFetch("/eventos/creados"),
  proximos: () => apiFetch("/eventos/proximos"),
};
