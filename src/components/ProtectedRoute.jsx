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

        // Vérification du rôle
        if (role && user.role !== role) {
            // Connecté mais mauvais rôle -> Redirection accueil ou login
            return <Navigate to="/" replace />;
        }

        return children;

    } catch (e) {
        // En cas d'erreur de parsing
        return <Navigate to="/admin" replace />;
    }
};

export default ProtectedRoute;
