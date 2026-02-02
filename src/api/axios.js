import axios from 'axios';

const api = axios.create({
    baseURL: '/api', // Utilise le proxy Vite défini dans vite.config.js
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true 
});

export default api;
