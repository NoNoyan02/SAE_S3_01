import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .footer {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                /* ==================== HOTLINE SECTION ==================== */
                .hotline {
                    display: flex;
                    flex-direction: column;
                    padding: 24px 16px;
                    background: #e6eff0;
                }

                @media (min-width: 768px) {
                    .hotline {
                        padding: 32px 32px;
                    }
                }

                @media (min-width: 1100px) {
                    .hotline {
                        padding: 32px 32px 48px;
                    }
                }

                .hotline__container {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    gap: 24px;
                    width: 100%;
                    max-width: 970px;
                    margin-left: auto;
                    margin-right: auto;
                }

                @media (min-width: 1100px) {
                    .hotline__container {
                        flex-direction: row;
                    }
                }

                .hotline__title {
                    text-align: center;
                    font-size: 1.4rem;
                    font-weight: 600;
                }

                @media (min-width: 768px) {
                    .hotline__title {
                        font-size: 1.6rem;
                    }
                }

                @media (min-width: 1100px) {
                    .hotline__title {
                        flex: 2;
                        text-align: left;
                        font-size: 1.8rem;
                        max-width: 376px;
                    }
                }

                .hotline__title p {
                    margin: 0;
                    line-height: 1.4;
                }

                .hotline__description {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                }

                @media (min-width: 1100px) {
                    .hotline__description {
                        flex: 1;
                        flex-direction: row;
                        align-items: flex-end;
                        width: auto;
                    }
                }

                .hotline__infos {
                    position: relative;
                    padding: 16px 24px 32px;
                    text-align: center;
                    border-radius: 25px;
                    background: #fff;
                    width: 100%;
                    max-width: 400px;
                }

                @media (min-width: 768px) {
                    .hotline__infos {
                        padding: 16px 48px 32px;
                    }
                }

                @media (min-width: 1100px) {
                    .hotline__infos {
                        min-width: 400px;
                        padding: 16px 80px 16px 32px;
                        text-align: left;
                        border-radius: 100px;
                    }
                }

                .hotline__label {
                    font-size: 1.4rem;
                    font-weight: 500;
                }

                @media (min-width: 768px) {
                    .hotline__label {
                        font-size: 1.8rem;
                    }
                }

                @media (min-width: 1100px) {
                    .hotline__label {
                        font-weight: 600;
                    }
                }

                .hotline__mention {
                    color: #767676;
                    font-size: 0.9rem;
                    margin: 4px 0 0 0;
                }

                @media (min-width: 768px) {
                    .hotline__mention {
                        font-size: 1rem;
                    }
                }

                .hotline__cta {
                    margin-top: -20px;
                }

                @media (min-width: 1100px) {
                    .hotline__cta {
                        margin-left: -48px;
                        margin-bottom: -16px;
                        margin-top: 0;
                    }
                }

                .hotline__phone {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    min-width: 200px;
                    min-height: 50px;
                    padding: 2px 24px;
                    font-size: 16px;
                    font-weight: 600;
                    color: #fff;
                    background-color: #e3001b;
                    border-radius: 100px;
                    text-decoration: none;
                    transition: background-color 0.2s ease-in-out;
                }

                @media (min-width: 768px) {
                    .hotline__phone {
                        min-width: 230px;
                        font-size: 18px;
                    }
                }

                .hotline__phone:hover {
                    background-color: #970b13;
                }

                /* ==================== FOOTER MAIN ==================== */
                .footer__main {
                    border-top: 1px solid #cdcdcd;
                    padding: 32px 16px 24px;
                }

                @media (min-width: 768px) {
                    .footer__main {
                        padding: 40px 32px 32px;
                    }
                }

                @media (min-width: 1100px) {
                    .footer__main {
                        padding: 48px 64px 32px;
                    }
                }

                .footer__groups {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid #cdcdcd;
                    padding-bottom: 32px;
                    gap: 32px;
                }

                @media (min-width: 1100px) {
                    .footer__groups {
                        flex-direction: row;
                        gap: 0;
                    }
                }

                .footer__group--big {
                    display: flex;
                    flex-direction: column;
                    gap: 32px;
                }

                @media (min-width: 768px) {
                    .footer__group--big {
                        flex-direction: row;
                        flex-wrap: wrap;
                    }
                }

                @media (min-width: 1100px) {
                    .footer__group--big {
                        flex: 3;
                        justify-content: space-evenly;
                        flex-wrap: nowrap;
                    }
                }

                .footer__col {
                    flex: 1;
                    padding: 0;
                    border-right: none;
                }

                @media (min-width: 768px) {
                    .footer__col {
                        min-width: 200px;
                    }
                }

                @media (min-width: 1100px) {
                    .footer__col {
                        padding: 0 50px;
                        border-right: 1px solid #cdcdcd;
                        min-width: auto;
                    }

                    .footer__col:first-child {
                        padding-left: 0;
                    }

                    .footer__col:last-child {
                        border-right: none;
                    }
                }

                .footer__col-title {
                    display: flex;
                    align-items: center;
                    font-size: 1.4rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                }

                @media (min-width: 768px) {
                    .footer__col-title {
                        font-size: 1.6rem;
                    }
                }

                .footer__col-links {
                    margin-top: 2px;
                    list-style: none;
                    padding: 0;
                }

                .footer__col-links li {
                    margin: 0;
                }

                .footer__link {
                    display: block;
                    margin-top: 12px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #767676;
                    text-decoration: none;
                    transition: color 0.2s linear;
                }

                @media (min-width: 768px) {
                    .footer__link {
                        margin-top: 16px;
                    }
                }

                .footer__link:hover {
                    color: #e3001b;
                }

                /* ==================== NEWSLETTER / SOCIAL SECTION ==================== */
                .footer__newsletter {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-left: 0;
                    width: 100%;
                }

                @media (min-width: 1100px) {
                    .footer__newsletter {
                        display: block;
                        padding-left: 50px;
                        width: 20%;
                        align-items: flex-start;
                    }
                }

                .social-medias {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                @media (min-width: 1100px) {
                    .social-medias {
                        justify-content: flex-start;
                    }
                }

                .social-medias__list {
                    display: flex;
                    gap: 4px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    flex-wrap: wrap;
                    justify-content: center;
                }

                @media (min-width: 1100px) {
                    .social-medias__list {
                        justify-content: flex-start;
                    }
                }

                .social-link {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2px;
                    color: #e3001b;
                    text-decoration: none;
                    transition: color 0.2s linear;
                }

                .social-link:hover {
                    color: #970b13;
                }

                .footer__label {
                    margin-top: 32px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                }

                @media (min-width: 1100px) {
                    .footer__label {
                        margin-top: 50px;
                    }
                }

                .footer__label-title {
                    font-size: 12px;
                    font-weight: 600;
                    margin: 0 0 12px 0;
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .footer__label-title {
                        font-size: 14px;
                    }
                }

                .footer__label-image {
                    max-width: 120px;
                    height: auto;
                    display: block;
                }

                @media (min-width: 768px) {
                    .footer__label-image {
                        max-width: 150px;
                    }
                }

                /* ==================== LEGAL LINKS ==================== */
                .footer__legal {
                    margin-top: 24px;
                    text-align: center;
                    list-style: none;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px 0;
                }

                @media (min-width: 768px) {
                    .footer__legal {
                        margin-top: 32px;
                    }
                }

                .footer__legal-link {
                    display: inline-flex;
                    align-items: center;
                    font-size: 12px;
                    color: #000;
                }

                @media (min-width: 768px) {
                    .footer__legal-link {
                        font-size: 14px;
                        margin-bottom: 0;
                    }
                }

                .footer__legal-link:not(:last-child)::after {
                    content: "|";
                    margin: 0 8px;
                    color: #000;
                }

                .footer__legal-link a {
                    padding: 8px 2px;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 400;
                    color: #000;
                    transition: color 0.2s linear;
                }

                @media (min-width: 768px) {
                    .footer__legal-link a {
                        font-size: 14px;
                    }
                }

                .footer__legal-link a:hover {
                    color: #e3001b;
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            {/* Section hotline */}
            <div className="hotline">
                <div className="hotline__container">
                    <div className="hotline__title">
                        <p>Une question ?</p>
                        <p>Nous sommes là pour y répondre</p>
                    </div>
                    <div className="hotline__description">
                        <div className="hotline__infos">
                            <span className="hotline__label">Contactez-nous</span>
                            <p className="hotline__mention">Du lundi au vendredi de 8h30 à 18h30</p>
                        </div>
                        <div className="hotline__cta">
                            <a href="tel:0144431300" className="hotline__phone">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.218 10.924a13.419 13.419 0 0 0 5.858 5.858l1.955-1.955a.892.892 0 0 1 .907-.223c.995.33 2.062.507 3.173.507A.889.889 0 0 1 20 16v3.111a.889.889 0 0 1-.889.889A15.111 15.111 0 0 1 4 4.889.889.889 0 0 1 4.889 4H8a.889.889 0 0 1 .889.889c0 1.111.178 2.178.507 3.173a.892.892 0 0 1-.223.907l-1.955 1.955Z"
                                        fill="currentColor"></path>
                                </svg>
                                01 44 43 13 00
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section principale du footer */}
            <div className="footer__main">
                <div className="footer__groups">
                    <div className="footer__group--big">
                        {/* Colonne Découvrir */}
                        <div className="footer__col">
                            <p className="footer__col-title">
                                <strong>Découvrir</strong>
                            </p>
                            <ul className="footer__col-links">
                                <li><a href="/notre-mouvement-international" className="footer__link">Notre mouvement
                                    international</a></li>
                                <li><a href="/notre-organisation-et-son-fonctionnement" className="footer__link">Notre
                                    organisation et son fonctionnement</a></li>
                                <li><a href="/notre-histoire" className="footer__link">Notre histoire et nos
                                    archives</a></li>
                                <li><a href="/nos-actions-a-l-international" className="footer__link">Nos actions à
                                    l'international</a></li>
                                <li><a href="/nos-actions-en-france" className="footer__link">Nos actions en France</a>
                                </li>
                                <li><a href="/croix-rouge-competence-formation" className="footer__link">Nos écoles de
                                    formation</a></li>
                                <li><a href="/nos-partenaires-institutionnels" className="footer__link">Nos partenaires
                                    institutionnels</a></li>
                                <li><a href="#" className="footer__link">Nos offres
                                    d'emploi</a></li>
                                <li><a href="/annuaire" className="footer__link">Nos adresses</a></li>
                            </ul>
                        </div>

                        {/* Colonne Mobiliser son entreprise */}
                        <div className="footer__col">
                            <p className="footer__col-title">
                                <strong>Mobiliser son entreprise</strong>
                            </p>
                            <ul className="footer__col-links">
                                <li><a href="/je-deviens-partenaire" className="footer__link">Devenir mécène</a></li>
                                <li><a href="/verser-sa-taxe-dapprentissage" className="footer__link">Verser la taxe
                                    d'apprentissage</a></li>
                                <li><a href="/croix-rouge-competence/entreprise" className="footer__link">Former ses
                                    collaborateurs</a></li>
                                <li><a href="/recruter-apprenti-stagiaire" className="footer__link">Recruter un
                                    apprenti</a></li>
                                <li><a href="/demande-poste-secours" className="footer__link">Demander un poste de
                                    secours</a></li>
                                <li><a href="/fournisseurs-et-appels-doffres" className="footer__link">Fournisseurs et
                                    appels d'offres</a></li>
                            </ul>
                        </div>

                        {/* Colonne S'informer et agir */}
                        <div className="footer__col">
                            <p className="footer__col-title">
                                <strong>S'informer et agir</strong>
                            </p>
                            <ul className="footer__col-links">
                                <li><a href="/je-donne" className="footer__link">Faire un don en ligne</a></li>
                                <li><a href="/je-deviens-benevole" className="footer__link">Devenir bénévole</a></li>
                                <li><a href="/formations" className="footer__link">Se former aux gestes de secours</a>
                                </li>
                                <li><a href="/actualite" className="footer__link">Nos actualités</a></li>
                                <li><a href="/dossiers" className="footer__link">Nos dossiers d'information</a></li>
                                <li><a href="/espace-presse" className="footer__link">Espace presse</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Section réseaux sociaux */}
                    <div className="footer__newsletter">
                        <div className="social-medias">
                            <ul className="social-medias__list">
                                <li><a href="#" className="social-link">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16 5.333c-5.867 0-10.667 4.809-10.667 10.731 0 5.355 3.904 9.8 9.003 10.603V19.17h-2.71v-3.106h2.71v-2.367c0-2.688 1.589-4.166 4.032-4.166 1.162 0 2.378.204 2.378.204v2.645h-1.344c-1.322 0-1.738.825-1.738 1.67v2.014h2.965l-.48 3.106h-2.485v7.497a10.655 10.655 0 0 0 6.453-3.63 10.735 10.735 0 0 0 2.55-6.973c0-5.922-4.8-10.73-10.667-10.73Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </a></li>
                                <li><a href="#" className="social-link">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M11.52 5.333h8.96a6.191 6.191 0 0 1 6.186 6.187v8.96a6.187 6.187 0 0 1-6.186 6.187h-8.96a6.191 6.191 0 0 1-6.187-6.187v-8.96a6.187 6.187 0 0 1 6.187-6.187Zm-.214 2.134a3.84 3.84 0 0 0-3.84 3.84v9.386a3.838 3.838 0 0 0 3.84 3.84h9.387a3.84 3.84 0 0 0 3.84-3.84v-9.386a3.838 3.838 0 0 0-3.84-3.84h-9.387Zm10.294 1.6a1.333 1.333 0 1 1 0 2.667 1.333 1.333 0 0 1 0-2.667Zm-5.6 1.6a5.333 5.333 0 1 1 0 10.666 5.333 5.333 0 0 1 0-10.666Zm0 2.133a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </a></li>
                                <li><a href="#" className="social-link">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m 6.1147508,6.0222916 c -0.1694339,0.022292 -0.155017,0.1040311 0.068498,0.4012625 0.1189651,0.1560466 0.2523482,0.3455315 0.2992116,0.4198395 0.046862,0.074307 0.1297874,0.1857695 0.1802553,0.2489311 0.050465,0.063162 0.118966,0.1523311 0.1478089,0.2006313 0.028833,0.044585 0.1261741,0.1857696 0.2162973,0.3083776 0.2523472,0.3455315 0.2992204,0.416124 0.3785311,0.531301 0.039655,0.059446 0.079312,0.1151775 0.090122,0.1263235 0.010813,0.01115 0.064894,0.085454 0.1189662,0.1671927 0.054068,0.081738 0.169434,0.2489313 0.259566,0.3715393 0.090124,0.1226075 0.191059,0.2637928 0.2235055,0.3158083 0.032448,0.052016 0.1045487,0.1449005 0.1550168,0.208062 0.050478,0.066876 0.1261742,0.1671929 0.1694429,0.2229236 0.1838508,0.2563621 0.7931052,1.107187 1.0778998,1.50845 0.169433,0.2415 0.3280543,0.456993 0.3532928,0.483001 0.025237,0.02601 0.198277,0.260078 0.38574,0.523871 0.811125,1.133195 1.60424,2.221805 1.889034,2.600776 0.08292,0.107745 0.30643,0.416123 0.497488,0.691062 0.194672,0.271224 0.36772,0.512725 0.389345,0.538733 0.01803,0.02229 0.194672,0.267508 0.392947,0.542446 0.194673,0.274939 0.374928,0.520155 0.396553,0.546163 0.07571,0.09289 0.03605,0.248931 -0.09733,0.401262 -0.07571,0.08173 -0.248744,0.27494 -0.389344,0.427271 -0.136988,0.152332 -0.421792,0.471856 -0.63088,0.702208 -0.209089,0.234071 -0.558778,0.620471 -0.778688,0.854541 -0.2199,0.237785 -0.479467,0.52387 -0.576798,0.635333 -0.241546,0.278654 -0.555184,0.624186 -0.904862,1.003156 -0.162236,0.174623 -0.338877,0.36411 -0.392949,0.42727 -0.05048,0.05945 -0.1946711,0.222923 -0.3172506,0.356678 -0.1189664,0.133753 -0.317242,0.349246 -0.4326037,0.483001 -0.1189662,0.130039 -0.3605017,0.397546 -0.540748,0.590747 -0.2739822,0.297232 -0.6092536,0.668769 -1.0634829,1.185209 -0.1442044,0.163479 -0.5371526,0.594465 -1.0670873,1.170351 -0.2775964,0.300944 -0.5263401,0.594462 -0.5515686,0.653908 l -0.043272,0.111462 0.2054937,0.0038 c 0.8543855,0.01487 1.0815043,0.0038 1.1860533,-0.05201 0.1045399,-0.05573 0.2271187,-0.182057 0.8976544,-0.936279 0.1982758,-0.222925 0.4109686,-0.456995 0.4686543,-0.520155 0.1009362,-0.100312 0.7354196,-0.809957 1.1355765,-1.263234 0.2811999,-0.315809 1.3771199,-1.534456 1.8565969,-2.062043 0.158621,-0.170908 0.410969,-0.449563 0.558777,-0.613041 0.14781,-0.163476 0.302825,-0.330669 0.342481,-0.371538 0.03966,-0.04458 0.151403,-0.167193 0.248744,-0.278653 0.09733,-0.111463 0.493884,-0.542449 0.879624,-0.958573 0.591224,-0.631617 0.717399,-0.750509 0.807532,-0.750509 0.108143,0 0.30643,0.252647 1.442005,1.853982 0.209098,0.29723 0.447028,0.624185 0.522735,0.728216 0.147798,0.196915 0.85799,1.188926 1.031036,1.437857 0.05407,0.08173 0.140591,0.189485 0.187464,0.245215 0.05047,0.05572 0.09012,0.111462 0.09012,0.122612 0,0.01487 0.09373,0.148615 0.209087,0.304662 0.111759,0.156047 0.245142,0.341816 0.295619,0.416125 0.05047,0.0706 0.115361,0.163476 0.147809,0.204345 0.06849,0.08545 0.255951,0.345532 1.081504,1.486157 0.320848,0.438415 0.627274,0.84711 0.684951,0.910271 l 0.10455,0.111459 2.750638,-0.01112 c 2.537936,-0.0074 2.750637,-0.01487 2.808314,-0.07432 0.05768,-0.05945 0.05768,-0.07432 -0.03605,-0.23407 -0.05407,-0.0966 -0.317243,-0.468142 -0.584008,-0.832249 -0.547963,-0.743078 -0.724616,-0.984577 -0.843581,-1.170349 -0.04687,-0.0706 -0.136986,-0.189484 -0.198276,-0.260077 -0.06489,-0.0706 -0.158621,-0.196915 -0.209087,-0.278653 -0.10095,-0.159762 -0.670537,-0.951142 -0.771482,-1.077466 -0.03605,-0.04086 -0.273982,-0.367823 -0.529934,-0.7245 -0.259567,-0.356678 -0.511914,-0.70964 -0.565995,-0.780233 -0.05408,-0.0706 -0.22711,-0.315809 -0.389345,-0.538732 -0.432602,-0.598183 -0.973348,-1.341263 -1.323037,-1.816833 -0.454238,-0.616755 -0.731825,-1.003155 -0.793105,-1.099755 -0.02884,-0.04458 -0.0685,-0.10403 -0.09014,-0.126324 -0.08292,-0.100336 -0.266767,-0.349267 -0.353295,-0.486735 -0.05407,-0.08174 -0.158622,-0.234071 -0.230715,-0.338101 -0.407375,-0.561025 -0.796719,-1.099757 -0.951737,-1.311535 -0.09733,-0.130039 -0.176642,-0.271223 -0.176642,-0.315807 0,-0.0483 0.183851,-0.274941 0.479469,-0.601894 0.558781,-0.613082 1.056278,-1.170389 1.323053,-1.482483 0.104537,-0.122607 0.30642,-0.349246 0.447021,-0.501578 0.1406,-0.152331 0.468654,-0.520156 0.724606,-0.817386 0.259565,-0.297233 0.48308,-0.55731 0.504705,-0.579602 0.05768,-0.06688 0.497498,-0.5461631 1.157221,-1.2595184 0.584015,-0.6353321 0.72821,-0.795094 1.402348,-1.541888 0.302828,-0.3381005 0.73543,-0.8025247 1.16443,-1.2558026 0.187465,-0.1969158 0.259565,-0.3009468 0.252346,-0.3566777 -0.01075,-0.074308 -0.02884,-0.078023 -0.641689,-0.089169 -0.432605,-0.00743 -0.656119,0.00372 -0.710192,0.033438 -0.04327,0.026007 -0.230722,0.2117775 -0.41097,0.4198394 -0.18386,0.2080662 -0.522735,0.5796054 -0.749853,0.8322521 -0.230714,0.2526469 -0.465041,0.5127242 -0.526331,0.5796012 -0.05767,0.066878 -0.24514,0.2712239 -0.414573,0.4532781 -0.447032,0.4867231 -0.677754,0.7430851 -1.279789,1.4081405 -0.292003,0.3269544 -0.757054,0.8359634 -1.027433,1.1331944 -0.270379,0.297232 -0.573204,0.627902 -0.670535,0.739364 -0.230724,0.263793 -0.79671,0.880549 -1.297811,1.411849 -0.346086,0.367824 -0.410979,0.41984 -0.486676,0.401263 -0.07932,-0.02229 -0.230723,-0.208063 -0.627276,-0.769086 -0.03966,-0.05944 -0.20189,-0.278655 -0.36051,-0.490433 -0.158622,-0.208111 -0.313638,-0.419889 -0.34247,-0.464474 -0.02885,-0.04087 -0.158623,-0.219208 -0.28841,-0.390116 -0.129772,-0.167193 -0.25955,-0.349248 -0.291997,-0.401263 -0.03245,-0.05202 -0.1406,-0.200631 -0.234327,-0.326954 C 14.911024,10.480762 14.683904,10.172384 14.500044,9.9234525 14.316185,9.670808 14.099888,9.3735767 14.016973,9.2621149 13.937663,9.1506531 13.70694,8.8348449 13.508664,8.5599059 13.306783,8.2849666 13.115715,8.0248892 13.07606,7.9840198 13.036405,7.9394354 12.97151,7.8465503 12.928252,7.7759579 12.884993,7.7053659 12.704736,7.4452878 12.524491,7.1963566 12.347839,6.9511406 12.153167,6.6762016 12.091888,6.5907475 11.839529,6.2192082 11.691731,6.0520156 11.587181,6.0222925 c -0.104548,-0.029723 -5.2633437,-0.029723 -5.472432,0 z m 5.1696082,1.3338261 c 0.0685,0.078023 0.227118,0.2823698 0.349689,0.4569934 0.126172,0.1746234 0.324449,0.4495624 0.43981,0.6130397 0.38574,0.5350167 0.883238,1.2335104 0.93731,1.3189644 0.02884,0.044585 0.108153,0.1523312 0.173047,0.2340697 0.06488,0.081738 0.136986,0.1820541 0.158621,0.2266391 0.02163,0.04458 0.07571,0.118893 0.12257,0.170908 0.04326,0.05201 0.18385,0.237785 0.310034,0.416124 0.126173,0.174623 0.418177,0.579601 0.6489,0.895409 0.230725,0.315809 0.598433,0.828534 0.818344,1.136912 0.219901,0.308376 0.414573,0.583316 0.436208,0.609324 0.335272,0.41984 0.468654,0.594462 0.468654,0.616756 0,0.01115 0.06489,0.107746 0.144204,0.208061 0.07932,0.104032 0.155018,0.200632 0.173038,0.222924 0.01442,0.01858 0.169434,0.237785 0.34969,0.483002 0.176641,0.245215 0.331657,0.453278 0.34248,0.464423 0.01442,0.01114 0.136986,0.17834 0.273982,0.37154 0.14059,0.1932 0.421781,0.587033 0.63088,0.869401 0.205485,0.28237 0.400156,0.557309 0.432604,0.605609 0.03244,0.05202 0.104541,0.152331 0.162224,0.222925 0.144196,0.18577 0.429,0.575885 0.894041,1.218648 0.21991,0.304662 0.623672,0.861971 0.897654,1.237226 0.270379,0.371539 0.493892,0.694778 0.493892,0.713356 0,0.02228 0.01442,0.03717 0.02884,0.03717 0.01803,0 0.108137,0.111463 0.209087,0.248931 0.09734,0.141185 0.205485,0.28237 0.241538,0.315808 0.03245,0.03717 0.06128,0.08174 0.06128,0.0966 0,0.01859 0.03243,0.06687 0.06848,0.10775 0.0721,0.07801 0.623671,0.821102 0.724616,0.977148 0.09733,0.148615 0.587622,0.832249 0.919279,1.278094 0.180257,0.2415 0.34969,0.475572 0.378532,0.520157 0.02883,0.04087 0.09373,0.137468 0.1478,0.20806 0.118962,0.163478 0.151412,0.286085 0.07932,0.312095 -0.02883,0.01112 -0.677744,0.02228 -1.438401,0.02228 h -1.387928 l -0.07932,-0.08545 c -0.04327,-0.04832 -0.158619,-0.200632 -0.259564,-0.338102 -0.09734,-0.137468 -0.25235,-0.349247 -0.342483,-0.468138 -0.09013,-0.118888 -0.2199,-0.304664 -0.288397,-0.408693 -0.0685,-0.104038 -0.187465,-0.267509 -0.259567,-0.364109 -0.07572,-0.0966 -0.418178,-0.568456 -0.764263,-1.047741 -0.670537,-0.928856 -0.775086,-1.073756 -1.031039,-1.415572 -0.09013,-0.118887 -0.356897,-0.486717 -0.594828,-0.813672 -0.237932,-0.326949 -0.504707,-0.694774 -0.59484,-0.817382 -0.09012,-0.118888 -0.216297,-0.289799 -0.277587,-0.378969 -0.414572,-0.56474 -0.695764,-0.951141 -0.803917,-1.107187 -0.288398,-0.404979 -1.142794,-1.575327 -1.232917,-1.690503 -0.05768,-0.06687 -0.100945,-0.13747 -0.100945,-0.159762 0,-0.02229 -0.01441,-0.04458 -0.02884,-0.05202 -0.01801,-0.0074 -0.176635,-0.211776 -0.349682,-0.456992 C 13.789856,14.942946 13.605996,14.6903 13.555529,14.627138 13.418544,14.45623 13.288755,14.274176 13.245496,14.203582 13.227476,14.166422 12.989543,13.84319 12.722769,13.479081 12.455994,13.114975 12.178407,12.73972 12.109909,12.639405 11.886404,12.323598 10.858973,10.908033 9.8026983,9.4664606 9.2367021,8.6936592 8.7139762,7.9765881 8.6418735,7.8725573 8.5697719,7.7685263 8.4760441,7.6422028 8.4327852,7.5901874 8.3462665,7.4824411 8.3066112,7.3524022 8.3390487,7.274379 8.3570777,7.226079 8.5445432,7.218648 9.7594385,7.218648 h 1.3987465 z"
                                            fill="currentColor"></path>
                                    </svg>
                                </a></li>
                                <li><a href="#"
                                       className="social-link">
                                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M24.296 5.333a2.37 2.37 0 0 1 2.37 2.37v16.593a2.37 2.37 0 0 1-2.37 2.37H7.704a2.37 2.37 0 0 1-2.37-2.37V7.704a2.37 2.37 0 0 1 2.37-2.37h16.592Zm-.592 18.37v-6.28a3.864 3.864 0 0 0-3.864-3.864c-1.007 0-2.18.616-2.75 1.54v-1.315h-3.306v9.92h3.306V17.86c0-.913.735-1.66 1.648-1.66a1.66 1.66 0 0 1 1.66 1.66v5.843h3.306ZM9.932 11.924a1.991 1.991 0 0 0 1.991-1.991 1.998 1.998 0 0 0-1.991-2.003 2.003 2.003 0 0 0-2.003 2.003c0 1.102.9 1.991 2.003 1.991Zm1.647 11.78v-9.92H8.296v9.92h3.283Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </a></li>
                                <li><a href="#"
                                       className="social-link">
                                    <svg width="32" height="32" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="m16.667 25 8.65-5-8.65-5v10Zm19.267-13.05c.216.784.366 1.834.466 3.167.117 1.333.167 2.483.167 3.483l.1 1.4c0 3.65-.267 6.334-.733 8.05-.417 1.5-1.384 2.467-2.884 2.883-.783.217-2.216.367-4.416.467-2.167.117-4.15.167-5.984.167l-2.65.1c-6.983 0-11.333-.267-13.05-.734-1.5-.416-2.466-1.383-2.883-2.883-.217-.783-.367-1.833-.467-3.166a40.102 40.102 0 0 1-.167-3.484l-.1-1.4c0-3.65.267-6.333.734-8.05.417-1.5 1.383-2.466 2.883-2.883.784-.217 2.217-.367 4.417-.467a111.09 111.09 0 0 1 5.983-.166l2.65-.1c6.983 0 11.334.266 13.05.733 1.5.416 2.467 1.383 2.884 2.883Z"
                                            fill="currentColor"></path>
                                    </svg>
                                </a></li>
                            </ul>
                        </div>
                        <div className="footer__label">
                            <p className="footer__label-title">Label "Don en Confiance"</p>
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/Y0UvO9c0MClLFNqbiwcyg/57ea2aacf2466c06deade520f17815f6/Label_DEC_2023_v7_couleur__1_.png"
                                alt="Label Don en Confiance"
                                className="footer__label-image"
                            />
                        </div>

                    </div>
                </div>

                {/* Liens légaux */}
                <ul className="footer__legal">
                    <li className="footer__legal-link">
                        <a href="/contact">Contact</a>
                    </li>
                    <li className="footer__legal-link">
                        <a href="/mentions-legales">Mentions légales</a>
                    </li>
                    <li className="footer__legal-link">
                        <a href="/cgu">CGU</a>
                    </li>
                    <li className="footer__legal-link">
                        <a href="/cgv">CGV</a>
                    </li>
                    <li className="footer__legal-link">
                        <a href="/donnees-personnelles">Politique de protection des données personnelles</a>
                    </li>
                    <li className="footer__legal-link">
                        <a href="/politique-de-cookies">Politique de cookies</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};