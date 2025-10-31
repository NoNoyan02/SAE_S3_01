import React, {useState} from 'react';
import {Menu, Search, User, X} from 'lucide-react';
import './Header.css';

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeSubMenu, setActiveSubMenu] = useState(null);
    const [submenuPosition, setSubmenuPosition] = useState({left: 0});

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

    return (
        <header className="header" role="banner">
            <nav aria-label="Navigation principale" role="navigation" className="navigation-desktop">
                <div className="header-container">
                    <div className="header-content">
                        {/* LEFT SECTION */}
                        <div className="left-section">
                            <a href="/" className="logo-link" aria-label="Retour à l'accueil">
                                <img src="/assets/icon/crf_logo.svg" alt="Logo de la croix rouge"
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
                            <div className="search-wrapper">
                                <input type="search" placeholder="Recherche ..." className="search-input" aria-label="Rechercher sur le site" />
                                <button className="search-button" aria-label="Lancer la recherche">
                                    <Search className="search-icon" />
                                </button>
                            </div>

                            <a href="#" className="donor-space-button">
                                <User className="donor-icon" /> <span>Espace donateur</span>
                            </a>

                            <a href="/donation" className="donation-button">
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
                            <a href="#" className="donor-space-button-mobile">
                                <User className="donor-icon-mobile" /> <span>Espace donateur</span>
                            </a>

                            <a href="/donation" className="donation-button-mobile">
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
