import React, { useState } from 'react';

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
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .newsletter-section-wrapper {
                    width: 100%;
                    padding: 20px;
                    margin-bottom: 50px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .newsletter-section-container {
                    background-color: #e6eff0;
                    border-radius: 8px;
                    padding: 32px 40px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .newsletter-section-content {
                    display: flex;
                    align-items: center;
                    gap: 40px;
                    flex-wrap: wrap;
                }

                .newsletter-section-left {
                    flex: 0 0 auto;
                    min-width: 280px;
                }

                .newsletter-section-title {
                    font-size: 18px;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                    color: #000;
                    line-height: 1.3;
                }

                .newsletter-section-subtitle {
                    font-size: 14px;
                    font-weight: 400;
                    margin: 0;
                    color: #000;
                    line-height: 1.4;
                }

                .newsletter-section-right {
                    flex: 1;
                    min-width: 320px;
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .newsletter-section-input-row {
                    display: flex;
                    gap: 0;
                    align-items: stretch;
                    background-color: transparent;
                    border-radius: 50px;
                    overflow: visible;
                    box-shadow: none;
                }

                .newsletter-section-email {
                    flex: 1;
                    min-height: 56px;
                    padding: 16px 24px;
                    border: none;
                    border-radius: 50px;
                    font-size: 16px;
                    font-family: inherit;
                    background-color: #fff;
                    outline: none;
                    color: #000;
                }

                .newsletter-section-email:focus {
                    outline: none;
                }

                .newsletter-section-email::placeholder {
                    color: #9e9e9e;
                    font-weight: 400;
                }

                .newsletter-section-btn {
                    min-width: 180px;
                    min-height: 56px;
                    padding: 16px 32px;
                    background-color: #e3001b;
                    color: #fff;
                    border: none;
                    border-radius: 50px;
                    font-size: 16px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background-color 0.2s ease-in-out;
                    font-family: inherit;
                    white-space: nowrap;
                    margin-left: -40px;
                    position: relative;
                    z-index: 1;
                }

                .newsletter-section-btn:hover {
                    background-color: #970b13;
                }

                .newsletter-section-checkboxes {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .newsletter-section-label {
                    display: flex;
                    align-items: flex-start;
                    gap: 8px;
                    cursor: pointer;
                }

                .newsletter-section-check {
                    margin-top: 2px;
                    cursor: pointer;
                    min-width: 16px;
                    min-height: 16px;
                    accent-color: #e3001b;
                    transition: transform 0.2s ease;
                }

                .newsletter-section-check:hover {
                    transform: scale(1.1);
                }

                .newsletter-section-label:hover .newsletter-section-check {
                    accent-color: #e3001b;
                }

                .newsletter-section-text {
                    font-size: 12px;
                    color: #000;
                    line-height: 1.4;
                }

                /* Responsive Mobile */
                @media (max-width: 768px) {
                    .newsletter-section-wrapper {
                        padding: 15px;
                    }

                    .newsletter-section-container {
                        padding: 24px 20px;
                    }

                    .newsletter-section-content {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 24px;
                    }

                    .newsletter-section-left {
                        min-width: 100%;
                        text-align: center;
                    }

                    .newsletter-section-title {
                        font-size: 20px;
                    }

                    .newsletter-section-subtitle {
                        font-size: 14px;
                    }

                    .newsletter-section-right {
                        min-width: 100%;
                    }

                    .newsletter-section-input-row {
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        gap: 12px;
                        border-radius: 50px;
                        background-color: transparent;
                        box-shadow: none;
                    }

                    .newsletter-section-email {
                        border-radius: 50px;
                        border: 1px solid #cdcdcd;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        padding-right: 24px;
                        margin-left: 0;
                    }

                    .newsletter-section-btn {
                        border-radius: 50px;
                        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                        margin-left: 0;
                        width: 200px;
                    }

                    .newsletter-section-email {
                        width: 100%;
                        min-width: 100%;
                    }
                }

                /* Responsive Tablet */
                @media (min-width: 769px) and (max-width: 1024px) {
                    .newsletter-section-container {
                        padding: 28px 32px;
                    }

                    .newsletter-section-content {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 24px;
                    }

                    .newsletter-section-left {
                        min-width: 100%;
                        text-align: center;
                    }

                    .newsletter-section-right {
                        min-width: 100%;
                    }

                    .newsletter-section-input-row {
                        flex-direction: row;
                        gap: 0;
                    }

                    .newsletter-section-email {
                        border-radius: 50px;
                        padding-right: 50px;
                    }

                    .newsletter-section-btn {
                        border-radius: 50px;
                        min-width: 200px;
                        margin-left: -40px;
                    }
                }

                /* Responsive Large Desktop */
                @media (min-width: 1400px) {
                    .newsletter-section-container {
                        padding: 40px 60px;
                    }

                    .newsletter-section-title {
                        font-size: 20px;
                    }

                    .newsletter-section-subtitle {
                        font-size: 15px;
                    }

                    .newsletter-section-email {
                        font-size: 15px;
                    }

                    .newsletter-section-btn {
                        font-size: 15px;
                    }

                    .newsletter-section-text {
                        font-size: 13px;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

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