import React, {useEffect, useState, useRef} from "react";

import cartedecredit from "assets/images/donation/carte-de-credit.svg";
import ggpayapppay from "assets/images/donation/gg-pay-app-pay.svg";
import lacroixrouge from "assets/images/donation/lacroix-rouge.webm";
import logo from "assets/images/donation/Logo_Croix-Rouge_Française.svg";
import paypal from "assets/images/donation/paypal.svg";
import virementIcon from "assets/images/donation/paypal.svg";
import SEO from "@/components/SEO.jsx";

export default function Donation() {
    const [activeTab, setActiveTab] = useState("once");
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [deduction, setDeduction] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [activePayment, setActivePayment] = useState("card");
    const [showVirement, setShowVirement] = useState(false);
    const [donorText, setDonorText] = useState("");
    const [openAccordion, setOpenAccordion] = useState(null);

    const [phoneCountry, setPhoneCountry] = useState("FR");
    const [showCountryMenu, setShowCountryMenu] = useState(false);

    const calculerDeductionUnique = (montant) => {
        if (montant <= 1000) return montant * 0.75;
        const part75 = 1000 * 0.75;
        const part66 = (montant - 1000) * 0.66;
        return part75 + part66;
    };

    const calculerDeductionMensuelle = (montant) => {
        const annuel = montant * 12;
        const deductionTotale = calculerDeductionUnique(annuel);
        return (annuel - deductionTotale) / 12;
    };

    useEffect(() => {
        const names = ["Claude", "Sophie", "Amine", "Léa", "Marc", "Emma", "Julien", "Nora", "Antoine", "Maya"];
        const amounts = [5, 10, 15, 20, 25, 50, 75, 100, 150, 200, 500];
        const messages = [
            (n, a) => `Merci à ${n} pour son don ${a}€ !`,
            (n, a) => `${n} vient de donner ${a}€ — merci !`,
            (n, a) => `Don reçu : ${a}€ de la part de ${n}.`
        ];

        const updateTicker = () => {
            const name = names[Math.floor(Math.random() * names.length)];
            const amount = amounts[Math.floor(Math.random() * amounts.length)];
            const template = messages[Math.floor(Math.random() * messages.length)];
            setDonorText(template(name, amount));
        };

        updateTicker();
        const interval = setInterval(updateTicker, 3500);
        return () => clearInterval(interval);
    }, []);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedAmount(null);
        setCustomAmount("");
        setShowInfo(false);
    };

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount("");
        const montantDeduit = activeTab === "monthly"
            ? calculerDeductionMensuelle(amount)
            : calculerDeductionUnique(amount);
        setDeduction(montantDeduit.toFixed(0));
        setShowInfo(true);
    };

    const handleCustomAmountChange = (value) => {
        setCustomAmount(value);
        setSelectedAmount(null);
        const montant = parseFloat(value);
        if (isNaN(montant) || montant <= 0) {
            setShowInfo(false);
            return;
        }
        const montantDeduit = activeTab === "monthly"
            ? calculerDeductionMensuelle(montant)
            : calculerDeductionUnique(montant);
        setDeduction(montantDeduit.toFixed(0));
        setShowInfo(true);
    };

    const handlePaymentChange = (method) => {
        setActivePayment(method);
        setShowVirement(method === "virement");
    };

    const handleValidate = () => {
        const amount = customAmount || selectedAmount || 0;
        if (amount === 0) return alert("Veuillez sélectionner un montant.");
        alert(`Merci pour votre don de ${amount}€ via ${activePayment} ❤️`);
    };

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const toggleCountryMenu = (e) => {
        e.preventDefault();
        setShowCountryMenu(!showCountryMenu);
    };

    const selectCountry = (code) => {
        setPhoneCountry(code);
        setShowCountryMenu(false);
    };

    const displayAmount = customAmount || selectedAmount || 0;

    const paymentMethods = [
        { method: "card", label: "Carte bancaire", img: cartedecredit },
        { method: "google-pay-apple-pay", label: "G-Pay / Apple Pay", img: ggpayapppay },
        { method: "paypal", label: "PayPal", img: paypal },
        { method: "virement", label: "Virement", img: virementIcon }
    ];

    const footerData = [
        {
            title: "Pourquoi donner ?",
            items: [
                "La Croix-Rouge française, c'est 160 ans d'histoire aux côtés des plus vulnérables.",
                "Vos dons financent les missions prioritaires : urgences, santé, actions sociales.",
                "Association reconnue d'intérêt général : 75 % déductibles de l'IR (dans la limite légale)."
            ]
        },
        {
            title: "Traitement de vos données personnelles",
            items: [
                "Données utilisées pour la gestion du don (reçu fiscal, relation donateur, enquêtes).",
                "Conformément à la réglementation, vous disposez de droits d'accès, de rectification et d'opposition.",
                "Pour en savoir plus, consultez notre politique de protection des données."
            ]
        },
        {
            title: "Nous soutenir en toute confiance",
            items: [
                "Site 100 % sécurisé (chiffrement SSL/TLS, normes de l'industrie).",
                "Une équipe donateurs est à votre écoute pour répondre à vos questions.",
                "Vos informations de paiement ne sont pas conservées sur nos serveurs."
            ]
        }
    ];

    // Drapeaux simples pour la démo
    const flags = {
        FR: "🇫🇷",
        BE: "🇧🇪",
        CH: "🇨🇭",
        CA: "🇨🇦"
    };

    return (
        <>
            <SEO
                title="Soutenez la Croix-Rouge française"
                description="Soutenez notre association en effectuant un don"
                image="/crf_logo.png"
            />

            <style>{`
                /* --- VARIABLES --- */
                :root {
                    --primary-red: #e30219;
                    --dark-red: #b80000;
                    --bg-teal: #2d8f91;
                    --text-grey: #555; /* Gris demandé */
                    --text-dark: #333;
                    --white: #ffffff;
                    --border-color: #ccc;
                }

                * { box-sizing: border-box; }

                body {
                    margin: 0;
                    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; /* Police plus neutre */
                    background: transparent;
                    font-size: 18px; 
                    line-height: 1.5;
                    color: var(--text-grey); /* Texte gris par défaut */
                }

                /* --- ANIMATIONS --- */
                @keyframes rollDown {
                    0% { transform: translateY(-120%); opacity: 0; }
                    20% { transform: translateY(10%); opacity: 1; }
                    100% { transform: translateY(0); opacity: 1; }
                }

                @keyframes slideUpFade {
                    from { transform: translateY(50px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }

                /* --- VIDÉO FIXE --- */
                #background-video {
                    position: fixed; 
                    top: 0; left: 0;
                    width: 100vw; height: 100vh;
                    object-fit: cover;
                    z-index: -1;
                }

                /* --- WRAPPER PRINCIPAL --- */
                .main-wrapper {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between; 
                }

                /* --- BARRES FIXES --- */
                .donation-bar {
                    position: fixed; top: 0; left: 0; right: 0;
                    background: linear-gradient(var(--primary-red), var(--primary-red));
                    color: var(--white);
                    height: 50px;
                    display: flex; align-items: center; justify-content: center;
                    z-index: 1000;
                    font-size: 1.1rem;
                    font-weight: 500; /* Moins gras */
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                }

                .ticker-viewport { 
                    height: 100%; 
                    display: flex; 
                    align-items: center; 
                    overflow: hidden; 
                    position: relative;
                }
                .ticker-text { 
                    display: inline-block; 
                    animation: rollDown 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; /* Effet rouleau */
                }
                
                .logo-corner {
                    position: fixed; 
                    top: 70px; 
                    left: 30px;
                    z-index: 20;
                }
                .logo-img {
                    width: 130px; 
                    height: auto;
                    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.4));
                    transition: transform 0.3s;
                }
                .logo-img:hover { transform: scale(1.05); }

                /* --- CONTENU --- */
                .content-container {
                    padding-top: 130px; 
                    flex-grow: 1; 
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                /* --- TITRE --- */
                .header-donation {
                    width: 100%;
                    text-align: center;
                    z-index: 10;
                    margin-bottom: 30px; 
                }

                .header-donation h1 {
                    display: flex;
                    flex-direction: row; 
                    align-items: stretch;
                    justify-content: center;
                    gap: 0; 
                    font-size: 3.5rem;
                    text-transform: uppercase;
                    margin: 0;
                    line-height: 1;
                    font-weight: 800; /* Le titre reste gras */
                }
                
                .highlight {
                    background: linear-gradient(180deg, #d53c3c 0%, #b52c2c 100%);
                    color: #fff;
                    padding: 15px 30px; 
                    border-radius: 60px 0 0 60px;
                    box-shadow: -5px 5px 10px rgba(0,0,0,0.2);
                    display: flex; align-items: center;
                }
                
                .whitebox {
                    background: rgba(255,255,255,0.95);
                    color: #000;
                    padding: 15px 40px 15px 30px; 
                    border-radius: 0 60px 60px 0;
                    box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
                    display: flex; align-items: center;
                }

                /* --- SECTION CARTES (Compacte) --- */
                .don-section {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 15px; /* Très peu d'espace */
                    padding: 0 10px 60px 10px;
                    max-width: 1700px;
                    width: 100%;
                    position: relative;
                    z-index: 20; 
                }

                /* --- CARDS --- */
                .card-common {
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.3);
                    overflow: visible; /* Important pour les selecteurs dropdown */
                    width: 100%;
                    max-width: 530px; 
                    display: flex;
                    flex-direction: column;
                    animation: slideUpFade 0.8s ease-out;
                }

                .card-header {
                    background: var(--primary-red);
                    color: var(--white);
                    padding: 10px; 
                    text-align: center;
                }
                .card-header h2 { 
                    margin: 0; 
                    font-size: 1.5rem; 
                    font-weight: 600; /* Pas trop gras */
                }
                .card-body { padding: 15px; position: relative; } 

                /* --- 1. SOUTIEN --- */
                .don-tabs { display: flex; border: 1px solid #ddd; margin-bottom: 15px; border-radius: 4px; overflow: hidden;}
                .tab {
                    flex: 1;
                    padding: 12px;
                    border: none;
                    background: #f9f9f9;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 1.1rem;
                    color: #555;
                    transition: all 0.2s;
                }
                .tab.active { 
                    background: var(--primary-red); 
                    color: white; 
                    font-weight: 600;
                }

                .don-amounts { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                .amount-don {
                    padding: 15px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    font-weight: 500;
                    color: #555;
                    font-size: 1.4rem; 
                    transition: 0.2s;
                }
                .amount-don:hover { border-color: var(--primary-red); color: var(--primary-red); }
                .amount-don.active {
                    background: white;
                    color: var(--text-dark);
                    border: 2px solid var(--primary-red); /* Style de l'image : bordure rouge texte noir */
                    font-weight: 700;
                }

                /* Custom amount centrée et symétrique */
                .custom-amount-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    margin-top: 10px;
                    padding: 0;
                    height: 55px;
                    background: #fcfcfc;
                    position: relative;
                }
                .custom-amount-input { 
                    border: none; 
                    width: 100%; 
                    height: 100%; 
                    outline: none; 
                    font-size: 1.2rem; 
                    text-align: center;
                    background: transparent;
                    color: #555;
                }
                /* Symbole euro absolu à droite */
                .currency-symbol {
                    position: absolute;
                    right: 15px;
                    font-size: 1.2rem;
                    color: #555;
                }

                .don-info { margin-top: 10px; font-size: 1rem; background: #fff3f3; padding: 10px; border-radius: 4px; color: var(--dark-red); }

                /* --- 2. FORMULAIRE STYLE MATERIAL (FLOATING LABELS) --- */
                .form-group-material {
                    position: relative;
                    margin-bottom: 20px; /* Espace pour le label flottant */
                }
                
                .form-control {
                    width: 100%;
                    height: 50px;
                    padding: 15px 12px 5px 12px; /* Padding top pour laisser place au label */
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 1.1rem;
                    outline: none;
                    background: white;
                    color: #333;
                    transition: border-color 0.2s;
                }
                
                .form-control:focus {
                    border-color: var(--primary-red);
                }
                
                /* Le label qui flotte */
                .floating-label {
                    position: absolute;
                    top: 14px;
                    left: 10px;
                    pointer-events: none;
                    transition: 0.2s ease all;
                    color: #777;
                    font-size: 1.1rem;
                    background: white;
                    padding: 0 5px;
                }
                
                /* Quand input focus ou rempli (valid) */
                .form-control:focus ~ .floating-label,
                .form-control:not(:placeholder-shown) ~ .floating-label,
                .form-control:valid ~ .floating-label {
                    top: -10px;
                    left: 10px;
                    font-size: 0.85rem;
                    color: #333;
                    font-weight: 600;
                }
                
                .form-group-donation-inline { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; font-size: 1rem; color: #555; }
                
                .form-row { display: flex; gap: 10px; }
                .form-row .half { flex: 1; }
                
                .manual-address { display: block; margin-top: 5px; font-size: 0.9rem; text-decoration: underline; color: #333; cursor: pointer; }
                
                /* TELEPHONE AVEC DRAPEAU */
                .phone-container {
                    display: flex;
                    position: relative;
                }
                .flag-selector {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 60px;
                    border: 1px solid #ccc;
                    border-right: none;
                    border-radius: 4px 0 0 4px;
                    background: #f1f1f1;
                    cursor: pointer;
                    font-size: 1.5rem;
                }
                .flag-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: white;
                    border: 1px solid #ccc;
                    z-index: 50;
                    width: 60px;
                    text-align: center;
                }
                .flag-option { padding: 5px; cursor: pointer; font-size: 1.5rem; }
                .flag-option:hover { background: #eee; }
                
                .phone-input-field {
                    flex: 1;
                    height: 50px;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 0 4px 4px 0;
                    font-size: 1.1rem;
                    outline: none;
                }

                fieldset { border: none; padding: 0; margin: 20px 0 0 0; }
                legend { font-size: 1.1rem; font-weight: 500; color: #333; margin-bottom: 10px; }
                .radio-label { display: flex; align-items: center; gap: 8px; font-size: 1.1rem; margin-bottom: 8px; cursor: pointer; color: #555; }
                .radio-custom { accent-color: var(--primary-red); width: 20px; height: 20px; }
                .form-note { font-size: 0.9rem; color: #555; font-style: italic; margin-top: 10px; }

                /* --- 3. PAIEMENT --- */
                .payment-methods { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 20px;}
                .payment-option {
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 10px 5px;
                    text-align: center;
                    cursor: pointer;
                    background: white;
                    transition: all 0.2s;
                    flex: 1;
                }
                .payment-option:hover { border-color: #999; }
                .payment-option.active { border: 2px solid var(--primary-red); position: relative; }
                
                /* Petit check rouge si actif (comme sur l'image) */
                .payment-option.active::after {
                    content: "✔";
                    position: absolute;
                    top: -8px; right: -8px;
                    background: var(--primary-red);
                    color: white;
                    border-radius: 50%;
                    width: 20px; height: 20px;
                    font-size: 0.8rem;
                    display: flex; align-items: center; justify-content: center;
                }

                .payment-option .icon { height: 35px; display: block; margin: 0 auto 5px; object-fit: contain; }
                .payment-option span { font-size: 0.8rem; font-weight: 600; display: block; color: #555; text-transform: uppercase;}

                /* Logos CB */
                .cb-logos { text-align: center; margin: 10px 0; }
                .cb-icon { height: 25px; margin: 0 5px; vertical-align: middle; }

                .validate-donation {
                    width: 100%;
                    background: var(--primary-red);
                    color: white;
                    border: none;
                    padding: 20px; 
                    border-radius: 6px;
                    font-size: 1.4rem;
                    font-weight: 700;
                    margin-top: 10px;
                    cursor: pointer;
                    box-shadow: 0 4px 10px rgba(227, 2, 25, 0.3);
                    transition: background 0.3s;
                    display: flex; justify-content: center; align-items: center; gap: 10px;
                }
                .validate-donation:hover { background: var(--dark-red); }
                .arrow-circle { border: 2px solid white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 1rem; }

                .secure-box {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    margin-top: 20px;
                    font-size: 0.95rem;
                    color: #555;
                    line-height: 1.3;
                }
                .lock-icon { width: 35px; height: 35px; border: 2px solid #28a745; border-radius: 50%; padding: 5px; } /* Style cadenas vert image */

                /* --- FOOTER (Plein écran, pas de décalage) --- */
                .don-footer {
                    background: #247577;
                    padding: 30px 0 80px 0; 
                    color: white;
                    position: relative;
                    z-index: 100;
                    width: 100%;
                }
                .footer-inner {
                    max-width: 1600px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 30px; 
                    padding: 0 20px;
                }

                .acc { position: relative; }
                
                .acc-header {
                    background: rgba(255,255,255,0.1);
                    border: 1px solid rgba(255,255,255,0.2);
                    padding: 15px; 
                    border-radius: 8px;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    color: white;
                    font-weight: 700;
                    font-size: 1.4rem; 
                    transition: background 0.3s;
                }
                .acc-header:hover { background: rgba(255,255,255,0.2); }

                .acc-body {
                    position: absolute;
                    bottom: 100%;
                    left: 0;
                    right: 0;
                    background: #1d5f61;
                    padding: 20px; 
                    border-radius: 8px;
                    box-shadow: 0 -10px 40px rgba(0,0,0,0.4);
                    margin-bottom: 10px;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    pointer-events: none;
                    z-index: 200;
                    font-size: 1.2rem; 
                    line-height: 1.5;
                }
                .acc.open .acc-body { opacity: 1; visibility: visible; transform: translateY(0); pointer-events: auto; }
                .acc.open .acc-body::after {
                    content: ''; position: absolute; bottom: -8px; left: 40px;
                    width: 0; height: 0; 
                    border-left: 10px solid transparent; border-right: 10px solid transparent; border-top: 10px solid #1d5f61;
                }
                .acc-list { list-style: none; padding: 0; margin: 0; }
                .acc-list li { margin-bottom: 10px; }
                .acc-caret { transition: transform 0.3s; font-size: 1.5rem; }
                .acc.open .acc-caret { transform: rotate(180deg); }

                /* --- RESPONSIVE --- */
                
                @media (max-width: 1350px) {
                    /* Colonne unique dès 1350px pour tout garder gros */
                    .don-section { 
                        flex-direction: column; 
                        align-items: center; 
                        margin-top: 20px; 
                    }
                    .card-common { max-width: 600px; width: 100%; } 
                    .footer-inner { grid-template-columns: 1fr; }
                    .acc-body { position: relative; bottom: auto; margin-bottom: 10px; background: rgba(0,0,0,0.2); box-shadow: none; display: none; }
                    .acc.open .acc-body { display: block; animation: slideUpFade 0.3s; }
                    .acc.open .acc-body::after { display: none; }
                    .logo-corner { left: 20px; top: 60px; }
                    .header-donation { margin-bottom: 20px; }
                }

                @media (max-width: 768px) {
                    .header-donation h1 { flex-direction: column; font-size: 2.8rem; gap: 5px; }
                    .highlight { border-radius: 40px; padding: 10px 20px; width: 100%; justify-content: center; }
                    .whitebox { border-radius: 40px; padding: 10px 20px; width: 100%; justify-content: center; }
                    .logo-corner { position: absolute; top: 55px; left: 50%; transform: translateX(-50%); }
                    .content-container { padding-top: 140px; }
                    .payment-methods { flex-direction: column; } /* Paiement en colonne sur mobile */
                }
            `}</style>

            {/* VIDÉO FIXE */}
            <div className="video-container"></div>
            <video autoPlay muted loop playsInline id="background-video">
                <source src={lacroixrouge} type="video/webm"/>
            </video>

            {/* Barre haute */}
            <div className="donation-bar">
                <div className="ticker-viewport">
                    <span key={donorText} className="ticker-text">{donorText}</span>
                </div>
            </div>

            {/* Logo */}
            <div className="logo-corner">
                <a href="/">
                    <img src={logo} alt="Logo Croix-Rouge" className="logo-img"/>
                </a>
            </div>

            {/* WRAPPER SCROLL */}
            <div className="main-wrapper">

                <div className="content-container">

                    {/* Titre */}
                    <div className="header-donation">
                        <h1>
                            <span className="highlight">Votre Générosité</span>
                            <span className="whitebox">sauve des vies</span>
                        </h1>
                    </div>

                    {/* SECTION CARTES */}
                    <div className="don-section">

                        {/* 1. SOUTIEN */}
                        <div className="don-module card-common">
                            <div className="card-header">
                                <h2>1. Mon soutien</h2>
                            </div>
                            <div className="card-body">
                                <div className="don-tabs">
                                    <button className={`tab ${activeTab === "once" ? "active" : ""}`} onClick={() => handleTabChange("once")}>
                                        Je donne une fois
                                    </button>
                                    <button className={`tab ${activeTab === "monthly" ? "active" : ""}`} onClick={() => handleTabChange("monthly")}>
                                        Je donne tous les mois
                                    </button>
                                </div>
                                <div className="don-amounts">
                                    {(activeTab === "once" ? [90, 130, 150, 200] : [10, 15, 20, 30]).map(amount => (
                                        <button
                                            key={amount}
                                            className={`amount-don ${selectedAmount === amount ? "active" : ""}`}
                                            onClick={() => handleAmountSelect(amount)}
                                        >
                                            {amount} €
                                        </button>
                                    ))}
                                </div>
                                <div className="custom-amount-box">
                                    <input
                                        type="number"
                                        className="custom-amount-input"
                                        placeholder="Montant libre"
                                        value={customAmount}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                    />
                                    {/* Symbole euro symétrique à droite */}
                                    {customAmount && <span className="currency-symbol">€</span>}
                                </div>
                            </div>
                        </div>

                        {/* 2. COORDONNÉES */}
                        <div className="don-coordonnees card-common">
                            <div className="card-header">
                                <h2>2. Mes coordonnées</h2>
                            </div>
                            <form className="card-body">
                                {/* EMAIL Style Material avec Label Flottant */}
                                <div className="form-group-material">
                                    <input type="email" id="email" className="form-control" placeholder=" " required />
                                    <label htmlFor="email" className="floating-label">Email *</label>
                                    {/* Simulation erreur comme sur l'image */}
                                    <div style={{color: '#e30219', fontSize: '0.8rem', marginTop: '4px', display: 'none'}}>Vous devez saisir une adresse email valide</div>
                                </div>

                                <div className="form-group-donation-inline">
                                    <input type="checkbox" id="is-company" className="radio-custom"/>
                                    <label htmlFor="is-company">Cochez cette case si vous êtes une entreprise</label>
                                </div>

                                <div className="form-group-material">
                                    <select id="civility" className="form-control" required style={{background: 'white'}}>
                                        <option value=""></option>
                                        <option value="Mme">Madame</option>
                                        <option value="M.">Monsieur</option>
                                    </select>
                                    <label htmlFor="civility" className="floating-label">Civilité *</label>
                                </div>

                                <div className="form-row">
                                    <div className="half form-group-material">
                                        <input type="text" id="firstname" className="form-control" placeholder=" " required/>
                                        <label htmlFor="firstname" className="floating-label">Prénom *</label>
                                    </div>
                                    <div className="half form-group-material">
                                        <input type="text" id="lastname" className="form-control" placeholder=" " required/>
                                        <label htmlFor="lastname" className="floating-label">Nom *</label>
                                    </div>
                                </div>

                                <div className="form-group-material">
                                    <select id="country" className="form-control" required>
                                        <option value="France">FRANCE</option>
                                        <option value="Belgique">BELGIQUE</option>
                                        <option value="Suisse">SUISSE</option>
                                        <option value="Canada">CANADA</option>
                                    </select>
                                    <label htmlFor="country" className="floating-label" style={{top: '-10px', fontSize: '0.85rem'}}>Pays *</label>
                                </div>

                                <div className="form-group-material">
                                    <input type="text" id="address" className="form-control" placeholder=" " required/>
                                    <label htmlFor="address" className="floating-label">Commencez à taper votre adresse... *</label>
                                    <span className="manual-address">Cliquez ici pour saisir votre adresse manuellement</span>
                                </div>

                                {/* TELEPHONE AVEC DRAPEAU */}
                                <div className="form-group-material">
                                    <div className="phone-container">
                                        <div className="flag-selector" onClick={toggleCountryMenu}>
                                            {flags[phoneCountry]}
                                        </div>
                                        {showCountryMenu && (
                                            <div className="flag-menu">
                                                {Object.keys(flags).map(code => (
                                                    <div key={code} className="flag-option" onClick={() => selectCountry(code)}>
                                                        {flags[code]}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <input type="tel" className="phone-input-field" placeholder="06 12 34 56 78"/>
                                    </div>
                                    <label className="floating-label" style={{top: '-10px', fontSize: '0.85rem', left: '0'}}>TÉLÉPHONE</label>
                                </div>

                                <div className="form-group-material">
                                    <input type="text" id="birthdate" className="form-control" placeholder="jj/mm/aaaa"/>
                                    <label htmlFor="birthdate" className="floating-label" style={{top: '-10px', fontSize: '0.85rem'}}>DATE DE NAISSANCE</label>
                                </div>

                                <fieldset>
                                    <legend>Je souhaite mon reçu fiscal : *</legend>
                                    <label className="radio-label">
                                        <input type="radio" name="receipt" value="email" className="radio-custom" defaultChecked/>
                                        Par email
                                    </label>
                                    <label className="radio-label">
                                        <input type="radio" name="receipt" value="courrier" className="radio-custom"/>
                                        Par courrier
                                    </label>
                                </fieldset>

                                <p className="form-note">* Champs obligatoires (ces informations sont indispensables pour bénéficier de votre réduction fiscale)</p>
                            </form>
                        </div>

                        {/* 3. RÈGLEMENT */}
                        <div className="don-reglement card-common">
                            <div className="card-header">
                                <h2>3. Mon règlement</h2>
                            </div>
                            <div className="card-body">
                                <div className="payment-methods">
                                    {paymentMethods.map(({method, label, img}) => (
                                        <div
                                            key={method}
                                            className={`payment-option ${activePayment === method ? "active" : ""}`}
                                            onClick={() => handlePaymentChange(method)}
                                        >
                                            <img src={img} alt={label} className="icon"/>
                                            <span>{label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Logos CB en bas comme sur l'image */}
                                <div className="cb-logos">
                                    {/* Simulation des logos CB/Visa/Mastercard */}
                                    <span style={{border: '1px solid #ddd', padding: '2px', borderRadius: '4px', marginRight: '5px'}}>💳 Mastercard</span>
                                    <span style={{border: '1px solid #ddd', padding: '2px', borderRadius: '4px'}}>💳 Visa</span>
                                </div>

                                {showVirement && (
                                    <div style={{marginTop: '15px', fontSize: '1.2rem', padding: '15px', background: '#eef', borderRadius: '5px', color: '#333'}}>
                                        Vous pourrez sélectionner votre banque à l'étape suivante (virement instantané).
                                    </div>
                                )}

                                <button className="validate-donation" onClick={handleValidate}>
                                    JE VALIDE MON DON DE {displayAmount > 0 ? `${displayAmount} €` : "0 €"} <div className="arrow-circle">➜</div>
                                </button>

                                <div className="secure-box">
                                    {/* Icône de cadenas vert */}
                                    <div style={{color: '#28a745', fontSize: '2rem'}}>🔒</div>
                                    <span style={{fontSize: '0.9rem', color: '#666'}}>Paiements sécurisés avec les derniers protocoles de chiffrement, conçus pour respecter les normes les plus élevées de l'industrie.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="don-footer">
                    <div className="footer-inner">
                        {footerData.map((section, idx) => (
                            <div key={idx} className={`acc ${openAccordion === idx ? "open" : ""}`}>
                                <div className="acc-body">
                                    <ul className="acc-list">
                                        {section.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button className="acc-header" onClick={() => toggleAccordion(idx)}>
                                    <span>{section.title}</span>
                                    <span className="acc-caret">▲</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </footer>
            </div>
        </>
    );
}