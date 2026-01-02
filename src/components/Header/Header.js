import React, { useState } from 'react';
import { Menu, Search, User, X } from 'lucide-react';
import './Header.css';

const API_BASE = "http://localhost:8000/api";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ left: 0 });
  const [loginOverlayOpen, setLoginOverlayOpen] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('Invité');

  // Champs formulaire
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

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
      subItems: [{ title: "Formations aux premiers secours", path: "/formations" }]
    },
    {
      title: "Je trouve un service",
      subItems: [{ title: "Aides matérielles", path: "/aides-materielles" }]
    },
    { title: "Nos actualités", path: "/actualites" },
    { title: "Nos adresses", path: "/adresses" },
    { title: "Contactez-nous", path: "/contact" }
  ];

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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('Invité');
  };

  // 🔐 LOGIN / REGISTER
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    try {
      const url = isLoginMode
        ? `${API_BASE}/login.php`
        : `${API_BASE}/register.php`;

      const payload = isLoginMode
        ? { email, password }
        : { full_name: fullName, phone, email, password };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || 'Erreur');
      }

      setIsLoggedIn(true);
      setUserName(data.user?.full_name || 'Donateur');
      setLoginOverlayOpen(false);

      // reset
      setFullName('');
      setPhone('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setAuthError(err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <header className="header">
      <nav className="navigation-desktop">
        <div className="header-container">
          <div className="header-content">

            {/* LEFT */}
            <div className="left-section">
              <a href="/" className="logo-link">
                <img src="/assets/icon/crf_logo.svg" alt="Logo Croix Rouge" className="logo-icon" />
              </a>

              <nav className="nav-desktop">
                {menuItems.map((item, index) => (
                  <div
                    key={index}
                    className="nav-item-wrapper"
                    onMouseEnter={(e) => handleMouseEnter(index, e)}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    {item.subItems ? (
                      <>
                        <a href="#" className="nav-item" onClick={(e) => e.preventDefault()}>
                          {item.title}
                        </a>
                        {activeSubMenu === index && (
                          <div className="submenu-desktop" style={{ left: submenuPosition.left }}>
                            {item.subItems.map((sub, i) => (
                              <a key={i} href={sub.path} className="nav-item-sub">
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

            {/* RIGHT */}
            <div className="right-section">
              <div className="search-wrapper">
                <input type="search" placeholder="Recherche..." />
                <button><Search /></button>
              </div>

              {!isLoggedIn ? (
                <button onClick={() => setLoginOverlayOpen(true)} className="donor-space-button">
                  <User /> Espace donateur
                </button>
              ) : (
                <div className="user-profile-desktop">
                  <User />
                  <span>{userName}</span>
                  <button onClick={handleLogout}>Déconnexion</button>
                </div>
              )}
            </div>

            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* OVERLAY LOGIN / REGISTER */}
        {loginOverlayOpen && (
          <div className="login-overlay" onClick={() => setLoginOverlayOpen(false)}>
            <div className="login-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={() => setLoginOverlayOpen(false)}>
                <X />
              </button>

              <h2>{isLoginMode ? 'Connexion' : 'Inscription'}</h2>

              <form onSubmit={handleAuthSubmit}>
                {!isLoginMode && (
                  <>
                    <input
                      type="text"
                      placeholder="Nom complet"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {authError && <p style={{ color: 'red' }}>{authError}</p>}

                <button type="submit" disabled={authLoading}>
                  {authLoading ? '...' : isLoginMode ? 'Se connecter' : "S'inscrire"}
                </button>

                <p>
                  {isLoginMode ? (
                    <>
                      Pas encore de compte ?{' '}
                      <button type="button" onClick={() => setIsLoginMode(false)}>
                        S'inscrire
                      </button>
                    </>
                  ) : (
                    <>
                      Déjà un compte ?{' '}
                      <button type="button" onClick={() => setIsLoginMode(true)}>
                        Se connecter
                      </button>
                    </>
                  )}
                </p>
              </form>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
