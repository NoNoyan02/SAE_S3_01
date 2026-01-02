import React, {useEffect, useState} from "react";
import {Helmet} from "react-helmet";

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

    // Calcul fiscal
    const calculerDeductionUnique = (montant) => {
        if (montant <= 1000) return montant * 0.75;
        const part75 = 1000 * 0.75;
        const part66 = (montant - 1000) * 0.66;
        return part75 + part66;
    };

    const calculerDeductionMensuelle = (montant) => {
        const annuel = montant * 12;
        const deductionTotale = calculerDeductionUnique(annuel);
        const mensuelApresDeduction = (annuel - deductionTotale) / 12;
        return mensuelApresDeduction;
    };

    // Ticker de donations
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

    // Changement de tab
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSelectedAmount(null);
        setCustomAmount("");
        setShowInfo(false);
    };

    // Sélection montant fixe
    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount("");
        const montantDeduit = activeTab === "monthly"
            ? calculerDeductionMensuelle(amount)
            : calculerDeductionUnique(amount);
        setDeduction(montantDeduit.toFixed(0));
        setShowInfo(true);
    };

    // Montant libre
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

    // Paiement
    const handlePaymentChange = (method) => {
        setActivePayment(method);
        setShowVirement(method === "virement");
    };

    // Validation
    const handleValidate = () => {
        const amount = customAmount || selectedAmount || 0;
        alert(`Merci pour votre don de ${amount}€ via ${activePayment} ❤️`);
    };

    // Accordéon
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const displayAmount = customAmount || selectedAmount || 0;

    return (
        <>
            <Helmet>
                <title>Soutenez la Croix-Rouge française</title>
                <meta name="description" content="Soutenez notre association en effectuant un don"/>
                <meta property="og:title" content="Soutenez la Croix-Rouge française"/>
                <meta property="og:description" content="Soutenez notre association en effectuant un don"/>
            </Helmet>

            <style>{`
            body{
            
    background: #2d8f91;
    }
                .video-container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                }

                #background-video {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: -1;
                    pointer-events: none;
                }

                .donation-bar {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(#e30219, #e30219);
                    border-bottom: 1px solid rgba(0,0,0,0.06);
                    padding: 8px 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 16px;
                    z-index: 1000;
                    box-shadow: 0 1px 6px rgba(0,0,0,0.03);
                    height: 48px;
                }

                .donation-text { 
                    font-size: 14px; 
                    color: #ffffff; 
                    white-space: nowrap; 
                }

                .amount { 
                    font-weight: 700; 
                    margin-left: 0px; 
                }

                .ticker {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    min-width: 360px;
                    justify-content: center;
                    overflow: hidden;
                    height: 20px;
                }

                .header-donation {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px 0;
                }

                .logo {
                    position: absolute;
                    left: 40px;
                    width: 100px;
                    height: auto;
                }

                .header-donation h1 {
                    font-size: 2rem;
                    font-weight: 800;
                    text-align: center;
                    color: #111;
                    letter-spacing: 0.5px;
                    line-height: 1.3;
                    margin-top: 60px;
                    position: relative;
                    z-index: 10;
                    white-space: nowrap;
                }

                .header-donation h1 .highlight {
                    background: linear-gradient(180deg, #d53c3c 0%, #b52c2c 100%);
                    color: #fff;
                    padding: 10px 22px;
                    border-radius: 6px 0 0 6px;
                    display: inline-block;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
                    margin: 0;
                    vertical-align: middle;
                }

                .header-donation h1 .whitebox {
                    background: rgba(255, 255, 255, 0.95);
                    color: #000;
                    padding: 10px 22px;
                    border-radius: 0 6px 6px 0;
                    display: inline-block;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
                    margin: 0;
                    vertical-align: middle;
                }

                .don-section {
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    gap: 40px;
                    background: transparent;
                    position: relative;
                    z-index: 2;
                    max-width: 1400px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 0 20px;
                    margin-bottom: 100px;
                }

                .don-module {
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    width: 380px;
                    overflow: hidden;
                }

                .don-header {
                    background: #d40000;
                    color: #fff;
                    text-align: center;
                    padding: 8px 12px;
                }

                .don-header h2 {
                    margin: 0;
                    font-size: 2rem;
                    font-weight: 700;
                }

                .don-tabs {
                    display: flex;
                    justify-content: space-between;
                    border-bottom: 1px solid #eee;
                }

                .tab-donation {
                    flex: 1;
                    border: none;
                    background: #fff;
                    font-weight: 600;
                    font-size: 1.2rem;
                    cursor: pointer;
                    border-bottom: 3px solid transparent;
                    transition: all 0.2s ease;
                    padding: 10px;
                }

                .tab-donation.active {
                    background: #d40000;
                    color: #fff;
                    border-bottom: 3px solid #d40000;
                    position: relative;
                }

                .tab-donation.active::after {
                    content: "";
                    position: absolute;
                    bottom: -6px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 0;
                    height: 0;
                    border-left: 8px solid transparent;
                    border-right: 8px solid transparent;
                    border-top: 8px solid #d40000;
                }

                .heart {
                    color: #d40000;
                    margin-right: 6px;
                }

                .don-amounts {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 6px;
                    padding: 10px;
                }

                .amount-don {
                    padding: 6px 8px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    background: #fff;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 1rem;
                }

                .amount-don:hover {
                    border-color: #d40000;
                }

                .amount-don.active {
                    background: #d40000;
                    color: #fff;
                    border-color: #d40000;
                    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
                }

                .custom-amount-box {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 6px 8px;
                    margin-top: 8px;
                    background: #fff;
                    transition: border 0.2s ease;
                }

                .custom-amount-box:hover,
                .custom-amount-box:focus-within {
                    border-color: #d40000;
                }

                .euro-symbol {
                    color: #555;
                    font-weight: 600;
                    font-size: 1rem;
                }

                .custom-amount-input {
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    flex: 1;
                    color: #333;
                    background: transparent;
                }

                .don-info {
                    border-top: 1px solid #eee;
                    padding: 12px;
                    font-size: 1rem;
                    color: #333;
                    line-height: 1.4;
                }

                .don-info strong {
                    color: #d40000;
                }

                .don-coordonnees {
                    display: flex;
                    justify-content: center;
                    gap: 36px;
                    background: transparent;
                }

                .coordonnees-card {
                    width: 400px;
                    transform-origin: top left;
                    background: #fff;
                    border-radius: 7px;
                    box-shadow: 0 1px 5px rgba(0,0,0,0.1);
                    overflow: hidden;
                }

                .card-header {
                    background: #d40000;
                    color: #fff;
                    padding: 8px 12px;
                    text-align: center;
                }

                .card-header h2 {
                    margin: 0;
                    font-size: 2rem;
                    font-weight: 700;
                }

                .card-body {
                    padding: 14px;
                }

                .form-group-donation {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 10px;
                }

                .form-row {
                    display: flex;
                    gap: 6px;
                }

                .form-group-donation.half {
                    flex: 1;
                }

                input, select {
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 6px;
                    font-size: 1rem;
                    transition: border-color 0.2s;
                }

                input:focus, select:focus {
                    border-color: #d40000;
                    outline: none;
                }

                .form-group-donation-inline {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    margin-bottom: 10px;
                }

                .manual-address {
                    font-size: 1rem;
                    color: #000;
                    text-decoration: underline;
                }

                .phone-input {
                    display: flex;
                    align-items: center;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    padding: 6px;
                }

                .flag {
                    font-size: 1.1rem;
                    margin-right: 6px;
                }

                fieldset {
                    border: none;
                    margin-top: 10px;
                }

                legend {
                    color: #0056b3;
                    font-weight: 600;
                    margin-bottom: 5px;
                }

                .form-note {
                    font-size: 1rem;
                    color: #333;
                    margin-top: 8px;
                }

                .don-reglement {
                    display: flex;
                    margin-bottom: 0;
                    background: transparent;
                }

                .reglement-card {
                    width: 400px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 1px 6px rgba(0,0,0,0.15);
                    overflow: hidden;
                }

                .payment-methods {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                    padding: 20px;
                }

                .payment-option {
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    background: #fff;
                    padding: 16px;
                    text-align: center;
                    font-weight: 600;
                    color: #444;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    position: relative;
                }

                .payment-option.active {
                    border-color: #d40000;
                    color: #d40000;
                }

                .payment-option.active::after {
                    content: "✔";
                    position: absolute;
                    top: 8px;
                    right: 10px;
                    color: #d40000;
                    font-size: 1rem;
                    font-weight: bold;
                }

                .payment-option:hover {
                    border-color: #d40000;
                }

                .icon {
                    display: block;
                    width: 40px;
                    height: 40px;
                    margin: 0 auto 6px;
                    object-fit: contain;
                }

                [data-method="google-pay-apple-pay"] .icon {
                    width: 150px;
                    margin-top: 5px;
                }

                .virement-box {
                    padding: 0 20px 20px 20px;
                }

                .virement-box .bank-select {
                    margin-bottom: 12px;
                }

                .virement-infos {
                    font-size: 1rem;
                    color: #333;
                    line-height: 1.4;
                }

                .validate-donation {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #d40000;
                    color: #fff;
                    font-weight: 700;
                    font-size: 1rem;
                    border: none;
                    border-radius: 6px;
                    padding: 14px;
                    width: calc(100% - 40px);
                    margin: 10px auto 20px auto;
                    cursor: pointer;
                    transition: background 0.25s ease;
                }

                .validate-donation:hover {
                    background: #b80000;
                }

                .arrow {
                    margin-left: 8px;
                    font-size: 1.2rem;
                }

                .secure-box {
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    padding: 0 20px 20px 20px;
                    font-size: 1rem;
                    color: #333;
                }

                .lock-icon {
                    width: 24px;
                    height: 24px;
                    display: block;
                    margin-top: 0;
                }

                .don-footer {
                    position: relative;
                    bottom: 0;
                    width: 100%;
                    background: #2d8f91;
                    color: #ffffff;
                    margin-bottom: 0;
                    padding: 50px 0;
                }

                .don-footer .footer-inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 24px;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 28px;
                    align-items: start;
                }

                .don-footer .acc {
                    background: rgba(255,255,255,0.04);
                    border: 1px solid rgba(255,255,255,0.12);
                    border-radius: 10px;
                    overflow: hidden;
                    transition: box-shadow 0.3s ease, border-color 0.3s ease;
                }

                .acc-header {
                    width: 100%;
                    text-align: left;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 12px;
                    padding: 16px 18px;
                    background: transparent;
                    color: #fff;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    transition: background 0.25s ease;
                }

                .acc-header:hover {
                    background: rgba(255,255,255,0.06);
                }

                .acc-caret {
                    transition: transform 0.25s ease;
                }

                .acc-body {
                    padding: 0 18px 0;
                    max-height: 0;
                    overflow: hidden;
                    opacity: 0;
                    transition: max-height 0.4s ease, opacity 0.3s ease, padding 0.3s ease;
                }

                .acc.open .acc-body {
                    max-height: 500px;
                    opacity: 1;
                    padding: 0 18px 16px;
                }

                .acc-list {
                    margin: 11px 0 0;
                    padding-left: 20px;
                }

                .acc-list li {
                    margin: 8px 0;
                    line-height: 1.5;
                }

                .acc.open {
                    border-color: rgba(255,255,255,0.25);
                    box-shadow: 0 0 12px rgba(255, 255, 255, 0.15);
                }

                .acc.open .acc-header .acc-caret {
                    transform: rotate(180deg);
                }

                @media (max-width: 1400px) {
                    .don-section {
                        flex-direction: column;
                        margin-left: 0;
                        align-items: center;
                        gap: 20px;
                        margin-top: 40px;
                        width: 100%;
                        padding: 0 15px;
                    }

                    .don-module {
                        margin-top: 0;
                        width: 100%;
                        max-width: 100%;
                    }

                    .don-coordonnees {
                        flex-direction: column;
                        margin-top: 0;
                        align-items: center;
                        gap: 20px;
                        width: 100%;
                        padding: 0 15px;
                    }

                    .coordonnees-card {
                        width: 100%;
                        max-width: 100%;
                    }

                    .don-reglement {
                        margin-left: 0;
                        margin-top: 20px;
                        width: 100%;
                        padding: 0 15px;
                    }

                    .reglement-card {
                        width: 100%;
                        max-width: 100%;
                    }

                    .don-footer .footer-inner {
                        grid-template-columns: 1fr;
                    }

                    .icon {
                        display: block;
                        width: 40px;
                        height: 40px;
                        margin: 0 auto 6px;
                        object-fit: contain;
                    }

                    [data-method="google-pay-apple-pay"] .icon {
                        width: 150px;
                        margin-top: 5px;
                    }
                }
            `}</style>

            <div className="video-container">
                <video autoPlay muted loop playsInline id="background-video">
                    <source src="/SAES301/src/assets/images/Donation/lacroix-rouge.webm" type="video/webm"/>
                </video>
                {/* Barre de donations */}
                <div className="donation-bar">
                    <div className="ticker">
                        <div className="donation-text">
                            <div className="item donation-text" id="donorText">
                                {donorText}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Header */}
                <div className="header-donation">
                    <a href="/protect/public">
                        <img src="/SAES301/src/assets/images/Donation/Logo_Croix-Rouge_Française.svg"
                             alt="Logo Croix-Rouge Française" className="logo"/>
                    </a>
                    <h1>
                        <span className="highlight">Votre Générosité</span>
                        <span className="whitebox">sauve des vies</span>
                    </h1>
                </div>

                {/* Section principale */}
                <section className="don-section">
                    {/* Bloc 1: Mon soutien */}
                    <section className="don-module">
                        <div className="don-header">
                            <h2>1. Mon soutien</h2>
                        </div>

                        <div className="don-tabs">
                            <button
                                className={`tab-donation ${activeTab === "once" ? "active" : ""}`}
                                onClick={() => handleTabChange("once")}
                            >
                                Je donne une fois
                            </button>
                            <button
                                className={`tab-donation ${activeTab === "monthly" ? "active" : ""}`}
                                onClick={() => handleTabChange("monthly")}
                            >
                                <span className="heart">❤</span> Je donne tous les mois
                            </button>
                        </div>

                        {activeTab === "once" && (
                            <div className="don-amounts">
                                {[90, 130, 150, 200].map(amount => (
                                    <button
                                        key={amount}
                                        className={`amount-don ${selectedAmount === amount ? "active" : ""}`}
                                        onClick={() => handleAmountSelect(amount)}
                                    >
                                        {amount} €
                                    </button>
                                ))}
                                <div className="custom-amount-box">
                                    <span className="euro-symbol">€</span>
                                    <input
                                        type="number"
                                        className="custom-amount-input"
                                        placeholder="Montant libre"
                                        min="1"
                                        value={customAmount}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {activeTab === "monthly" && (
                            <div className="don-amounts">
                                {[10, 15, 20, 30].map(amount => (
                                    <button
                                        key={amount}
                                        className={`amount-don ${selectedAmount === amount ? "active" : ""}`}
                                        onClick={() => handleAmountSelect(amount)}
                                    >
                                        {amount} € par mois
                                    </button>
                                ))}
                                <div className="custom-amount-box">
                                    <span className="euro-symbol">€</span>
                                    <input
                                        type="number"
                                        className="custom-amount-input"
                                        placeholder="Montant libre (€/mois)"
                                        min="1"
                                        value={customAmount}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}

                        {showInfo && (
                            <div className="don-info">
                                <p>Soit <strong>{deduction} €</strong> après déduction fiscale</p>
                                <p>La Croix-Rouge française utilisera les fonds collectés pour ses missions
                                    prioritaires.</p>
                            </div>
                        )}
                    </section>

                    {/* Bloc 2: Mes coordonnées */}
                    <section className="don-coordonnees">
                        <div className="coordonnees-card">
                            <div className="card-header">
                                <h2>2. Mes coordonnées</h2>
                            </div>

                            <form className="card-body">
                                <div className="form-group-donation">
                                    <label htmlFor="email">Email *</label>
                                    <input type="email" id="email" placeholder="Votre adresse email" required/>
                                </div>

                                <div className="form-group-donation-inline">
                                    <input type="checkbox" id="is-company"/>
                                    <label htmlFor="is-company">Cochez cette case si vous êtes une entreprise</label>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="civility">Civilité *</label>
                                    <select id="civility" required>
                                        <option value="">Sélectionnez</option>
                                        <option value="Mme">Madame</option>
                                        <option value="M.">Monsieur</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                </div>

                                <div className="form-row">
                                    <div className="form-group-donation half">
                                        <label htmlFor="firstname">Prénom *</label>
                                        <input type="text" id="firstname" required/>
                                    </div>
                                    <div className="form-group-donation half">
                                        <label htmlFor="lastname">Nom *</label>
                                        <input type="text" id="lastname" required/>
                                    </div>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="country">Pays *</label>
                                    <select id="country" required>
                                        <option value="France">FRANCE</option>
                                        <option value="Belgique">BELGIQUE</option>
                                        <option value="Suisse">SUISSE</option>
                                        <option value="Canada">CANADA</option>
                                        <option value="Autre">AUTRE</option>
                                    </select>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="address">Adresse *</label>
                                    <input type="text" id="address" placeholder="Commencez à taper votre adresse..."
                                           required/>
                                    <a href="#" className="manual-address">Cliquez ici pour saisir votre adresse
                                        manuellement</a>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="phone">Téléphone</label>
                                    <div className="phone-input">
                                        <span className="flag">🇫🇷</span>
                                        <input type="tel" id="phone" placeholder="06 12 34 56 78"/>
                                    </div>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="birthdate">Date de naissance</label>
                                    <input type="text" id="birthdate" placeholder="jj/mm/aaaa" maxLength="10"/>
                                </div>

                                <fieldset className="form-group-donation-donation">
                                    <legend>Je souhaite mon reçu fiscal : *</legend>
                                    <label><input type="radio" name="receipt" value="email" defaultChecked/> Par
                                        email</label><br/>
                                    <label><input type="radio" name="receipt" value="courrier"/> Par courrier</label>
                                </fieldset>

                                <p className="form-note">
                                    * Champs obligatoires (ces informations sont indispensables pour bénéficier de votre
                                    réduction fiscale)
                                </p>
                            </form>
                        </div>
                    </section>

                    {/* Bloc 3: Mon règlement */}
                    <section className="don-reglement">
                        <div className="reglement-card">
                            <div className="card-header">
                                <h2>3. Mon règlement</h2>
                            </div>

                            <div className="payment-methods">
                                {[
                                    {
                                        method: "card",
                                        label: "Carte bancaire",
                                        img: "/assets/images/Donation/carte-de-credit.svg"
                                    },
                                    {
                                        method: "google-pay-apple-pay",
                                        label: "Google Pay / Apple Pay",
                                        img: "/assets/images/Donation/gg-pay-app-pay.svg"
                                    },
                                    {method: "paypal", label: "PayPal", img: "/assets/images/Donation/paypal.svg"},
                                    {
                                        method: "virement",
                                        label: "Virement instantané",
                                        img: "/assets/images/Donation/virement.svg"
                                    }
                                ].map(({method, label, img}) => (
                                    <button
                                        key={method}
                                        className={`payment-option ${activePayment === method ? "active" : ""}`}
                                        onClick={() => handlePaymentChange(method)}
                                        data-method={method}
                                    >
                                        <img src={img} alt={label} className="icon"/>
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>

                            {showVirement && (
                                <div className="virement-box">
                                    <div className="bank-select">
                                        <label htmlFor="bank">Banque :</label>
                                        <select id="bank">
                                            <option value="">Sélectionnez votre banque</option>
                                            <option value="allianz">Allianz Banque</option>
                                            <option value="socgen">Société Générale</option>
                                            <option value="credit-agricole">Crédit Agricole</option>
                                            <option value="banque-populaire">Banque Populaire</option>
                                        </select>
                                    </div>

                                    <div className="virement-infos">
                                        <p><strong>Simple et rapide (sans IBAN ni carte bancaire) :</strong></p>
                                        <ol>
                                            <li>Sélectionnez votre banque</li>
                                            <li>Entrez vos identifiants bancaires</li>
                                            <li>Validez la notification dans votre application</li>
                                        </ol>
                                    </div>
                                </div>
                            )}

                            <button className="validate-donation" onClick={handleValidate}>
                                JE VALIDE MON DON DE&nbsp;<span>{displayAmount} €</span>
                            </button>

                            <div className="secure-box">
                                <img src="/SAES301/src/assets/images/Donation/bouclier.svg" alt="Lock" className="lock-icon"/>
                                <p>
                                    Paiements sécurisés avec les derniers protocoles de chiffrement, conçus pour
                                    respecter
                                    les normes les plus élevées de l'industrie.
                                </p>
                            </div>
                        </div>
                    </section>
                </section>
            </div>


            {/* Footer Accordéon */}
            <footer className="don-footer">
                <div className="footer-inner">
                    {[
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
                    ].map((section, index) => (
                        <section key={index} className={`acc ${openAccordion === index ? "open" : ""}`}>
                            <button
                                className="acc-header"
                                onClick={() => toggleAccordion(index)}
                                aria-expanded={openAccordion === index}
                            >
                                <span>{section.title}</span>
                                <span className="acc-caret">▾</span>
                            </button>
                            <div className="acc-body">
                                <ul className="acc-list">
                                    {section.items.map((item, i) => (
                                        <li key={i}
                                            dangerouslySetInnerHTML={{__html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}}/>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    ))}
                </div>
            </footer>
        </>
    );
}