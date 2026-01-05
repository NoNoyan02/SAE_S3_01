import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';


// Import des composants globaux
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
// Assurez-vous que le chemin est bon par rapport à votre structure
import DonationFormHorizontal from "../components/Form/DonationFormHorizontal.jsx";
import LC_20374 from "assets/images/je-donne/LC_20374.webp";
import Alex_Bonnemaison from "assets/images/je-donne/Alex_Bonnemaison.webp";
import Page_carrefour_Cagnotte_solidaire_Guillaume_BINET from "assets/images/je-donne/Page_carrefour_Cagnotte_solidaire_Guillaume_BINET"
import Page_Carrefour_Don_financement_participatif from "assets/images/je-donne/Page_Carrefour_Don_financement_participatif"
import Page_Carrefour_Don_IFI_Guillaume_BINET from "{assets/images/je-donne/Page_Carrefour_Don_IFI_Guillaume_BINET.webp";
import Page_carrefour_Don_regulier from "{assets/images/je-donne/Page_carrefour_Don_regulier.webp";
import Page_carrefour_Don_titres_restaurant from "{assets/images/je-donne/Page_carrefour_Don_titres_restaurant.webp";
import Page_carrefour_Don_vetements from "{assets/images/je-donne/Page_carrefour_Don_vetements.webp";
import Page_Carrefour_Je_donne from "{assets/images/je-donne/Page_Carrefour_Je_donne.webp";


