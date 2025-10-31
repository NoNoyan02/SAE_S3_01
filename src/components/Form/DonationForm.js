import React, {useState} from "react";
import "./DonationForm.css";

const DonationForm = () => {
    const amounts = [
        { value: 10, tax: 2 },
        { value: 15, tax: 4 },
        { value: 20, tax: 5 },
    ];

    const [frequency, setFrequency] = useState("monthly");
    const [selectedButton, setSelectedButton] = useState(15);
    const [customAmount, setCustomAmount] = useState("");


    const amountForTax =
        customAmount !== "" ? Number(customAmount) : selectedButton;
    const matchedAmount = amounts.find(a => a.value === amountForTax);
    const taxFree = matchedAmount
        ? matchedAmount.tax
        : amountForTax > 0
            ? Math.round(amountForTax * 0.27)
            : "";

    const handleAmountChange = (e) => {
        const val = e.target.value;
        if (val === "") {
            setCustomAmount("");
            setSelectedButton(null); 
            return;
        }
        const numericVal = Number(val);
        if (numericVal > 0) {
            setCustomAmount(numericVal);
            setSelectedButton(null); 
        }
    };

    return (
        <div className="donation-container">
            <div className="donation-header">
                <strong className="highlight">Faites un don</strong> pour les aider
            </div>

            {/* Frequency */}
            <div className="frequency-options">
                <label className={`radio-label ${frequency === "once" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="frequency"
                        value="once"
                        checked={frequency === "once"}
                        onChange={() => setFrequency("once")}
                    />
                    <span>Je donne une fois</span>
                </label>

                <label className={`radio-label ${frequency === "monthly" ? "selected" : ""}`}>
                    <input
                        type="radio"
                        name="frequency"
                        value="monthly"
                        checked={frequency === "monthly"}
                        onChange={() => setFrequency("monthly")}
                    />
                    <span>Je donne tous les mois</span>
                </label>
            </div>

            {/* Amount buttons */}
            <div className="amount-options">
                {amounts.map((item) => (
                    <button
                        key={item.value}
                        className={`amount-btn ${selectedButton === item.value ? "selected" : ""}`}
                        onClick={() => {
                            setSelectedButton(item.value);
                            setCustomAmount(""); 
                        }}
                        type="button"
                    >
                        {item.value} €
                    </button>
                ))}
            </div>

            {/* Custom amount */}
            <div className="custom-amount-wrapper">
                <input
                    type="number"
                    className="custom-amount"
                    placeholder="Montant libre"
                    value={customAmount}
                    onChange={handleAmountChange}
                    min={1}
                />
                <span className="euro-symbol">€</span>
            </div>

            <div className="tax-info">
                Soit <span className="tax-amount">{taxFree} €</span> après déduction fiscale
            </div>

            <button className="donate-btn">Je donne</button>
            <p>Je deviens bénévole</p>
            
        </div>
    );
};

export default DonationForm;
