import {useState} from 'react';

export default function DonationFormHorizontal() {
    const [frequency, setFrequency] = useState('once');
    const [amount, setAmount] = useState('130');
    const [customAmount, setCustomAmount] = useState('');

    const presetAmounts = ['90', '130', '150', '200'];

    // Calculate tax deduction (66% for France)
    const calculateTaxDeduction = () => {
        const donationAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);
        if (isNaN(donationAmount)) return '0';
        const deduction = donationAmount * 0.66;
        return Math.round(deduction).toString();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const finalAmount = customAmount || amount;
        console.log('Donation submitted:', {frequency, amount: finalAmount});
        alert(`Merci ! Donation de ${finalAmount}€ (${frequency === 'once' ? 'une fois' : 'mensuelle'})`);
    };

    const handleCustomAmountChange = (e) => {
        setCustomAmount(e.target.value);
        setAmount('');
    };

    const handlePresetAmountClick = (value) => {
        setAmount(value);
        setCustomAmount('');
    };

    return (
        <>
            <style>{`
                /* Wrapper & Container styles extracted from Main.jsx */
                .donation-wrapper {
                    margin-bottom: 64px;
                    padding-left: 24px;
                    padding-right: 24px;
                }

                @media (min-width: 1100px) {
                    .donation-wrapper {
                        margin-bottom: 88px;
                        padding-left: 64px;
                        padding-right: 64px;
                    }
                }

                .donation-container {
                    width: 100%;
                    max-width: 1170px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 0;
                }

                .donation-container--large {
                    max-width: 1310px;
                }

                /* Core Form CSS extracted from CDonationFormVertical.jsx */
                /* CARD */
                .donation-card {
                    padding: 24px;
                    text-align: center;
                    color: #000;
                    background-color: #fff;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, .35);
                    border-radius: 8px;
                }

                @media (min-width: 700px) {
                    .donation-card {
                        padding: 32px;
                    }
                }

                /* HEADER */
                .donation-header {
                    margin-bottom: 3rem;
                    text-align: center;
                }

                .donation-header--small {
                    margin-bottom: 24px;
                }

                .donation-title {
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                }

                @media (min-width: 700px) {
                    .donation-title {
                        font-size: 2.4rem;
                    }
                }

                /* FORM */
                .donation-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                    max-width: 1170px;
                    margin-left: auto;
                    margin-right: auto;
                }

                @media (min-width: 1100px) {
                    .donation-card--row .donation-form {
                        flex-direction: row;
                        align-items: center;
                        flex-wrap: wrap;
                        gap: 24px;
                    }
                }

                /* TABS */
                .donation-tabs {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                @media (min-width: 700px) {
                    .donation-tabs {
                        flex-direction: row;
                        gap: 12px;
                    }
                }

                .donation-tabs > * {
                    flex: 1;
                }

                /* AMOUNT SECTION */
                .donation-amount-section {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    white-space: nowrap;
                }

                @media (min-width: 1100px) {
                    .donation-card--row .donation-amount-section {
                        flex-direction: row;
                        flex: 1;
                    }
                }

                /* OPTIONS */
                .donation-options {
                    flex: 2;
                    display: flex;
                    gap: 8px;
                }

                @media (max-width: 699px) {
                    .donation-options {
                        flex-wrap: wrap;
                    }
                }

                .donation-options > * {
                    flex: 1;
                }

                /* BUTTON WRAPPER */
                @media (min-width: 1100px) {
                    .donation-card--row .donation-button-wrapper {
                        flex: 2;
                        max-width: 200px;
                    }
                }

                /* TAX INFO */
                .donation-tax-info {
                    font-weight: 600;
                }

                @media (min-width: 1100px) {
                    .donation-card--row .donation-tax-info {
                        order: 2;
                        width: 100%;
                    }
                }

                .donation-tax-info mark {
                    padding: 4px 8px;
                    font-weight: 900;
                    color: #fff;
                    background-color: #075c68;
                }

                /* CHOICE */
                .donation-choice {
                    position: relative;
                    display: block;
                }

                .donation-choice input {
                    position: absolute;
                    opacity: 0;
                }

                .donation-choice label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 44px;
                    padding: 2px 12px;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    line-height: 1.2;
                    cursor: pointer;
                    user-select: none;
                    transition: all 0.2s ease;
                }

                .donation-choice label:hover {
                    border-color: #767676;
                }

                .donation-choice input:checked + label {
                    border-color: #000;
                    color: #075c68;
                    background-color: #e6eff0;
                }

                .donation-choice--hidden-input label::before {
                    display: none;
                }

                /* INPUT FIELDS */
                .donation-input-group {
                    display: block;
                    margin-bottom: 0;
                }

                .donation-input-label {
                    display: block;
                    margin-bottom: 8px;
                    padding: 0;
                    font-weight: 600;
                }

                .donation-input-field {
                    display: block;
                    position: relative;
                }

                .donation-input-unit {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1;
                    font-weight: 600;
                    color: #000;
                }

                .donation-input {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    min-height: 50px;
                    padding: 12px 14px;
                    padding-right: 40px;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    outline: 0;
                    font-size: 1.4rem;
                    font-weight: 500;
                    font-family: inherit;
                    color: #000;
                    background-color: #fff;
                    transition: border-color 0.2s ease;
                }

                @media (max-width: 699px) {
                    .donation-input {
                        font-size: 1.6rem;
                    }
                }

                .donation-input:not([disabled]):focus,
                .donation-input:not([disabled]):hover {
                    border-color: #767676;
                }

                .donation-input::placeholder {
                    font-weight: 400;
                    opacity: 1;
                    color: #767676;
                }

                /* BUTTON */
                .donation-btn {
                    overflow: hidden;
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    max-width: 100%;
                    min-height: 50px;
                    padding: 2px 12px;
                    border: none;
                    border-radius: 4px;
                    font-size: 2.2rem;
                    font-weight: 600;
                    line-height: 1;
                    text-decoration: none;
                    text-align: center;
                    color: #fff;
                    background-color: #e3001b;
                    cursor: pointer;
                    transition: all .2s ease-in-out;
                }

                @media (min-width: 1100px) {
                    .donation-btn {
                        padding-right: 24px;
                        padding-left: 24px;
                    }
                }

                .donation-btn:not([disabled]):focus,
                .donation-btn:not([disabled]):hover {
                    background-color: #970b13;
                }

                .donation-btn--full {
                    width: 100%;
                }

                /* UTILITIES */
                .donation-visually-hidden {
                    border: 0;
                    clip: rect(0 0 0 0);
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    padding: 0;
                    position: absolute;
                    width: 1px;
                }

                /* RESET (pour le scope du formulaire) */
                ul {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                fieldset {
                    margin: 0;
                    border: 0;
                    padding: 0;
                }
            `}</style>

            <section className="donation-wrapper">
                <div className="donation-container donation-container--large">
                    <div className="donation-card donation-card--row">
                        <header className="donation-header donation-header--small">
                            <h2 className="donation-title">Mobilisons-nous ensemble !</h2>
                        </header>

                        <div className="donation-form">
                            <ul className="donation-tabs">
                                <li>
                  <span className="donation-choice donation-choice--radio">
                    <input
                        id="horizontal_once_freq"
                        name="horizontal_frequency"
                        type="radio"
                        value="once"
                        checked={frequency === 'once'}
                        onChange={(e) => setFrequency(e.target.value)}
                    />
                    <label htmlFor="horizontal_once_freq">Je donne une fois</label>
                  </span>
                                </li>
                                <li>
                  <span className="donation-choice donation-choice--radio">
                    <input
                        id="horizontal_regular_freq"
                        name="horizontal_frequency"
                        type="radio"
                        value="regular"
                        checked={frequency === 'regular'}
                        onChange={(e) => setFrequency(e.target.value)}
                    />
                    <label htmlFor="horizontal_regular_freq">Je donne tous les mois</label>
                  </span>
                                </li>
                            </ul>

                            <fieldset className="donation-amount-section">
                                <legend className="donation-visually-hidden">
                                    {frequency === 'once' ? 'Je donne une fois' : 'Je donne tous les mois'}
                                </legend>

                                <ul className="donation-options">
                                    {presetAmounts.map((value) => (
                                        <li key={value}>
                      <span className="donation-choice donation-choice--hidden-input">
                        <input
                            id={`horizontal_amount_${value}`}
                            name="horizontal_amount"
                            type="radio"
                            value={value}
                            checked={amount === value && !customAmount}
                            onChange={() => handlePresetAmountClick(value)}
                        />
                        <label htmlFor={`horizontal_amount_${value}`}>{value} €</label>
                      </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="donation-input-group">
                                    <label htmlFor="horizontal_amount_free"
                                           className="donation-input-label donation-visually-hidden">
                                        Montant libre
                                    </label>
                                    <span className="donation-input-field">
                    <span className="donation-input-unit">€</span>
                    <input
                        id="horizontal_amount_free"
                        name="horizontal_amount_custom"
                        placeholder="Montant libre"
                        min="4"
                        step="0.01"
                        type="number"
                        value={customAmount}
                        onChange={handleCustomAmountChange}
                        className="donation-input"
                    />
                  </span>
                                </div>
                            </fieldset>

                            <p className="donation-tax-info">
                                Soit <mark>{calculateTaxDeduction()} €</mark> après déduction fiscale
                            </p>

                            <p className="donation-button-wrapper">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="donation-btn donation-btn--full"
                                >
                                    Je donne
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}