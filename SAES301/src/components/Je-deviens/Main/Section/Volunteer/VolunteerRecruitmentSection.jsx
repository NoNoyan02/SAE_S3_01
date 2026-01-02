import React from 'react';

const VolunteerRecruitmentSection = () => {
    return (
        <section className="volunteer-section">
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .volunteer-section {
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

                .volunteer-wrapper {
                    box-sizing: border-box;
                }

                .volunteer-header {
                    box-sizing: border-box;
                    margin-bottom: 30px;
                    text-align: center;
                }

                .volunteer-header-inner {
                    box-sizing: border-box;
                }

                .volunteer-title {
                    box-sizing: border-box;
                    font-weight: 700;
                    margin: 0 0 10px;
                    font-size: 24px;
                    line-height: 28.8px;
                }

                .volunteer-content-wrapper {
                    box-sizing: border-box;
                    margin-left: auto;
                    margin-right: auto;
                    max-width: 970px;
                    width: 100%;
                }

                .volunteer-content {
                    box-sizing: border-box;
                    gap: 32px;
                    display: flex;
                    flex-wrap: wrap;
                    font-size: 16px;
                    line-height: 23.2px;
                }

                .volunteer-item {
                    box-sizing: border-box;
                    display: flex;
                    align-items: flex-start;
                    gap: 16px;
                    width: 100%;
                }

                .bullet-point {
                    box-sizing: border-box;
                    flex-shrink: 0;
                    width: 8px;
                    height: 8px;
                    background-color: rgb(16, 16, 16);
                    border-radius: 50%;
                    margin-top: 8px;
                }

                .volunteer-paragraph {
                    box-sizing: border-box;
                    margin: 0;
                    flex: 1;
                }

                .volunteer-strong {
                    box-sizing: border-box;
                    font-weight: 700;
                }

                .volunteer-button-wrapper {
                    box-sizing: border-box;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                .volunteer-button {
                    box-sizing: border-box;
                    color: rgb(255, 255, 255);
                    transition: 0.2s ease-in-out;
                    align-items: center;
                    appearance: none;
                    gap: 8px;
                    cursor: pointer;
                    display: flex;
                    font-weight: 600;
                    justify-content: center;
                    line-height: 14px;
                    max-width: 100%;
                    min-height: 32px;
                    overflow: hidden;
                    padding: 12px 24px; /* Ajusté pour correspondre à un bouton standard */
                    position: relative;
                    text-align: center;
                    text-decoration: none;
                    vertical-align: middle;
                    border-radius: 4px;
                    min-width: 140px;
                    background-color: rgb(227, 0, 27);
                    font-size: 14px;
                }

                .volunteer-button:hover {
                    background-color: rgb(200, 0, 24);
                }

                @media (max-width: 768px) {
                    .volunteer-section {
                        padding-left: 24px;
                        padding-right: 24px;
                        margin-bottom: 48px;
                    }

                    .volunteer-content-wrapper {
                        max-width: 100%;
                    }

                    .volunteer-button {
                        width: 100%;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <div className="volunteer-wrapper">
                <header className="volunteer-header">
                    <div className="volunteer-header-inner">
                        <h2 className="volunteer-title">
                            Pourquoi devenir bénévole à la Croix-Rouge ?
                        </h2>
                    </div>
                </header>
            </div>
            <div className="volunteer-content-wrapper">
                <div className="volunteer-content">
                    <div className="volunteer-item">
                        <div className="bullet-point"></div>
                        <p className="volunteer-paragraph">
                            Vous avez envie de vous sentir utile ? Vous voulez aider les personnes
                            vulnérables ? Vous souhaitez mener en équipe des projets solidaires
                            valorisants ?
                        </p>
                    </div>

                    <div className="volunteer-item">
                        <div className="bullet-point"></div>
                        <p className="volunteer-paragraph">
                            Autant de bonnes raisons de rejoindre les 60 000 bénévoles de la
                            Croix-Rouge française !
                        </p>
                    </div>

                    <div className="volunteer-item">
                        <div className="bullet-point"></div>
                        <p className="volunteer-paragraph">
                            <strong className="volunteer-strong">
                                Formateur aux gestes qui sauvent, maraudeur à la rencontre des
                                personnes sans-abri, secouriste, animateur jeunesse
                            </strong>
                            …, il y a forcément une mission de bénévolat pour vous.
                        </p>
                    </div>

                    <div className="volunteer-item">
                        <div className="bullet-point"></div>
                        <p className="volunteer-paragraph">
                            Devenir bénévole, c'est tout simple : selon vos disponibilités, nous
                            trouvons près de chez vous la mission qui vous correspond, et nous vous
                            formerons en quelques jours.
                        </p>
                    </div>

                    <div className="volunteer-button-wrapper">
                        <a href="/trouver-une-mission-benevole" className="volunteer-button">
                            On vous attend !
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VolunteerRecruitmentSection;