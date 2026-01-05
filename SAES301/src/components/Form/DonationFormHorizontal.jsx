import React, { useState } from 'react';

export default function DonationFormHorizontal() {
    // --- ÉTATS ---
    const [frequency, setFrequency] = useState('once'); // 'once' ou 'monthly'
    const [selectedAmount, setSelectedAmount] = useState(130);
    const [customAmount, setCustomAmount] = useState('');

    // --- LOGIQUE ---
    // Si un montant libre est saisi, on l'utilise. Sinon, on utilise le montant sélectionné.
    const amountToCalc = customAmount ? parseFloat(customAmount) : selectedAmount;
    // Calcul : 75% de réduction fiscale = coût réel de 25%
    const realCost = amountToCalc ? Math.floor(amountToCalc * 0.25) : 0;

    const handleAmountChange = (val) => {
        setSelectedAmount(val);
        setCustomAmount('');
    };

    const handleCustomChange = (e) => {
        setCustomAmount(e.target.value);
        setSelectedAmount(null); // Décoche les boutons montants
    };

    return (
        <section className="donation-wrapper">
            {/* --- CSS EXTRAIT ET INTÉGRÉ --- */}
            <style>{`
                /* Wrapper global pour centrer */
                .donation-wrapper {
                    padding: 24px;
                    background-color: #f8f8f8;
                    display: flex;
                    justify-content: center;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
                }

                .donation-container {
                    width: 100%;
                    max-width: 1300px;
                }

                /* La Carte (Fond blanc + Ombre) */
                .donation-card {
                    padding: 24px;
                    background-color: #fff;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                    border-radius: 8px;
                    text-align: center;
                }

                /* Titre */
                .donation-title {
                    margin-bottom: 24px;
                    font-size: 1.8rem;
                    font-weight: 800;
                    line-height: 1.2;
                    color: #000;
                }

                /* Layout Horizontal (Desktop) */
                @media (min-width: 1100px) {
                    .donation-form-row {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                        flex-wrap: wrap;
                    }
                    .donation-title {
                        margin-bottom: 30px;
                    }
                }

                /* -- LES BOUTONS (Fréquence & Montant) -- */
                .donation-group-freq, .donation-group-amount {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .donation-choice {
                    position: relative;
                    display: inline-block;
                    margin: 4px;
                }

                /* On cache le vrai bouton radio moche */
                .donation-choice input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;
                }

                /* Le label qui sert de bouton visible */
                .donation-choice label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 50px;
                    padding: 0 20px;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #000;
                    background-color: #fff;
                    cursor: pointer;
                    transition: all 0.2s;
                    user-select: none;
                }

                /* Effet Hover */
                .donation-choice label:hover {
                    border-color: #767676;
                }

                /* État SÉLECTIONNÉ (Checked) */
                .donation-choice input:checked + label {
                    border-color: #000; /* Bordure noire */
                    background-color: #e6eff0; /* Fond bleuté très clair */
                    color: #075c68; /* Texte bleu canard */
                }

                /* -- CHAMP LIBRE -- */
                .donation-group-action {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                }

                .donation-input-group {
                    display: inline-block;
                    position: relative;
                    margin: 4px;
                }

                .donation-input {
                    min-height: 50px;
                    padding: 12px 14px;
                    padding-right: 30px; /* Place pour le € */
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    font-size: 1.4rem;
                    font-weight: 500;
                    outline: none;
                    width: 140px;
                    color: #000;
                }

                .donation-input:focus {
                    border-color: #767676;
                }

                .donation-input-unit {
                    position: absolute;
                    right: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-weight: 700;
                    color: #000;
                }

                /* -- BOUTON JE DONNE -- */
                .donation-btn-submit {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 50px;
                    padding: 0 32px;
                    background-color: #e3001b; /* Rouge Croix-Rouge */
                    color: #fff;
                    font-size: 1.6rem;
                    font-weight: 700;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    margin: 4px;
                    text-decoration: none;
                    transition: background-color 0.2s;
                }

                .donation-btn-submit:hover {
                    background-color: #b70b16;
                }

                /* -- INFO FISCALE -- */
                .donation-tax-info {
                    margin-top: 20px;
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: #000;
                }
                
                .donation-tax-info mark {
                    background-color: #075c68;
                    color: #fff;
                    padding: 4px 8px;
                    border-radius: 2px;
                    font-weight: 700;
                }

                /* Responsive Mobile : empiler les éléments */
                @media (max-width: 768px) {
                    .donation-choice, .donation-input-group, .donation-btn-submit {
                        width: 100%;
                        margin: 4px 0;
                    }
                    .donation-choice label {
                        width: 100%;
                    }
                    .donation-input {
                        width: 100%;
                    }
                }
            `}</style>

            <div className="donation-container">
                <div className="donation-card">
                    <h2 className="donation-title">Mobilisons-nous ensemble !</h2>

                    <form onSubmit={(e) => e.preventDefault()} className="donation-form-row">

                        {/* GROUPE 1 : FRÉQUENCE */}
                        <div className="donation-group-freq">
                            <div className="donation-choice">
                                <input
                                    type="radio"
                                    id="freq-once"
                                    name="frequency"
                                    checked={frequency === 'once'}
                                    onChange={() => setFrequency('once')}
                                />
                                <label htmlFor="freq-once">Je donne une fois</label>
                            </div>
                            <div className="donation-choice">
                                <input
                                    type="radio"
                                    id="freq-monthly"
                                    name="frequency"
                                    checked={frequency === 'monthly'}
                                    onChange={() => setFrequency('monthly')}
                                />
                                <label htmlFor="freq-monthly">Je donne tous les mois</label>
                            </div>
                        </div>

                        {/* GROUPE 2 : MONTANTS */}
                        <div className="donation-group-amount">
                            {[90, 130, 150, 200].map((amt) => (
                                <div className="donation-choice" key={amt}>
                                    <input
                                        type="radio"
                                        id={`amt-${amt}`}
                                        name="amount"
                                        checked={selectedAmount === amt && customAmount === ''}
                                        onChange={() => handleAmountChange(amt)}
                                    />
                                    <label htmlFor={`amt-${amt}`}>{amt} €</label>
                                </div>
                            ))}
                        </div>

                        {/* GROUPE 3 : LIBRE & BOUTON */}
                        <div className="donation-group-action">
                            <div className="donation-input-group">
                                <input
                                    type="number"
                                    className="donation-input"
                                    placeholder="Montant libre"
                                    value={customAmount}
                                    onChange={handleCustomChange}
                                />
                                <span className="donation-input-unit">€</span>
                            </div>

                            <button className="donation-btn-submit">
                                Je donne
                            </button>
                        </div>
                    </form>

                    <p className="donation-tax-info">
                        Soit <mark>{realCost} €</mark> après déduction fiscale
                    </p>
                </div>
            </div>
        </section>
    );
}