export default function JeDonne() {
    // --- ETATS (STATE) ---
    const [modePaiement, setModePaiement] = useState("unefois");
    const [montantSelectionne, setMontantSelectionne] = useState(130);
    const [montantLibre, setMontantLibre] = useState("");
    const [carouselIndex, setCarouselIndex] = useState(0);
    const trackRef = useRef(null);
    const [faqOpen, setFaqOpen] = useState(null);

    // --- LOGIQUE FORMULAIRE HERO ---
    const montants = {
        unefois: [90, 130, 150, 200],
        touslesmois: [10, 20, 30, 50]
    };

    const coutReel = Math.floor(montantSelectionne * 0.25);

    const handleModeChange = (mode) => {
        setModePaiement(mode);
        setMontantLibre("");
        setMontantSelectionne(mode === "unefois" ? 130 : 10);
    };

    const handleMontantClick = (montant) => {
        setMontantSelectionne(montant);
        setMontantLibre("");
    };

    const handleMontantLibreChange = (e) => {
        const val = e.target.value;
        setMontantLibre(val);
        setMontantSelectionne(val ? parseFloat(val) : 0);
    };

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
                /* RESET & GLOBAL */
                .page-je-donne {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    color: #101010;
                    line-height: 1.5;
                }
                
                .page-je-donne h1, .page-je-donne h2, .page-je-donne h3 {
                    margin-top: 0;
                }

                /* --- HERO --- */
                .bloc-don {
                    position: relative;
                    width: 100%;
                    min-height: 600px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    background-color: #f0f0f0;
                }
                .bloc-don-image {
                    position: absolute;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    object-fit: cover;
                    z-index: 0;
                }
                .section-hero {
                    position: relative;
                    z-index: 2;
                    width: 100%;
                    max-width: 1200px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 0 20px;
                    flex-wrap: wrap;
                    gap: 40px;
                }
                .hero-title {
                    font-size: 3.5rem;
                    font-weight: 800;
                    color: white;
                    text-shadow: 0 4px 10px rgba(0,0,0,0.6);
                    line-height: 1.2;
                }
                @media(max-width: 900px) {
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

                /* --- STATS --- */
                .stats {
                    background-color: #e8f0f1;
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
                    font-size: 1.2rem;
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
                .sections-bloc { max-width: 400px; }
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

                /* --- DEDUCTION --- */
                .deduction-fiscale {
                    background-color: #eef6f8;
                    padding: 50px 20px;
                    margin: 50px auto;
                    max-width: 1000px;
                    text-align: center;
                    border-radius: 8px;
                }
                .important { color: #e60000; font-weight: bold; font-size: 1.5rem; margin: 20px 0; }

                /* --- CARROUSEL --- */
                .engager { padding: 50px 0; text-align: center; overflow: hidden; }
                .carrousel {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 30px;
                }
                .affichage-carrousel {
                    width: 90%;
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
                    width: 40px; height: 40px;
                    border-radius: 50%;
                    border: none;
                    background: #333;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                .arrow:hover { background: black; }

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

            <Header />

            <main className="page-je-donne">

                {/* 1. Hero Section */}
                <div className="bloc-don">
                    {/* Les images dans public/ s'appellent avec /assets/... */}
                    <img className="bloc-don-image" src={Page_Carrefour_Je_donne} alt="Fond don" />

                    <div className="section-hero">
                        <h1 className="hero-title">Grâce à vos dons nous<br/>pouvons agir</h1>

                        {/* Formulaire Vertical (Hero) */}
                        <div className="formulaire-don-vertical">
                            <p className="texte1">Mobilisons-nous ensemble !</p>

                            <div className="selecteur-choix">
                                <div className={`choix-btn ${modePaiement === 'unefois' ? 'active' : ''}`} onClick={() => handleModeChange('unefois')}>
                                    Je donne une fois
                                </div>
                                <div className={`choix-btn ${modePaiement === 'touslesmois' ? 'active' : ''}`} onClick={() => handleModeChange('touslesmois')}>
                                    Je donne tous les mois
                                </div>
                            </div>

                            <div className="selecteur-montant">
                                {montants[modePaiement].map((montant) => (
                                    <button
                                        key={montant}
                                        className={`montant-btn ${montantSelectionne === montant && !montantLibre ? 'active' : ''}`}
                                        onClick={() => handleMontantClick(montant)}
                                    >
                                        {montant} €
                                    </button>
                                ))}
                            </div>

                            <div className="montant-libre-container">
                                <input
                                    type="number"
                                    className="montant-libre"
                                    placeholder="Montant libre"
                                    value={montantLibre}
                                    onChange={handleMontantLibreChange}
                                />
                                <span>€</span>
                            </div>

                            <p className="texte2">Soit <span className="fiscal">{coutReel} €</span> après déduction fiscale</p>
                            <button className="bouton-donation">Je donne</button>
                        </div>
                    </div>
                </div>

                {/* 2. Stats */}
                <div className="stats">
                    <div className="texte">
                        <h2><span className="surligne">Chiffres clés</span></h2>
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
                        <li>Transformez votre IFI en projets solidaires</li>
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
                    <h2>Bénéficiez d'une <span className="surligne">déduction fiscale de 75% !</span></h2>
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
                <section className="stats patrimoine" style={{ background: 'white' }}>
                    <h2 style={{color: 'black'}}><span className="surligne">Transmission</span> de patrimoine !</h2>
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
                <section className="question-frequente">
                    <h2 className="titre">Le <span className="surligne">don</span> à la Croix-Rouge</h2>
                    <div className="questions">
                        <div className="section-question">
                            <div className="question" onClick={() => toggleFaq(0)}>
                                <span>Si je fais un don, quel sera le montant de ma déduction fiscale ?</span>
                                <span className={`fleche ${faqOpen === 0 ? 'ouverte' : ''}`}>▼</span>
                            </div>
                            <div className={`reponse ${faqOpen === 0 ? 'ouverte' : ''}`}>
                                <p>Si vous êtes redevable de l'impôt sur le revenu, vous bénéficiez d’une réduction d’impôts de 75%.</p>
                            </div>
                        </div>
                        <div className="section-question">
                            <div className="question" onClick={() => toggleFaq(1)}>
                                <span>Comment obtenir mon reçu fiscal ?</span>
                                <span className={`fleche ${faqOpen === 1 ? 'ouverte' : ''}`}>▼</span>
                            </div>
                            <div className={`reponse ${faqOpen === 1 ? 'ouverte' : ''}`}>
                                <p>Le reçu fiscal est envoyé dans les 10 jours par courrier ou 48h par email pour un don ponctuel.</p>
                            </div>
                        </div>
                        <div className="section-question">
                            <div className="question" onClick={() => toggleFaq(2)}>
                                <span>A quoi servent les dons ?</span>
                                <span className={`fleche ${faqOpen === 2 ? 'ouverte' : ''}`}>▼</span>
                            </div>
                            <div className={`reponse ${faqOpen === 2 ? 'ouverte' : ''}`}>
                                <p>Vos dons financent l'aide alimentaire, les maraudes, la lutte contre l'isolement, etc.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 11. FORMULAIRE HORIZONTAL EN BAS */}
                {/* Il utilisera le CSS intégré dans le composant DonationFormHorizontal que vous avez corrigé */}
                <DonationFormHorizontal />

            </main>

            <Footer />
        </>
    );
}