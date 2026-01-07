import React, { useState } from 'react';
import { Menu, Search, User, X, ShieldCheck, Loader2 } from 'lucide-react'; // Ajout de Loader2 pour l'UX

// 🔹 CONFIGURATION (Idéalement dans un fichier .env : process.env.REACT_APP_API_URL)
const API_URL = "http://localhost:8000/api";

const Header = () => {
    // --- 1. STATE MANAGEMENT (Logique & UI) ---
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [submenuPosition, setSubmenuPosition] = useState({ left: 0 });

    // États pour la modale et l'authentification
    const [loginOverlayOpen, setLoginOverlayOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('Invité');
    const [isLoading, setIsLoading] = useState(false); // ✅ Ajout : Feedback visuel pendant la requête

    // Formulaire unifié
    const [formData, setFormData] = useState({
        donorNumber: "",
        nom: "",
        tel: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    // --- 2. DONNÉES DU MENU ---
    const menuItems = [
        {
            title: "Je m'engage",
            subItems: [
                { title: "Je donne", path: "/je-donne" },
                { title: "Je deviens bénévole", path: "/je-deviens-benevole" }
            ]
        },
        {
            title: "Je me forme",
            subItems: [
                { title: "Formations aux premiers secours", path: "/formations" }
            ]
        },
        {
            title: "Je trouve un service",
            subItems: [
                { title: "Aides matérielles", path: "/aides-materielles" }
            ]
        },
        { title: "Nos actualités", path: "/actualites" },
        { title: "Nos adresses", path: "/adresses" },
        { title: "Contactez-nous", path: "/contact" }
    ];

    // --- 3. LOGIQUE MÉTIER (Backend Interactions) ---

    // Gestion du survol pour les sous-menus
    const handleMouseEnter = (index, event) => {
        if (menuItems[index].subItems) {
            const rect = event.currentTarget.getBoundingClientRect();
            setSubmenuPosition({ left: rect.left });
            setActiveSubMenu(index);
        }
    };

    const toggleSubMenu = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };

    // Mise à jour du formulaire
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    // 🚀 C'est ici que le Front parle au Back
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true); // Début du chargement

        // Validation frontend simple
        if (!isLoginMode) {
            const dn = (formData.donorNumber || "").trim();
            if (!dn) {
                setErrorMessage("Veuillez saisir votre numéro donateur.");
                setIsLoading(false);
                return;
            }
        }

        const endpoint = isLoginMode ? "login.php" : "register.php";

        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Erreur serveur");
            }

            // Succès
            setIsLoggedIn(true);
            setUserName(data.user?.full_name || data.user?.email || formData.email);
            setLoginOverlayOpen(false); // Ferme la modale

            // Reset du formulaire
            setFormData({
                donorNumber: "",
                nom: "",
                tel: "",
                email: "",
                password: ""
            });
        } catch (err) {
            setErrorMessage(err.message || "Impossible de contacter le serveur");
        } finally {
            setIsLoading(false); // Fin du chargement quoi qu'il arrive
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('Invité');
        // Optionnel : Appeler une route API logout.php ici si gestion de cookies/session
    };

    // --- 4. RENDU (Frontend UI) ---
    return (
        <header className="header" role="banner">
            {/* Styles CSS encapsulés */}
            <style>{`
                :root {
                    --color-red: #E30613;
                    --color-red-dark: #C5050F;
                    --color-black: #101010;
                    --color-grey: #868686;
                    --color-grey-light: #D9D9D9;
                    --color-grey-bg: #E5E5E5;
                    --color-white: #FFFFFF;
                    --transition-speed: 0.3s;
                    --header-height: 90px;
                }

                .header {
                    width: 100%;
                    background: var(--color-white);
                    position: sticky;
                    top: 0;
                    z-index: 1000;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .navigation-desktop { width: 100%; }
                .header-container { margin: 0 auto; padding: 0 16px; }
                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-height: var(--header-height);
                    gap: 20px;
                }

                /* --- Logo & Nav Desktop --- */
                .left-section { display: flex; align-items: center; gap: 30px; flex: 1; }
                .logo-link { display: flex; align-items: center; flex-shrink: 0; transition: opacity var(--transition-speed); }
                .logo-link:hover { opacity: 0.8; }
                .logo-icon { height: 50px; width: auto; max-width: 200px; }
                
                .nav-desktop { display: none; align-items: center; gap: 0; }
                .nav-item-wrapper { position: relative; }
                .nav-item {
                    padding: 17.5px 16px 18.5px;
                    font-size: 14px; font-weight: 600; color: var(--color-black);
                    text-decoration: none; display: block; position: relative;
                }
                .nav-item:hover { color: var(--color-red); }
                
                .submenu-desktop {
                    position: fixed; top: var(--header-height); left: 0;
                    background: var(--color-white); border-radius: 0 0 8px 8px;
                    padding: 8px 0; display: flex; flex-direction: column;
                    z-index: 1100; min-width: 220px;
                    box-shadow: 0 4px 12px -5px rgba(0,0,0,0.2);
                    animation: slideDown 0.2s ease-out;
                }
                .nav-item-sub {
                    padding: 12px 20px; font-size: 14px; font-weight: 500;
                    color: var(--color-black); text-decoration: none;
                }
                .nav-item-sub:hover { color: var(--color-red); }
                @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }

                /* --- Section Droite & Recherche --- */
                .right-section { display: none; align-items: center; gap: 8px; flex-shrink: 0; }
                .search-wrapper { position: relative; display: none; }
                .search-wrapper.visible { display: block; }
                .search-input {
                    width: 300px; height: 30px; padding: 0 40px 0 16px;
                    background: var(--color-grey-light); border: 1px solid var(--color-grey);
                    border-radius: 20px; font-size: 14px; font-weight: 600; outline: none;
                }
                .search-button {
                    position: absolute; right: 5px; top: 50%; transform: translateY(-50%);
                    background: none; border: none; cursor: pointer;
                }
                .search-icon { width: 16px; height: 16px; color: var(--color-red); }

                /* --- Boutons Donateur & Admin --- */
                .donor-space-button {
                    display: flex; align-items: center; gap: 8px; padding: 8px 12px;
                    font-size: 14px; font-weight: 600; color: var(--color-black);
                    text-decoration: none; background: none; border: none; cursor: pointer;
                }
                .donor-space-button:hover { color: var(--color-red); }
                .donor-icon { width: 16px; height: 16px; color: var(--color-red); }
                
                .donation-button {
                    min-width: 140px; height: 54px; padding: 12px 24px;
                    background: var(--color-red); border-radius: 10px;
                    display: flex; flex-direction: column; align-items: center; justify-content: center;
                    text-decoration: none; color: white; transition: background 0.3s;
                }
                .donation-button:hover { background: var(--color-red-dark); transform: translateY(-2px); }
                .donation-text-small { font-size: 10px; font-weight: 600; }
                .donation-text-large { font-size: 18px; font-weight: 600; }

                /* --- Mobile Menu --- */
                .mobile-menu-button { display: flex; width: 44px; height: 44px; align-items: center; justify-content: center; background: none; border: none; cursor: pointer; }
                .menu-icon { width: 28px; height: 28px; }
                .mobile-menu-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 999; display: none; }
                .mobile-menu-overlay.active { display: block; }
                .mobile-menu {
                    position: fixed; top: 0; left: 0; bottom: 0; width: 75%;
                    background: white; z-index: 1000; transform: translateX(-100%);
                    transition: transform 0.3s ease; padding: 20px;
                }
                .mobile-menu.open { transform: translateX(0); }

                /* --- Modal Login --- */
                .login-overlay {
                    position: fixed; inset: 0; background: rgba(0,0,0,0.6);
                    display: flex; align-items: center; justify-content: center; z-index: 2000;
                }
                .login-modal {
                    background: white; border-radius: 16px; padding: 40px;
                    width: 90%; max-width: 450px; position: relative;
                }
                .close-modal { position: absolute; top: 16px; right: 16px; background: none; border: none; cursor: pointer; }
                .form-group { margin-bottom: 20px; }
                .form-group label { display: block; font-weight: 600; margin-bottom: 8px; }
                .form-group input { width: 100%; height: 44px; padding: 0 16px; border: 1px solid #ccc; border-radius: 8px; }
                .submit-btn {
                    width: 100%; height: 48px; background: var(--color-red); color: white;
                    font-weight: 600; border: none; border-radius: 8px; cursor: pointer;
                    display: flex; align-items: center; justify-content: center; gap: 10px;
                }
                .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }
                .toggle-mode button { background: none; border: none; color: var(--color-red); font-weight: 600; cursor: pointer; text-decoration: underline; }

                /* --- Responsive --- */
                @media (min-width: 768px) { .right-section { display: flex; } }
                @media (min-width: 1024px) { .search-wrapper { display: block !important; } }
                @media (min-width: 1440px) { .donor-space-desktop { display: flex !important; } .nav-desktop { display: flex; } }
                @media (min-width: 1785px) { .mobile-menu-button { display: none; } }
            `}</style>

            <nav aria-label="Navigation principale" role="navigation" className="navigation-desktop">
                <div className="header-container">
                    <div className="header-content">
                        <div className="left-section">
                            <a href="/" className="logo-link" aria-label="Retour à l'accueil">
                                {/* Remplacer par le chemin réel de ton SVG */}
                                <img src="/crf_logo.svg" alt="Logo de la croix rouge" className="logo-icon"/>
                            </a>

                            <nav className="nav-desktop" aria-label="Menu principal">
                                {menuItems.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`nav-item-wrapper ${activeSubMenu === index ? 'active' : ''}`}
                                        onMouseEnter={(e) => handleMouseEnter(index, e)}
                                        onMouseLeave={() => item.subItems && setActiveSubMenu(null)}
                                    >
                                        {item.subItems ? (
                                            <>
                                                <a href="#" className="nav-item" onClick={(e) => e.preventDefault()}>
                                                    {item.title}
                                                </a>
                                                {activeSubMenu === index && (
                                                    <div
                                                        className="submenu-desktop"
                                                        style={{ left: `${submenuPosition.left}px` }}
                                                        onMouseEnter={() => setActiveSubMenu(index)}
                                                        onMouseLeave={() => setActiveSubMenu(null)}
                                                    >
                                                        {item.subItems.map((sub, subIndex) => (
                                                            <a key={subIndex} href={sub.path} className="nav-item-sub">
                                                                {sub.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <a href={item.path} className="nav-item">{item.title}</a>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        <div className="right-section">
                            <div className="search-wrapper">
                                <input type="search" placeholder="Recherche ..." className="search-input" aria-label="Rechercher" />
                                <button className="search-button" aria-label="Lancer la recherche">
                                    <Search className="search-icon" />
                                </button>
                            </div>

                            {!isLoggedIn ? (
                                <button onClick={() => setLoginOverlayOpen(true)} className="donor-space-button donor-space-desktop">
                                    <User className="donor-icon"/> <span>Espace donateur</span>
                                </button>
                            ) : (
                                <div className="user-profile-desktop" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <User className="donor-icon"/>
                                    <span className="user-name" style={{ fontWeight: 'bold' }}>{userName}</span>
                                    <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
                                </div>
                            )}

                            <a href="/admin" className="donor-space-button donor-space-desktop">
                                <ShieldCheck className="donor-icon"/> <span>Administrateur</span>
                            </a>

                            <a href="faire-un-don/~mon-don" className="donation-button">
                                <span className="donation-text-small">Pour soutenir la Croix-Rouge</span>
                                <span className="donation-text-large">Je fais un don</span>
                            </a>
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="mobile-menu-button"
                            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                        >
                            {mobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
                        </button>
                    </div>
                </div>

                {/* MODALE DE LOGIN / INSCRIPTION */}
                {loginOverlayOpen && (
                    <div className="login-overlay" onClick={() => setLoginOverlayOpen(false)}>
                        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                            <button className="close-modal" onClick={() => setLoginOverlayOpen(false)}>
                                <X size={24}/>
                            </button>

                            <div className="login-header">
                                <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>
                                <p>Accédez à votre espace donateur</p>
                            </div>

                            <form onSubmit={handleLogin}>
                                {!isLoginMode && (
                                    <>
                                        <div className="form-group">
                                            <label htmlFor="donorNumber">Numéro donateur</label>
                                            <input type="text" id="donorNumber" value={formData.donorNumber} placeholder="Ex: 12345678" onChange={handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nom">Nom complet</label>
                                            <input type="text" id="nom" value={formData.nom} placeholder="Jean Dupont" required onChange={handleInputChange}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Téléphone</label>
                                            <input type="tel" id="tel" value={formData.tel} placeholder="06 12 34 56 78" onChange={handleInputChange}/>
                                        </div>
                                    </>
                                )}

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" value={formData.email} placeholder="exemple@email.com" required onChange={handleInputChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input type="password" id="password" value={formData.password} placeholder="••••••••" required onChange={handleInputChange}/>
                                </div>

                                {isLoginMode && (
                                    <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                                )}

                                {errorMessage && (
                                    <p style={{ color: "var(--color-red)", fontSize: "14px", textAlign: "center", marginBottom: "10px" }}>
                                        {errorMessage}
                                    </p>
                                )}

                                <button type="submit" className="submit-btn" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" size={20}/> : (isLoginMode ? 'Se connecter' : "S'inscrire")}
                                </button>

                                <div className="toggle-mode">
                                    {isLoginMode ? (
                                        <p>Pas encore de compte ? <button type="button" onClick={() => setIsLoginMode(false)}>S'inscrire</button></p>
                                    ) : (
                                        <p>Déjà un compte ? <button type="button" onClick={() => setIsLoginMode(true)}>Se connecter</button></p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MENU MOBILE */}
                <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)} />
                <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
                    <div className="mobile-menu-content">
                        <div className="search-wrapper-mobile" style={{ marginBottom: '20px' }}>
                            <input type="search" placeholder="Recherche ..." className="search-input-mobile" style={{ width: '100%', padding: '10px', borderRadius: '20px', border: '1px solid #ccc' }} />
                        </div>

                        <nav className="mobile-nav">
                            {menuItems.map((item, index) => (
                                <div key={index}>
                                    {item.subItems ? (
                                        <>
                                            <div className="nav-item-mobile" onClick={() => toggleSubMenu(index)} style={{ padding: '15px 0', fontWeight: '600' }}>
                                                {item.title}
                                            </div>
                                            {activeSubMenu === index && (
                                                <div className="submenu-mobile" style={{ paddingLeft: '20px' }}>
                                                    {item.subItems.map((sub, subIndex) => (
                                                        <a key={subIndex} href={sub.path} className="nav-item-mobile-sub" onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', padding: '10px 0' }}>
                                                            {sub.title}
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <a href={item.path} className="nav-item-mobile" onClick={() => setMobileMenuOpen(false)} style={{ display: 'block', padding: '15px 0', fontWeight: '600', color: 'black', textDecoration: 'none' }}>
                                            {item.title}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </nav>

                        {/* Boutons Mobile Spécifiques */}
                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <a href="/espace-donateur" className="donor-space-button-mobile" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'black', fontWeight: '600' }}>
                                <User className="donor-icon-mobile" color="#E30613" /> <span>Espace donateur</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;