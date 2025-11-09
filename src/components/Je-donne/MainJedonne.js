import React, {useEffect, useRef, useState} from "react";
import "./Je-donne.css"
import DonationFormHorizontal from "../Form/DonationFormHorizontal";

export default function MainJedonne() {
    // États pour le formulaire de don
    const [montantSelectionne, setMontantSelectionne] = useState(130);
    const [modePaiement, setModePaiement] = useState("unefois");
    const [montantLibre, setMontantLibre] = useState("");


    // États pour le carrousel
    const [carouselIndex, setCarouselIndex] = useState(0);
    const trackRef = useRef(null);

    // États pour les questions fréquentes
    const [questionsOuvertes, setQuestionsOuvertes] = useState({});

    // Montants selon le mode de paiement
    const montants = {
        unefois: [90, 130, 150, 200],
        touslesmois: [10, 20, 30, 50]
    };

    // Calcul de la déduction fiscale
    const deductionFiscale = Math.floor(montantSelectionne * 0.25);

    // Gérer le changement de mode de paiement
    const handleModeChange = (mode) => {
        setModePaiement(mode);
        setMontantLibre("");
        if (mode === "unefois") {
            setMontantSelectionne(130);
        } else {
            setMontantSelectionne(10);
        }
    };

    // Gérer la sélection d'un montant prédéfini
    const handleMontantClick = (montant) => {
        setMontantSelectionne(montant);
        setMontantLibre("");
    };

    // Gérer le montant libre
    const handleMontantLibreChange = (value) => {
        setMontantLibre(value);
        const val = parseFloat(value);
        setMontantSelectionne(isNaN(val) ? 0 : val);
    };



    // Gestion du carrousel
    const getVisibleCount = () => {
        const width = window.innerWidth;
        if (width <= 500) return 1;
        if (width <= 1080) return 2;
        return 3;
    };

    const updateCarousel = () => {
        if (!trackRef.current) return;

        const visibleCount = getVisibleCount();
        const blocs = trackRef.current.querySelectorAll(".sections-bloc");
        if (blocs.length === 0) return;

        const gap = 60;
        const blockWidth = blocs[0].offsetWidth;
        const moveX = (blockWidth + gap) * carouselIndex;
        trackRef.current.style.transform = `translateX(-${moveX}px)`;
    };

    useEffect(() => {
        updateCarousel();
        window.addEventListener("resize", updateCarousel);
        return () => window.removeEventListener("resize", updateCarousel);
    }, [carouselIndex]);

    const handlePrevCarousel = () => {
        if (carouselIndex > 0) {
            setCarouselIndex(carouselIndex - 1);
        }
    };

    const handleNextCarousel = () => {
        const visibleCount = getVisibleCount();
        const totalBlocs = 4;
        if (carouselIndex < totalBlocs - visibleCount) {
            setCarouselIndex(carouselIndex + 1);
        }
    };

    // Gestion des questions fréquentes
    const toggleQuestion = (index) => {
        setQuestionsOuvertes((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    // Composant formulaire de don réutilisable
    const FormulaireDon = ({className = ""}) => (
        <div className={className}>
            <div className="selecteur-choix">
                <div
                    className={modePaiement === "unefois" ? "active choix1" : "choix1"}
                    onClick={() => handleModeChange("unefois")}
                >
                    <label>
                        <input
                            type="radio"
                            className="mode"
                            name={`type-${className}`}
                            value="unefois"
                            checked={modePaiement === "unefois"}
                            onChange={() => {
                            }}
                        />
                        Je donne une fois
                    </label>
                </div>
                <div
                    className={modePaiement === "touslesmois" ? "active choix2" : "choix2"}
                    onClick={() => handleModeChange("touslesmois")}
                >
                    <label>
                        <input
                            type="radio"
                            className="mode"
                            name={`type-${className}`}
                            value="touslesmois"
                            checked={modePaiement === "touslesmois"}
                            onChange={() => {
                            }}
                        />
                        Je donne tous les mois
                    </label>
                </div>
            </div>
            <div className="selecteur-montant">
                {montants[modePaiement].map((montant, index) => (
                    <button
                        key={index}
                        className={
                            montantSelectionne === montant && !montantLibre
                                ? "montant-btn active"
                                : "montant-btn"
                        }
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
                    onChange={(e) => handleMontantLibreChange(e.target.value)}
                />
                <span>€</span>
            </div>
        </div>
    );

    return (
        <>
            <div className="bloc-don">
                <img
                    src="/assets/images/Je-donne/Page_Carrefour_Je_donne.webp"
                    alt="Je donne"
                    className="bloc-don-image"
                />
                <div className="section-hero">
                    <h1 className="hero">
                        Grâce à vos dons nous
                        <br/>
                        pouvons agir
                    </h1>
                    <div className="formulaire-don-vertical">
                        <p className="texte1">Mobilisons-nous ensemble !</p>
                        <FormulaireDon/>
                        <p className="texte2">
                            Soit <span className="fiscal">{deductionFiscale} €</span> après
                            déduction fiscale
                        </p>
                        <button className="bouton-donation">Je donne</button>
                    </div>
                </div>
            </div>

            <div className="stats">
                <div className="texte">
                    <h2>
                        <span className="surligne">Chiffres clés</span>
                    </h2>
                    <p>
                        Chaque jour, nos volontaires agissent près de chez vous, grâce à
                        vous !
                    </p>
                </div>
                <div className="chiffres">
                    <section className="chiffre1">
                        <h3>
                            70 521
                        </h3>
                        <p>bénévoles</p>
                    </section>
                    <section className="chiffre2">
                        <h3>
                            1 056
                        </h3>
                        <p>implantations locales</p>
                    </section>
                    <section className="chiffre3">
                        <h3>
                            434 855
                        </h3>
                        <p>associations</p>
                    </section>
                </div>
            </div>

            <div className="nous-soutenir">
                <h2 className="titre">
                    Comment <span className="surligne">nous soutenir</span> ?
                </h2>
                <p className="texte1">
                    En soutenant notre action, vous vous engagez auprès de nos 70 000
                    bénévoles, à apporter une aide inconditionnelle aux personnes
                    vulnérables.
                    <br/>
                    Comment ?
                </p>
                <ul className="exemples">
                    <li>Transformez votre IFI en projets solidaires</li>
                    <li>
                        Vous n'avez pas utilisé tous vos titres restaurant ? Faites-en don à
                        notre association pour soutenir l'aide alimentaire
                    </li>
                    <li>Contribuez à financer des projets près de chez vous !</li>
                    <li>
                        Devenez ambassadeur de la Croix-Rouge en crééant votre cagnotte
                        solidaire
                    </li>
                </ul>
            </div>

            <section className="agir">
                <h2 className="titre">
                    C'est grâce à <span className="surligne">vos dons</span> que nous
                    pouvons agir
                </h2>
                <p className="sous-titre">Comment faire un don à la Croix-Rouge ?</p>
                <div className="blocs">
                    <div className="sections-bloc">
                        <img
                            alt="Bénévole distribuant de la nourriture"
                            src="assets/images/Je-donne/Page_Carrefour_Je_donne(1).webp"
                        />
                        <div className="texte">
                            <p>Soutenez les actions de la Croix-Rouge française</p>
                            <a href="#" className="bouton">
                                Je fais un don
                            </a>
                        </div>
                    </div>
                    <div className="sections-bloc">
                        <img
                            alt="Bénévole aidant des personnes en difficulté"
                            src="assets/images/Je-donne/Page_carrefour_Don_r__gulier.webp"
                        />
                        <div className="texte">
                            <p>Choisissez le don par prélèvement automatique</p>
                            <a href="#" className="bouton">
                                Je fais un don régulier
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="deduction-fiscale">
                <h2>
                    Bénéficiez d'une{" "}
                    <span className="surligne">déduction fiscale de 75% !</span>
                </h2>
                <p>
                    Faire un don à la Croix-Rouge vous permet de bénéficier d'une
                    déduction fiscale de 75% sur votre impôt sur le revenu.
                </p>
                <p className="important">
                    Un don de 100€ ne vous coûte donc que 25€.
                </p>
                <p>
                    Ensemble, faisons la différence ! C'est grâce à la générosité du grand
                    public que nous venons en aide aux personnes démunies. Prévenir,
                    éduquer, protéger les populations, telles sont les missions que nous
                    accomplissons tous les jours avec vous.
                </p>
            </section>

            <section className="engager">
                <h2 className="titre">
                    <span className="surligne">Donner, c'est s'engager</span> auprès des
                    personnes que nous accompagnons
                </h2>
                <p className="sous-titre">Rejoignez la chaîne de solidarité !</p>
                <div className="carrousel">
                    <button
                        className={`arrow prevBtn ${carouselIndex === 0 ? "hidden" : ""}`}
                        onClick={handlePrevCarousel}
                    >
                        ‹
                    </button>
                    <div className="affichage-carrousel">
                        <div className="mouvement-carrousel track" ref={trackRef}>
                            <div className="sections-bloc">
                                <img
                                    alt="Bénévoles dans un atelier"
                                    src="assets/images/Je-donne/Page_Carrefour_Don_IFI_Guillaume_BINET.webp"
                                />
                                <div className="texte">
                                    <h3>Transformez votre IFI en projet solidaire</h3>
                                    <a href="#" className="bouton">
                                        Je fais un don IFI
                                    </a>
                                </div>
                            </div>
                            <div className="sections-bloc">
                                <img
                                    alt="Bénévole avec un enfant"
                                    src="assets/images/Je-donne/Cr_dits_photo_Alex_Bonnemaison_droits_c_d_s_jusqu-au_5_f_vrier_2026_EBP_Chatenay__2_.webp"
                                />
                                <div className="texte">
                                    <h3>Soutenez nos actions durablement</h3>
                                    <a href="#" className="bouton">
                                        Je deviens philanthrope
                                    </a>
                                </div>
                            </div>
                            <div className="sections-bloc">
                                <img
                                    alt="Bénévoles dans une réserve alimentaire"
                                    src="assets/images/Je-donne/Page_carrefour_Don_titres_restaurant.webp"
                                />
                                <div className="texte">
                                    <h3>Donnez vos titres restaurants non utilisés</h3>
                                    <a href="#" className="bouton">
                                        Je donne
                                    </a>
                                </div>
                            </div>
                            <div className="sections-bloc">
                                <img
                                    alt="Bénévole portant un enfant"
                                    src="assets/images/Je-donne/Page_carrefour_Cagnotte_solidaire_Guillaume_BINET.webp"
                                />
                                <div className="texte">
                                    <h3>Organisez une collecte de fonds</h3>
                                    <a href="#" className="bouton">
                                        Je crée ma cagnotte
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="donner">
                <h2 className="titre">
                    <span className="surligne">Donner</span> près de chez vous !
                </h2>
                <div className="blocs">
                    <div className="sections-bloc">
                        <img
                            alt="Bénévole tenant une boutique de vêtements"
                            src="assets/images/Je-donne/Page_carrefour_Don_v__tements.webp"
                        />
                        <div className="texte">
                            <p>Offrez une seconde vie à vos vêtements</p>
                            <a href="#" className="bouton">
                                Je donne mes vêtements
                            </a>
                        </div>
                    </div>
                    <div className="sections-bloc">
                        <img
                            alt="Bénévole aidant dans une boutique de vêtement"
                            src="assets/images/Je-donne/Page_Carrefour_Don_financement_participatif.webp"
                        />
                        <div className="texte">
                            <p>Contribuez à des pages locaux</p>
                            <a href="#" className="bouton">
                                Je me mobilise
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="patrimoine">
                <h2>
                    <span className="surligne">Transmission</span> de patrimoine !
                </h2>
                <h3>
                    Transmettre à la Croix-Rouge française, c'est continuer d'agir à nos
                    côtés
                </h3>
                <p>
                    Derrière chaque action de la Croix-Rouge, il y a l'engagement sans
                    faille de nos bénévoles mais aussi de nos bienfaiteurs, comme vous,
                    désireux de partager nos valeurs et de s'associer à notre mission.
                </p>
                <p className="gras">
                    Votre générosité est la source de notre efficacité et de notre
                    pérennité.
                </p>
            </section>

            <section className="transmettre">
                <div className="section-transmettre">
                    <div className="donation-image">
                        <img
                            alt="Bénévoles portant un bébé"
                            src="assets/images/Je-donne/LC_20374.webp"
                        />
                    </div>
                    <div className="contenu">
                        <h2>
                            Legs, donation, assurance-vie : Transmettez le pouvoir de sauver
                            des vies
                        </h2>
                        <p>
                            Découvrez comment soutenir nos actions sur le long terme par{" "}
                            <strong>
                                un legs, une donation ou la transmission d'une assurance-vie
                            </strong>
                            . Vous pouvez nous transmettre tous types de biens, c'est votre
                            générosité qui fait vivre nos actions.
                        </p>
                        <a href="#" className="bouton">
                            Je veux en savoir plus
                        </a>
                    </div>
                </div>
            </section>

            <section className="philanthrope">
                <div className="section-philanthrope">
                    <div className="contenu">
                        <h2>
                            Devenir philanthrope : Transformez votre générosité en impact
                            durable
                        </h2>
                        <p>
                            Vous souhaitez aller plus loin dans votre engagement ? En devenant
                            philanthrope, vous soutenez des projets d'envergure directement aux
                            côtés de la Croix-Rouge française.
                            <br/>
                            <br/>
                            Un accompagnement sur mesure vous est proposé pour construire un
                            engagement à la hauteur de vos valeurs.
                        </p>
                        <a href="#" className="bouton">
                            Je veux en savoir plus
                        </a>
                    </div>
                    <div className="philanthrope-image">
                        <img
                            alt="Bénévole avec un enfant"
                            src="assets/images/Je-donne/Cr_dits_photo_Alex_Bonnemaison_droits_c_d_s_jusqu-au_5_f_vrier_2026_EBP_Chatenay__2_(1).webp"
                        />
                    </div>
                </div>
            </section>

            <section className="question-frequente">
                <h2 className="titre">
                    Le <span className="surligne">don</span> à la Croix-Rouge
                </h2>
                <p className="sous-titre">Retrouvez quelques questions fréquentes</p>
                <div className="questions">
                    <div className="section-question">
                        <div
                            className="question"
                            onClick={() => toggleQuestion(0)}
                        >
              <span>
                Si je fais un don, quel sera le montant de ma déduction fiscale
                ?
              </span>
                            <span className={`fleche ${questionsOuvertes[0] ? "ouverte" : ""}`}>
                ▼
              </span>
                        </div>
                        <div className={`reponse ${questionsOuvertes[0] ? "ouverte" : ""}`}>
                            <p>
                                Si vous êtes redevable de{" "}
                                <strong>l'impôt sur le revenu</strong>, vous bénéficiez d'une
                                réduction d'impôts de{" "}
                                <strong>75% du montant de votre don dans la limite de 1 000€</strong>{" "}
                                et, au-delà, d'une réduction d'impôts de{" "}
                                <strong>
                                    66% dans la limite de 20% de votre revenu imposable
                                </strong>
                                .
                                <br/>
                                Si vous êtes redevable de{" "}
                                <strong>l'impôt sur la fortune immobilière</strong>,{" "}
                                <strong>75% du montant de votre don</strong> à des projets
                                solidaires Croix-Rouge est{" "}
                                <strong>déductible de votre IFI</strong>, dans la limite de{" "}
                                <strong>50 000 € de déduction</strong>.
                            </p>
                        </div>
                    </div>
                    <div className="section-question">
                        <div
                            className="question"
                            onClick={() => toggleQuestion(1)}
                        >
                            <span>Comment obtenir mon reçu fiscal ?</span>
                            <span className={`fleche ${questionsOuvertes[1] ? "ouverte" : ""}`}>
                ▼
              </span>
                        </div>
                        <div className={`reponse ${questionsOuvertes[1] ? "ouverte" : ""}`}>
                            <p>
                                Si vous avez fait un<strong> don ponctuel</strong>, vous
                                recevrez votre reçu fiscal{" "}
                                <strong>dans les 10 jours qui suivent votre don par courrier </strong>
                                ou <strong>dans les 48h par mail</strong> si vous avez choisi de
                                le recevoir en version électronique. N'oubliez pas de vérifier
                                vos <strong>spams</strong> et <strong>courriers indésirables</strong>{" "}
                                ! Si vous avez fait un<strong> don régulier</strong> (par
                                prélèvement automatique), vous recevrez
                                <strong> automatiquement</strong> le reçu fiscal des dons cumulés
                                en avril de l'année suivante.
                            </p>
                        </div>
                    </div>
                    <div className="section-question">
                        <div
                            className="question"
                            onClick={() => toggleQuestion(2)}
                        >
                            <span>A quoi servent les dons ?</span>
                            <span className={`fleche ${questionsOuvertes[2] ? "ouverte" : ""}`}>
                ▼
              </span>
                        </div>
                        <div className={`reponse ${questionsOuvertes[2] ? "ouverte" : ""}`}>
                            <p>
                                Chaque jour, grâce à votre générosité, les volontaires de la
                                Croix-Rouge peuvent agir ! Vos dons nous permettent de financer
                                entre autres :
                                <br/>
                            </p>
                            <ul>
                                <li>
                                    L'aide alimentaire : la distribution de repas et colis auprès
                                    de personnes vulnérables
                                </li>
                                <li>
                                    Les maraudes, qui permettent de maintenir le lien social pour
                                    les personnes sans-abri
                                </li>
                                <li>
                                    La lutte contre l'isolement : les visites à domicile, les
                                    rencontres
                                </li>
                                <li>
                                    Les formations grand public : matériel de formation,
                                    équipements
                                </li>
                                <li>L'aide internationale</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            <DonationFormHorizontal/>
        </>
    );
}