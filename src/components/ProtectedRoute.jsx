import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role = 'Admin' }) => {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
        // Pas connecté -> Redirection login
        return <Navigate to="/admin" replace />;
    }

    let user = null;
    try {
        user = JSON.parse(storedUser);
    } catch {
        return <Navigate to="/admin" replace />;
    }

    if (!user) return <Navigate to="/admin" replace />;

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
};

export default ProtectedRoute;
