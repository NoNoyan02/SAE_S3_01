import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Erreur de connexion');
                return;
            }

            if (data.user.role !== 'Admin') {
                setError('Accès réservé aux administrateurs.');
                return;
            }

            // Succès
            localStorage.setItem('user', JSON.stringify(data.user));
            window.location.href = '/admin/dashboard';

        } catch (err) {
            setError('Erreur serveur. Veuillez réessayer.');
        }
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            minHeight: '80vh', background: '#F4F7F9'
        }}>
            <div style={{
                background: 'white', padding: '40px', borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center'
            }}>
                <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{
                        width: '60px', height: '60px', background: '#ED1B24', borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}>
                        <ShieldCheck size={32} />
                    </div>
                </div>
                <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '10px', color: '#1A1C23' }}>Administration</h1>
                <p style={{ color: '#718096', marginBottom: '30px' }}>Connectez-vous pour accéder au tableau de bord</p>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0',
                                fontSize: '14px', outline: 'none'
                            }}
                        />
                    </div>
                    <div style={{ textAlign: 'left' }}>
                        <label style={{ fontSize: '13px', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0',
                                fontSize: '14px', outline: 'none'
                            }}
                        />
                    </div>

                    {error && <div style={{ color: '#E53E3E', fontSize: '13px', background: '#FFF5F5', padding: '10px', borderRadius: '8px' }}>{error}</div>}

                    <button type="submit" style={{
                        background: '#1A1C23', color: 'white', border: 'none', padding: '12px',
                        borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'
                    }}>
                        Se connecter
                    </button>
                    <a href="/" style={{ fontSize: '12px', color: '#718096', textDecoration: 'none', marginTop: '10px' }}>Retour au site</a>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
