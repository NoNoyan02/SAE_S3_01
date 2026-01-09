import React, { useEffect } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";
import ScrollToTop from '@/components/ScrollToTop';
import api from '@/api/axios';

// Importation de toutes les pages
import Accueil from './pages/Accueil.jsx';
import JeDonne from './pages/Je-donne.jsx';
import JeDeviens from './pages/Je-deviens.jsx';
import Formations from './pages/Formations.jsx';
import Donation from './pages/Donation.jsx';
import PageIntrouvable from './pages/Page-introuvable.jsx';
import Dashboard from "./pages/Dashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";

const MainLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1 }}>
                {<Outlet />}
            </main>
            <Footer />
        </div>
    );
};

function App() {

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                const response = await api.get('/csrf_token.php');
                if (response.data && response.data.csrf_token) {
                    api.defaults.headers.common['X-Csrf-Token'] = response.data.csrf_token;
                    console.log("CSRF Token initialized");
                }
            } catch (error) {
                console.error("Error fetching CSRF token:", error);
            }
        };
        fetchCsrfToken();
    }, []);

    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/je-deviens-benevole" element={<JeDeviens />} />
                    <Route path="/je-donne" element={<JeDonne />} />
                    <Route path="/formations" element={<Formations />} />
                    <Route path="/article/:id" element={<ArticleDetail />} />
                    <Route path="*" element={<PageIntrouvable />} />
                </Route>
                <Route path="/faire-un-don/~mon-don" element={<Donation />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute role="Staff">
                        <Dashboard />
                    </ProtectedRoute>
                } />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Routes>
        </>
    );
}

export default App
