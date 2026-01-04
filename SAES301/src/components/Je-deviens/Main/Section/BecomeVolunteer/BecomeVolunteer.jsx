import React from "react";

export default function BecomeVolunteer() {
    return (
        <section
            className="block-content-richtext__wrapper"
            id="Je-deviens-benevole-a-la-Croix-Rouge"
        >
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .block-content-richtext__wrapper {
                    margin-bottom: 88px;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                .full-rich-text {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                    grid-gap: 24px;
                }

                .full-rich-text > p {
                    width: 100%;
                    margin: 0;
                }

                /* Container Shrink */
                .container--shrink {
                    max-width: 312px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                }

                @media (min-width: 700px) and (max-width: 1099px) {
                    .container--shrink {
                        padding: 0 24px;
                    }
                }

                @media (min-width: 700px) {
                    .container--shrink {
                        max-width: 970px;
                    }
                }

                /* Section Head */
                .section-head {
                    margin-bottom: 3rem;
                }

                .section-head--center {
                    text-align: center;
                }

                .section-head__title {
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                    color: #000;
                }

                .section-head__mark {
                    padding: 2px 8px;
                    border-radius: 2px;
                    color: #fff;
                    background-color: #e3001b;
                    -webkit-box-decoration-break: clone;
                    box-decoration-break: clone;
                    line-height: 1.5;
                }

                .section-head--secondary .section-head__mark {
                    background-color: #075c68;
                }

                /* Responsive Text & Layout */
                @media (max-width: 699px) {
                    .full-rich-text {
                        font-size: 1.4rem;
                        line-height: 1.5;
                    }

                    .section-head {
                        text-align: center;
                    }
                }

                @media (min-width: 700px) {
                    .full-rich-text {
                        gap: 32px;
                        grid-gap: 32px;
                        line-height: 1.45;
                    }

                    .section-head__title {
                        font-size: 2.4rem;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <div className="block-content-richtext__container">
                <header className="section-head section-head--center section-head--secondary section-head--medium">
                    <div>
                        <h2 className="section-head__title">
                            Envie de rejoindre notre{" "}
                            <span className="section-head__mark">communauté</span> ?
                        </h2>
                    </div>
                </header>
            </div>

            <div className="block-content-richtext__container container--shrink">
                <div className="full-rich-text">
                    <p>
                        Nous vous proposons plus d'une centaine de missions bénévoles. Et
                        il y en a forcément une qui vous correspond,{" "}
                        <strong>près de chez vous</strong> ! Vous engager à nos côtés, c'est
                        rejoindre une association de plus 70 000 bénévoles partageant les
                        mêmes principes et valeurs de solidarité et d’humanité.{" "}
                        <strong>
                            Mais c'est avant tout pouvoir être utile localement en agissant
                            dans un cadre clair et sécurisant.
                        </strong>
                    </p>

                    <p>
                        Quelle que soit votre envie d’agir, <strong>ponctuelle ou plus régulière</strong>, nous vous
                        proposons{" "}
                        <strong>un engagement sur-mesure</strong> car le plus important
                        pour nous est de trouver ensemble l’activité qui vous convienne, nous
                        pourrons ensuite la faire évoluer.{" "}
                        <strong>
                            Chaque bénévole bénéficie d’un accompagnement tout au long de son
                            engagement
                        </strong>{" "}
                        pour lui permettre d’acquérir des compétences, prendre des
                        responsabilités opérationnelles, ou encore s’investir dans la
                        gouvernance de l’association. Tous ces acquis de votre expérience
                        bénévole pourront aussi vous servir en dehors, à titre personnel ou
                        professionnel.
                    </p>
                </div>
            </div>
        </section>
    );
}