import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';


// Import des composants globaux
// Assurez-vous que le chemin est bon par rapport à votre structure
import DonationFormHorizontal from "../components/Form/DonationFormHorizontal.jsx";
import LC_20374 from "assets/images/je-donne/LC_20374.webp";
import Alex_Bonnemaison from "assets/images/je-donne/Alex_Bonnemaison.webp";
import Page_carrefour_Cagnotte_solidaire_Guillaume_BINET from "assets/images/je-donne/Page_carrefour_Cagnotte_solidaire_Guillaume_BINET.webp"
import Page_Carrefour_Don_financement_participatif from "assets/images/je-donne/Page_Carrefour_Don_financement_participatif.webp"
import Page_Carrefour_Don_IFI_Guillaume_BINET from "assets/images/je-donne/Page_Carrefour_Don_IFI_Guillaume_BINET.webp";
import Page_carrefour_Don_regulier from "assets/images/je-donne/Page_carrefour_Don_regulier.webp";
import Page_carrefour_Don_titres_restaurant from "assets/images/je-donne/Page_carrefour_Don_titres_restaurant.webp";
import Page_carrefour_Don_vetements from "assets/images/je-donne/Page_carrefour_Don_vetements.webp";
import Page_Carrefour_Je_donne from "assets/images/je-donne/Page_Carrefour_Je_donne.webp";
import DonationFormVertical from "@/components/Form/DonationFormVertical.jsx";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.jsx";


