const WhyVolunteerSection = () => {
    return (
        <div className="wv-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .wv-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .wv-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .wv-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .wv-container-shrink {
          max-width: 312px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }

        @media (min-width: 700px) and (max-width: 1099px) {
          .wv-container-shrink {
            padding: 0 24px;
          }
        }

        @media (min-width: 700px) {
          .wv-container-shrink {
            max-width: 970px;
          }
        }

        .wv-section-head {
          margin-bottom: 3rem;
          text-align: center;
        }

        .wv-section-title {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 700px) {
          .wv-section-title {
            font-size: 2.4rem;
          }
        }

        .wv-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .wv-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .wv-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .wv-rich-text p,
        .wv-rich-text ul {
          width: 100%;
          margin: 0;
        }

        .wv-rich-text ul {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wv-rich-text ul li {
          position: relative;
          margin-left: 23px;
          margin-bottom: 6px;
        }

        .wv-rich-text ul li:before {
          content: "";
          position: absolute;
          width: 15px;
          height: 2px;
          background-color: #e3001b;
          top: 11px;
          left: -23px;
          border-radius: 2px;
        }

        .wv-rich-text a {
          color: #e3001b;
          transition: all 0.2s linear;
        }

        .wv-rich-text a:hover {
          text-decoration: none;
        }
      `}</style>

            <section className="wv-wrapper">
                <div className="wv-container">
                    <header className="wv-section-head">
                        <h2 className="wv-section-title">
                            Pourquoi vous engager en tant que bénévole ?
                        </h2>
                    </header>
                </div>
                <div className="wv-container wv-container-shrink">
                    <div className="wv-rich-text">
                        <p>
                            Parce que nous avons besoin de vous…, mais pas que ! Être bénévole, c'est donner un peu de
                            son temps pour aider les autres. Et sans même vous en rendre compte, vous avez beaucoup à y
                            gagner !
                        </p>
                        <ul>
                            <li>
                                <p>
                                    <strong>Un sentiment de satisfaction inégalable</strong>, parce que vos actions sont
                                    totalement désintéressées, et que la gratitude d'autrui ou le sourire d'un enfant
                                    valent toutes les rémunérations du monde.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>De belles rencontres</strong> au sein d'une équipe soudée, parmi des
                                    coéquipiers avec lesquels vous aimez passer du temps et partager vos nouvelles
                                    expériences. Le meilleur moyen de nouer des liens forts…
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>La valorisation de vos compétences et de nouvelles qualifications</strong>,
                                    à acquérir et à développer via les formations gratuites dispensées près de chez vous
                                    par la Croix-Rouge.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Des projets stimulants</strong> : accompagné par <a href="#">notre réseau
                                    partenaire </a>, initiez et mettez en œuvre vos propres actions solidaires, un
                                    challenge édifiant pour contribuer à une cause qui vous tient particulièrement à
                                    cœur.
                                </p>
                            </li>
                            <li>
                                <p>
                                    <strong>Un emploi du temps à 100 à l'heure !</strong> Il vous restait quelques
                                    disponibilités dans votre planning déjà chargé ? Plus question de s'ennuyer : être
                                    bénévole, c'est vivre sa vie à 200 % ! <em>A noter : pour vous permettre, quel que
                                    soit votre rythme de travail, de faire du bénévolat dans une association, le cadre
                                    juridique en France peut vous permettre d'obtenir un droit d'absence ou de congé
                                    pour vos formations et vos activités de bénévole. Plus d'excuse !</em>
                                </p>
                            </li>
                        </ul>
                        <p>
                            Majeur ou non, étudiant, retraité, salarié, âme d'entrepreneur, philanthrope, homme ou femme
                            de terrain, geek… votre profil nous intéresse. Vous êtes partant ? Trouvez la mission
                            adaptée à vos envies !
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default WhyVolunteerSection;