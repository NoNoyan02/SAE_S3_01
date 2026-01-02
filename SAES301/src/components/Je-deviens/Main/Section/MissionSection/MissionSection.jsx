import React from 'react';

const MissionSection = () => {
    return (
        <section className="mission-section">
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .mission-section {
                    box-sizing: border-box;
                    margin-bottom: 88px;
                    padding-left: 64px;
                    padding-right: 64px;
                    transition: background-size 0.2s ease-out;
                    color: rgb(16, 16, 16);
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    font-size: 16px;
                    line-height: 22.4px;
                    background-color: rgb(255, 255, 255);
                }

                .mission-container {
                    box-sizing: border-box;
                    margin-left: auto;
                    margin-right: auto;
                    max-width: 1170px;
                    width: 100%;
                }

                .mission-layout {
                    box-sizing: border-box;
                    align-items: center;
                    display: flex;
                    flex-direction: row;
                    font-size: 16px;
                    justify-content: center;
                }

                .mission-text-block {
                    box-sizing: border-box;
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                }

                .mission-heading {
                    box-sizing: border-box;
                    font-weight: 700;
                    margin: 0 0 24px;
                    font-size: 24px;
                    line-height: 28.8px;
                    max-width: 536px;
                }

                .mission-description {
                    box-sizing: border-box;
                    gap: 32px;
                    display: flex;
                    flex-wrap: wrap;
                    font-size: 16px;
                    line-height: 23.2px;
                }

                .mission-paragraph {
                    box-sizing: border-box;
                    margin: 0;
                    max-width: 536px;
                }

                .mission-link {
                    box-sizing: border-box;
                    color: rgb(227, 0, 27);
                    transition: 0.2s linear;
                    text-decoration: underline;
                }

                .mission-link:hover {
                    color: rgb(200, 0, 24);
                }

                .mission-button-wrapper {
                    box-sizing: border-box;
                    margin: 0;
                }

                .mission-button {
                    box-sizing: border-box;
                    color: rgb(255, 255, 255);
                    transition: 0.2s ease-in-out;
                    align-items: center;
                    appearance: none;
                    gap: 8px;
                    cursor: pointer;
                    display: inline-flex;
                    font-weight: 600;
                    justify-content: center;
                    line-height: 14px;
                    max-width: 100%;
                    min-height: 50px;
                    overflow: hidden;
                    padding: 2px 24px;
                    position: relative;
                    text-align: center;
                    text-decoration: none;
                    vertical-align: middle;
                    border-radius: 4px;
                    min-width: 140px;
                    background-color: rgb(227, 0, 27);
                    font-size: 14px;
                    margin-top: 24px;
                }

                .mission-button:hover {
                    background-color: rgb(200, 0, 24);
                }

                .mission-image {
                    box-sizing: border-box;
                    height: 400px;
                    vertical-align: middle;
                    max-width: 50%;
                    object-fit: cover;
                    margin-left: 64px;
                    min-width: auto;
                    width: 570px;
                }

                /* Responsive */
                @media (max-width: 1024px) {
                    .mission-layout {
                        flex-direction: column;
                        gap: 32px;
                    }

                    .mission-image {
                        margin-left: 0;
                        max-width: 100%;
                        width: 100%;
                    }

                    .mission-heading,
                    .mission-paragraph {
                        max-width: 100%;
                    }
                }

                @media (max-width: 768px) {
                    .mission-section {
                        padding-left: 24px;
                        padding-right: 24px;
                        margin-bottom: 48px;
                    }

                    .mission-heading {
                        font-size: 20px;
                        line-height: 24px;
                    }

                    .mission-button {
                        width: 100%;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <div className="mission-container">
                <div className="mission-layout">
                    <div className="mission-text-block">
                        <h2 className="mission-heading">
                            Des missions bénévoles pour vous réaliser
                        </h2>
                        <div className="mission-description">
                            <p className="mission-paragraph">
                                Les bénévoles de la Croix-Rouge française agissent pour prévenir et
                                apaiser les souffrances humaines. Parmi{' '}
                                <a href="/quelle-mission-est-faite-pour-vous" className="mission-link">
                                    toutes les missions bénévoles
                                </a>{' '}
                                proposées par nos structures, il y en a forcément une pour vous.
                                Rejoignez-nous et mettez vos talents au service d'une belle cause. A
                                nos côtés vous apprendrez, vous serez formé et accompagné dans vos
                                activités bénévoles et vos projets.
                            </p>
                        </div>
                        <p className="mission-button-wrapper">
                            <a
                                href="https://www.croix-rouge.fr/trouver-une-mission-benevole"
                                className="mission-button"
                            >
                                Je trouve une mission
                            </a>
                        </p>
                    </div>
                    <img
                        src="https://images.ctfassets.net/ksb78y40v1oe/3tGea9FIguXZzRx8hS0JDq/1d438a62b6908f86dd655ce9ef24aae1/Page_carrefour_Don_patrimoine.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                        alt="Bénévole de la Croix-Rouge"
                        loading="lazy"
                        className="mission-image"
                    />
                </div>
            </div>
        </section>
    );
};

export default MissionSection;