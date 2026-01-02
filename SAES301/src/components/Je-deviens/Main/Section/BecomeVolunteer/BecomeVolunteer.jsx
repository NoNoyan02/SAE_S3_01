import React from "react";
import "./BecomeVolunteer.css";

export default function BecomeVolunteer() {
    return (
        <section
            className="block-content-richtext__wrapper"
            id="Je-deviens-benevole-a-la-Croix-Rouge"
        >
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
