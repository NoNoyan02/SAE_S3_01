import React, { useState } from 'react';
import './NewsletterSection.css';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [acceptConditions, setAcceptConditions] = useState(false);
    const [acceptEntreprise, setAcceptEntreprise] = useState(false);

    const handleSubmit = () => {
        console.log('Newsletter subscription:', { email, acceptConditions, acceptEntreprise });
        alert(`Merci !`);
    };

    return (
        <div className="newsletter-section-wrapper">
            <div className="newsletter-section-container">
                <div className="newsletter-section-content">
                    <div className="newsletter-section-left">
                        <h2 className="newsletter-section-title">Abonnez-vous à notre newsletter</h2>
                        <p className="newsletter-section-subtitle">Recevez l'actualité de nos missions</p>
                    </div>

                    <div className="newsletter-section-right">
                        <div className="newsletter-section-input-row">
                            <input
                                type="email"
                                placeholder="E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="newsletter-section-email"
                            />
                            <button onClick={handleSubmit} className="newsletter-section-btn">
                                Je m'abonne
                            </button>
                        </div>

                        <div className="newsletter-section-checkboxes">
                            <label className="newsletter-section-label">
                                <input
                                    type="checkbox"
                                    checked={acceptConditions}
                                    onChange={(e) => setAcceptConditions(e.target.checked)}
                                    className="newsletter-section-check"
                                />
                                <span className="newsletter-section-text">
                                    J'accepte les conditions générales et souhaite m'abonner.
                                </span>
                            </label>

                            <label className="newsletter-section-label">
                                <input
                                    type="checkbox"
                                    checked={acceptEntreprise}
                                    onChange={(e) => setAcceptEntreprise(e.target.checked)}
                                    className="newsletter-section-check"
                                />
                                <span className="newsletter-section-text">
                                    Je souhaite également recevoir l'actualité à destination des entreprises.
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsletterSection;