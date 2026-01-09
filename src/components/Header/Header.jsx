import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, User, X, ShieldCheck } from 'lucide-react';
import styles from './Header.module.css';

import api from '@/api/axios';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [submenuPosition, setSubmenuPosition] = useState({ left: 0 });

    // --- NOUVEAU : État pour la barre de recherche déroulante ---
    const [searchExpanded, setSearchExpanded] = useState(false);
    const searchInputRef = useRef(null);
    // ------------------------------------------------------------

    const [loginOverlayOpen, setLoginOverlayOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('Invité');

    const [formData, setFormData] = useState({
        donorNumber: "",
        nom: "",
        tel: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

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

    // Focus automatique sur l'input quand on ouvre la recherche
    useEffect(() => {
        if (searchExpanded && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchExpanded]);

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

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const toggleSearch = () => {
        setSearchExpanded(!searchExpanded);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        const endpoint = isLoginMode ? "login.php" : "register.php";
        try {
            const response = await api.post(`/${endpoint}`, formData);
            const data = response.data;
            
            setIsLoggedIn(true);
            setUserName(data.user?.full_name || data.user?.email || formData.email);
            setLoginOverlayOpen(false);
            setFormData({ donorNumber: "", nom: "", tel: "", email: "", password: "" });
        } catch (err) {
            const errorMessage = err.response?.data?.error || "Impossible de contacter le serveur";
            setErrorMessage(errorMessage);
            console.error(err);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <>
            <header className={styles.header} role="banner">
                <nav aria-label="Navigation principale" role="navigation" className={styles.navigationDesktop}>
                    <div className={styles.headerContainer}>
                        <div className={styles.headerContent}>

                            {/* Section Gauche : Logo + Nav Desktop */}
                            <div className={styles.leftSection}>
                                <a href="/" className={styles.logoLink} aria-label="Retour à l'accueil">
                                    <img src="/crf_logo.svg" alt="Logo de la croix rouge" className={styles.logoIcon} />
                                </a>

                                <nav className={styles.navDesktop} aria-label="Menu principal">
                                    {menuItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className={`${styles.navItemWrapper} ${activeSubMenu === index ? styles.active : ''}`}
                                            onMouseEnter={(e) => handleMouseEnter(index, e)}
                                            onMouseLeave={() => item.subItems && setActiveSubMenu(null)}
                                        >
                                            {item.subItems ? (
                                                <>
                                                    <a href="#" className={styles.navItem} onClick={(e) => e.preventDefault()}>
                                                        {item.title}
                                                    </a>
                                                    {activeSubMenu === index && (
                                                        <div
                                                            className={styles.submenuDesktop}
                                                            style={{ left: `${submenuPosition.left}px` }}
                                                            onMouseEnter={() => setActiveSubMenu(index)}
                                                            onMouseLeave={() => setActiveSubMenu(null)}
                                                        >
                                                            {item.subItems.map((sub, subIndex) => (
                                                                <a key={subIndex} href={sub.path} className={styles.navItemSub}>
                                                                    {sub.title}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <a href={item.path} className={styles.navItem}>
                                                    {item.title}
                                                </a>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>

                            {/* Section Droite : Recherche (Expandable) + User + Dons */}
                            <div className={styles.rightSection}>

                                {/* --- BARRE DE RECHERCHE DÉROULANTE --- */}
                                <div className={`${styles.searchWrapper} ${searchExpanded ? styles.expanded : ''}`}>
                                    <div className={styles.inputContainer}>
                                        <input
                                            ref={searchInputRef}
                                            type="search"
                                            placeholder="Rechercher..."
                                            className={styles.searchInput}
                                            aria-label="Rechercher sur le site"
                                            // Empêcher le tab d'aller dedans si caché
                                            tabIndex={searchExpanded ? 0 : -1}
                                        />
                                    </div>
                                    <button
                                        className={styles.searchToggleButton}
                                        aria-label={searchExpanded ? "Fermer la recherche" : "Ouvrir la recherche"}
                                        onClick={toggleSearch}
                                    >
                                        {searchExpanded ?
                                            <X className={styles.searchIcon} /> :
                                            <Search className={styles.searchIcon} />
                                        }
                                    </button>
                                </div>
                                {/* ------------------------------------- */}

                                {!isLoggedIn ? (
                                    <button onClick={() => setLoginOverlayOpen(true)} className={`${styles.donorSpaceButton} ${styles.donorSpaceDesktop}`}>
                                        <User className={styles.donorIcon} /> <span>Espace donateur</span>
                                    </button>
                                ) : (
                                    <div className={styles.userProfileDesktop}>
                                        <User className={styles.donorIcon} />
                                        <span className={styles.userName}>{userName}</span>
                                        <button onClick={handleLogout} className={styles.logoutBtn}>Déconnexion</button>
                                    </div>
                                )}

                                <a href="/espace-donateur" className={`${styles.donorSpaceButton} ${styles.donorSpaceMobileTablet}`}>
                                    <User className={styles.donorIcon} /> <span>Espace donateur</span>
                                </a>

                                <a href="faire-un-don/~mon-don" className={styles.donationButton}>
                                    <span className={styles.donationTextSmall}>Pour soutenir la Croix-Rouge</span>
                                    <span className={styles.donationTextLarge}>Je fais un don</span>
                                </a>
                            </div>

                            {/* Bouton Menu Mobile */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className={styles.mobileMenuButton}
                                aria-label="Menu"
                            >
                                {mobileMenuOpen ? <X className={styles.menuIcon} /> : <Menu className={styles.menuIcon} />}
                            </button>
                        </div>
                    </div>

                    {/* Overlay Login (Identique à avant) */}
                    {loginOverlayOpen && (
                        <div className={styles.loginOverlay} onClick={() => setLoginOverlayOpen(false)}>
                            <div className={styles.loginModal} onClick={(e) => e.stopPropagation()}>
                                <button className={styles.closeModal} onClick={() => setLoginOverlayOpen(false)}>
                                    <X size={24} />
                                </button>
                                <div className={styles.loginHeader}>
                                    <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>
                                    <p>Accédez à votre espace donateur</p>
                                </div>
                                <form onSubmit={handleLogin}>
                                    {!isLoginMode && (
                                        <>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="donorNumber">Numéro donateur</label>
                                                <input type="text" id="donorNumber" value={formData.donorNumber} onChange={handleInputChange} />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="nom">Nom complet</label>
                                                <input type="text" id="nom" value={formData.nom} required onChange={handleInputChange} />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="tel">Téléphone</label>
                                                <input type="tel" id="tel" value={formData.tel} onChange={handleInputChange} />
                                            </div>
                                        </>
                                    )}
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={formData.email} required onChange={handleInputChange} />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="password">Mot de passe</label>
                                        <input type="password" id="password" value={formData.password} required onChange={handleInputChange} />
                                    </div>
                                    {isLoginMode && <a href="#" className={styles.forgotPassword}>Mot de passe oublié ?</a>}
                                    {errorMessage && <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>{errorMessage}</p>}
                                    <button type="submit" className={styles.submitBtn}>{isLoginMode ? 'Se connecter' : "S'inscrire"}</button>
                                    <div className={styles.toggleMode}>
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

                    {/* Menu Mobile (Identique à avant) */}
                    <div className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.active : ''}`} onClick={() => setMobileMenuOpen(false)}>
                        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.mobileMenuContent}>
                                <div className={styles.searchWrapperMobile}>
                                    <input type="search" placeholder="Recherche ..." className={styles.searchInputMobile} />
                                    <button className={styles.searchButtonMobile}>
                                        <Search className={styles.searchIconMobile} />
                                    </button>
                                </div>
                                <nav className={styles.mobileNav}>
                                    {menuItems.map((item, index) => (
                                        <div key={index}>
                                            {item.subItems ? (
                                                <>
                                                    <div className={styles.navItemMobile} onClick={() => toggleSubMenu(index)}>{item.title}</div>
                                                    {activeSubMenu === index && (
                                                        <div className={styles.submenuMobile}>
                                                            {item.subItems.map((sub, subIndex) => (
                                                                <a key={subIndex} href={sub.path} className={styles.navItemMobileSub} onClick={() => setMobileMenuOpen(false)}>{sub.title}</a>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <a href={item.path} className={styles.navItemMobile} onClick={() => setMobileMenuOpen(false)}>{item.title}</a>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                                <a href="/admin" className={styles.donorSpaceButtonMobile}>
                                    <ShieldCheck className={styles.donorIconMobile} /> <span>Administrateur</span>
                                </a>
                                <a href="/espace-donateur" className={styles.donorSpaceButtonMobile}>
                                    <User className={styles.donorIconMobile} /> <span>Espace donateur</span>
                                </a>
                                <a href="faire-un-don/~mon-don" className={styles.donationButtonMobile}>
                                    <span className={styles.donationTextSmallMobile}>Pour soutenir la Croix-Rouge</span>
                                    <span className={styles.donationTextLargeMobile}>Je fais un don</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};