import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

// 🔹 CONFIGURATION
const API_URL = "http://localhost:8000/api";

// 🔹 FONCTION D'APPEL API (Découplée du composant)
async function submitDonation(payload) {
    const res = await fetch(`${API_URL}/donation.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
        throw new Error(data.error || "Erreur serveur");
    }

    return data;
}

export default function Donation() {
    // --- 1. STATE : Gestion de l'interface (Tabs, Montants) ---
    const [activeTab, setActiveTab] = useState("once");
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState("");
    const [deduction, setDeduction] = useState(0);
    const [showInfo, setShowInfo] = useState(false);

    // --- 2. STATE : Formulaire Donateur (Logique Backend) ---
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
    const [recuFiscal, setRecuFiscal] = useState("email"); // Par défaut

    // --- 3. STATE : Paiement & UX ---
    const [activePayment, setActivePayment] = useState("card");
    const [showVirement, setShowVirement] = useState(false);
    const [donorText, setDonorText] = useState(""); // Ticker
    const [openAccordion, setOpenAccordion] = useState(null); // Footer
    const [isLoading, setIsLoading] = useState(false); // État de chargement

    // --- LOGIQUE METIER : Calcul Fiscal ---
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

    // --- EFFET : Ticker de donations (Animation texte) ---
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

    // --- HANDLERS : Interface ---
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

    const toggleAccordion = (index) => {
        setOpenAccordion(openAccordion === index ? null : index);
    };

    // --- HANDLER : Validation du formulaire (API) ---
    const handleValidate = async () => {
        const amount = Number(customAmount || selectedAmount || 0);

        // Validation simple Front
        if (!amount || amount <= 0) {
            alert("Veuillez choisir un montant.");
            return;
        }
        if (!email || !nom || !prenom || !adresse || !ville || !codePostal || !pays) {
            alert("Veuillez remplir tous les champs obligatoires (*)");
            return;
        }

        setIsLoading(true);

        // Préparation du Payload
        const payload = {
            donateur: {
                email,
                civilite,
                prenom,
                nom,
                telephone: telephone || null,
                adresse,
                complement_adresse: complementAdresse || null,
                code_postal: codePostal,
                ville,
                pays,
                date_naissance: dateNaissance || null,
                recu_fiscal: recuFiscal
            },
            don: {
                montant: amount,
                frequence: activeTab === "monthly" ? "monthly" : "once",
                moyen_paiement: activePayment,
            }
        };

        try {
            const data = await submitDonation(payload);

            // Succès
            alert(`Merci ${prenom} ! Votre don de ${amount}€ via ${activePayment} a bien été enregistré. ❤️`);
            console.log("Donation Success:", data);

            // Ici, tu pourrais rediriger vers une page de remerciement :
            // window.location.href = "/merci";

        } catch (err) {
            console.error(err);
            alert(err.message || "Une erreur est survenue lors du traitement du don.");
        } finally {
            setIsLoading(false);
        }
    };

    const displayAmount = customAmount || selectedAmount || 0;

    return (
        <>
            <Helmet>
                <title>Soutenez la Croix-Rouge française</title>
                <meta name="description" content="Soutenez notre association en effectuant un don"/>
            </Helmet>

            {/* --- STYLES CSS INJECTÉS --- */}
            <style>{`
                :root { --bar-bg-1: #e30219; --bar-bg-2: #e30219; --text-color: #ffffff; }
                * { box-sizing: border-box; }
                body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; background: #2d8f91; }
                
                /* Video & Layout */
                .video-container { position: relative; width: 100%; height: 100vh; overflow: hidden; }
                #background-video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; pointer-events: none; }
                
                /* Top Bar */
                .donation-bar { position: fixed; top: 0; left: 0; right: 0; background: linear-gradient(var(--bar-bg-1), var(--bar-bg-2)); padding: 8px 12px; display: flex; justify-content: center; z-index: 1000; height: 48px; }
                .ticker { display: flex; align-items: center; justify-content: center; color: white; font-size: 14px; font-weight: 600; min-width: 360px; }
                
                /* Header */
                .header-donation { position: relative; display: flex; align-items: center; justify-content: center; padding: 20px 0; flex-direction: column; }
                .logo { position: absolute; top: 20px; left: 40px; width: 100px; height: auto; }
                .header-donation h1 { font-size: 2.3rem; font-weight: 800; text-align: center; margin-top: 60px; z-index: 10; }
                .highlight { background: linear-gradient(180deg, #d53c3c 0%, #b52c2c 100%); color: #fff; padding: 10px 22px; border-radius: 6px 0 0 6px; display: inline-block; }
                .whitebox { background: rgba(255, 255, 255, 0.95); color: #000; padding: 10px 22px; border-radius: 0 6px 6px 0; display: inline-block; }

                /* Main Section */
                .don-section { display: flex; flex-direction: row; justify-content: center; gap: 40px; margin-top: 100px; padding-bottom: 50px; position: relative; z-index: 2; flex-wrap: wrap; }
                
                /* Cards Common Styles */
                .don-module, .coordonnees-card, .reglement-card { background: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); width: 380px; overflow: hidden; margin-top: 0; }
                .don-header, .card-header { background: #d40000; color: #fff; text-align: center; padding: 12px 0; }
                .don-header h2, .card-header h2 { margin: 0; font-size: 1rem; font-weight: 700; }
                
                /* Module 1: Montants */
                .don-tabs { display: flex; border-bottom: 1px solid #eee; }
                .tab { flex: 1; padding: 12px 0; background: #fff; border: none; font-weight: 600; cursor: pointer; border-bottom: 3px solid transparent; }
                .tab.active { color: #d40000; border-bottom-color: #d40000; }
                .don-amounts { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; padding: 10px; }
                .amount-don { padding: 6px 8px; border: 1px solid #ddd; border-radius: 5px; background: #fff; cursor: pointer; font-weight: 500; }
                .amount-don.active { background: #d40000; color: #fff; border-color: #d40000; }
                .custom-amount-box { display: flex; align-items: center; gap: 6px; border: 1px solid #ddd; padding: 6px 8px; margin-top: 8px; border-radius: 5px; }
                .custom-amount-input { border: none; outline: none; flex: 1; }
                .don-info { padding: 12px; font-size: 0.85rem; color: #333; background: #f9f9f9; }

                /* Module 2: Formulaire */
                .card-body { padding: 14px; }
                .form-group-donation { display: flex; flex-direction: column; margin-bottom: 10px; }
                .form-row { display: flex; gap: 6px; }
                .form-group-donation.half { flex: 1; }
                input, select { border: 1px solid #ddd; border-radius: 5px; padding: 8px; font-size: 0.9rem; width: 100%; }
                input:focus, select:focus { border-color: #d40000; outline: none; }
                .form-group-donation-inline { display: flex; align-items: center; gap: 6px; margin-bottom: 10px; font-size: 0.85rem; }
                .manual-address { font-size: 0.8rem; color: #000; text-decoration: underline; cursor: pointer; margin-top: 5px; display: inline-block; }
                
                /* Accordéon Adresse */
                .address-details-accordion { max-height: 0; overflow: hidden; transition: max-height 0.4s ease, opacity 0.4s ease; opacity: 0; }
                .address-details-accordion.open { max-height: 500px; opacity: 1; margin-top: 10px; }
                
                .phone-input { display: flex; align-items: center; gap: 5px; }
                .phone-input .flag { font-size: 1.2rem; }
                .form-note { font-size: 0.75rem; color: #666; margin-top: 10px; font-style: italic; }

                /* Module 3: Paiement */
                .payment-methods { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 20px; }
                .payment-option { border: 2px solid #ddd; border-radius: 8px; padding: 10px; text-align: center; cursor: pointer; background: #fff; transition: all 0.2s; position: relative; }
                .payment-option.active { border-color: #d40000; color: #d40000; background: #fff5f5; }
                .payment-option.active::after { content: "✔"; position: absolute; top: 5px; right: 5px; font-weight: bold; }
                .icon { width: 40px; height: 40px; display: block; margin: 0 auto 5px; object-fit: contain; }
                [data-method="google-pay-apple-pay"] .icon { width: 100px; }
                
                .validate-donation { width: calc(100% - 40px); margin: 10px 20px 20px; padding: 14px; background: #d40000; color: #fff; border: none; border-radius: 6px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.2s; }
                .validate-donation:hover { background: #b80000; }
                .validate-donation:disabled { background: #ccc; cursor: not-allowed; }

                .secure-box { display: flex; gap: 10px; padding: 0 20px 20px; font-size: 0.8rem; color: #555; align-items: center; }
                .lock-icon { width: 20px; height: 20px; }
                .virement-box { padding: 0 20px 20px; font-size: 0.9rem; }

                /* Footer */
                .don-footer { background: #2d8f91; color: white; padding: 40px 0; position: relative; z-index: 2; margin-top: 50px; }
                .footer-inner { max-width: 1100px; margin: 0 auto; padding: 0 20px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
                .acc { background: rgba(255,255,255,0.1); border-radius: 8px; overflow: hidden; }
                .acc-header { width: 100%; padding: 15px; background: transparent; border: none; color: white; font-weight: 700; display: flex; justify-content: space-between; cursor: pointer; }
                .acc-body { padding: 0 15px; max-height: 0; overflow: hidden; transition: max-height 0.3s; }
                .acc.open .acc-body { max-height: 300px; padding-bottom: 15px; }
                .acc-list { padding-left: 20px; margin: 0; font-size: 0.9rem; }
                .acc-list li { margin-bottom: 8px; }

                /* Responsive */
                @media (max-width: 1200px) { .don-section { gap: 20px; transform: scale(0.9); margin-top: 50px; } }
                @media (max-width: 1024px) { 
                    .don-section { flex-direction: column; align-items: center; transform: scale(1); margin-top: 50px; }
                    .logo { left: 20px; width: 80px; }
                    .footer-inner { grid-template-columns: 1fr; }
                }
                @media (max-width: 768px) {
                    .header-donation h1 { font-size: 1.5rem; margin-top: 80px; }
                    .don-module, .coordonnees-card, .reglement-card { width: 95%; max-width: 400px; }
                }
            `}</style>

            <div className="video-container">
                <video autoPlay muted loop playsInline id="background-video">
                    {/* Assure-toi que le chemin est correct */}
                    <source src="/SAES301/src/assets/images/Donation/lacroix-rouge.webm" type="video/webm"/>
                </video>

                {/* Barre de donations */}
                <div className="donation-bar">
                    <div className="ticker">
                        <div className="donation-text">{donorText}</div>
                    </div>
                </div>

                {/* Header */}
                <div className="header-donation">
                    <a href="/" className="logo-link">
                        <img src="/SAES301/src/assets/images/Donation/Logo_Croix-Rouge_Française.svg" alt="Logo Croix-Rouge" className="logo"/>
                    </a>
                    <h1>
                        <span className="highlight">Votre Générosité</span> <span className="whitebox">sauve des vies</span>
                    </h1>
                </div>

                {/* Section principale avec les 3 cartes */}
                <section className="don-section">

                    {/* Bloc 1: Mon soutien */}
                    <article className="don-module">
                        <div className="don-header"><h2>1. Mon soutien</h2></div>
                        <div className="don-tabs">
                            <button className={`tab ${activeTab === "once" ? "active" : ""}`} onClick={() => handleTabChange("once")}>Je donne une fois</button>
                            <button className={`tab ${activeTab === "monthly" ? "active" : ""}`} onClick={() => handleTabChange("monthly")}><span className="heart">❤</span> Je donne tous les mois</button>
                        </div>
                        <div className="don-amounts">
                            {/* Choix des montants dynamiques */}
                            {(activeTab === "once" ? [90, 130, 150, 200] : [10, 15, 20, 30]).map(amount => (
                                <button key={amount} className={`amount-don ${selectedAmount === amount ? "active" : ""}`} onClick={() => handleAmountSelect(amount)}>
                                    {amount} € {activeTab === "monthly" && "par mois"}
                                </button>
                            ))}
                            <div className="custom-amount-box">
                                <span className="euro-symbol">€</span>
                                <input type="number" className="custom-amount-input" placeholder="Montant libre" min="1" value={customAmount} onChange={(e) => handleCustomAmountChange(e.target.value)}/>
                            </div>
                        </div>
                        {showInfo && (
                            <div className="don-info">
                                <p>Soit <strong>{deduction} €</strong> après déduction fiscale.</p>
                            </div>
                        )}
                    </article>

                    {/* Bloc 2: Mes coordonnées (INTEGRATION LOGIQUE ICI) */}
                    <article className="coordonnees-card">
                        <div className="card-header"><h2>2. Mes coordonnées</h2></div>
                        <div className="card-body">
                            <div className="form-group-donation">
                                <label htmlFor="email">Email *</label>
                                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="votre@email.com" required/>
                            </div>

                            <div className="form-group-donation-inline">
                                <input type="checkbox" id="is-company"/>
                                <label htmlFor="is-company">Vous êtes une entreprise ?</label>
                            </div>

                            <div className="form-group-donation">
                                <label htmlFor="civility">Civilité *</label>
                                <select id="civility" value={civilite} onChange={(e) => setCivilite(e.target.value)} required>
                                    <option value="">Sélectionnez</option>
                                    <option value="Mme">Madame</option>
                                    <option value="M.">Monsieur</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>

                            <div className="form-row">
                                <div className="form-group-donation half">
                                    <label htmlFor="firstname">Prénom *</label>
                                    <input type="text" id="firstname" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>
                                </div>
                                <div className="form-group-donation half">
                                    <label htmlFor="lastname">Nom *</label>
                                    <input type="text" id="lastname" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                                </div>
                            </div>

                            <div className="form-group-donation">
                                <label htmlFor="country">Pays *</label>
                                <select id="country" value={pays} onChange={(e) => setPays(e.target.value)} required>
                                    <option value="FRANCE">FRANCE</option>
                                    <option value="BELGIQUE">BELGIQUE</option>
                                    <option value="SUISSE">SUISSE</option>
                                    <option value="CANADA">CANADA</option>
                                    <option value="AUTRE">AUTRE</option>
                                </select>
                            </div>

                            <div className="form-group-donation">
                                <label htmlFor="address">Adresse *</label>
                                <input type="text" id="address" value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Rechercher votre adresse..." required/>

                                {/* Bascule pour afficher les champs manuels */}
                                {!showManualAddress && (
                                    <a role="button" className="manual-address" onClick={(e) => { e.preventDefault(); setShowManualAddress(true); }}>
                                        Saisir l'adresse manuellement
                                    </a>
                                )}
                            </div>

                            {/* Accordéon pour adresse manuelle */}
                            <div className={`address-details-accordion ${showManualAddress ? 'open' : ''}`}>
                                <div className="form-group-donation">
                                    <label htmlFor="complement">Complément (Appt, Etage...)</label>
                                    <input type="text" id="complement" value={complementAdresse} onChange={(e) => setComplementAdresse(e.target.value)}/>
                                </div>
                                <div className="form-row">
                                    <div className="form-group-donation half">
                                        <label htmlFor="zipcode">Code Postal *</label>
                                        <input type="text" id="zipcode" value={codePostal} onChange={(e) => setCodePostal(e.target.value)} required={showManualAddress}/>
                                    </div>
                                    <div className="form-group-donation half">
                                        <label htmlFor="city">Ville *</label>
                                        <input type="text" id="city" value={ville} onChange={(e) => setVille(e.target.value)} required={showManualAddress}/>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group-donation">
                                <label htmlFor="phone">Téléphone</label>
                                <div className="phone-input">
                                    <span className="flag">🇫🇷</span>
                                    <input type="tel" id="phone" value={telephone} onChange={(e) => setTelephone(e.target.value)} placeholder="06 12 34 56 78"/>
                                </div>
                            </div>

                            <div className="form-group-donation">
                                <label htmlFor="birthdate">Date de naissance</label>
                                <input type="date" id="birthdate" value={dateNaissance} onChange={(e) => setDateNaissance(e.target.value)} />
                            </div>

                            <fieldset className="form-group-donation-donation">
                                <legend style={{fontSize: '0.9rem', fontWeight: '600', color: '#0056b3'}}>Reçu fiscal : *</legend>
                                <label style={{marginRight: '10px'}}><input type="radio" name="receipt" value="email" checked={recuFiscal === 'email'} onChange={() => setRecuFiscal('email')}/> Email</label>
                                <label><input type="radio" name="receipt" value="courrier" checked={recuFiscal === 'courrier'} onChange={() => setRecuFiscal('courrier')}/> Courrier</label>
                            </fieldset>

                            <p className="form-note">* Champs obligatoires pour la déduction fiscale.</p>
                        </div>
                    </article>

                    {/* Bloc 3: Mon règlement */}
                    <article className="reglement-card">
                        <div className="card-header"><h2>3. Mon règlement</h2></div>
                        <div className="payment-methods">
                            {[
                                { method: "card", label: "Carte", img: "/SAES301/src/assets/images/Donation/carte-de-credit.svg" },
                                { method: "google-pay-apple-pay", label: "GPay/ApplePay", img: "/SAES301/src/assets/images/Donation/gg-pay-app-pay.svg" },
                                { method: "paypal", label: "PayPal", img: "/SAES301/src/assets/images/Donation/paypal.svg" },
                                { method: "virement", label: "Virement", img: "/SAES301/src/assets/images/Donation/virement.svg" }
                            ].map(({ method, label, img }) => (
                                <button key={method} className={`payment-option ${activePayment === method ? "active" : ""}`} onClick={() => handlePaymentChange(method)} data-method={method}>
                                    <img src={img} alt={label} className="icon"/>
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>

                        {showVirement && (
                            <div className="virement-box">
                                <p><strong>Virement Instantané :</strong> Sélectionnez votre banque après validation.</p>
                            </div>
                        )}

                        <button className="validate-donation" onClick={handleValidate} disabled={isLoading}>
                            {isLoading ? "TRAITEMENT EN COURS..." : <>JE VALIDE MON DON DE&nbsp;<span>{displayAmount} €</span></>}
                        </button>

                        <div className="secure-box">
                            <img src="/SAES301/src/assets/images/Donation/bouclier.svg" alt="Lock" className="lock-icon"/>
                            <p>Paiement 100% sécurisé (TLS/SSL).</p>
                        </div>
                    </article>

                </section>
            </div>

            {/* Footer Accordéon */}
            <footer className="don-footer">
                <div className="footer-inner">
                    {[
                        { title: "Pourquoi donner ?", items: ["160 ans d'histoire.", "Financement des urgences et actions sociales.", "75% déductibles des impôts."] },
                        { title: "Vos données", items: ["Gestion du reçu fiscal.", "Droits d'accès et rectification (RGPD).", "Politique de confidentialité disponible."] },
                        { title: "Confiance", items: ["Site 100% sécurisé.", "Équipe donateurs à l'écoute.", "Aucune donnée bancaire conservée."] }
                    ].map((section, index) => (
                        <div key={index} className={`acc ${openAccordion === index ? "open" : ""}`}>
                            <button className="acc-header" onClick={() => toggleAccordion(index)}>
                                <span>{section.title}</span>
                                <span className="acc-caret" style={{ transform: openAccordion === index ? 'rotate(180deg)' : 'rotate(0deg)' }}>▾</span>
                            </button>
                            <div className="acc-body">
                                <ul className="acc-list">
                                    {section.items.map((item, i) => <li key={i}>{item}</li>)}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </footer>
        </>
    );
}