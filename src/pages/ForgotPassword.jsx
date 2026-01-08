import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await fetch('http://localhost:8000/api/forgot_password.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await res.json();

            // On affiche toujours le message de succès pour sécurité
            setMessage(data.message || "Si le compte existe, un email a été envoyé.");
        } catch (error) {
            setMessage("Une erreur est survenue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            background: '#F7FAFC'
        }}>
            <div style={{
                background: 'white', padding: '40px', borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '20px', color: '#1A202C' }}>Mot de passe oublié</h2>
                <p style={{ marginBottom: '20px', color: '#718096', fontSize: '14px' }}>
                    Entrez votre email pour recevoir un lien de réinitialisation.
                </p>

                {message ? (
                    <div style={{ padding: '15px', background: '#DEF7EC', color: '#03543F', borderRadius: '6px', marginBottom: '20px' }}>
                        {message}
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%', padding: '10px', borderRadius: '6px',
                                    border: '1px solid #E2E8F0', outline: 'none'
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                width: '100%', padding: '12px', background: '#ED1B24', color: 'white',
                                border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Envoi...' : 'Envoyer le lien'}
                        </button>
                    </form>
                )}

                <div style={{ marginTop: '20px' }}>
                    <Link to="/" style={{ color: '#ED1B24', textDecoration: 'none', fontSize: '14px' }}>Retour à l'accueil</Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
