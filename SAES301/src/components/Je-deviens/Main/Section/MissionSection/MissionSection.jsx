import React from 'react';
import './MissionSection.css';

const MissionSection = () => {
    return (
        <section className="mission-section">
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