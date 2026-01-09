import React, {useEffect, useRef, useState} from "react";
import DonationFormHorizontal from "../Form/DonationFormHorizontal.jsx";
import Alex_Bonnemaison from "assets/images/je-donne/Alex_Bonnemaison.webp";
import LC_20374 from "assets/images/Je-donne/LC_20374.webp";
import Page_carrefour_Cagnotte_solidaire_Guillaume_BINET from "assets/images/je-donne/Page_carrefour_Cagnotte_solidaire_Guillaume_BINET"
import FormulaireDon from "./FormulaireDon.jsx";

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

    const updateCarousel = React.useCallback(() => {
        if (!trackRef.current) return;

        const blocs = trackRef.current.querySelectorAll(".sections-bloc");
        if (blocs.length === 0) return;

        const gap = 60;
        const blockWidth = blocs[0].offsetWidth;
        const moveX = (blockWidth + gap) * carouselIndex;
        trackRef.current.style.transform = `translateX(-${moveX}px)`;
    }, [carouselIndex]);

    useEffect(() => {
        updateCarousel();
        window.addEventListener("resize", updateCarousel);
        return () => window.removeEventListener("resize", updateCarousel);
    }, [carouselIndex, updateCarousel]);

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


    return (
        <>
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                body {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                /******************************* NAVBAR STYLES *******************************/

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
                }

                .elements {
                    display: flex;
                    gap: 10px;
                    flex: 1;
                    margin: 0 20px;
                    justify-content: center;
                }

                .elements a {
                    padding: 10px 15px;
                    font-size: 15px;
                    text-decoration: none;
                    color: black;
                    font-weight: 600;
                    white-space: nowrap;
                    transition: color 0.2s;
                }

                .elements a:hover {
                    color: #e30613;
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
                }

                .compte {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    cursor: pointer;
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
                    background-color: #e30613;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 600;
                    text-align: center;
                    line-height: 2;
                    transition: background-color 0.2s;
                }

                .jefaisundon:hover {
                    background-color: #c00511;
                }

                .sousnavbar {
                    padding: 12px 40px;
                    background-color: #f8f8f8;
                    border-bottom: 1px solid #e0e0e0;
                    border: none;
                }

                .sousnavbar ol {
                    list-style: none;
                    display: flex;
                    align-items: center;
                    gap: 5px;
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

                .sousnavbar a:hover {
                    color: #e30613;
                }

                .sousnavbar li:not(:last-child)::after {
                    content: ">";
                    margin: 0 8px;
                    color: #666;
                    font-weight: bold;
                }

                .sousnavbar .jedonne {
                    color: #666;
                    font-weight: 500;
                }

                .elements {
                    width: 100%;
                    margin-top: 15px;
                    justify-content: flex-start;
                }

                .recherche input {
                    width: 100px;
                }

                /******************************* Bloc du Formulaire STYLES *******************************/

                .bloc-don {
                    position: relative;
                    width: 100%;
                    height: 40vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .bloc-don-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover; /* comme background-size: cover */
                    z-index: 0; /* derrière le contenu */
                }

                .bloc-don .section-hero {
                    position: relative;
                    z-index: 2;
                    padding: 20px 40px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    text-align: left;
                    gap: 200px;
                    max-width: 90%;
                }

                .bloc-don .hero {
                    margin-bottom: 1rem;
                    font-weight: bold;
                    font-size: 3rem;
                    line-height: 1.2;
                    color: white;
                    text-shadow: 0 6px 10px rgba(0, 0, 0, 0.45);
                }

                /****** Bloc Formulaire de don *******/

                .bloc-don .formulaire-don-vertical {
                    background-color: white;
                    border-radius: 8px;
                    border: 1px solid #e0e0e0;
                    width: 320px;
                    padding: 32px;
                    text-align: center;
                    font-family: inherit;
                    box-shadow: 0 2px 6px #0000001a;
                }

                .bloc-don .formulaire-don-vertical .texte1 {
                    margin: 0 0 20px;
                    font-size: 2.48rem;
                    font-weight: 600;
                    text-align: center;
                }

                .bloc-don .formulaire-don-vertical .selecteur-choix {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-bottom: 25px;
                }

                .bloc-don .formulaire-don-vertical .selecteur-choix div {
                    flex: 1;
                    border: 1px solid #a8a8a8;
                    border-radius: 8px;
                    padding: 10px 4px;
                    text-align: center;
                }

                .bloc-don .formulaire-don-vertical .selecteur-choix div label {
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                }

                .bloc-don .formulaire-don-vertical .selecteur-choix div input {
                    display: none;
                }

                .bloc-don .formulaire-don-vertical .selecteur-choix div.active {
                    background-color: #e60000;
                    color: white;
                }

                .bloc-don .formulaire-don-vertical .selecteur-montant {
                    display: flex;
                    justify-content: center;
                    margin-bottom: 25px;
                    gap: 8px;
                }

                .bloc-don .formulaire-don-vertical .selecteur-montant button {
                    background-color: #ffffff;
                    border: 1px solid #a8a8a8;
                    padding: 2px 12px;
                    min-width: 60px;
                    min-height: 68px;
                    border-radius: 4px;
                    font-size: 16px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .bloc-don .formulaire-don-vertical .selecteur-montant button:hover {
                    border-color: #e60000;
                    color: #e60000;
                }

                .bloc-don .formulaire-don-vertical .selecteur-montant button.active {
                    background-color: #e60000;
                    color: white;
                }

                .bloc-don .formulaire-don-vertical .montant-libre-container {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 8px 12px;
                    margin-bottom: 20px;
                }

                .bloc-don .formulaire-don-vertical .montant-libre {
                    border: none;
                    outline: none;
                    flex: 1;
                    font-size: 14px;
                    color: #555;
                    text-align: center;
                }

                .bloc-don .formulaire-don-vertical .texte2 {
                    margin: 0 0 20px;
                    font-size: 1rem;
                    font-weight: normal;
                    text-align: center;
                    font-weight: bold;
                    color: #333;
                }

                .bloc-don .formulaire-don-vertical .fiscal {
                    background-color: #e60000;
                    color: white;
                    font-weight: bold;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-size: 1.2rem;
                    vertical-align: middle;
                }

                .bloc-don .formulaire-don-vertical .bouton-donation {
                    background-color: #e60000;
                    color: white;
                    border: none;
                    padding: 12px 0;
                    width: 100%;
                    border-radius: 8px;
                    font-size: 18px;
                    cursor: pointer;
                }

                .bloc-don .formulaire-don-vertical .bouton-donnation:hover {
                    background-color: #cc0000;
                }

                /******************************* STATISTIQUE STYLES *******************************/

                .stats {
                    background-color: #e8f0f1;
                    width: 100%;
                    margin: 70px 0px;
                    font-family: inherit;
                    display: flex;
                    flex-direction: column;
                    padding-bottom: 20px;
                }

                .stats .texte {
                    text-align: center;
                }

                .stats .texte .surligne {
                    background-color: #075c68;
                    color: #ffffff;
                    padding: 6px 8px;
                    display: inline-block;
                    font-size: 2.4em;
                    font-weight: bold;
                }

                .stats .texte p {
                    font-size: 2em;
                    font-weight: normal;
                    color: #222;
                }

                .stats .chiffres {
                    display: flex;
                    justify-content: center;
                    text-align: center;
                    gap: 20px;
                    flex-wrap: wrap;
                    padding: 10px 10px;
                }

                .stats .chiffres section {
                    background-color: #ffffff;
                    border-radius: 10px;
                    border: 1px solid #a8a8a8;
                    padding: 24px 32px;
                    min-width: 160px;
                }

                .stats .chiffres h3 {
                    color: #075c68;
                    font-size: 3em;
                    font-weight: bold;
                    margin: 0 0 8px;
                }

                .stats .chiffres p {
                    margin: 0;
                    color: #333;
                }

                /********************************* Bloc Soutenir Styles *******************************/
                .nous-soutenir {
                    font-family: inherit;
                }

                .nous-soutenir .titre {
                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 20px;
                    font-weight: 700;
                }

                .nous-soutenir .titre .surligne {
                    background-color: #007c89;
                    color: #ffffff;
                    padding: 4px 8px;
                    border-radius: 4px;
                }

                .nous-soutenir .texte1 {
                    margin: 10px auto;
                    text-align: center;
                    font-size: 2rem;
                }

                .nous-soutenir ul {
                    list-style: none;
                    padding: 10px;
                    max-width: 600px;
                    margin: 20px auto;
                    text-align: left;
                }

                .nous-soutenir ul li {
                    margin: 10px 0;
                    padding-left: 20px;
                    padding-bottom: 15px;
                    position: relative;
                    font-size: 2rem;
                }

                .nous-soutenir ul li::before {
                    content: "—";
                    color: #d32f2f;
                    position: absolute;
                    left: -10px;
                }

                /********************************* Bloc Agir Styles *******************************/

                .agir {
                    margin: 40px 0px;
                }

                .agir .titre {
                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 20px;
                    font-weight: 700;
                    font-family: inherit;
                }

                .agir .surligne {
                    background-color: #007c89;
                    color: #ffffff;
                    padding: 4px 8px;
                    border-radius: 3px;
                }

                .agir .sous-titre {
                    text-align: center;
                    font-size: 2.4em;
                }

                .agir .blocs {
                    display: flex;
                    gap: 60px;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding-bottom: 60px;
                }

                .agir .sections-bloc {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 400px;
                    position: relative;
                }

                .agir .sections-bloc img {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                    display: block;
                }

                .agir .texte {
                    background-color: #ffffff;
                    border: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    width: 85%;
                    margin-top: -40px;
                    padding: 20px 10px 25px;
                    border-radius: 6px;
                    text-align: center;
                    position: relative;
                }

                .agir .texte p {
                    font-size: 1.25rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: black;
                }

                .agir .bouton {
                    display: inline-block;
                    background-color: #d32f2f;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 4px;
                }

                .agir .bouton:hover {
                    background-color: #b71c1c;
                }

                /******************************* Bloc Déduction fiscal STYLES *******************************/

                .deduction-fiscale {
                    font-family: inherit;
                    background-color: #eef6f8;
                    border: 1px solid #afadaddf;
                    border-radius: 8px;
                    padding: 24px 90px;
                    max-width: 1200px;
                    margin: 0 auto;
                    line-height: 1.6;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
                }

                .deduction-fiscale h2 {
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 16px;
                    text-align: center;
                }

                .deduction-fiscale .surligne {
                    background-color: #007c89;
                    color: #ffffff;
                    padding: 4px 8px;
                    border-radius: 4px;
                }

                .deduction-fiscale p {
                    font-size: 2.4rem;
                    margin: 30px 0;
                }

                .deduction-fiscale .important {
                    color: #e60000;
                    font-weight: 700;
                    font-size: 2.4rem;
                }

                /******************************* Bloc Engager STYLES *******************************/

                .engager {
                    margin: 100px 0;
                }

                .engager .titre {
                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 20px;
                    font-weight: 700;
                    font-family: inherit;
                }

                .engager .surligne {
                    background-color: #007c89;
                    color: #fff;
                    padding: 4px 8px;
                    border-radius: 3px;
                }

                .engager .sous-titre {
                    text-align: center;
                    font-size: 1.6em;
                }

                .engager .carrousel {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                .engager .arrow {
                    background: #222;
                    color: white;
                    border: none;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    font-size: 22px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.3s;
                }

                .engager .hidden {
                    opacity: 0;
                    pointer-events: none;
                }

                .engager .affichage-carrousel {
                    overflow: hidden;
                    width: 80%; /* ajustable */
                    max-width: 1500px;
                }

                .engager .mouvement-carrousel {
                    display: flex;
                    gap: 60px;
                    transition: transform 0.5s ease;
                }

                .engager .sections-bloc {
                    flex: 0 0 calc((100% - 120px) / 3);
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                }

                .engager .sections-bloc img {
                    width: 100%;
                    border-radius: 4px;
                    display: block;
                }

                .engager .texte {
                    background-color: #fff;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    width: 85%;
                    margin-top: -40px;
                    padding: 20px 10px 25px;
                    border-radius: 6px;
                    text-align: center;
                    font-size: 2.25rem;
                    font-weight: 700;
                    position: relative;
                }

                .engager .texte h3 {
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: black;
                }

                .engager .bouton {
                    display: inline-block;
                    background-color: #d32f2f;
                    color: #fff;
                    text-decoration: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 4px;
                }

                .engager .bouton:hover {
                    background-color: #b71c1c;
                }

                /******************************* Bloc donner STYLES *******************************/
                .donner {
                    margin: 50px 0;
                }

                .donner .titre {
                    text-align: center;
                    margin: auto;
                    font-size: 3rem;
                    margin-bottom: 20px;
                    font-weight: 700;
                    font-family: inherit;
                }

                .donner .surligne {
                    background-color: #007c89;
                    color: #ffffff;
                    padding: 4px 8px;
                    border-radius: 3px;
                }

                .donner .blocs {
                    display: flex;
                    gap: 60px;
                    justify-content: center;
                    flex-wrap: wrap;
                    padding-bottom: 60px;
                }

                .donner .sections-bloc {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 500px;
                    position: relative;
                }

                .donner .sections-bloc img {
                    width: 100%;
                    height: auto;
                    border-radius: 4px;
                    display: block;
                }

                .donner .texte {
                    background-color: #ffffff;
                    border: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    width: 85%;
                    margin-top: -40px;
                    padding: 20px 10px 25px;
                    border-radius: 6px;
                    text-align: center;
                    font-size: 2.25rem;;
                    font-weight: 700;
                    position: relative;
                }

                .donner .texte h3 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: black;
                }

                .donner .bouton {
                    display: inline-block;
                    background-color: #d32f2f;
                    color: #ffffff;
                    text-decoration: none;
                    font-weight: 600;
                    padding: 10px 20px;
                    border-radius: 4px;
                }

                .donner .bouton:hover {
                    background-color: #b71c1c;
                }

                /******************************* Bloc Patrimoine STYLES *******************************/
                .patrimoine {
                    font-family: inherit;
                    max-width: 1100px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .patrimoine h2 {
                    text-align: center;
                    font-size: 3rem;
                    font-weight: 700;
                    margin-bottom: 10px;
                }

                .patrimoine .surligne {
                    background-color: #005f66;
                    color: white;
                    padding: 2px 8px;
                    border-radius: 4px;
                    top: 20px;
                }

                .patrimoine h3 {
                    text-align: center;
                    font-size: 2em;
                }

                .patrimoine p {
                    font-size: 2rem;
                    color: #333;
                    text-align: center;
                }

                .patrimoine .gras {
                    font-weight: bold;
                    text-align: center;
                }

                /******************************* Bloc Transmettre STYLES *******************************/
                .transmettre {
                    padding: 40px 20px;
                    background-color: #fff;
                    font-family: inherit;
                    margin: 20px;
                    margin-top: 80px;
                }

                .transmettre .section-transmettre {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    max-width: 1100px;
                    margin: 0 auto;
                    gap: 100px;
                    flex-wrap: wrap;
                }

                .transmettre .donation-image img {
                    width: 100%;
                    height: auto;
                    border-radius: 6px;
                    display: block;
                }

                .transmettre .contenu {
                    flex: 1 2.450px;
                    position: relative;
                }

                .transmettre .contenu h2 {
                    font-size: 3rem;
                    font-weight: 700;
                    color: #000;
                    margin-bottom: 15px;
                    line-height: 2;
                }

                .transmettre .contenu p {
                    font-size: 2.25rem;
                    line-height: 1.6;
                    color: #333;
                    margin-bottom: 25px;
                }

                .transmettre .bouton {
                    display: block;
                    margin: 0 auto;
                    width: fit-content;
                    background-color: #d32f2f;
                    color: #fff;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    font-weight: 600;
                }

                .transmettre .bouton:hover {
                    background-color: #b71c1c;
                }

                /*************************************** Bloc Philanthrope STYLES *******************************/

                .philanthrope {
                    padding: 40px 20px;
                    background-color: #fff;
                    font-family: inherit;
                }

                .philanthrope .section-philanthrope {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    justify-content: center;
                    max-width: 1100px;
                    margin: 0 auto;
                    gap: 100px;
                }

                .philanthrope .philanthrope-image {
                    flex: 1 2.450px;
                }

                .philanthrope .philanthrope-image img {
                    width: 100%;
                    height: auto;
                    border-radius: 6px;
                    display: block;
                }

                .philanthrope .contenu {
                    flex: 1 2.450px;
                    position: relative;
                }

                .philanthrope .contenu h2 {
                    font-size: 3rem;
                    font-weight: 700;
                    color: #000;
                    margin-bottom: 15px;
                    line-height: 2;
                }

                .philanthrope .contenu p {
                    font-size: 2.25rem;
                    line-height: 1.6;
                    color: #333;
                    margin-bottom: 25px;
                }

                .philanthrope .bouton {
                    display: block;
                    margin: 0 auto;
                    width: fit-content;
                    background-color: #d32f2f;
                    color: #fff;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 4px;
                    font-weight: 600;
                }

                .philanthrope .bouton:hover {
                    background-color: #b71c1c;
                }

                /******************************* Bloc Question-frequente STYLES *******************************/

                .question-frequente {
                    font-family: inherit;
                    max-width: 900px;
                    margin: 100px auto;
                    color: #101010;
                    line-height: 1.5;
                }

                .question-frequente .titre {
                    text-align: center;
                    font-size: 3rem;
                    margin-bottom: 10px;
                    font-weight: 700;
                }

                .question-frequente .surligne {
                    background-color: #005f66;
                    color: #fff;
                    padding: 3px 8px;
                    border-radius: 4px;
                }

                .question-frequente .sous-titre {
                    text-align: center;
                    color: #666;
                    margin-bottom: 35px;
                    font-size: 2.25rem;
                }

                .question-frequente .questions {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .question-frequente .question {
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    overflow: hidden;
                    background-color: #fff;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                    transition: box-shadow 0.3s ease;
                }

                .question-frequente .question:hover {
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
                }

                .question-frequente .question {
                    background-color: #fafafa;
                    padding: 16px 20px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: 600;
                    font-size: 2.1rem;
                    transition: background-color 0.3s ease;
                }

                .question-frequente .question:hover {
                    background-color: #f0f0f0;
                }

                .question-frequente .fleche {
                    font-size: 20px;
                    transition: transform 0.3s ease;
                }

                .question-frequente .fleche.ouverte {
                    transform: rotate(180deg);
                }

                .question-frequente .reponse {
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    padding: 0 20px;
                    background-color: #fff;
                    transition: all 0.4s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
                }

                .question-frequente .reponse.ouverte {
                    max-height: 600px;
                    opacity: 1;
                    padding: 16px 20px;
                }

                .question-frequente .reponse p {
                    margin-bottom: 12px;
                    font-size: 2.1rem;
                    color: #333;
                }

                .question-frequente ul {
                    list-style: none;
                    padding: 10px;
                    max-width: 600px;
                    margin: 20px auto;
                    text-align: left;
                }

                .question-frequente ul li {
                    margin: 10px 0;
                    padding-left: 20px;
                    padding-bottom: 15px;
                    position: relative;
                    font-size: 2.1rem;
                }

                .question-frequente ul li::before {
                    content: "—";
                    color: #d32f2f;
                    position: absolute;
                    left: -10px;
                }

                /******************************* Bloc don2 STYLES *******************************/
                .formulaire-don-horizontal {
                    font-family: inherit;
                    padding: 20px 30px;
                    margin: 0 auto;
                    margin-top: 50px;
                    margin-bottom: 100px;
                    border-radius: 6px;
                    box-shadow: 0 2px 6px #0000001a;
                    text-align: center;
                    width: fit-content;
                }

                .formulaire-don-horizontal .texte1 {
                    font-size: 2rem;
                    font-weight: bold;
                    margin-bottom: 25px;
                }

                .formulaire-don-horizontal .formulaire-don-section {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                .formulaire-don-horizontal .selecteur-choix {
                    display: flex;
                    gap: 15px;
                }

                .formulaire-don-horizontal .selecteur-choix div {
                    padding: 8px 16px;
                    border: 2px solid #ccc;
                    border-radius: 8px;
                    cursor: pointer;
                    background: #fff;
                    font-size: 14px;
                    font-weight: 500;
                }

                .formulaire-don-horizontal .selecteur-choix div.active {
                    background-color: #e60000;
                    color: white;
                }

                .formulaire-don-horizontal .selecteur-choix input {
                    display: none;
                }

                .formulaire-don-horizontal .selecteur-montant {
                    display: flex;
                    gap: 8px;
                }

                .formulaire-don-horizontal .selecteur-montant button {
                    background: #fff;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 10px 14px;
                    cursor: pointer;
                    font-size: 15px;
                    font-weight: 500;
                    transition: 0.2s;
                }

                .formulaire-don-horizontal .selecteur-montant button:hover {
                    border-color: #e60000;
                    color: #e60000;
                }

                .formulaire-don-horizontal .selecteur-montant button.active {
                    background-color: #e60000;
                    color: white;
                }

                .formulaire-don-horizontal .montant-libre-container {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    padding: 8px 12px;
                }

                .formulaire-don-horizontal .montant-libre {
                    border: none;
                    outline: none;
                    flex: 1;
                    font-size: 14px;
                    color: #555;
                    text-align: center;
                }

                .formulaire-don-horizontal .bouton-donation {
                    background: #e60000;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    padding: 12px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                }

                .formulaire-don-horizontal .bouton-donation:hover {
                    background-color: #cc0000;
                }

                .formulaire-don-horizontal .texte2 {
                    margin-top: 15px;
                    font-size: 2rem;
                    font-weight: bold;
                }

                .formulaire-don-horizontal .fiscal {
                    background-color: #e60000;
                    color: white;
                    padding: 2px 6px;
                    border-radius: 4px;
                    font-weight: bold;
                }

                /******************************* Responsive STYLES *******************************/
                /*Tablette*/
                @media (max-width: 1080px) {
                    .bloc-don .formulaire-don-vertical {
                        display: none;
                        padding: 20px;
                    }

                    .nous-soutenir {
                        width: 90%;
                        height: auto;
                        margin: auto auto;
                    }

                    .engager .sections-bloc {
                        flex: 0 0 calc((100% - 120px) / 2);
                    }

                    .patrimoine {
                        max-width: 1000px;
                    }

                    .transmettre {
                        display: flex;
                    }

                    .transmettre .contenu {
                        order: 2;
                    }

                    .philanthrope .section-philanthrope {
                        flex-direction: column;
                        gap: 10px;
                    }

                    .philanthrope .contenu {
                        order: 2;
                    }

                    .philanthrope .philanthrope-image {
                        max-width: 700px;
                        order: 1;
                    }

                    .philanthrope {
                        padding: 20px 20px;
                    }

                    .transmettre .section-transmettre {
                        gap: 20px;
                    }

                    .question-frequente {
                        margin: 0 auto;
                    }
                }

                /*Téléphone*/
                @media (max-width: 500px) {
                    .engager .sections-bloc {
                        flex: 0 0 100%;
                    }

                    .patrimoine {
                        width: 350px;
                    }

                    .titre .sous-titre {
                        width: 95%;
                    }

                    .deduction-fiscale p {
                        max-width: 300px;
                    }

                    .donner .titre {
                        width: 80%;
                    }

                    .transmettre .section-transmettre {
                        gap: 20px;
                    }

                    .philanthrope .philanthrope-image {
                        flex: 1 1 0px;
                    }
                }

                /*Mini téléphone*/
                @media (max-width: 350px) {
                    .patrimoine {
                        width: 80%;
                    }

                    .philanthrope .section-philanthrope {
                        gap: 20px;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <div className="bloc-don">
                <img
                    src="/Prototype/src/assets/images/je-donne/Page_Carrefour_Je_donne.webp"
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
                        <FormulaireDon
                            modePaiement={modePaiement}
                            handleModeChange={handleModeChange}
                            montantSelectionne={montantSelectionne}
                            handleMontantClick={handleMontantClick}
                            montantLibre={montantLibre}
                            handleMontantLibreChange={handleMontantLibreChange}
                        />
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
                            src="assets/images/Je-donne/Page_Carrefour_Je_donne.webp"
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
                            src="../../assets/images/je-donne/Page_carrefour_Don_regulier.webp"
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
                                    src={Alex_Bonnemaison}
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
                                    src={Page_carrefour_Cagnotte_solidaire_Guillaume_BINET}
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
                    <button
                        className={`arrow nextBtn`}
                        onClick={handleNextCarousel}
                    >
                        ›
                    </button>
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
                            src="../../assets/images/je-donne/Page_carrefour_Don_vetements.webp"
                        />
                        <div className="texte">
                            <h3>Offrez une seconde vie à vos vêtements</h3>
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
                            <h3>Contribuez à des pages locaux</h3>
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
                            src={LC_20374}
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
                            src={Alex_Bonnemaison}
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