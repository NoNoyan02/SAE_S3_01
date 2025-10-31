import React from "react";
import "./InternationalMissions.css";

export default function InternationalMissions() {
    return (
        <section
            className="block-content-simple__wrapper"
            id="des-missions-benevoles-a-linternational"
        >
            <div className="block-content-simple__container">
                <div className="block-content-simple block-content-simple--img-left">
                    <div className="block-content-simple__texts">
                        <h2 className="block-content-simple__title">
                            Des missions bénévoles à l'international
                        </h2>
                        <div className="full-rich-text">
                            <p>
                                Déployées une soixantaine de fois depuis leur création, les ERU
                                (Équipes de Réponse aux Urgences) sont intervenues dans des
                                contextes aussi différents que des tremblements de terre, des
                                inondations, des épidémies ou encore des déplacements de
                                population. Les hommes et les femmes qui constituent ces équipes
                                de techniciens volontaires ont tous suivi une formation
                                spécifique et sont dotés d’équipements standards conditionnés
                                et prêts à l’expédition.
                            </p>
                        </div>
                        <p>
                            <a
                                href="/nos-actions-a-l-international/les-equipes-de-reponses-aux-urgences-humanitaires"
                                className="btn block-content-simple__btn btn--plain btn--color-primary btn--medium"
                            >
                                Je me renseigne
                            </a>
                        </p>
                    </div>

                    <img
                        src="https://images.ctfassets.net/ksb78y40v1oe/7lYZ2bRJLWL64bsnqBgo6T/17e13d266291fa080f20c635ca345339/p-HTI2371_ERU_Marko_Kokic-Canadian_Red_Cross-IFRC_700x450.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                        alt="Équipes de Réponse aux Urgences"
                        className="block-content-simple__img block-content-simple__img--left"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
}
