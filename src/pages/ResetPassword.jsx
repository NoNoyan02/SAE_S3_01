import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState((!token || !email) ? "Lien invalide ou manquant." : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (password !== confirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const res = await api.post('/reset_password.php', { email, token, password });
            const data = res.data;

            if (res.status === 200) {
                setMessage("Mot de passe modifié ! Redirection...");
                setTimeout(() => navigate('/'), 3000);
            } else {
                setError(data.error || "Erreur lors de la réinitialisation.");
            }
        } catch {
            setError("Erreur serveur.");
        }
    };

    if (!token || !email) return <div style={{ textAlign: 'center', marginTop: 50 }}>Lien invalide.</div>;

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            background: '#F7FAFC'
        }}>
            <div style={{
                background: 'white', padding: '40px', borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px'
            }}>
                <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Nouveau mot de passe</h2>

                {message && <div style={{ padding: '10px', background: '#DEF7EC', color: '#03543F', marginBottom: 15, borderRadius: 6 }}>{message}</div>}
                {error && <div style={{ padding: '10px', background: '#FDE8E8', color: '#9B1C1C', marginBottom: 15, borderRadius: 6 }}>{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '15px' }}>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14, fontWeight: 600 }}>Nouveau mot de passe</label>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #E2E8F0' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: 5, fontSize: 14, fontWeight: 600 }}>Confirmer</label>
                        <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #E2E8F0' }} />
                    </div>
                    <button type="submit" style={{
                        width: '100%', padding: '12px', background: '#ED1B24', color: 'white',
                        border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                    }}>
                        Changer le mot de passe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
