
import React from 'react';

const montants = {
    unefois: [90, 130, 150, 200],
    touslesmois: [10, 20, 30, 50]
};

const FormulaireDon = ({
    className = "",
    modePaiement,
    handleModeChange,
    montantSelectionne,
    handleMontantClick,
    montantLibre,
    handleMontantLibreChange
}) => (
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
                        onChange={() => {}}
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
                        onChange={() => {}}
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

export default FormulaireDon;
