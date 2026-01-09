import React, {useEffect, useState} from 'react';
import CroixRougeHomepage from "./CroixRougeHomepage.jsx";
import DonationFormHorizontal from '../../Form/DonationFormHorizontal.jsx';
import NewsletterSection from "../Section/NewsletterSection.jsx";
import enfantquimangeatable from "assets/images/je-donne/enfant_qui_mange_a_table.jpg";
import DonationFormVertical from "@/components/Form/DonationFormVertical.jsx";

const slides = [
    {
        title: "Ensemble, redonnons le goût de vivre à ceux qui en ont besoin",
        image: "https://moselle.croix-rouge.fr/wp-content/uploads/sites/36/2019/05/aide-alimentaire-croixrouge.jpg"
    },
    {
        title: "Des équipes mobilisées chaque jour pour sauver des vies",
        image: "https://cdn-s-www.dna.fr/images/1D20E08A-8ADF-43D9-82DE-FCB9FD5C3427/NW_raw/des-benevoles-de-la-croix-rouge-recoivent-une-formation-a-la-clinique-sainte-anne-pour-ameliorer-leurs-interventions-de-secourisme-en-echangeant-avec-des-professionnels-de-sante-photo-dna-laurent-rea-1457546557.jpg"
    },
    {
        title: "Agir chaque jour pour sauver des vies",
        image: "https://images.lanouvellerepublique.fr/image/upload/t_1020w/f_auto/63bdaf0868b680007e8b4583.jpg"
    },
];

