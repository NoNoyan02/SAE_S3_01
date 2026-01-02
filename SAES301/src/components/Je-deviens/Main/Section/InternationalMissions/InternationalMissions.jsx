import React from "react";

export default function InternationalMissions() {
    return (
        <section
            className="block-content-simple__wrapper"
            id="des-missions-benevoles-a-linternational"
        >
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                /* Wrapper général */
                .block-content-simple__wrapper {
                    margin-bottom: 64px;
                    padding: 0 24px;
                    transition: background-size 0.2s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                @media (min-width: 1100px) {
                    .block-content-simple__wrapper {
                        margin-bottom: 88px;
                        padding: 0 64px;
                    }
                }

                /* Container central */
                .block-content-simple__container {
                    width: 100%;
                    max-width: 1170px;
                    margin: 0 auto;
                    padding: 24px;
                }

                @media (min-width: 1100px) {
                    .block-content-simple__container {
                        padding: 0;
                    }
                }

                /* Bloc contenu */
                .block-content-simple {
                    display: flex;
                    flex-direction: column-reverse;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.4rem;
                }

                @media (min-width: 700px) {
                    .block-content-simple {
                        flex-direction: row;
                        font-size: medium;
                    }
                }

                .block-content-simple--img-left {
                    flex-direction: column-reverse;
                }

                @media (min-width: 700px) {
                    .block-content-simple--img-left {
                        flex-direction: row-reverse;
                    }
                }

                .block-content-simple__texts {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .block-content-simple__title {
                    width: 100%;
                    font-size: 2rem;
                    line-height: 1.2;
                    font-weight: 700;
                    margin-bottom: 16px;
                    margin-top: 0;
                }

                @media (min-width: 700px) {
                    .block-content-simple__title {
                        font-size: 2.4rem;
                        margin-bottom: 24px;
                    }
                }

                .full-rich-text {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 24px;
                }

                @media (max-width: 699px) {
                    .full-rich-text {
                        font-size: 1.4rem;
                        line-height: 1.5;
                    }
                }

                @media (min-width: 700px) {
                    .full-rich-text {
                        gap: 32px;
                        line-height: 1.45;
                    }
                }

                .full-rich-text > p {
                    width: 100%;
                    margin: 0;
                }

                .block-content-simple__btn {
                    margin-top: 16px;
                }

                @media (min-width: 700px) {
                    .block-content-simple__btn {
                        margin-top: 24px;
                    }
                }

                .block-content-simple__img {
                    object-fit: cover;
                }

                @media (max-width: 699px) {
                    .block-content-simple__img {
                        height: 220px;
                        margin-bottom: 32px;
                    }
                }

                @media (min-width: 700px) {
                    .block-content-simple__img {
                        max-width: 50%;
                        min-width: 50%;
                        margin-left: 64px;
                    }
                }

                @media (min-width: 1100px) {
                    .block-content-simple__img {
                        width: 570px;
                        height: 400px;
                    }
                }

                .block-content-simple__img--left {
                    margin-right: 0;
                }

                @media (min-width: 700px) {
                    .block-content-simple__img--left {
                        margin-right: 64px;
                        margin-left: 0;
                    }
                }

                /* Boutons */
                .btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    min-height: 24px;
                    padding: 2px;
                    font-weight: 600;
                    text-decoration: none !important;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                }

                .btn--plain {
                    min-width: 140px;
                    min-height: 50px;
                    border-radius: 4px;
                    padding: 0 12px;
                    color: #fff;
                    background-color: #000;
                }

                .btn--plain:hover,
                .btn--plain:focus {
                    background-color: #767676;
                }

                .btn--color-primary.btn--plain {
                    background-color: #e3001b;
                }

                .btn--color-primary.btn--plain:hover,
                .btn--color-primary.btn--plain:focus {
                    background-color: #970b13;
                }

                .btn--medium {
                    font-size: 1.4rem;
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

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