import {useRef, useState} from 'react';
import "./CroixRougeHomepage.css"

export default function CroixRougeHomepage() {
    const [searchType, setSearchType] = useState('Toutes');
    const [searchLocation, setSearchLocation] = useState('');
    const formationsCarouselRef = useRef(null);
    const dossiersCarouselRef = useRef(null);

    const formations = [{
        title: "PSC - Formation premiers secours citoyen (ancien PSC1)",
        duration: "8h",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=200&fit=crop"
    }, {
        title: "Initiation aux premiers secours enfant et nourrisson",
        duration: "4h30",
        image: "https://images.ctfassets.net/ksb78y40v1oe/2lvnw64LL6fbdU60Vsv4cD/bfefe9b8a447adf75b8f5ee4da450412/Les_Espaces_b_b__parents___accompagner_et_soutenir_les_familles?fm=webp&q=85&w=1170&h=450&fit=thumb"
    }, {
        title: "La formation aux gestes qui sauvent (GQS)",
        duration: "2h",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=200&fit=crop"
    }, {
        title: "Remise à niveau PSC",
        duration: "4h",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&h=200&fit=crop"
    }, {
        title: "Premiers secours en équipe",
        duration: "35h",
        image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&h=200&fit=crop"
    }];

    const dossiers = [{
        title: "Urgence Proche-Orient",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop"
    }, {
        title: "Santé mentale",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=200&fit=crop"
    }, {
        title: "Projet 3 Océans : Réduire l'impact des catastrophes",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=200&fit=crop"
    }, {
        title: "Urgence Ukraine",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=200&fit=crop"
    }, {
        title: "Rapport Résilience de la Croix-Rouge française",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop"
    }];

     const actualites = [{
        date: "04/09/25",
        title: "Rétablissement des liens familiaux : clarifier le sort des personnes disparues et apporter",
        image: "https://images.ctfassets.net/ksb78y40v1oe/2IQ7uDilkzVZ282qCMbrWx/6ba0f0ac4f92f9a584c3a37d244b4dba/2022_liens-familiaux_Calais__L_Witter-RLF-700-450.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
    }, {
        date: "09/09/25",
        title: "Cyclones, Tsunamis, montée des eaux : comment mieux préparer... les communautés des trois",
        image: "https://www.encyclopedie-environnement.org/app/uploads/2016/06/cyclones2_couverture.png"
    }, {
        date: "10/09/25",
        title: "La Journée Mondiale des Premiers Secours revient le 13 septembre...",
        image: "https://i.la-croix.com/836x/smart/2023/09/09/1201281997/Organisee-samedi-9-septembre-Journee-mondiale-premiers-secours-loccasionla-Croix-Rouge-sensibiliser-Francais-limportance-formation-gestes-sauvent_0.jpg"
    }];


    const handleScroll = (ref, direction) => {
        if (ref.current) {
            const cardWidth = window.innerWidth <= 480 ? 280 : 
                             window.innerWidth <= 768 ? 320 : 370;
            const scrollAmount = cardWidth + 20; 
            
            ref.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="page">
            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">
                            Je veux <span
                            className="mark-secondary">me former aux métiers du sanitaire et du social</span>
                        </h2>
                        <p className="subtitle">
                            Peu importe votre profil, il y a forcément une formation faite pour vous !
                        </p>
                    </header>

                    <div className="cta-list">
                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=350&fit=crop"
                                    alt="Professionnel" className="cta-image"/>
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Vous êtes un professionnel ?</p>
                                <button className="btn-primary">Je monte en compétence</button>
                            </div>
                        </div>

                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=350&fit=crop"
                                    alt="Étudiant" className="cta-image"/>
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Vous êtes un futur étudiant ?</p>
                                <button className="btn-primary">J'apprends un métier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper">
                <div className="container">
                    <div className="block-formations">
                        <div className="block-formations__header">
                            <div className="block-formations__head">
                                <header className="section-head section-head--left section-head--secondary">
                                    <h2 className="section-head__title">
                                        On peut tous <span className="section-head__mark">sauver des vies</span>
                                    </h2>
                                    <p className="section-head__subtitle">Je me forme aux premiers secours</p>
                                </header>
                            </div>

                            <div className="block-formations__search">
                                <div className="block-formations__search-input">
                                    <div className="search-bar-v2">
                                        <div className="container--shrink search-bar search-bar--column">
                                            <div
                                                className="search-bar__form-select search-bar__form-select--with-icon search-bar__form-select-column">
                                                <div className="form-input form-input-- form-select--no-border">
                                                    <span className="form-input__field">
                                                        <select
                                                            id="select_search"
                                                            name="select_search"
                                                            value={searchType}
                                                            onChange={(e) => setSearchType(e.target.value)}
                                                            className="form-input__input form-input__input--select-red-arrow"
                                                        >
                                                            <option value="Toutes">Toutes</option>
                                                            <option value="PSC">PSC</option>
                                                            <option value="Formation aux gestes qui sauvent">Formation aux gestes qui sauvent</option>
                                                            <option
                                                                value="Remise à niveau PSC">Remise à niveau PSC</option>
                                                            <option value="Premiers secours enfants et nourrissons">Premiers secours enfants et nourrissons</option>
                                                        </select>
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="search-bar__form-autocomplete-wrapper search-bar__form-autocomplete-wrapper--with-select search-bar__form-autocomplete-wrapper-column">
                                                <div className="search-bar-v2__input">
                                                    <div className="form-auto-complete-locationV2 search-bar__form">
                                                        <div
                                                            className="form-input form-auto-complete-locationV2__form-input">
                                                            <span
                                                                className="form-input__field form-auto-complete-locationV2__form-input__field--text">
                                                                <input
                                                                    id="location-search"
                                                                    name="location-search"
                                                                    placeholder="Code postal ou ville"
                                                                    type="search"
                                                                    value={searchLocation}
                                                                    onChange={(e) => setSearchLocation(e.target.value)}
                                                                    className="form-input__input"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="block-formations__carrousel">
                            <div className="carousel-wrapper">
                                <button
                                    className="carousel-nav carousel-nav-left"
                                    onClick={() => handleScroll(formationsCarouselRef, 'left')}
                                    aria-label="Précédent"
                                >
                                    ‹
                                </button>
                                <div className="ssr-carousel-slides">
                                    <div className="ssr-carousel-mask">
                                        <ul className="ssr-carousel-track" ref={formationsCarouselRef}>
                                            {formations.map((formation, index) => (
                                                <li key={index} className="ssr-carousel-slide">
                                                    <a href="#" className="training-card">
                                                        <div className="training-card__cover">
                                                            <img src={formation.image} alt={formation.title}
                                                                 className="training-card__img"/>
                                                        </div>
                                                        <div className="training-card__text">
                                                            <strong
                                                                className="training-card__title">{formation.title}</strong>
                                                            <div className="training-card__info">
                                                                <span className="training-card__label">Durée</span>
                                                                <span
                                                                    className="training-card__duration">{formation.duration}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button
                                    className="carousel-nav carousel-nav-right"
                                    onClick={() => handleScroll(formationsCarouselRef, 'right')}
                                    aria-label="Suivant"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">
                            Je veux <span className="mark-secondary">agir</span>
                        </h2>
                    </header>

                    <div className="cta-list">
                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=350&fit=crop"
                                    alt="Emploi" className="cta-image"/>
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Trouvez un emploi</p>
                                <button className="btn-primary">Je découvre les métiers</button>
                            </div>
                        </div>

                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=350&fit=crop"
                                    alt="Bénévole" className="cta-image"/>
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Devenez bénévole</p>
                                <button className="btn-primary">Je trouve une mission</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-blue">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">
                            Près de <span className="mark-secondary">chez moi</span>
                        </h2>
                    </header>

                    <div className="icons-list">
                        <a href="#" className="icon-card">
                            <div className="icon-wrapper">
                                <img src="https://api.iconify.design/mdi/food-apple.svg" alt="" className="icon-image"/>
                            </div>
                            <span className="icon-title">Épiceries sociales</span>
                        </a>

                        <a href="#" className="icon-card">
                            <div className="icon-wrapper">
                                <img src="https://api.iconify.design/mdi/tshirt-crew.svg" alt=""
                                     className="icon-image"/>
                            </div>
                            <span className="icon-title">Boutiques solidaires</span>
                        </a>

                        <a href="#" className="icon-card">
                            <div className="icon-wrapper">
                                <img src="https://api.iconify.design/mdi/baby-carriage.svg" alt=""
                                     className="icon-image"/>
                            </div>
                            <span className="icon-title">Crèches</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">Nos dossiers</h2>
                    </header>

                    <div className="carousel-wrapper">
                        <button
                            className="carousel-nav carousel-nav-left"
                            onClick={() => handleScroll(dossiersCarouselRef, 'left')}
                            aria-label="Précédent"
                        >
                            ‹
                        </button>
                        <div className="dossiers-carousel" ref={dossiersCarouselRef}>
                            {dossiers.map((dossier, index) => (
                                <a href="#" key={index} className="folder-card">
                                    <div className="folder-cover">
                                        <img src={dossier.image} alt={dossier.title} className="folder-image"/>
                                    </div>
                                    <div className="folder-text">
                                        <strong className="folder-title">{dossier.title}</strong>
                                        <span className="btn-link">
                                            <svg className="arrow-icon" viewBox="0 0 16 16"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor"
                                                      d="M5.727 11.053 8.78 8 5.727 4.94l.94-.94 4 4-4 4-.94-.947Z"/>
                                            </svg>
                                            Lire le dossier
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <button
                            className="carousel-nav carousel-nav-right"
                            onClick={() => handleScroll(dossiersCarouselRef, 'right')}
                            aria-label="Suivant"
                        >
                            ›
                        </button>
                    </div>

                    <div className="extra-folder">
                        <div className="folder-line"></div>
                        <button className="btn-border">Voir plus de dossiers</button>
                        <div className="folder-line"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}