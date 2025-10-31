import React from 'react';
import './VolunteerRecruitmentSection.css';

const VolunteerRecruitmentSection = () => {
    return (
        <section className="volunteer-section">
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