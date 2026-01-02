import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import '../components/Formations/Formations.css';


export default function Formations() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Je me forme aux premiers secours | Croix-Rouge française</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Formez-vous aux premiers secours. N'hésitez plus, trouvez une session de formation près de chez vous et inscrivez-vous !"
                />

                {/* Open Graph */}
                <meta
                    property="og:title" Soutenez notre association en effectuant un don
                    content="Je me forme aux premiers secours | Croix-Rouge française"
                />
                <meta
                    property="og:description"
                    content="Formez-vous aux premiers secours. N'hésitez plus, trouvez une session de formation près de chez vous et inscrivez-vous !"
                />
            </Helmet>
            <Header/>

            <nav className="sousnavbar" aria-label="Fil d'Ariane">
                <ol>
                    <li><a href="/protect/public">Accueil</a></li>
                    <li>Formations aux premiers secours</li>
                </ol>
            </nav>

            <main>
                <section className="hero-formation">
                    <div className="hero-formation-image">
                        <div className="hero-formation-content">
                            <h1>Formations aux premiers secours</h1>
                        </div>

                        <form className="search-container" role="search" aria-label="Recherche de formation">
                            <label htmlFor="formation-type" className="visually-hidden">Type de formation</label>
                            <select id="formation-type" name="formation-type">
                                <option value="toutes">Toutes</option>
                                <option value="psc1">PSC1</option>
                                <option value="gqs">GQS</option>
                                <option value="sst">SST</option>
                            </select>

                            <label htmlFor="location" className="visually-hidden">Localisation</label>
                            <input type="text" id="location" name="location" placeholder="Code postal ou ville"
                                   aria-label="Code postal ou ville"/>

                            <button type="submit" className="visually-hidden">Rechercher</button>
                        </form>
                    </div>
                </section>

                <section className="entreprise">
                    <div className="entreprise-container">
                        <div className="texte">
                            <h2>Vous êtes un professionnel, une entreprise</h2>
                            <p>
                                Vous souhaitez former vos collaborateurs aux gestes de secours. Découvrez l'offre de
                                formation
                                adaptée à vos besoins proposée par nos centres de formation Croix-Rouge Compétence.
                            </p>
                        </div>
                        <a href="https://www.croix-rouge.fr/formation-professionnelle?domains=sante_securite_au_travail&page=3"
                           className="btn-entreprise">
                            Premiers secours pour les professionnels
                        </a>
                    </div>
                </section>

                <section className="textbleu2">
                    <div className="formezvouspremiersecours">
                        <h2>Formez-vous aux premiers secours et devenez citoyen sauveteur !</h2>
                        <p>Faire un massage cardiaque, mettre en PLS (position latérale de sécurité), bien réagir face à
                            une brûlure, appeler les secours... aucun de ces gestes ne s'improvise. Or en situation de
                            détresse ou de crise, il est difficile de garder la tête froide. C'est pourquoi, apprendre
                            les gestes de premiers secours est la clé pour sauver des vies !</p>
                        <p className="important">Dans 9 situations d'urgence sur 10, c'est la vie d'un proche qui est en
                            jeu et pourtant le taux de formation de la population française est parmi les plus bas
                            d'Europe !</p>
                        <p>Alors, les bénévoles se mobilisent tout au long de l'année, partout en France, pour vous
                            proposer des sessions de formation à tous les gestes et comportements qui sauvent afin de
                            permettre à chacun de réagir en cas d'accident et devenir le premier maillon de la chaîne de
                            secours.</p>
                        <p className="hesitepas">N'hésitez plus, trouvez une session de formation près de chez vous et
                            inscrivez-vous !</p>
                    </div>
                </section>

                <section className="layout-deux-colonnes">
                    <section className="tableau">
                        <div className="container-tableau">
                            <article className="tab">
                                <h3>Je me forme aux premiers secours et deviens un citoyen engagé !</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/prevention-et-secours-civique-de-niveau-1-psc1">Formation
                                        premiers secours citoyen (PSC)</a></li>
                                    <li><a href="https://www.croix-rouge.fr/formation/les-gestes-qui-sauvent">Formation
                                        Les gestes qui sauvent (GQS)</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formation-continue-prevention-et-secours-civique-de-niveau-1">Remise
                                        à niveau de ma formation premiers secours citoyen</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je me forme pour sauver des vies au travail</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/intervenir-en-tant-que-sauveteur-secouriste-du-travail-sst">Formation
                                        Sauveteur Secouriste du Travail (SST)</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/maintien-et-actualisation-des-competences-du-sauveteur-secouriste-du-travail-mac-sst">Recyclage
                                        de ma formation SST</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/formateur-de-sauveteur-secouriste-au-travail-formateur-sst">Formateur
                                        SST</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation-professionnelle/devenir-referent-en-sante-et-securite-au-travail">Référent
                                        en santé et sécurité au travail</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je participe à une initiation aux premiers secours</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/initiation-aux-premiers-secours-enfant-et-nourrisson">Initiation
                                        aux premiers secours enfants et nourrissons (IPSEN)</a></li>
                                    <li><a href="https://www.croix-rouge.fr/formation/initiation-aux-premiers-secours">Initiation
                                        aux premiers secours (IPS)</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je suis ou je souhaite devenir équipier secouriste</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formation-continue-premiers-secours-en-equipe-de-niveau-1">FC
                                        PSE 1 - Formation continue de premiers secours en équipe de niveau 1</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formation-continue-premiers-secours-en-equipe-de-niveau-2">FC
                                        PSE 2 - Formation continue de premiers secours en équipe de niveau 2</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/premiers-secours-en-equipe-de-niveau-1-et-2">PSE
                                        1&2 - Premiers secours en équipe de niveau 1 et 2 (Hybride: e-learning et
                                        présentiel)</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Formations aquatiques</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/bnssa-brevet-national-de-securite-et-de-sauvetage-aquatique">BNSSA
                                        - Brevet national de sécurité et de sauvetage aquatique</a></li>
                                </ul>
                            </article>

                            <article className="tab">
                                <h3>Je deviens formateur de premiers secours</h3>
                                <ul>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formateur-pse-pedagogie-appliquee-a-lemploi-de-formateur-aux-premiers">Formateur
                                        PSE (PICF FPS) - Pédagogie appliquée à l'emploi de formateur aux premiers
                                        secours</a></li>
                                    <li><a
                                        href="https://www.croix-rouge.fr/formation/formateur-psc1-picf-fpsc-pedagogie-appliquee-a-lemploi-de-formateur-en">Formateur
                                        PSC (PICF FPSC) - Pédagogie appliquée à l'emploi de formateur aux premiers
                                        secours citoyen</a></li>
                                </ul>
                            </article>
                        </div>
                    </section>

                    <section className="formations-grid" aria-labelledby="formations-titre">
                        <h2 id="formations-titre" className="visually-hidden">Nos formations disponibles</h2>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/32PfeiYxRr97nIDRQYQBXV/09360475a35ff1d3c34491ea473ac9f5/formation_psc1.webp?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation PSC1 - Gestes de premiers secours"/>
                            <div className="formation-card-content">
                                <span className="badge grand-public">GRAND PUBLIC</span>
                                <h3>Prévention et secours civiques de niveau 1 (PSC1)</h3>
                                <div className="formation-details">
                                    <span>Durée: 8h</span>
                                    <span>Prix: 60€</span>
                                </div>
                                <p>Formation de base aux premiers secours. Apprenez à réagir face aux situations
                                    d'urgence du quotidien.</p>
                                <a href="https://www.croix-rouge.fr/formation/prevention-et-secours-civique-de-niveau-1-psc1"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1WPKrtg9vlvihafSbMZqP8/552eec8470a8c88bf9b624fad850728a/Gestes_qui_sauvent_10-09-22_CroixRouge_JMPS2022_Christophe_Hargoues.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation GQS - Gestes qui sauvent"/>
                            <div className="formation-card-content">
                                <span className="badge initiation">INITIATION</span>
                                <h3>Les gestes qui sauvent (GQS)</h3>
                                <div className="formation-details">
                                    <span>Durée: 2h</span>
                                    <span>Prix: 20€</span>
                                </div>
                                <p>Sensibilisation de 2 heures aux gestes d'urgence : alerter, masser, défibriller,
                                    traiter les hémorragies.</p>
                                <a href="https://www.croix-rouge.fr/formation/les-gestes-qui-sauvent"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/6LN6jahmi0ESeyPTZUqoCS/e47f9e8151604ef78b79ff77f81b752b/defibrillation_10-09-22_JMPS2022_Christophe_Hargoues_036BD.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation SST - Sauveteur Secouriste du Travail"/>
                            <div className="formation-card-content">
                                <span className="badge professionnel">PROFESSIONNEL</span>
                                <h3>Sauveteur Secouriste du Travail (SST)</h3>
                                <div className="formation-details">
                                    <span>Durée: 14h</span>
                                    <span>Éligible CPF</span>
                                </div>
                                <p>Formation pour intervenir efficacement face à une situation d'accident en milieu
                                    professionnel.</p>
                                <a href="https://www.croix-rouge.fr/formation-professionnelle/intervenir-en-tant-que-sauveteur-secouriste-du-travail-sst"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/2148IDKg95BwmRA9cT7oji/eca321bf85415373aebc30044be21b24/IPSEN_etouffement_912-22_-_Joan_Bardeletti.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation IPSEN - Premiers secours enfant et nourrisson"/>
                            <div className="formation-card-content">
                                <span className="badge parents">PARENTS</span>
                                <h3>Initiation premiers secours enfant et nourrisson (IPSEN)</h3>
                                <div className="formation-details">
                                    <span>Durée: 4h30</span>
                                    <span>Prix: 35€</span>
                                </div>
                                <p>Spécialement conçue pour les parents et futurs parents. Apprenez les gestes adaptés
                                    aux jeunes enfants.</p>
                                <a href="https://www.croix-rouge.fr/formation/initiation-aux-premiers-secours-enfant-et-nourrisson"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1iMlrM0qMzAFRyfJY1Hkcm/1478af479ba126ef29c6c795c6add923/CRF_Formation_PSE2.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation PSE - Premiers secours en équipe"/>
                            <div className="formation-card-content">
                                <span className="badge equipier">ÉQUIPIER</span>
                                <h3>Premiers secours en équipe (PSE 1 & 2)</h3>
                                <div className="formation-details">
                                    <span>Durée: 35h</span>
                                    <span>Format hybride</span>
                                </div>
                                <p>Formation approfondie pour devenir équipier secouriste et intervenir en équipe lors
                                    d'événements.</p>
                                <a href="https://www.croix-rouge.fr/formation/premiers-secours-en-equipe-de-niveau-1-et-2"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/3AUvOEr3ZpAtxl64n1pPoO/5b9b2c05b608bb9d73272964531e8169/brevet_s_curit__et_sauvetage_aquatique.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation BNSSA - Sauvetage aquatique"/>
                            <div className="formation-card-content">
                                <span className="badge aquatique">AQUATIQUE</span>
                                <h3>Brevet national de sécurité et de sauvetage aquatique</h3>
                                <div className="formation-details">
                                    <span>Durée: 35h</span>
                                    <span>Brevet d'État</span>
                                </div>
                                <p>Surveillez et assurez la sécurité des baignades en piscine ou en milieu naturel.</p>
                                <a href="https://www.croix-rouge.fr/formation/bnssa-brevet-national-de-securite-et-de-sauvetage-aquatique"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/3kn9etgqYZjXYuRlwbbc1P/f57ae51a140b59f45e37d9b98f6c2687/massage_cardiaque_enfant_14-05-22_journeeNationaleParisDijon_Christophe_Hargoues_044.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation remise à niveau PSC1"/>
                            <div className="formation-card-content">
                                <span className="badge recyclage">RECYCLAGE</span>
                                <h3>Remise à niveau formation premiers secours citoyen</h3>
                                <div className="formation-details">
                                    <span>Durée: 3h</span>
                                    <span>Prix: 30€</span>
                                </div>
                                <p>Pour lutter contre l'oubli, venez vous rafraîchir la mémoire sur les gestes de
                                    premiers secours !</p>
                                <a href="https://www.croix-rouge.fr/formation/formation-continue-prevention-et-secours-civique-de-niveau-1"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>

                        <article className="formation-card">
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1Ud6J3fApPyNxcLRmdsPBe/458b7f5da3ddabb91504c7063c2055a9/formateur_PSC_formation_Croix-Rouge_2.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Formation formateur premiers secours"/>
                            <div className="formation-card-content">
                                <span className="badge formateur">FORMATEUR</span>
                                <h3>Formateur premiers secours citoyen (FPSC)</h3>
                                <div className="formation-details">
                                    <span>Durée: 50h</span>
                                    <span>Pré-requis PSE2</span>
                                </div>
                                <p>Devenez formateur et transmettez les gestes qui sauvent au plus grand nombre.</p>
                                <a href="https://www.croix-rouge.fr/formation/formateur-psc1-picf-fpsc-pedagogie-appliquee-a-lemploi-de-formateur-en"
                                   className="btn-formation">Je m'inscris</a>
                            </div>
                        </article>
                    </section>
                </section>
            </main>
            <Footer/>
        </>
    );
}