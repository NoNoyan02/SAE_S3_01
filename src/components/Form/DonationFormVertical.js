import { useState } from 'react';
import "./DonationForm.css"

export default function DonationFormVertical() {
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
        console.log('Donation submitted:', { frequency, amount: finalAmount });
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
        <div className="donation-card donation-card--vertical">
            <header className="donation-header donation-header--small">
                <h2 className="donation-title donation-title--small">Mobilisons-nous ensemble !</h2>
            </header>

            <div className="donation-form donation-form--vertical">
                <ul className="donation-tabs donation-tabs--vertical">
                    <li>
                        <span className="donation-choice donation-choice--radio">
                            <input
                                id="vertical_once_freq"
                                name="vertical_frequency"
                                type="radio"
                                value="once"
                                checked={frequency === 'once'}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                            <label htmlFor="vertical_once_freq">Je donne une fois</label>
                        </span>
                    </li>
                    <li>
                        <span className="donation-choice donation-choice--radio">
                            <input
                                id="vertical_regular_freq"
                                name="vertical_frequency"
                                type="radio"
                                value="regular"
                                checked={frequency === 'regular'}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                            <label htmlFor="vertical_regular_freq">Je donne tous les mois</label>
                        </span>
                    </li>
                </ul>

                <fieldset className="donation-amount-section donation-amount-section--vertical">
                    <legend className="donation-visually-hidden">
                        {frequency === 'once' ? 'Je donne une fois' : 'Je donne tous les mois'}
                    </legend>

                    <ul className="donation-options donation-options--vertical">
                        {presetAmounts.map((value) => (
                            <li key={value}>
                                <span className="donation-choice donation-choice--hidden-input">
                                    <input
                                        id={`vertical_amount_${value}`}
                                        name="vertical_amount"
                                        type="radio"
                                        value={value}
                                        checked={amount === value && !customAmount}
                                        onChange={() => handlePresetAmountClick(value)}
                                    />
                                    <label htmlFor={`vertical_amount_${value}`}>{value} €</label>
                                </span>
                            </li>
                        ))}
                    </ul>

                    <div className="donation-input-group">
                        <label htmlFor="vertical_amount_free" className="donation-input-label donation-visually-hidden">
                            Montant libre
                        </label>
                        <span className="donation-input-field">
                            <span className="donation-input-unit">€</span>
                            <input
                                id="vertical_amount_free"
                                name="vertical_amount_custom"
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
    );
}