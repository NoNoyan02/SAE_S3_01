import React from 'react';

export default function BenevolatSkillsSection() {
    return (
        <div id="competences-benevolat">
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .skills-wrapper {
                    margin-bottom: 64px;
                    padding-left: 24px;
                    padding-right: 24px;
                    transition: background-size 0.2s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                @media (min-width: 1100px) {
                    .skills-wrapper {
                        margin-bottom: 88px;
                        padding-left: 64px;
                        padding-right: 64px;
                    }
                }

                .skills-wrapper .skills-container {
                    padding: 0;
                }

                .skills-container {
                    width: 100%;
                    max-width: 1170px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 24px;
                }

                @media (min-width: 1100px) {
                    .skills-container {
                        padding: 0;
                    }
                }

                .skills-container--narrow {
                    max-width: 312px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                }

                @media (min-width: 700px) and (max-width: 1099px) {
                    .skills-container--narrow {
                        padding: 0 24px;
                    }
                }

                @media (min-width: 700px) {
                    .skills-container--narrow {
                        max-width: 970px;
                    }
                }

                .skills-richtext {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                }

                @media (max-width: 699px) {
                    .skills-richtext {
                        font-size: 1.4rem;
                        line-height: 1.5;
                    }
                }

                @media (min-width: 700px) {
                    .skills-richtext {
                        gap: 32px;
                        line-height: 1.45;
                    }
                }

                .skills-richtext > p {
                    width: 100%;
                    margin: 0;
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <section className="skills-wrapper" anchor="competences-benevolat">
                <div className="skills-container"></div>
                <div className="skills-container skills-container--narrow">
                    <div className="skills-richtext">
                        <p>Faire du bénévolat dans une association est une excellente opportunité <strong>pour mettre
                            vos compétences et votre expérience professionnelle à la disposition des plus
                            démunis.</strong> La valorisation des compétences en bénévolat associatif trouve sa source
                            dans de multiples offres de missions.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}