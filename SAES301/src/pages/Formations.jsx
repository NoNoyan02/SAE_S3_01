import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function Formations() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Je me forme aux premiers secours | Croix-Rouge française</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Formez-vous aux premiers secours. N'hésitez plus, trouvez une session de formation près de chez vous et inscrivez-vous !"
                />

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="Je me forme aux premiers secours | Croix-Rouge française"
                />
                <meta
                    property="og:description"
                    content="Formez-vous aux premiers secours. N'hésitez plus, trouvez une session de formation près de chez vous et inscrivez-vous !"
                />
            </Helmet>

            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .visually-hidden {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    margin: -1px;
                    padding: 0;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }

                /* ==================== HEADER & NAVIGATION ==================== */
                .logo {
                    display: flex;
                    align-items: center;
                }

                .logo img {
                    height: 45px;
                }

                .navbar {
                    display: flex;
                    align-items: center;
                    padding: 15px 40px;
                    justify-content: space-between;
                    background-color: white;
                    border-bottom: 1px solid #e0e0e0;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .elements {
                    display: flex;
                    gap: 10px;
                    flex: 1;
                    margin: 0 20px;
                    justify-content: center;
                    list-style: none;
                }

                .elements li {
                    display: inline-block;
                }

                .elements a {
                    display: block;
                    padding: 10px 15px;
                    font-size: 15px;
                    text-decoration: none;
                    color: black;
                    font-weight: 600;
                    white-space: nowrap;
                    transition: color 0.2s;
                }

                .elements a:hover,
                .elements a:focus {
                    color: #e30613;
                    outline: none;
                }

                .navbar-right {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                }

                .recherche {
                    display: flex;
                    align-items: center;
                    padding: 5px 15px;
                    border-radius: 20px;
                    border: 1px solid #ccc;
                    background-color: #f5f5f5;
                }

                .recherche input {
                    outline: none;
                    border: none;
                    background: none;
                    font-size: 13px;
                    width: 150px;
                }

                .recherche input::placeholder {
                    color: #999;
                }

                .recherche button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-size: 16px;
                    color: #666;
                    padding: 0;
                }

                .recherche button:hover,
                .recherche button:focus {
                    color: #e30613;
                }

                .compte {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
                    text-decoration: none;
                    color: inherit;
                    transition: color 0.2s;
                }

                .compte:hover,
                .compte:focus {
                    color: #e30613;
                    outline: none;
                }

                .compte-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 15px;
                    background-color: #e30613;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                }

                .compte span {
                    font-size: 13px;
                    color: #333;
                    font-weight: 500;
                }

                .jefaisundon {
                    display: flex;
                    flex-direction: column;
                    background-color: #e30613;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    text-align: center;
                    line-height: 1.3;
                    transition: background-color 0.2s;
                    text-decoration: none;
                }

                .jefaisundon:hover,
                .jefaisundon:focus {
                    background-color: #c00511;
                    outline: none;
                }

                .don-text,
                .don-cta {
                    display: block;
                }

                .sousnavbar {
                    padding: 12px 40px;
                    background-color: #f8f8f8;
                    border-bottom: 1px solid #e0e0e0;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .sousnavbar ol {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    margin: 0;
                    padding: 0;
                }

                .sousnavbar li {
                    display: flex;
                    align-items: center;
                    font-size: 13px;
                }

                .sousnavbar a {
                    text-decoration: none;
                    color: black;
                    transition: color 0.2s;
                }

                .sousnavbar a:hover,
                .sousnavbar a:focus {
                    color: #e30613;
                    outline: none;
                }

                .sousnavbar li:not(:last-child)::after {
                    content: ">";
                    margin: 0 8px;
                    color: #666;
                    font-weight: bold;
                }

                /* ==================== HERO SECTION ==================== */
                .hero-formation-image {
                    position: relative;
                    width: 100%;
                    height: 400px;
                    background-image: url("https://i-sam.unimedias.fr/2022/06/15/gestes-premiers-secours.jpg?auto=format,compress&cs=tinysrgb&ixlib=php-4.1.0&w=1200");
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .hero-formation-content {
                    position: absolute;
                    top: 30%;
                    color: #fff;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
                    text-align: center;
                    padding: 0 20px;
                }

                .hero-formation-content h1 {
                    font-size: 4rem;
                    font-weight: bold;
                    margin: 0;
                }

                .search-container {
                    display: flex;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                    position: absolute;
                    bottom: 40px;
                }

                .search-container select,
                .search-container input {
                    border: none;
                    outline: none;
                    padding: 15px;
                    font-size: 15px;
                }

                .search-container select {
                    font-weight: bold;
                    border-right: 1px solid #ddd;
                    color: #333;
                    cursor: pointer;
                }

                .search-container input {
                    width: 250px;
                    color: #333;
                }

                /* ==================== SECTION ENTREPRISE ==================== */
                .entreprise {
                    background-color: white;
                    padding: 50px 20px;
                    display: flex;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .entreprise-container {
                    background-color: #e9f2f3;
                    border-radius: 20px;
                    padding: 40px 50px;
                    width: 70%;
                    max-width: 900px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 40px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
                }

                .texte h2 {
                    font-size: 20px;
                    font-weight: 700;
                    margin: 0 0 20px 0;
                    color: #000;
                }

                .texte p {
                    font-size: 15px;
                    color: #333;
                    line-height: 1.5;
                    margin: 0;
                }

                .btn-entreprise {
                    display: inline-block;
                    border: 1px solid #004b5a;
                    background: transparent;
                    padding: 12px 20px;
                    border-radius: 6px;
                    cursor: pointer;
                    font-weight: 600;
                    color: #004b5a;
                    transition: all 0.2s ease;
                    white-space: nowrap;
                    text-decoration: none;
                }

                .btn-entreprise:hover,
                .btn-entreprise:focus {
                    background-color: #004b5a;
                    color: white;
                    outline: none;
                }

                /* ==================== SECTION TEXTE BLEU ==================== */
                .textbleu2 {
                    background-color: #e9f2f3;
                    padding: 50px 20px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .formezvouspremiersecours {
                    max-width: 1100px;
                    margin: 0 auto;
                }

                .textbleu2 h2 {
                    text-align: left;
                    font-size: 3rem;
                    margin-bottom: 20px;
                    color: #000;
                }

                .textbleu2 p {
                    text-align: left;
                    margin-bottom: 15px;
                    line-height: 1.6;
                    font-size: 15px;
                    color: #333;
                }

                .textbleu2 p.important,
                .textbleu2 p.hesitepas {
                    font-weight: bold;
                }

                /* ==================== SECTION TABLEAU ==================== */
                .tableau {
                    display: flex;
                    background-color: #ffffff;
                    border: 0.5px solid gray;
                    margin: 50px auto;
                    border-radius: 9px;
                    max-width: 900px;
                    align-content: center;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .container-tableau {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .tab {
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 2px solid #e0e0e0;
                }

                .tab:last-child {
                    border-bottom: none;
                }

                .tab h3 {
                    color: #e30613;
                    margin-bottom: 1rem;
                    font-weight: bold;
                    font-size: 1.25rem;
                }

                .tab ul {
                    list-style: none;
                    padding-left: 0;
                    margin: 0;
                }

                .tab li {
                    padding: 0.5rem 0;
                    padding-left: 2rem;
                    position: relative;
                    line-height: 1.5;
                }

                .tab li::before {
                    content: "—";
                    position: absolute;
                    left: 0;
                    color: #e30613;
                    font-weight: bold;
                }

                .tab li a {
                    color: #333;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .tab li a:hover,
                .tab li a:focus {
                    color: #e30613;
                    text-decoration: underline;
                    outline: none;
                }

                /* ==================== CARTES FORMATIONS ==================== */
                .formations-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 50px;
                    padding: 60px 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    background-color: #f8f9fa;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .formation-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                }

                .formation-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .formation-card img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    display: block;
                }

                .formation-card-content {
                    padding: 25px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                }

                .badge {
                    position: absolute;
                    top: -5px;
                    right: 15px;
                    background: #e74c3c;
                    color: white;
                    padding: 6px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: bold;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    z-index: 10;
                }

                .badge.grand-public {
                    background: #3498db;
                }

                .badge.initiation {
                    background: #f39c12;
                }

                .badge.professionnel {
                    background: #27ae60;
                }

                .badge.parents {
                    background: #9b59b6;
                }

                .badge.equipier {
                    background: #e67e22;
                }

                .badge.aquatique {
                    background: #1abc9c;
                }

                .badge.formateur {
                    background: #34495e;
                }

                .badge.recyclage {
                    background: #95a5a6;
                }

                .badge.specialise {
                    background: #8e44ad;
                }

                .formation-card h3 {
                    font-size: 18px;
                    font-weight: bold;
                    margin: 15px 0 12px 0;
                    color: #2c3e50;
                    line-height: 1.3;
                }

                .formation-card p {
                    color: #666;
                    font-size: 14px;
                    margin-bottom: 20px;
                    line-height: 1.5;
                    flex-grow: 1;
                }

                .formation-details {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                    font-size: 12px;
                    color: #888;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .formation-details span {
                    background: #ecf0f1;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-weight: 500;
                }

                .btn-formation {
                    display: inline-block;
                    background: linear-gradient(45deg, #e74c3c, #c0392b);
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 25px;
                    font-weight: bold;
                    font-size: 14px;
                    transition: all 0.3s ease;
                    text-align: center;
                    border: none;
                    cursor: pointer;
                    width: 100%;
                    margin-top: auto;
                }

                .btn-formation:hover {
                    background: linear-gradient(45deg, #c0392b, #a93226);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
                }

                /* ==================== LAYOUT DEUX COLONNES ==================== */
                .layout-deux-colonnes {
                    display: flex;
                    gap: 80px;
                    align-items: flex-start;
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #f8f9fa;
                    margin-top: 40px;
                }

                .layout-deux-colonnes .tableau {
                    flex: 0 0 400px;
                    margin: 0;
                    padding: 20px;
                }

                .layout-deux-colonnes .formations-grid {
                    flex: 1;
                    grid-template-columns: repeat(3, 1fr);
                    padding: 0;
                    margin: 0;
                    background-color: transparent;
                }

                /* ==================== RESPONSIVE ==================== */

                /* Desktop large (1200px+) */
                @media (max-width: 1200px) {
                    .elements a {
                        font-size: 13px;
                        padding: 10px 10px;
                    }

                    .layout-deux-colonnes {
                        gap: 40px;
                    }

                    .layout-deux-colonnes .formations-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* Tablette paysage (992px) */
                @media (max-width: 992px) {
                    .navbar {
                        flex-wrap: wrap;
                        padding: 15px 20px;
                    }

                    .elements {
                        order: 3;
                        width: 100%;
                        margin-top: 15px;
                        justify-content: flex-start;
                        flex-wrap: wrap;
                    }

                    .recherche input {
                        width: 100px;
                    }

                    .hero-formation-content h1 {
                        font-size: 2rem;
                    }
                }

                /* Tablette portrait et mobile (768px) */
                @media (max-width: 768px) {
                    /* Navigation */
                    .navbar {
                        padding: 10px 15px;
                    }

                    .logo img {
                        height: 35px;
                    }

                    .elements {
                        gap: 5px;
                    }

                    .elements a {
                        font-size: 12px;
                        padding: 8px 8px;
                    }

                    .navbar-right {
                        flex-wrap: wrap;
                        gap: 10px;
                    }

                    .compte span {
                        display: none;
                    }

                    .jefaisundon {
                        font-size: 10px;
                        padding: 8px 12px;
                    }

                    .sousnavbar {
                        padding: 10px 15px;
                    }

                    .sousnavbar li {
                        font-size: 12px;
                    }

                    /* Hero */
                    .hero-formation-image {
                        height: 300px;
                    }

                    .hero-formation-content {
                        top: 20%;
                    }

                    .hero-formation-content h1 {
                        font-size: 1.5rem;
                        padding: 0 15px;
                    }

                    .search-container {
                        flex-direction: column;
                        width: 90%;
                        bottom: 20px;
                        left: 5%;
                    }

                    .search-container select {
                        border-right: none;
                        border-bottom: 1px solid #ddd;
                    }

                    .search-container input {
                        width: 100%;
                    }

                    /* Entreprise */
                    .entreprise {
                        padding: 30px 15px;
                    }

                    .entreprise-container {
                        flex-direction: column;
                        text-align: center;
                        width: 95%;
                        padding: 30px 20px;
                        gap: 20px;
                    }

                    .btn-entreprise {
                        width: 100%;
                        margin-top: 10px;
                    }

                    /* Text bleu */
                    .textbleu2 {
                        padding: 30px 15px;
                    }

                    .textbleu2 h2 {
                        font-size: 1.5rem;
                    }

                    .textbleu2 p {
                        font-size: 14px;
                    }

                    /* Layout deux colonnes */
                    .layout-deux-colonnes {
                        flex-direction: column;
                        gap: 30px;
                        padding: 15px;
                        margin-top: 20px;
                    }

                    .layout-deux-colonnes .tableau {
                        flex: none;
                        width: 100%;
                        max-width: 100%;
                    }

                    .layout-deux-colonnes .formations-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                    }

                    /* Tableau */
                    .tableau {
                        margin: 30px 15px;
                    }

                    .container-tableau {
                        padding: 15px;
                    }

                    .tab h3 {
                        font-size: 1.1rem;
                    }

                    .tab li {
                        font-size: 14px;
                    }

                    /* Formations grid */
                    .formations-grid {
                        grid-template-columns: 1fr;
                        gap: 30px;
                        padding: 30px 15px;
                    }

                    /* Footer */
                    .footer-content {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                    }
                }

                /* Mobile (480px) */
                @media (max-width: 480px) {
                    .hero-formation-content h1 {
                        font-size: 1.3rem;
                    }

                    .entreprise-container {
                        padding: 20px 15px;
                    }

                    .texte h2 {
                        font-size: 18px;
                    }

                    .texte p {
                        font-size: 14px;
                    }

                    .textbleu2 h2 {
                        font-size: 1.3rem;
                    }

                    .footer-content {
                        grid-template-columns: 1fr;
                    }

                    .formations-grid {
                        grid-template-columns: 1fr;
                    }

                    .formation-card h3 {
                        font-size: 16px;
                    }

                    .formation-card p {
                        font-size: 13px;
                    }

                    .navbar-right {
                        width: 100%;
                        justify-content: space-between;
                    }

                    .recherche {
                        flex: 1;
                    }

                    .recherche input {
                        width: 80px;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <Header/>

            <nav className="sousnavbar" aria-label="Fil d'Ariane">
                <ol>
                    <li><a href="/">Accueil</a></li>
                    <li>Formations aux premiers secours</li>
                </ol>
            </nav>

            <main>
                <section className="hero-formation">
                    <div className="hero-formation-image">
                        <div className="hero-formation-content">
                            <h1>Formations aux premiers secours</h1>
                        </div>

                        <form className="search-container" role="search" aria-label="Recherche de formation">
                            <label htmlFor="formation-type" className="visually-hidden">Type de formation</label>
                            <select id="formation-type" name="formation-type">
                                <option value="toutes">Toutes</option>
                                <option value="psc1">PSC1</option>
                                <option value="gqs">GQS</option>
                                <option value="sst">SST</option>
                            </select>

                            <label htmlFor="location" className="visually-hidden">Localisation</label>
                            <input type="text" id="location" name="location" placeholder="Code postal ou ville"
                                   aria-label="Code postal ou ville"/>

                            <button type="submit" className="visually-hidden">Rechercher</button>
                        </form>
                    </div>
                </section>

                <section className="entreprise">
                    <div className="entreprise-container">
                        <div className="texte">
                            <h2>Vous êtes un professionnel, une entreprise</h2>
                            <p>
                                Vous souhaitez former vos collaborateurs aux gestes de secours. Découvrez l'offre de
                                formation
                                adaptée à vos besoins proposée par nos centres de formation Croix-Rouge Compétence.
                            </p>
                        </div>
                        <a href="https://www.croix-rouge.fr/formation-professionnelle?domains=sante_securite_au_travail&page=3"
                           className="btn-entreprise">
                            Premiers secours pour les professionnels
                        </a>
                    </div>
                </section>

                <section className="textbleu2">
                    <div className="formezvouspremiersecours">
                        <h2>Formez-vous aux premiers secours et devenez citoyen sauveteur !</h2>
                        <p>Faire un massage cardiaque, mettre en PLS (position latérale de sécurité), bien réagir face à
                            une brûlure, appeler les secours... aucun de ces gestes ne s'improvise. Or en situation de
                            détresse ou de crise, il est difficile de garder la tête froide. C'est pourquoi, apprendre
                            les gestes de premiers secours est la clé pour sauver des vies !</p>
                        <p className="important">Dans 9 situations d'urgence sur 10, c'est la vie d'un proche qui est en
                            jeu et pourtant le taux de formation de la population française est parmi les plus bas
                            d'Europe !</p>
                        <p>Alors, les bénévoles se mobilisent tout au long de l'année, partout en France, pour vous
                            proposer des sessions de formation à tous les gestes et comportements qui sauvent afin de
                            permettre à chacun de réagir en cas d'accident et devenir le premier maillon de la chaîne de
                            secours.</p>
                        <p className="hesitepas">N'hésitez plus, trouvez une session de formation près de chez vous et
                            inscrivez-vous !</p>
                    </div>
                </section>

                <section className="layout-deux-colonnes">
                    <section className="tableau">
                        <div className="container-tableau">
                            <article className="tab">
                                <h3>Je me forme aux premiers secours et deviens un citoyen engagé !</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/prevention-et-secours-civique-de-niveau-1-psc1">Formation
                                        premiers secours citoyen (PSC)</a></li>
                                    <li><a href="https://www.croix-rouge.fr/formation/les-gestes-qui-sauvent">Formation
                                        Les gestes qui sauvent (GQS)</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formation-continue-prevention-et-secours-civique-de-niveau-1">Remise
                                        à niveau de ma formation premiers secours citoyen</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je me forme pour sauver des vies au travail</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/intervenir-en-tant-que-sauveteur-secouriste-du-travail-sst">Formation
                                        Sauveteur Secouriste du Travail (SST)</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/maintien-et-actualisation-des-competences-du-sauveteur-secouriste-du-travail-mac-sst">Recyclage
                                        de ma formation SST</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/formateur-de-sauveteur-secouriste-au-travail-formateur-sst">Formateur
                                        SST</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/devenir-referent-en-sante-et-securite-au-travail">Référent
                                        en santé et sécurité au travail</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je participe à une initiation aux premiers secours</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/initiation-aux-premiers-secours-enfant-et-nourrisson">Initiation
                                        aux premiers secours enfants et nourrissons (IPSEN)</a></li>
                                    <li><a href="https://www.croix-rouge.fr/formation/initiation-aux-premiers-secours">Initiation
                                        aux premiers secours (IPS)</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je suis ou je souhaite devenir équipier secouriste</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formation-continue-premiers-secours-en-equipe-de-niveau-1">FC
                                        PSE 1 - Formation continue de premiers secours en équipe de niveau 1</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formation-continue-premiers-secours-en-equipe-de-niveau-2">FC
                                        PSE 2 - Formation continue de premiers secours en équipe de niveau 2</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/premiers-secours-en-equipe-de-niveau-1-et-2">PSE
                                        1&2 - Premiers secours en équipe de niveau 1 et 2 (Hybride: e-learning et
                                        présentiel)</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Formations aquatiques</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/bnssa-brevet-national-de-securite-et-de-sauvetage-aquatique">BNSSA
                                        - Brevet national de sécurité et de sauvetage aquatique</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je deviens formateur de premiers secours</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formateur-pse-pedagogie-appliquee-a-lemploi-de-formateur-aux-premiers">Formateur
                                        PSE (PICF FPS) - Pédagogie appliquée à l'emploi de formateur aux premiers
                                        secours</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formateur-psc1-picf-fpsc-pedagogie-appliquee-a-lemploi-de-formateur-en">Formateur
                                        PSC (PICF FPSC) - Pédagogie appliquée à l'emploi de formateur aux premiers
                                        secours citoyen</a></li>
                                </ul>
                            </article>
                        </div>
                    </section>

                    <section className="formations-grid" aria-labelledby="formations-titre">
                        <h2 id="formations-titre" className="visually-hidden">Nos formations disponibles</h2>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/32PfeiYxRr97nIDRQYQBXV/09360475a35ff1d3c34491ea473ac9f5/formation_psc1.webp?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation PSC1 - Gestes de premiers secours"/>
                            <div className="formation-card-content">
                                <span className="badge grand-public">GRAND PUBLIC</span>
                                <h3>Prévention et secours civiques de niveau 1 (PSC1)</h3>
                                <div className="formation-details">
                                    <span>Durée: 8h</span>
                                    <span>Prix: 60€</span>
                                </div>
                                <p>Formation de base aux premiers secours. Apprenez à réagir face aux situations
                                    d'urgence du quotidien.</p>
                                <a href="https://www.croix-rouge.fr/formation/prevention-et-secours-civique-de-niveau-1-psc1"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1WPKrtg9vlvihafSbMZqP8/552eec8470a8c88bf9b624fad850728a/Gestes_qui_sauvent_10-09-22_CroixRouge_JMPS2022_Christophe_Hargoues.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation GQS - Gestes qui sauvent"/>
                            <div className="formation-card-content">
                                <span className="badge initiation">INITIATION</span>
                                <h3>Les gestes qui sauvent (GQS)</h3>
                                <div className="formation-details">
                                    <span>Durée: 2h</span>
                                    <span>Prix: 20€</span>
                                </div>
                                <p>Sensibilisation de 2 heures aux gestes d'urgence : alerter, masser, défibriller,
                                    traiter les hémorragies.</p>
                                <a href="https://www.croix-rouge.fr/formation/les-gestes-qui-sauvent"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/6LN6jahmi0ESeyPTZUqoCS/e47f9e8151604ef78b79ff77f81b752b/defibrillation_10-09-22_JMPS2022_Christophe_Hargoues_036BD.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation SST - Sauveteur Secouriste du Travail"/>
                            <div className="formation-card-content">
                                <span className="badge professionnel">PROFESSIONNEL</span>
                                <h3>Sauveteur Secouriste du Travail (SST)</h3>
                                <div className="formation-details">
                                    <span>Durée: 14h</span>
                                    <span>Éligible CPF</span>
                                </div>
                                <p>Formation pour intervenir efficacement face à une situation d'accident en milieu
                                    professionnel.</p>
                                <a href="https://www.croix-rouge.fr/formation-professionnelle/intervenir-en-tant-que-sauveteur-secouriste-du-travail-sst"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/2148IDKg95BwmRA9cT7oji/eca321bf85415373aebc30044be21b24/IPSEN_etouffement_912-22_-_Joan_Bardeletti.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation IPSEN - Premiers secours enfant et nourrisson"/>
                            <div className="formation-card-content">
                                <span className="badge parents">PARENTS</span>
                                <h3>Initiation premiers secours enfant et nourrisson (IPSEN)</h3>
                                <div className="formation-details">
                                    <span>Durée: 4h30</span>
                                    <span>Prix: 35€</span>
                                </div>
                                <p>Spécialement conçue pour les parents et futurs parents. Apprenez les gestes adaptés
                                    aux jeunes enfants.</p>
                                <a href="https://www.croix-rouge.fr/formation/initiation-aux-premiers-secours-enfant-et-nourrisson"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1iMlrM0qMzAFRyfJY1Hkcm/1478af479ba126ef29c6c795c6add923/CRF_Formation_PSE2.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation PSE - Premiers secours en équipe"/>
                            <div className="formation-card-content">
                                <span className="badge equipier">ÉQUIPIER</span>
                                <h3>Premiers secours en équipe (PSE 1 & 2)</h3>
                                <div className="formation-details">
                                    <span>Durée: 35h</span>
                                    <span>Format hybride</span>
                                </div>
                                <p>Formation approfondie pour devenir équipier secouriste et intervenir en équipe lors
                                    d'événements.</p>
                                <a href="https://www.croix-rouge.fr/formation/premiers-secours-en-equipe-de-niveau-1-et-2"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/3AUvOEr3ZpAtxl64n1pPoO/5b9b2c05b608bb9d73272964531e8169/brevet_s_curit__et_sauvetage_aquatique.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation BNSSA - Sauvetage aquatique"/>
                            <div className="formation-card-content">
                                <span className="badge aquatique">AQUATIQUE</span>
                                <h3>Brevet national de sécurité et de sauvetage aquatique</h3>
                                <div className="formation-details">
                                    <span>Durée: 35h</span>
                                    <span>Brevet d'État</span>
                                </div>
                                <p>Surveillez et assurez la sécurité des baignades en piscine ou en milieu naturel.</p>
                                <a href="https://www.croix-rouge.fr/formation/bnssa-brevet-national-de-securite-et-de-sauvetage-aquatique"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/3kn9etgqYZjXYuRlwbbc1P/f57ae51a140b59f45e37d9b98f6c2687/massage_cardiaque_enfant_14-05-22_journeeNationaleParisDijon_Christophe_Hargoues_044.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation remise à niveau PSC1"/>
                            <div className="formation-card-content">
                                <span className="badge recyclage">RECYCLAGE</span>
                                <h3>Remise à niveau formation premiers secours citoyen</h3>
                                <div className="formation-details">
                                    <span>Durée: 3h</span>
                                    <span>Prix: 30€</span>
                                </div>
                                <p>Pour lutter contre l'oubli, venez vous rafraîchir la mémoire sur les gestes de
                                    premiers secours !</p>
                                <a href="https://www.croix-rouge.fr/formation/formation-continue-prevention-et-secours-civique-de-niveau-1"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1Ud6J3fApPyNxcLRmdsPBe/458b7f5da3ddabb91504c7063c2055a9/formateur_PSC_formation_Croix-Rouge_2.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation formateur premiers secours"/>
                            <div className="formation-card-content">
                                <span className="badge formateur">FORMATEUR</span>
                                <h3>Formateur premiers secours citoyen (FPSC)</h3>
                                <div className="formation-details">
                                    <span>Durée: 50h</span>
                                    <span>Pré-requis PSE2</span>
                                </div>
                                <p>Devenez formateur et transmettez les gestes qui sauvent au plus grand nombre.</p>
                                <a href="https://www.croix-rouge.fr/formation/formateur-psc1-picf-fpsc-pedagogie-appliquee-a-lemploi-de-formateur-en"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>
                    </section>
                </section>
            </main>
            <Footer/>
        </>
    );
}