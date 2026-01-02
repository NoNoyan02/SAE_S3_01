import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header.jsx";
import "../components/Page-Introuvable/Page-Introuvable.css"
import Footer from "../components/Footer/Footer.jsx";

export default function PageIntrouvable() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Page introuvable | Croix-Rouge française</title>

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="Page introuvable | Croix-Rouge française"
                />
            </Helmet>
            <Header/>
            <main role="main" className="error-page">
                <header className="error-hero">
                    <div className="error-hero__container">
                        <div className="error-hero__content">
                            <h1 className="error-hero__title">Oups,</h1>
                            <p className="error-hero__subtitle">la page que vous cherchez n'existe pas !</p>
                        </div>
                    </div>
                </header>

                <div className="error-wrapper">
                    <div className="error-container">
                        <header className="error-section-header">
                            <h2 className="error-section-header__title">
                                <span className="error-section-header__badge">Je m'engage</span> avec la Croix-Rouge !
                            </h2>
                            <p className="error-section-header__subtitle">Rejoignez notre communauté</p>
                        </header>

                        <ul className="error-cards">
                            <li className="error-card">
                                <a href="/je-donne" className="error-card__link">
                                    <div className="error-card__image">
                                        <img
                                            src="https://images.ctfassets.net/ksb78y40v1oe/3sP6Y85LgDc0UrwUSdKqrf/3f339ca8e13e96b4b90cb91b3e0a20be/Page_Carrefour_Je_donne.png?fm=webp&q=85&w=404&h=350&fit=thumb"
                                            alt="Soutenez les actions" loading="lazy"/>
                                    </div>
                                    <div className="error-card__content">
                                        <p className="error-card__title">Soutenez les actions de la Croix-Rouge
                                            française</p>
                                        <span className="error-btn error-btn--primary">Je fais un don</span>
                                    </div>
                                </a>
                            </li>

                            <li className="error-card">
                                <a href="/page404.html" className="error-card__link">
                                    <div className="error-card__image">
                                        <img
                                            src="https://images.ctfassets.net/ksb78y40v1oe/7M6jXwOfIZTATTav5S7fqc/9e944f29fb492368150e8997e2dd7373/Page_carrefour_Je_deviens_b__n__vole_Hero_2.jpg?fm=webp&q=85&w=404&h=350&fit=thumb"
                                            alt="Devenez bénévole" loading="lazy"/>
                                    </div>
                                    <div className="error-card__content">
                                        <p className="error-card__title">Devenez bénévole à la Croix-Rouge</p>
                                        <span className="error-btn error-btn--primary">Je trouve une mission</span>
                                    </div>
                                </a>
                            </li>

                            <li className="error-card">
                                <a href="/formations" className="error-card__link">
                                    <div className="error-card__image">
                                        <img
                                            src="https://images.ctfassets.net/ksb78y40v1oe/32PfeiYxRr97nIDRQYQBXV/09360475a35ff1d3c34491ea473ac9f5/formation_psc1.webp?fm=webp&q=85&w=404&h=350&fit=thumb"
                                            alt="Apprenez les gestes qui sauvent" loading="lazy"/>
                                    </div>
                                    <div className="error-card__content">
                                        <p className="error-card__title">Apprenez les gestes qui sauvent</p>
                                        <span className="error-btn error-btn--primary">Je me forme</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="error-actions">
                    <a href="/protect/public" className="error-btn error-btn--secondary">
                        Je vais sur la page d'accueil
                    </a>
                </div>
            </main>
            <Footer/>
        </>
    );
}