export default function JeDonne() {
    // --- ETATS (STATE) ---
    const [carouselIndex, setCarouselIndex] = useState(0);
    const trackRef = useRef(null);
    const [faqOpen, setFaqOpen] = useState(null);

    // --- LOGIQUE CARROUSEL ---
    const getVisibleCount = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= 500) return 1;
            if (window.innerWidth <= 1080) return 2;
        }
        return 3;
    };

    const handlePrev = () => {
        if (carouselIndex > 0) setCarouselIndex(curr => curr - 1);
    };

    const handleNext = () => {
        const visible = getVisibleCount();
        const totalSlides = 4;
        if (carouselIndex < totalSlides - visible) setCarouselIndex(curr => curr + 1);
    };

    useEffect(() => {
        if (trackRef.current) {
            const gap = 60;
            const firstCard = trackRef.current.children[0];
            if (firstCard) {
                const width = firstCard.offsetWidth;
                const move = (width + gap) * carouselIndex;
                trackRef.current.style.transform = `translateX(-${move}px)`;
            }
        }
    }, [carouselIndex]);

    // --- LOGIQUE FAQ ---
    const toggleFaq = (index) => {
        if (faqOpen === index) setFaqOpen(null);
        else setFaqOpen(index);
    };

    // --- ANIMATION CHIFFRES ---
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const h3 = entry.target.querySelector('h3');
                    if (h3 && !h3.classList.contains('animated')) {
                        const target = parseInt(h3.getAttribute('data-target').replace(/\s/g, ''));
                        const duration = 2000;
                        const startTime = performance.now();

                        const animate = (currentTime) => {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            // Easing function
                            const ease = 1 - Math.pow(1 - progress, 4);

                            h3.innerText = Math.floor(ease * target).toLocaleString('fr-FR').replace(/\u202f/g, ' ');

                            if (progress < 1) requestAnimationFrame(animate);
                            else h3.classList.add('animated');
                        };
                        requestAnimationFrame(animate);
                    }
                }
            });
        }, { threshold: 0.5 });

        const stats = document.querySelectorAll('.chiffres section');
        stats.forEach(stat => observer.observe(stat));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Helmet>
                <title>Je fais un don | Croix-Rouge française</title>
                <meta name="description" content="Soutenez la Croix-Rouge française en faisant un don ponctuel ou régulier." />
            </Helmet>

            {/* CSS DE LA PAGE (Hero, Stats, Carrousel, FAQ) */}
            <style>{`
                .page-je-donne {
                    color: #101010;
                    line-height: 1.5;
                }
                
                .page-je-donne h1, .page-je-donne h2, .page-je-donne h3 {
                    margin-top: 0;
                }

                /* --- HERO (Custom adjustments) --- */
                .bloc-don {
                    min-height: 500px;
                }
                
                .patrimoine {
                
                padding:20px;
                    text-align: center;
                    }
                .section-hero {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 40px;
                    flex-wrap: wrap;
                    gap: 40px;
                }
                @media(max-width: 1100px) {
                    .section-hero { justify-content: center; text-align: center; }
                    .formulaire-don-vertical { display: none; }
                }

                /* Formulaire Vertical (Hero) */
                .formulaire-don-vertical {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    width: 350px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                    text-align: center;
                    z-index: 10;
                }
                .formulaire-don-vertical .texte1 {
                    font-size: 1.6rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                }
                .selecteur-choix {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                }
                .choix-btn {
                    flex: 1;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: 0.2s;
                }
                .choix-btn.active {
                    background-color: #e30613;
                    color: white;
                    border-color: #e30613;
                }
                .selecteur-montant {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 15px;
                }
                .montant-btn {
                    flex: 1;
                    padding: 10px 0;
                    background: white;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: 0.2s;
                }
                .montant-btn:hover, .montant-btn.active {
                    background-color: #e30613;
                    color: white;
                    border-color: #e30613;
                }
                .montant-libre-container {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 0 10px;
                    margin-bottom: 15px;
                }
                .montant-libre {
                    width: 100%;
                    padding: 10px;
                    border: none;
                    outline: none;
                    text-align: right;
                    font-size: 1rem;
                }
                .fiscal { color: #e30613; font-weight: bold; }
                .bouton-donation {
                    width: 100%;
                    padding: 15px;
                    background-color: #e30613;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-weight: bold;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: 0.3s;
                }
                .bouton-donation:hover { background-color: #b70b16; }

                .stats {
                    background: linear-gradient(180deg, #f8fbfc 0%, #e8f0f1 100%);
                    padding: 60px 20px;
                    text-align: center;
                }
                .surligne {
                    background-color: #075c68;
                    color: white;
                    padding: 4px 8px;
                    border-radius: 4px;
                }
                .stats h2 { font-size: 2.5rem; margin-bottom: 10px; }
                .stats p { font-size: 1.5rem; margin-bottom: 40px; }
                .chiffres {
                font-weight: bold;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 30px;
                }
                .chiffres section {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    min-width: 220px;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                }
                .chiffres h3 {
                    color: #075c68;
                    font-size: 3rem;
                    margin-bottom: 5px;
                }

                /* --- NOUS SOUTENIR --- */
                .nous-soutenir {
                    padding: 60px 20px;
                    max-width: 900px;
                    margin: 0 auto;
                    text-align: center;
                }
                .titre { font-size: 2.5rem; font-weight: 700; margin-bottom: 20px; }
                .nous-soutenir ul {
                    text-align: left;
                    list-style: none;
                    padding: 0;
                    margin-top: 30px;
                }
                .nous-soutenir li {
                    font-size: 1.5rem;
                    margin-bottom: 15px;
                    padding-left: 15px;
                    border-left: 4px solid #e30613;
                }

                /* --- AGIR --- */
                .agir { padding: 40px 20px; text-align: center; }
                .blocs {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 40px;
                    margin-top: 40px;
                }
                .sections-bloc { max-width: 550px; flex: 1 1 300px; }
                .sections-bloc img {
                    width: 100%;
                    height: 250px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .sections-bloc .texte {
                    background: white;
                    padding: 20px;
                    margin-top: -40px;
                    position: relative;
                    width: 85%;
                    margin-left: auto; margin-right: auto;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    border-radius: 6px;
                }
                .btn-outline {
                    display: inline-block;
                    margin-top: 10px;
                    padding: 10px 20px;
                    border: 1px solid #d32f2f;
                    color: #d32f2f;
                    text-decoration: none;
                    font-weight: bold;
                    border-radius: 4px;
                    transition: 0.3s;
                }
                .btn-outline:hover { background: #d32f2f; color: white; }

                .deduction-fiscale {
                    background: linear-gradient(135deg, #f0f7f9 0%, #eef6f8 100%);
                    padding: 50px 20px;
                    margin: auto;
                    max-width: 1000px;
                    text-align: center;
                    border-radius: 8px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
                }
                .important { color: #e60000; font-weight: bold; font-size: 1.5rem; margin: 20px 0; }

                /* --- CARROUSEL --- */
                .engager { padding: 50px 0; text-align: center; overflow: hidden; }
                .carrousel {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 50px;
                    margin-top: 30px;
                }
                .affichage-carrousel {
                    width: 85%;
                    max-width: 1200px;
                    overflow: hidden;
                }
                .mouvement-carrousel {
                    display: flex;
                    gap: 60px;
                    transition: transform 0.5s ease;
                }
                .mouvement-carrousel .sections-bloc {
                    min-width: 350px;
                }
                .arrow {
                    width: 50px; height: 50px;
                    flex-shrink: 0;
                    border-radius: 50%;
                    border: none;
                    background: rgba(255, 255, 255, 0.9);
                    color: #e3001b;
                    font-size: 2rem;
                    font-weight: bold;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .arrow:hover {
                    background: #e3001b;
                    color: #fff;
                    transform: scale(1.1);
                }

                /* --- TRANSMETTRE --- */
                .section-split {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    max-width: 1100px;
                    margin: 80px auto;
                    padding: 0 20px;
                    gap: 50px;
                }
                .section-split img {
                    width: 100%;
                    border-radius: 8px;
                }
                .col-img, .col-txt { flex: 1; min-width: 300px; }
                .col-txt h2 { font-size: 2rem; margin-bottom: 20px; }
                .col-txt p {  margin-bottom: 20px; }
                .btn-solid {
                    display: inline-block;
                    background: #d32f2f;
                    color: white;
                    padding: 12px 24px;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                }

                /* --- FAQ --- */
                .question-frequente {
                    max-width: 800px;
                    margin: 80px auto;
                    padding: 0 20px;
                }
                .section-question {
                    margin-bottom: 15px;
                    border: 1px solid #e0e0e0;
                    border-radius: 6px;
                    overflow: hidden;
                }
                .question {
                    background: #f9f9f9;
                    padding: 20px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 600;
                }
                .question:hover { background: #f0f0f0; }
                .reponse {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease, padding 0.3s ease;
                    background: white;
                }
                .reponse.ouverte {
                    max-height: 500px;
                    padding: 20px;
                    border-top: 1px solid #e0e0e0;
                }
                .fleche { transition: transform 0.3s; }
                .fleche.ouverte { transform: rotate(180deg); }
            `}</style>

            <main className="page-je-donne">
                
                <Breadcrumb paths={[{ label: 'Accueil', url: '/' }, { label: 'Je fais un don' }]} />

                {/* 1. Hero Section */}
                <div className="shared-hero bloc-don">
                    <img className="shared-hero-bg" src={Page_Carrefour_Je_donne} alt="Fond don" />
                    <div className="shared-hero-overlay"></div>

                    <div className="section-hero">
                        <h1 className="shared-hero-title" style={{ textAlign: 'left', maxWidth: '600px' }}>
                            Grâce à vos dons nous<br/>pouvons agir
                        </h1>

                        <DonationFormVertical/>
                    </div>
                </div>

                {/* 2. Stats */}
                <div className="stats">
                    <div className="texte">
                        <h2 className="titre"><span className="surligne">Chiffres clés</span></h2>
                        <p>Chaque jour, nos volontaires agissent près de chez vous, grâce à vous !</p>
                    </div>
                    <div className="chiffres">
                        <section><h3 data-target="70 521">0</h3><p>bénévoles</p></section>
                        <section><h3 data-target="1 056">0</h3><p>implantations locales</p></section>
                        <section><h3 data-target="434 855">0</h3><p>associations</p></section>
                    </div>
                </div>

                {/* 3. Nous Soutenir */}
                <div className="nous-soutenir">
                    <h2 className="titre">Comment <span className="surligne">nous soutenir</span> ?</h2>
                    <p className="texte1">En soutenant notre action, vous vous engagez auprès de nos 70 000 bénévoles, à apporter une aide inconditionnelle aux personnes vulnérables.</p>
                    <ul className="exemples">
                        <li><p>Transformez votre IFI en projets solidaires</p></li>
                        <li>Vous n'avez pas utilisé tous vos titres restaurant ? Faites-en don à notre association</li>
                        <li>Contribuez à financer des projets près de chez vous !</li>
                        <li>Devenez ambassadeur de la Croix-Rouge en créant votre cagnotte solidaire</li>
                    </ul>
                </div>

                {/* 4. Agir */}
                <section className="agir">
                    <h2 className="titre">C'est grâce à <span className="surligne">vos dons</span> que nous pouvons agir</h2>
                    <div className="blocs">
                        <div className="sections-bloc">
                            <img src={Page_Carrefour_Je_donne} alt="Action" />
                            <div className="texte">
                                <p>Soutenez les actions de la Croix-Rouge française</p>
                                <a href="#" className="btn-outline">Je fais un don</a>
                            </div>
                        </div>
                        <div className="sections-bloc">
                            <img src={Page_carrefour_Don_regulier} alt="Régulier" />
                            <div className="texte">
                                <p>Choisissez le don par prélèvement automatique</p>
                                <a href="#" className="btn-outline">Je fais un don régulier</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. Déduction */}
                <section className="deduction-fiscale">
                    <h2 className="titre">Bénéficiez d'une <span className="surligne">déduction fiscale de 75% !</span></h2>
                    <p>Faire un don à la Croix-Rouge vous permet de bénéficier d'une déduction fiscale de 75% sur votre impôt sur le revenu.</p>
                    <p className="important">Un don de 100€ ne vous coûte donc que 25€.</p>
                </section>

                {/* 6. Carrousel (S'engager) */}
                <section className="engager">
                    <h2 className="titre"><span className="surligne">Donner, c'est s'engager</span></h2>
                    <p>Rejoignez la chaîne de solidarité !</p>
                    <div className="carrousel">
                        <button className="arrow" onClick={handlePrev}>‹</button>
                        <div className="affichage-carrousel">
                            <div className="mouvement-carrousel track" ref={trackRef}>
                                <div className="sections-bloc">
                                    <img src={Page_Carrefour_Don_IFI_Guillaume_BINET} alt="IFI" />
                                    <div className="texte"><h3>Don IFI</h3><a href="#" className="btn-outline">Je donne</a></div>
                                </div>
                                <div className="sections-bloc">
                                    <img src={Alex_Bonnemaison} alt="Philanthrope" />
                                    <div className="texte"><h3>Philanthropie</h3><a href="#" className="btn-outline">Je m'engage</a></div>
                                </div>
                                <div className="sections-bloc">
                                    <img src={Page_carrefour_Don_titres_restaurant} alt="Titres resto" />
                                    <div className="texte"><h3>Titres Resto</h3><a href="#" className="btn-outline">Je donne</a></div>
                                </div>
                                <div className="sections-bloc">
                                    <img src={Page_carrefour_Cagnotte_solidaire_Guillaume_BINET} alt="Cagnotte" />
                                    <div className="texte"><h3>Cagnotte</h3><a href="#" className="btn-outline">Je crée</a></div>
                                </div>
                            </div>
                        </div>
                        <button className="arrow" onClick={handleNext}>›</button>
                    </div>
                </section>

                {/* 7. Donner (Vêtements & Local) */}
                <section className="agir donner">
                    <h2 className="titre"><span className="surligne">Donner</span> près de chez vous !</h2>
                    <div className="blocs">
                        <div className="sections-bloc">
                            <img src={Page_carrefour_Don_vetements} alt="Vêtements" />
                            <div className="texte">
                                <p>Offrez une seconde vie à vos vêtements</p>
                                <a href="#" className="btn-outline">Je donne mes vêtements</a>
                            </div>
                        </div>
                        <div className="sections-bloc">
                            <img src={Page_Carrefour_Don_financement_participatif} alt="Local" />
                            <div className="texte">
                                <p>Contribuez à des projets locaux</p>
                                <a href="#" className="btn-outline">Je me mobilise</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. Patrimoine */}
                <section className="patrimoine" style={{ background: 'white' }}>
                    <h2 className="titre"><span className="surligne">Transmission</span> de patrimoine !</h2>
                    <p>Votre générosité est la source de notre efficacité et de notre pérennité.</p>
                </section>

                {/* 9. Transmettre & Philanthrope */}
                <div className="section-split">
                    <div className="col-img">
                        <img src={LC_20374} alt="Legs" />
                    </div>
                    <div className="col-txt">
                        <h2>Legs, donation, assurance-vie</h2>
                        <p>Découvrez comment soutenir nos actions sur le long terme par un legs, une donation ou la transmission d'une assurance-vie.</p>
                        <a href="#" className="btn-solid">En savoir plus</a>
                    </div>
                </div>

                <div className="section-split" style={{flexDirection: 'row-reverse'}}>
                    <div className="col-img">
                        <img src={Alex_Bonnemaison} alt="Philanthrope" />
                    </div>
                    <div className="col-txt">
                        <h2>Devenir philanthrope</h2>
                        <p>Vous souhaitez aller plus loin dans votre engagement ? En devenant philanthrope, vous soutenez des projets d'envergure.</p>
                        <a href="#" className="btn-solid">En savoir plus</a>
                    </div>
                </div>

                {/* 10. FAQ */}
                {/* 10. FAQ */}
                <section className="fqs-wrapper">
                    <style>{`
                    .fqs-wrapper {
                        margin-bottom: 64px;
                        padding-left: 24px;
                        padding-right: 24px;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                    }

                    .fqs-container {
                        width: 100%;
                        max-width: 1170px;
                        margin-left: auto;
                        margin-right: auto;
                        padding: 0;
                    }

                    .fqs-container-medium {
                        max-width: 970px;
                        margin-left: auto;
                        margin-right: auto;
                    }

                    .fqs-section-head {
                        margin-bottom: 3rem;
                        text-align: center;
                    }

                    .fqs-section-title {
                        margin: 0 0 1rem 0;
                        font-size: 2rem;
                        font-weight: 700;
                        line-height: 1.2;
                    }

                    .fqs-section-mark {
                        padding: 2px 8px;
                        border-radius: 2px;
                        color: #fff;
                        background-color: #075c68;
                        box-decoration-break: clone;
                        -webkit-box-decoration-break: clone;
                        line-height: 1.5;
                    }

                    .fqs-accordion {
                        margin-bottom: 8px;
                        border: 1px solid #cdcdcd;
                        border-radius: 4px;
                        padding: 12px;
                        transition: border-color 0.2s linear;
                        background: white;
                    }

                    .fqs-accordion:hover {
                        border-color: #e3001b;
                    }

                    .fqs-accordion-header {
                        position: relative;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        gap: 16px;
                        cursor: pointer;
                    }

                    .fqs-accordion-title {
                        font-size: 1.8rem;
                        font-weight: 600;
                        transition: color 0.2s linear;
                        margin: 0;
                        text-align: left;
                    }

                    .fqs-accordion-header:hover .fqs-accordion-title {
                        color: #e3001b;
                    }

                    .fqs-accordion-btn {
                        width: 24px;
                        height: 24px;
                        min-width: 24px;
                        font-size: 2.4rem;
                        color: #e3001b;
                        background: none;
                        border: none;
                        cursor: pointer;
                        padding: 0;
                        transition: transform 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .fqs-accordion-btn.open {
                        transform: rotate(180deg);
                    }

                    .fqs-accordion-icon {
                        width: 24px;
                        height: 24px;
                        fill: currentColor;
                    }

                    .fqs-accordion-content {
                        margin-top: 12px;
                        overflow: hidden;
                        transition: max-height 0.3s ease, opacity 0.3s ease;
                    }

                    .fqs-accordion-content.closed {
                        max-height: 0;
                        opacity: 0;
                        margin-top: 0;
                    }

                    .fqs-accordion-content.open {
                        max-height: 1000px;
                        opacity: 1;
                    }

                    .fqs-rich-text {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 24px;
                        text-align: left;
                        font-size: 1.6rem;
                    }
                    `}</style>
                    <div className="fqs-container">
                        <header className="fqs-section-head">
                            <h2 className="titre">
                                Le <span className="fqs-section-mark">don</span> à la Croix-Rouge
                            </h2>
                        </header>
                    </div>
                    <div className="fqs-container fqs-container-medium">
                        
                        {/* Question 1 */}
                        <article className="fqs-accordion">
                            <div
                                className="fqs-accordion-header"
                                onClick={() => toggleFaq(0)}
                                role="button"
                                aria-expanded={faqOpen === 0}
                            >
                                <h3 className="fqs-accordion-title">Si je fais un don, quel sera le montant de ma déduction fiscale ?</h3>
                                <button
                                    className={`fqs-accordion-btn ${faqOpen === 0 ? 'open' : ''}`}
                                    aria-label={faqOpen === 0 ? "Fermer" : "Ouvrir"}
                                    tabIndex="-1"
                                >
                                    <svg
                                        className="fqs-accordion-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className={`fqs-accordion-content ${faqOpen === 0 ? 'open' : 'closed'}`}>
                                <div className="fqs-rich-text">
                                    <p>Si vous êtes redevable de l'impôt sur le revenu, vous bénéficiez d’une réduction d’impôts de 75%.</p>
                                </div>
                            </div>
                        </article>

                        {/* Question 2 */}
                        <article className="fqs-accordion">
                            <div
                                className="fqs-accordion-header"
                                onClick={() => toggleFaq(1)}
                                role="button"
                                aria-expanded={faqOpen === 1}
                            >
                                <h3 className="fqs-accordion-title">Comment obtenir mon reçu fiscal ?</h3>
                                <button
                                    className={`fqs-accordion-btn ${faqOpen === 1 ? 'open' : ''}`}
                                    aria-label={faqOpen === 1 ? "Fermer" : "Ouvrir"}
                                    tabIndex="-1"
                                >
                                    <svg
                                        className="fqs-accordion-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className={`fqs-accordion-content ${faqOpen === 1 ? 'open' : 'closed'}`}>
                                <div className="fqs-rich-text">
                                    <p>Le reçu fiscal est envoyé dans les 10 jours par courrier ou 48h par email pour un don ponctuel.</p>
                                </div>
                            </div>
                        </article>

                        {/* Question 3 */}
                        <article className="fqs-accordion">
                            <div
                                className="fqs-accordion-header"
                                onClick={() => toggleFaq(2)}
                                role="button"
                                aria-expanded={faqOpen === 2}
                            >
                                <h3 className="fqs-accordion-title">A quoi servent les dons ?</h3>
                                <button
                                    className={`fqs-accordion-btn ${faqOpen === 2 ? 'open' : ''}`}
                                    aria-label={faqOpen === 2 ? "Fermer" : "Ouvrir"}
                                    tabIndex="-1"
                                >
                                    <svg
                                        className="fqs-accordion-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className={`fqs-accordion-content ${faqOpen === 2 ? 'open' : 'closed'}`}>
                                <div className="fqs-rich-text">
                                    <p>Vos dons financent l'aide alimentaire, les maraudes, la lutte contre l'isolement, etc.</p>
                                </div>
                            </div>
                        </article>

                    </div>
                </section>

                {/* 11. FORMULAIRE HORIZONTAL EN BAS */}
                {/* Il utilisera le CSS intégré dans le composant DonationFormHorizontal que vous avez corrigé */}
                <DonationFormHorizontal />

            </main>
        </>
    );
}