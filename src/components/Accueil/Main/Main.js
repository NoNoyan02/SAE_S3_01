import React, {useEffect, useState} from 'react';
import CroixRougeHomepage from "./CroixRougeHomepage";
import DonationFormVertical from "../../Form/DonationFormVertical";
import DonationFormHorizontal from '../../Form/DonationFormHorizontal';
import NewsletterSection from "../Section/NewsletterSection";
import "./Hero.css"
import "./Wrapper.css"

const slides = [
    {title: "Slide 1", color: "#FF6B6B"},
    {title: "Slide 2", color: "#4ECDC4"},
    {title: "Slide 3", color: "#556270"},
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
        }, 3000);

        return () => clearInterval(interval);
    }, [direction]);

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
            <div className="carousel">
                <div
                    className="slides"
                    style={{transform: `translateX(-${current * 100}%)`}}
                >
                    {slides.map((slide, index) => (
                        <div
                            className="slide"
                            key={index}
                            style={{backgroundColor: slide.color}}
                        >
                            <h1 className="slide-title">{slide.title}</h1>
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
                                        src="/assets/images/enfant_qui_mange_a_table.jpg"
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
                                            src="https://via.placeholder.com/400x250/ffb3b3/ffb3b3"
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
                                            src="https://via.placeholder.com/400x250/ffb3b3/ffb3b3"
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
                                            src="https://via.placeholder.com/400x250/ffb3b3/ffb3b3"
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
