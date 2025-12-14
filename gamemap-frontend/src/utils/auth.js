export const setToken = (token) => {
    localStorage.setItem('auth_token', token);
};

export const getToken = () => {
    return localStorage.getItem('token');
};

export const removeToken = () => {
    localStorage.removeItem('token');
};

export const fetchWithAuth = (url, options = {}) => {
    const token = getToken();
    const headers = {
        ...options.headers,
    };

    // Solo añadir Content-Type si no es FormData
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return fetch(url, {
        ...options,
        credentials: 'include',
        headers,
    });
};
