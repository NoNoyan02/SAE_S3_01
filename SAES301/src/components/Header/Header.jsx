import React, {useState} from 'react';
// Ajout de ShieldCheck dans les imports pour l'icône Administrateur
import {Menu, Search, User, X, ShieldCheck} from 'lucide-react';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [submenuPosition, setSubmenuPosition] = useState({left: 0});
    const [loginOverlayOpen, setLoginOverlayOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('Invité');

    const menuItems = [
        {
            title: "Je m'engage",
            subItems: [
                {title: "Je donne", path: "/je-donne"},
                {title: "Je deviens bénévole", path: "/je-deviens-benevole"}
            ]
        },
        {
            title: "Je me forme",
            subItems: [
                {title: "Formations aux premiers secours", path: "/formations"}
            ]
        },
        {
            title: "Je trouve un service",
            subItems: [
                {title: "Aides matérielles", path: "/aides-materielles"}
            ]
        },
        {title: "Nos actualités", path: "/actualites"},
        {title: "Nos adresses", path: "/adresses"},
        {title: "Contactez-nous", path: "/contact"}
    ];

    const handleMouseEnter = (index, event) => {
        if (menuItems[index].subItems) {
            const rect = event.currentTarget.getBoundingClientRect();
            setSubmenuPosition({left: rect.left});
            setActiveSubMenu(index);
        }
    };

    const toggleSubMenu = (index) => {
        setActiveSubMenu(activeSubMenu === index ? null : index);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        setUserName('Invité');
        setLoginOverlayOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <header className="header" role="banner">
            {/* DÉBUT DU CSS INTÉGRÉ */}
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

                .navigation-desktop {
                    width: 100%;
                }

                .header-container {
                    margin: 0 auto;
                    padding: 0 16px;
                }

                .header-content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    min-height: var(--header-height);
                    gap: 20px;
                }

                .left-section {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    flex: 1;
                }

                .logo-link {
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                    text-decoration: none;
                    transition: opacity var(--transition-speed);
                }

                .logo-link:hover {
                    opacity: 0.8;
                }

                .logo-icon {
                    height: 50px;
                    width: auto;
                    max-width: 200px;
                }

                .nav-desktop {
                    display: none;
                    align-items: center;
                    gap: 0;
                    flex-wrap: nowrap;
                }

                .nav-item-wrapper {
                    position: relative;
                }

                .nav-item-wrapper::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    height: 30px;
                    background: transparent;
                    display: none;
                }

                .nav-item-wrapper.active::after {
                    display: block;
                }

                .nav-item {
                    padding: 17.5px 16px 18.5px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 14px;
                    color: var(--color-black);
                    text-decoration: none;
                    white-space: nowrap;
                    transition: color var(--transition-speed);
                    position: relative;
                    display: block;
                }

                .nav-item::after {
                    content: '';
                    position: absolute;
                    bottom: 10px;
                    left: 16px;
                    right: 16px;
                    height: 2px;
                    background: var(--color-red);
                    transform: scaleX(0);
                    transition: transform var(--transition-speed);
                }

                .nav-item:hover {
                    color: var(--color-red);
                }

                .nav-item:hover::after {
                    transform: scaleX(1);
                }

                .submenu-desktop {
                    position: fixed;
                    top: var(--header-height);
                    left: 0;
                    background: var(--color-white);
                    border-radius: 0 0 8px 8px;
                    padding: 8px 0;
                    display: flex;
                    flex-direction: column;
                    z-index: 1100;
                    min-width: 220px;
                    box-shadow: 0 4px 12px -5px rgba(0, 0, 0, 0.2);
                    animation: slideDown 0.2s ease-out;
                }

                @keyframes slideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .nav-item-sub {
                    padding: 12px 20px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--color-black);
                    text-decoration: none;
                    transition: background var(--transition-speed), color var(--transition-speed);
                    white-space: nowrap;
                }

                .nav-item-sub:hover {
                    color: var(--color-red);
                }

                .right-section {
                    display: none;
                    align-items: center;
                    gap: 16px;
                    flex-shrink: 0;
                }

                .search-wrapper-tablet {
                    display: none;
                }

                .search-toggle-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background: var(--color-grey-light);
                    border: 1px solid var(--color-grey);
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all var(--transition-speed);
                }

                .search-toggle-button:hover {
                    background: var(--color-grey-bg);
                    border-color: var(--color-red);
                }

                .search-wrapper {
                    position: relative;
                    display: none;
                }

                .search-wrapper.visible {
                    display: block;
                }

                .search-input {
                    width: 300px;
                    height: 30px;
                    padding: 0 40px 0 16px;
                    background: var(--color-grey-light);
                    border: 1px solid var(--color-grey);
                    border-radius: 20px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--color-black);
                    outline: none;
                    transition: border-color var(--transition-speed);
                }

                .search-input::-webkit-search-cancel-button {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 16px;
                    width: 16px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E30613' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
                    background-size: 16px 16px;
                    background-repeat: no-repeat;
                    cursor: pointer;
                    margin-right: 8px;
                }

                .search-input::-webkit-search-cancel-button:hover {
                    opacity: 0.7;
                }

                .search-input::placeholder {
                    color: var(--color-black);
                    opacity: 0.2;
                }

                .search-input:focus {
                    border-color: var(--color-red);
                }

                .search-button {
                    position: absolute;
                    right: 5px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    cursor: pointer;
                    transition: opacity var(--transition-speed);
                }

                .search-button:hover {
                    opacity: 0.8;
                }

                .search-icon {
                    width: 16px;
                    height: 16px;
                    color: var(--color-red);
                }

                .donor-space-button {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 14px;
                    color: var(--color-black);
                    text-decoration: none;
                    white-space: nowrap;
                    transition: color var(--transition-speed);
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .donor-space-button:hover {
                    color: var(--color-red);
                }

                .donor-space-desktop {
                    display: none;
                }

                .donor-space-mobile-tablet {
                    display: flex;
                }

                .donor-icon {
                    width: 16px;
                    height: 16px;
                    color: var(--color-red);
                }

                .user-profile-desktop {
                    display: none;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 12px;
                    background: var(--color-grey-bg);
                    border-radius: 8px;
                }

                .user-name {
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--color-black);
                }

                .logout-btn {
                    padding: 4px 8px;
                    font-family: inherit;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--color-red);
                    background: none;
                    border: 1px solid var(--color-red);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all var(--transition-speed);
                }

                .logout-btn:hover {
                    background: var(--color-red);
                    color: var(--color-white);
                }

                .login-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.6);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2000;
                    animation: fadeIn 0.3s ease;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .login-modal {
                    background: var(--color-white);
                    border-radius: 16px;
                    padding: 40px;
                    width: 90%;
                    max-width: 450px;
                    position: relative;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .close-modal {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--color-grey);
                    transition: color var(--transition-speed);
                    padding: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .close-modal:hover {
                    color: var(--color-black);
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .login-header h2 {
                    font-family: inherit;
                    font-size: 28px;
                    font-weight: 700;
                    color: var(--color-black);
                    margin: 0 0 8px 0;
                }

                .login-header p {
                    font-family: inherit;
                    font-size: 14px;
                    color: var(--color-grey);
                    margin: 0;
                }

                .form-group {
                    margin-bottom: 20px;
                }

                .form-group label {
                    display: block;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--color-black);
                    margin-bottom: 8px;
                }

                .form-group input {
                    width: 100%;
                    height: 44px;
                    padding: 0 16px;
                    font-family: inherit;
                    font-size: 14px;
                    color: var(--color-black);
                    background: var(--color-white);
                    border: 1.5px solid var(--color-grey-light);
                    border-radius: 8px;
                    outline: none;
                    transition: border-color var(--transition-speed);
                }

                .form-group input:focus {
                    border-color: var(--color-red);
                }

                .forgot-password {
                    display: block;
                    text-align: right;
                    font-family: inherit;
                    font-size: 13px;
                    color: var(--color-red);
                    text-decoration: none;
                    margin-bottom: 24px;
                    transition: opacity var(--transition-speed);
                }

                .forgot-password:hover {
                    opacity: 0.8;
                }

                .submit-btn {
                    width: 100%;
                    height: 48px;
                    background: var(--color-red);
                    color: var(--color-white);
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 600;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: background var(--transition-speed);
                }

                .submit-btn:hover {
                    background: var(--color-red-dark);
                }

                .toggle-mode {
                    text-align: center;
                    margin-top: 20px;
                }

                .toggle-mode p {
                    font-family: inherit;
                    font-size: 14px;
                    color: var(--color-grey);
                    margin: 0;
                }

                .toggle-mode button {
                    background: none;
                    border: none;
                    color: var(--color-red);
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: underline;
                    padding: 0;
                    margin-left: 4px;
                }

                .toggle-mode button:hover {
                    opacity: 0.8;
                }

                .donation-button {
                    min-width: 140px;
                    max-width: 485.8px;
                    height: 54px;
                    padding: 12px 24px;
                    background: var(--color-red);
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5px;
                    text-decoration: none;
                    transition: background var(--transition-speed), transform var(--transition-speed);
                }

                .donation-button:hover {
                    background: var(--color-red-dark);
                    transform: translateY(-2px);
                }

                .donation-text-small {
                    font-family: inherit;
                    font-size: 10px;
                    font-weight: 600;
                    line-height: 10px;
                    color: var(--color-white);
                }

                .donation-text-large {
                    font-family: inherit;
                    font-size: 18px;
                    font-weight: 600;
                    line-height: 18px;
                    color: var(--color-white);
                }

                .mobile-menu-button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--color-black);
                    transition: color var(--transition-speed);
                    z-index: 1001;
                }

                .mobile-menu-button:hover {
                    color: var(--color-red);
                }

                .menu-icon {
                    width: 28px;
                    height: 28px;
                }

                .mobile-menu-overlay {
                    position: fixed;
                    top: var(--header-height);
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0);
                    pointer-events: none;
                    z-index: 999;
                    transition: background var(--transition-speed);
                }

                .mobile-menu-overlay.active {
                    background: rgba(0, 0, 0, 0.5);
                    pointer-events: auto;
                }

                .mobile-menu {
                    position: absolute;
                    width: 75%;
                    height: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    max-height: calc(100vh - var(--header-height));
                    background: var(--color-white);
                    transform: translateX(-100%);
                    opacity: 0;
                    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
                    opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    overflow-y: auto;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                }

                .mobile-menu.open {
                    transform: translateX(0);
                    opacity: 1;
                }

                .mobile-menu-content {
                    display: flex;
                    flex-direction: column;
                    padding: 24px 16px;
                    gap: 8px;
                }

                .search-wrapper-mobile {
                    position: relative;
                    margin-bottom: 16px;
                }

                .search-input-mobile {
                    width: 100%;
                    height: 40px;
                    padding: 0 40px 0 16px;
                    background: var(--color-grey-bg);
                    border: 1px solid var(--color-grey);
                    border-radius: 20px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--color-black);
                    outline: none;
                    transition: border-color var(--transition-speed);
                }

                .search-input-mobile::-webkit-search-cancel-button {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 18px;
                    width: 18px;
                    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23E30613' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='18' y1='6' x2='6' y2='18'%3E%3C/line%3E%3Cline x1='6' y1='6' x2='18' y2='18'%3E%3C/line%3E%3C/svg%3E");
                    background-size: 18px 18px;
                    background-repeat: no-repeat;
                    cursor: pointer;
                    margin-right: 8px;
                }

                .search-input-mobile::-webkit-search-cancel-button:hover {
                    opacity: 0.7;
                }

                .search-input-mobile::placeholder {
                    color: var(--color-black);
                    opacity: 0.3;
                }

                .search-input-mobile:focus {
                    border-color: var(--color-red);
                }

                .search-button-mobile {
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                .search-icon-mobile {
                    width: 16px;
                    height: 16px;
                    color: var(--color-red);
                }

                .mobile-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    margin-bottom: 16px;
                }

                .nav-item-mobile {
                    padding: 16px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--color-black);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: background var(--transition-speed), color var(--transition-speed);
                    display: block;
                }

                .nav-item-mobile:hover {
                    color: var(--color-red);
                }

                .submenu-mobile {
                    padding-left: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    margin-top: 4px;
                }

                .nav-item-mobile-sub {
                    padding: 12px 16px;
                    font-family: inherit;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--color-black);
                    text-decoration: none;
                    border-radius: 6px;
                    transition: background var(--transition-speed), color var(--transition-speed);
                    display: block;
                }

                .nav-item-mobile-sub:hover {
                    background-color: var(--color-grey-bg);
                    color: var(--color-red);
                }

                .donor-space-button-mobile {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 16px;
                    font-family: inherit;
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--color-black);
                    text-decoration: none;
                    border-radius: 8px;
                    transition: background var(--transition-speed), color var(--transition-speed);
                }

                .donor-space-button-mobile:hover {
                    background: var(--color-grey-bg);
                    color: var(--color-red);
                }

                .donor-icon-mobile {
                    width: 20px;
                    height: 20px;
                    color: var(--color-red);
                }

                .donation-button-mobile {
                    margin-top: 16px;
                    height: 54px;
                    width: 100%;
                    padding: 12px 24px;
                    background: var(--color-red);
                    border: none;
                    border-radius: 20px;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 1.5px;
                    text-decoration: none;
                    transition: background var(--transition-speed);
                }

                .donation-button-mobile:hover {
                    background: var(--color-red-dark);
                }

                /* ==========================================
                   RESPONSIVE BREAKPOINTS
                   ========================================== */

                @media (min-width: 768px) {
                    .right-section {
                        display: flex;
                    }

                    .search-wrapper-tablet {
                        display: block;
                    }
                }

                @media (min-width: 1024px) {

                    .search-wrapper-mobile {
                        display: none;
                    }

                    .search-wrapper-tablet {
                        display: none;
                    }

                    .search-wrapper {
                        display: block !important;
                    }
                }

                @media (min-width: 1440px) {

                    .donor-space-desktop {
                        display: flex !important;
                    }

                    .donor-space-mobile-tablet {
                        display: none;
                    }

                    .user-profile-desktop {
                        display: flex;
                    }
                }

                @media (min-width: 1785px) {
                    .mobile-menu-button {
                        display: none;
                    }

                    .mobile-menu-overlay {
                        display: none;
                    }

                    .nav-desktop {
                        display: flex;
                    }

                    .left-section {
                        gap: 40px;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <nav aria-label="Navigation principale" role="navigation" className="navigation-desktop">
                <div className="header-container">
                    <div className="header-content">
                        {/* LEFT SECTION */}
                        <div className="left-section">
                            <a href="/" className="logo-link" aria-label="Retour à l'accueil">
                                <img src="/crf_logo.svg" alt="Logo de la croix rouge"
                                     className="logo-icon"/>
                            </a>

                            {/* Desktop Nav */}
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
                                                <a
                                                    href="#"
                                                    className="nav-item"
                                                    onClick={(e) => e.preventDefault()}
                                                >
                                                    {item.title}
                                                </a>
                                                {activeSubMenu === index && (
                                                    <div
                                                        className="submenu-desktop"
                                                        style={{left: `${submenuPosition.left}px`}}
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
                                            <a href={item.path} className="nav-item">
                                                {item.title}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="right-section">

                            {/* Bouton ADMINISTRATEUR (Nouveau) */}
                            <a href="/admin" className="donor-space-button donor-space-desktop">
                                <ShieldCheck className="donor-icon"/> <span>Administrateur</span>
                            </a>

                            {/* Search Bar - Tablette & Desktop */}
                            <div className="search-wrapper">
                                <input type="search" placeholder="Recherche ..." className="search-input" aria-label="Rechercher sur le site" />
                                <button className="search-button" aria-label="Lancer la recherche">
                                    <Search className="search-icon" />
                                </button>
                            </div>

                            {/* Donor Space - Desktop avec overlay */}
                            {!isLoggedIn ? (
                                <button
                                    onClick={() => setLoginOverlayOpen(true)}
                                    className="donor-space-button donor-space-desktop"
                                >
                                    <User className="donor-icon"/> <span>Espace donateur</span>
                                </button>
                            ) : (
                                <div className="user-profile-desktop">
                                    <User className="donor-icon"/>
                                    <span className="user-name">{userName}</span>
                                    <button onClick={handleLogout} className="logout-btn">Déconnexion</button>
                                </div>
                            )}

                            {/* Donor Space - Tablette/Mobile (redirection) */}
                            <a href="/espace-donateur" className="donor-space-button donor-space-mobile-tablet">
                                <User className="donor-icon" /> <span>Espace donateur</span>
                            </a>

                            <a href="faire-un-don/~mon-don" className="donation-button">
                                <span className="donation-text-small">Pour soutenir la Croix-Rouge</span>
                                <span className="donation-text-large">Je fais un don</span>
                            </a>
                        </div>

                        {/* MOBILE MENU BUTTON */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="mobile-menu-button"
                            aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            aria-expanded={mobileMenuOpen}
                        >
                            {mobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
                        </button>
                    </div>
                </div>

                {/* LOGIN/SIGNUP OVERLAY - Desktop uniquement */}
                {loginOverlayOpen && (
                    <div className="login-overlay" onClick={() => setLoginOverlayOpen(false)}>
                        <div className="login-modal" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="close-modal"
                                onClick={() => setLoginOverlayOpen(false)}
                            >
                                <X size={24}/>
                            </button>

                            <div className="login-header">
                                <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>
                                <p>Accédez à votre espace donateur</p>
                            </div>

                            <form onSubmit={handleLogin}>
                                {!isLoginMode && (
                                    <>
                                        {/* NOUVEAU CHAMP : Numéro donateur au-dessus de Nom complet */}
                                        <div className="form-group">
                                            <label htmlFor="donorNumber">Numéro donateur</label>
                                            <input type="text" id="donorNumber" placeholder="Ex: 12345678" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="nom">Nom complet</label>
                                            <input type="text" id="nom" placeholder="Jean Dupont" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="tel">Téléphone</label>
                                            <input type="tel" id="tel" placeholder="06 12 34 56 78"/>
                                        </div>
                                    </>
                                )}

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" placeholder="exemple@email.com" required/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <input type="password" id="password" placeholder="••••••••" required/>
                                </div>

                                {isLoginMode && (
                                    <a href="#" className="forgot-password">Mot de passe oublié ?</a>
                                )}

                                <button type="submit" className="submit-btn">
                                    {isLoginMode ? 'Se connecter' : "S'inscrire"}
                                </button>

                                <div className="toggle-mode">
                                    {isLoginMode ? (
                                        <p>Pas encore de compte ? <button type="button"
                                                                          onClick={() => setIsLoginMode(false)}>S'inscrire</button>
                                        </p>
                                    ) : (
                                        <p>Déjà un compte ? <button type="button"
                                                                    onClick={() => setIsLoginMode(true)}>Se
                                            connecter</button></p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* MOBILE MENU OVERLAY */}
                <div
                    className={`mobile-menu-overlay ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <div
                        className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mobile-menu-content">
                            {/* Mobile Search */}
                            <div className="search-wrapper-mobile">
                                <input type="search" placeholder="Recherche ..." className="search-input-mobile" />
                                <button className="search-button-mobile">
                                    <Search className="search-icon-mobile" />
                                </button>
                            </div>

                            {/* Mobile Nav Items */}
                            <nav className="mobile-nav">
                                {menuItems.map((item, index) => (
                                    <div key={index}>
                                        {item.subItems ? (
                                            <>
                                                <div
                                                    className="nav-item-mobile"
                                                    onClick={() => toggleSubMenu(index)}
                                                >
                                                    {item.title}
                                                </div>
                                                {activeSubMenu === index && (
                                                    <div className="submenu-mobile">
                                                        {item.subItems.map((sub, subIndex) => (
                                                            <a
                                                                key={subIndex}
                                                                href={sub.path}
                                                                className="nav-item-mobile-sub"
                                                                onClick={() => setMobileMenuOpen(false)}
                                                            >
                                                                {sub.title}
                                                            </a>
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <a
                                                href={item.path}
                                                className="nav-item-mobile"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.title}
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </nav>

                            {/* Mobile Donor & Donation */}
                            <a href="/espace-donateur" className="donor-space-button-mobile">
                                <User className="donor-icon-mobile" /> <span>Espace donateur</span>
                            </a>

                            <a href="faire-un-don/~mon-don" className="donation-button-mobile">
                                <span className="donation-text-small-mobile">Pour soutenir la Croix-Rouge</span>
                                <span className="donation-text-large-mobile">Je fais un don</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;