export default function Main() {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => {
                let next = prev + direction;

                if (next >= slides.length) {
                    setDirection(-1);
                    next = prev - 1;
                } else if (next < 0) {
                    setDirection(1);
                    next = prev + 1;
                }

                return next;
            });
        }, 3000); // Augmenté à 5s pour laisser plus de temps

        return () => clearInterval(interval);
    }, [direction, current]); // Ajout de current pour reset l'intervalle au clic

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setDirection(1);
    };

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
        setDirection(-1);
    };

    return (
        <div>
            {/* DÉBUT DU CSS INTÉGRÉ (HERO + NEWS + DONATION FORM) */}
            <style>{`
                /* ============================================================
                   PARTIE 1 : CSS GÉNÉRAL (HERO, NEWS, WRAPPERS)
                   ============================================================ */
                
                /* Général & Wrapper */
                .wrapper {
                    margin-bottom: 40px;
                    padding-left: 16px;
                    padding-right: 16px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                @media (min-width: 768px) {
                    .wrapper {
                        margin-bottom: 56px;
                        padding-left: 32px;
                        padding-right: 32px;
                    }
                }

                @media (min-width: 1100px) {
                    .wrapper {
                        margin-bottom: 88px;
                        padding-left: 64px;
                        padding-right: 64px;
                    }
                }

                .container {
                    width: 100%;
                    max-width: 1170px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 16px 0;
                }

                @media (min-width: 768px) {
                    .container {
                        padding: 24px 0;
                    }
                }

                @media (min-width: 1100px) {
                    .container {
                        padding: 0;
                    }
                }

                /* Boutons */
                .btn {
                    overflow: hidden;
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    max-width: 100%;
                    min-height: 24px;
                    padding: 2px;
                    vertical-align: middle;
                    line-height: 1;
                    font-weight: 600;
                    text-decoration: none !important;
                    text-align: center;
                    color: inherit;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    -webkit-tap-highlight-color: transparent;
                }

                .btn--border {
                    min-width: 120px;
                    min-height: 44px;
                    border-radius: 4px;
                    padding-left: 20px;
                    padding-right: 20px;
                    border: 1px solid;
                    font-size: 1.4rem;
                }

                @media (min-width: 768px) {
                    .btn--border {
                        min-width: 140px;
                        min-height: 50px;
                        padding-left: 24px;
                        padding-right: 24px;
                    }
                }

                .btn--border:not([disabled]):focus,
                .btn--border:not([disabled]):hover,
                .btn--border:not([disabled]):active {
                    border-color: #000;
                    color: #fff;
                    background-color: #000;
                }

                .btn--color-secondary.btn--border {
                    border-color: #075c68;
                    color: #075c68;
                    background-color: transparent;
                    padding: 15px;
                    border-width: 1px;
                    border-style: solid;
                }

                .btn--color-secondary.btn--border:not([disabled]):focus,
                .btn--color-secondary.btn--border:not([disabled]):hover,
                .btn--color-secondary.btn--border:not([disabled]):active {
                    border-color: #075c68;
                    background-color: #075c68;
                    color: #fff;
                }

                .btn--medium {
                    font-size: 1.4rem;
                }

                /* Header news container */
                .header-news__container {
                    display: flex;
                    flex-direction: column-reverse;
                    gap: 20px;
                    margin-bottom: 24px;
                }

                @media (min-width: 768px) {
                    .header-news__container {
                        gap: 24px;
                    }
                }

                @media (min-width: 1024px) {
                    .header-news__container {
                        flex-direction: row;
                        gap: 30px;
                        margin-bottom: 40px;
                    }
                }

                /* News top - Article principal */
                .news-top__container {
                    position: relative;
                    flex: 1;
                }

                .news-top__container:last-of-type {
                    order: 3;
                    margin-top: 0;
                    margin-bottom: 24px;
                }

                @media (min-width: 768px) {
                    .news-top__container:last-of-type {
                        margin-bottom: 32px;
                    }
                }

                @media (min-width: 1024px) {
                    .news-top__container:first-of-type {
                        display: block;
                    }

                    .news-top__container:last-of-type {
                        display: none;
                    }
                }

                .news-top__link {
                    display: block;
                    height: 100%;
                    text-decoration: none;
                    color: #000;
                    -webkit-tap-highlight-color: transparent;
                }

                .news-top__link:focus .news-top__title,
                .news-top__link:hover .news-top__title,
                .news-top__link:active .news-top__title {
                    color: #e3001b;
                }

                .news-top__img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 8px;
                }

                @media (min-width: 480px) {
                    .news-top__img {
                        height: 300px;
                    }
                }

                @media (min-width: 768px) {
                    .news-top__img {
                        height: 350px;
                    }
                }

                @media (min-width: 1024px) {
                    .news-top__img {
                        height: 400px;
                    }
                }

                .news-top__description {
                    position: absolute;
                    bottom: 8px;
                    left: 8px;
                    right: 8px;
                    border: 1px solid #cdcdcd;
                    padding: 12px 16px;
                    font-weight: 600;
                    color: #000;
                    background-color: #fff;
                    border-radius: 4px;
                }

                @media (min-width: 480px) {
                    .news-top__description {
                        left: 12px;
                        right: 12px;
                        padding: 16px 20px;
                    }
                }

                @media (min-width: 1024px) {
                    .news-top__description {
                        left: 24px;
                        right: 24px;
                        padding: 20px 24px;
                    }
                }

                .news-top__description-header {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 6px;
                }

                @media (min-width: 768px) {
                    .news-top__description-header {
                        margin-bottom: 8px;
                    }
                }

                .news-top__date,
                .news-top__tag {
                    font-size: 1.2rem;
                    font-weight: 400;
                    color: #767676;
                }

                @media (min-width: 768px) {
                    .news-top__date,
                    .news-top__tag {
                        font-size: 1.4rem;
                    }
                }

                .news-top__title {
                    font-size: 1.4rem;
                    line-height: 1.4;
                    font-weight: 600;
                    transition: color 0.2s linear;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                @media (min-width: 480px) {
                    .news-top__title {
                        font-size: 1.5rem;
                        -webkit-line-clamp: 2;
                    }
                }

                @media (min-width: 768px) {
                    .news-top__title {
                        font-size: 1.6rem;
                        line-height: 1.3;
                    }
                }

                @media (min-width: 1024px) {
                    .news-top__title {
                        font-size: 1.8rem;
                    }
                }

                /* Formulaire de don - Container PLACEHOLDER du Hero */
                .donation-form-container {
                    flex-shrink: 0;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    padding: 24px;
                    order: 1;
                }

                @media (min-width: 768px) {
                    .donation-form-container {
                        padding: 28px;
                    }
                }

                @media (min-width: 1024px) {
                    .donation-form-container {
                        width: 400px;
                        padding: 32px;
                        order: 0;
                    }
                }

                .donation-form-placeholder {
                    margin-top: 16px;
             
                    width: 100%;
                    min-height: 400px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    order: 1;
                }

                @media (min-width: 1024px) {
                    .donation-form-placeholder {
                        width: 400px;
                        min-height: 450px;
                        order: 0;
                    }
                }

                /* Cartes news */
                .news-cards__container {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    margin-top: 0;
                    margin-bottom: 24px;
                }

                @media (min-width: 768px) {
                    .news-cards__container {
                        gap: 20px;
                        margin-bottom: 32px;
                    }
                }

                @media (min-width: 1024px) {
                    .news-cards__container {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 24px;
                        margin-top: 40px;
                        margin-bottom: 40px;
                    }
                }

                .news-card {
                    display: flex;
                    background-color: #fff;
                }

                @media (min-width: 1024px) {
                    .news-card {
                        flex-direction: column;
                    }
                }

                .news-card__link {
                    text-decoration: none;
                    color: #000;
                    display: flex;
                    width: 100%;
                    gap: 12px;
                    -webkit-tap-highlight-color: transparent;
                }

                @media (min-width: 768px) {
                    .news-card__link {
                        gap: 16px;
                    }
                }

                @media (min-width: 1024px) {
                    .news-card__link {
                        flex-direction: column;
                        gap: 0;
                    }
                }

                .news-card__link:hover .news-card__title,
                .news-card__link:active .news-card__title {
                    color: #e3001b;
                }

                .news-card__image-wrapper {
                    flex-shrink: 0;
                    width: 80px;
                    height: 80px;
                    overflow: hidden;
                    border-radius: 4px;
                }

                @media (min-width: 480px) {
                    .news-card__image-wrapper {
                        width: 100px;
                        height: 100px;
                    }
                }

                @media (min-width: 768px) {
                    .news-card__image-wrapper {
                        width: 120px;
                        height: 90px;
                    }
                }

                @media (min-width: 1024px) {
                    .news-card__image-wrapper {
                        width: 100%;
                        height: 180px;
                        margin-bottom: 16px;
                    }
                }

                .news-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .news-card__content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                @media (min-width: 1024px) {
                    .news-card__content {
                        justify-content: flex-start;
                    }
                }

                .news-card__date {
                    font-size: 1.2rem;
                    color: #767676;
                    margin-bottom: 6px;
                    font-weight: 400;
                }

                @media (min-width: 768px) {
                    .news-card__date {
                        font-size: 1.4rem;
                        margin-bottom: 8px;
                    }
                }

                .news-card__title {
                    font-size: 1.4rem;
                    font-weight: 600;
                    line-height: 1.4;
                    color: #000;
                    transition: color 0.2s linear;
                }

                @media (min-width: 480px) {
                    .news-card__title {
                        font-size: 1.5rem;
                    }
                }

                @media (min-width: 768px) {
                    .news-card__title {
                        font-size: 1.5rem;
                        line-height: 1.3;
                    }
                }

                @media (min-width: 1024px) {
                    .news-card__title {
                        font-size: 1.6rem;
                    }
                }

                /* Bouton voir plus */
                .header-news__extra-news {
                    display: flex;
                    gap: 20px;
                    align-items: center;
                    margin-top: 20px;
                    flex-direction: column;
                }

                @media (min-width: 600px) {
                    .header-news__extra-news {
                        flex-direction: row;
                        gap: 24px;
                        margin-top: 24px;
                    }
                }

                @media (min-width: 900px) {
                    .header-news__extra-news {
                        gap: 30px;
                        margin-top: 48px;
                    }
                }

                .header-news__line {
                    display: none;
                }

                @media (min-width: 600px) {
                    .header-news__line {
                        display: block;
                        flex: 1;
                        border-top: 1px solid #cdcdcd;
                        height: 1px;
                    }
                }

                .view-more-news {
                    display: block;
                    width: 100%;
                    padding: 14px 24px;
                    text-align: center;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #075c68;
                    background-color: #fff;
                    border: 2px solid #075c68;
                    border-radius: 4px;
                    text-decoration: none;
                    transition: all 0.2s ease-in-out;
                    -webkit-tap-highlight-color: transparent;
                }

                @media (min-width: 768px) {
                    .view-more-news {
                        font-size: 1.5rem;
                        padding: 16px 32px;
                    }
                }

                .view-more-news:hover,
                .view-more-news:active {
                    background-color: #075c68;
                    color: #fff;
                }

                @media (hover: none) and (pointer: coarse) {
                    .news-top__link,
                    .news-card__link,
                    .news-item,
                    .btn,
                    .view-more-news {
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
                    }

                    .news-top__link:active,
                    .news-card__link:active,
                    .news-item:active {
                        opacity: 0.8;
                    }
                }

                /* CAROUSEL / HERO */
                .carousel {
                    position: relative;
                    width: 100vw;
                    height: 50vh;
                    overflow: hidden;
                }

                @media (min-width: 1100px) {
                
                    .carousel {
                        margin-bottom: 88px;
                    }
                }

                .slides {
                    display: flex;
                    transition: transform 0.8s ease-in-out;
                    width: 100%;
                    height: 100%;
                }

                .slide {
                    min-width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 32px;
                    flex-direction: column;
                    position: relative;
                }

                .slide::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%);
                    z-index: 0;
                }

                .slide-title-accueil {
                    position: relative;
                    z-index: 2;
                    color: white;
                    font-size: clamp(2.4rem, 6vw, 5.6rem);
                    text-align: center;
                    padding: 0 5%;
                    margin: 0;
                    font-weight: 900;
                    max-width: 1100px;
                    line-height: 1;
                    letter-spacing: -0.04em;
                    background: linear-gradient(to bottom, #fff 40%, #e0e0e0 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.4));
                }

                .donation-btn {
                    position: relative;
                    z-index: 2;
                }

                .arrow {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2rem;
                    color: white;
                    background: rgba(0,0,0,0.4);
                    border: none;
                    padding: 15px 25px;
                    cursor: pointer;
                    z-index: 2;
                    border-radius: 25px;
                    transition: background 0.3s, transform 0.3s;
                }

                .arrow:hover {
                    background: rgba(0,0,0,0.7);
                    transform: translateY(-50%) scale(1.1);
                }

                .arrow.left {
                    left: 20px;
                }

                .arrow.right {
                    right: 40px;
                }

                .indicators {
                    position: absolute;
                    bottom: 20px;
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                    width: 100%;
                }

                .indicator {
                    width: 15px;
                    height: 15px;
                    background: white;
                    opacity: 0.5;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .indicator.active {
                    width: 30px;
                    height: 15px;
                    border-radius: 12px;
                    opacity: 1;
                }

                @media (max-width: 768px) {
                    .slide-title-accueil {
                    
                        font-size: 2rem;
                    }
                    .arrow {
                        padding: 10px 20px;
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
               
                    .slide-title-accueil {
                        font-size: 1.5rem;
                    }
                    .arrow {
                        padding: 8px 16px;
                        font-size: 1.2rem;
                    }
                }

                /* ============================================================
                   PARTIE 2 : CSS DES FORMULAIRES DE DON (AJOUTÉ)
                   ============================================================ */

                /* WRAPPER & CONTAINER */
                .donation-wrapper {
                    margin-bottom: 64px;
                    padding-left: 24px;
                    padding-right: 24px;
                }

                @media (min-width: 1100px) {
                .donation-form-placeholder {
                
                    margin-top: 0;
                }
                    .donation-wrapper {
                        margin-bottom: 88px;
                        padding-left: 64px;
                        padding-right: 64px;
                    }
                }

                .donation-container {
                    width: 100%;
                    max-width: 1170px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 0;
                }

                .donation-container--large {
                    max-width: 1310px;
                }


            `}</style>

            <div className="carousel">
                <div
                    className="slides"
                    style={{transform: `translateX(-${current * 100}%)`}}
                >
                    {slides.map((slide, index) => (
                        <div
                            className="slide"
                            key={index}
                            style={{
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        >
                            <h1 className="slide-title-accueil">{slide.title}</h1>
                            {/* NOTE : Utilisation de donation-btn ici aussi, ça marchera car le CSS est fusionné */}
                            <button type="button" className="donation-btn">En savoir+</button>
                        </div>
                    ))}
                </div>

                {/* Flèches */}
                <button className="arrow left" onClick={prevSlide}>
                    &#10094;
                </button>
                <button className="arrow right" onClick={nextSlide}>
                    &#10095;
                </button>

                {/* Indicateurs */}
                <div className="indicators">
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`indicator ${index === current ? "active" : ""}`}
                            onClick={() => setCurrent(index)}
                        ></div>
                    ))}
                </div>
            </div>
            <div className="wrapper">
                <section>
                    <div className="container">
                        {/* Hero avec article + formulaire */}
                        <div className="header-news__container">
                            {/* Article principal - grande image */}
                            <div className="news-top__container">
                                <a href="/israel-gaza-alerte-sur-la-situation-humanitaire/appel-a-dons-pour-gaza-votre-soutien-est-vital"
                                   className="news-top__link">
                                    <img
                                        src={enfantquimangeatable}
                                        alt=""
                                        loading="lazy"
                                        className="news-top__img"
                                    />
                                    <div className="news-top__description">
                                        <div className="news-top__description-header">
                                            <p className="news-top__date">08/09/25</p>
                                        </div>
                                        <p className="news-top__title">
                                            La résilience d'une société commence dans les bras de ceux qui accueillent
                                            ses tout-petits
                                        </p>
                                    </div>
                                </a>
                            </div>

                            {/* Placeholder pour le formulaire de don */}
                            <div className="donation-form-placeholder">
                                <DonationFormVertical/>
                            </div>
                        </div>

                        {/* 3 cartes d'actualités en dessous */}
                        <div className="news-cards__container">
                            <div className="news-card">
                                <a href="#" className="news-card__link">
                                    <div className="news-card__image-wrapper">
                                        <img
                                            src="https://images.ctfassets.net/ksb78y40v1oe/2IQ7uDilkzVZ282qCMbrWx/6ba0f0ac4f92f9a584c3a37d244b4dba/2022_liens-familiaux_Calais__L_Witter-RLF-700-450.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                            alt=""
                                            loading="lazy"
                                            className="news-card__img"
                                        />
                                    </div>
                                    <div className="news-card__content">
                                        <p className="news-card__date">04/09/25</p>
                                        <h3 className="news-card__title">
                                            Rétablissement des liens familiaux : clarifier le sort des personnes
                                            disparues et apporter
                                        </h3>
                                    </div>
                                </a>
                            </div>

                            <div className="news-card">
                                <a href="#" className="news-card__link">
                                    <div className="news-card__image-wrapper">
                                        <img
                                            src="https://www.encyclopedie-environnement.org/app/uploads/2016/06/cyclones2_couverture.png"
                                            alt=""
                                            loading="lazy"
                                            className="news-card__img"
                                        />
                                    </div>
                                    <div className="news-card__content">
                                        <p className="news-card__date">09/09/25</p>
                                        <h3 className="news-card__title">
                                            Cyclones, Tsunamis, montée des eaux : comment mieux préparer... les
                                            communautés des trois
                                        </h3>
                                    </div>
                                </a>
                            </div>

                            <div className="news-card">
                                <a href="#" className="news-card__link">
                                    <div className="news-card__image-wrapper">
                                        <img
                                            src="https://i.la-croix.com/836x/smart/2023/09/09/1201281997/Organisee-samedi-9-septembre-Journee-mondiale-premiers-secours-loccasionla-Croix-Rouge-sensibiliser-Francais-limportance-formation-gestes-sauvent_0.jpg"
                                            alt=""
                                            loading="lazy"
                                            className="news-card__img"
                                        />
                                    </div>
                                    <div className="news-card__content">
                                        <p className="news-card__date">10/09/25</p>
                                        <h3 className="news-card__title">
                                            La Journée Mondiale des Premiers Secours revient le 13 septembre...
                                        </h3>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Bouton voir plus */}
                        <div className="header-news__extra-news">
                            <div className="header-news__line"></div>
                            <a href="/actualite" className="btn btn--border btn--color-secondary btn--medium">
                                Voir plus d'actualités
                            </a>
                            <div className="header-news__line"></div>
                        </div>
                    </div>
                </section>
            </div>
            <CroixRougeHomepage/>
            <NewsletterSection/>
            <DonationFormHorizontal/>
        </div>
    );
};