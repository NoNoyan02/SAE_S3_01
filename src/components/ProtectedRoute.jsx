import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role = 'Admin' }) => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
        // Pas connecté -> Redirection login
        return <Navigate to="/admin" replace />;
    }

    try {
        const user = JSON.parse(storedUser);

        // Si on demande un rôle spécifique
        if (role) {
            // Cas "Staff" : tout sauf Donateur
            if (role === 'Staff' && user.role === 'Donateur') {
                return <Navigate to="/" replace />;
            }

            // Cas précis (pourrait être un tableau ou une chaine)
            if (role !== 'Staff' && user.role !== role) {
                return <Navigate to="/" replace />;
            }
        }

        return children;

    } catch (e) {
        // En cas d'erreur de parsing
        return <Navigate to="/admin" replace />;
    }
};

export default ProtectedRoute;
