const API_URL = "http://localhost:8000/api";

export async function apiFetch(endpoint, options = {}) {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "/Login";
        return;
    }

    const headers = {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        ...options.headers,
    };

    const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
    if (!res.ok) throw new Error(`Error ${res.status}`);
    return res.json();
}
