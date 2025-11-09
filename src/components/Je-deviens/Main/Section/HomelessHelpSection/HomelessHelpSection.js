const HomelessHelpSection = () => {
    return (
        <div className="hh-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .hh-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .hh-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .hh-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .hh-block-content {
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
        }

        @media (min-width: 700px) {
          .hh-block-content {
            flex-direction: row-reverse;
            font-size: medium;
          }
        }

        .hh-texts {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hh-title {
          width: 100%;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 700;
          margin: 0 0 16px 0;
        }

        @media (min-width: 700px) {
          .hh-title {
            font-size: 2.4rem;
            margin-bottom: 24px;
          }
        }

        .hh-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .hh-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .hh-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .hh-rich-text p {
          width: 100%;
          margin: 0;
        }

        .hh-img {
          object-fit: cover;
          max-width: 100%;
          height: auto;
          vertical-align: middle;
        }

        @media (max-width: 699px) {
          .hh-img {
            height: 220px;
            margin-bottom: 32px;
          }
        }

        @media (min-width: 700px) {
          .hh-img {
            max-width: 50%;
            min-width: 50%;
            margin-right: 64px;
            margin-left: 0;
          }
        }

        @media (min-width: 1100px) {
          .hh-img {
            min-width: unset;
            width: 570px;
            height: 400px;
          }
        }
      `}</style>

            <section className="hh-wrapper">
                <div className="hh-container">
                    <div className="hh-block-content">
                        <div className="hh-texts">
                            <h2 className="hh-title">
                                Venir en aide aux personnes sans-abri
                            </h2>
                            <div className="hh-rich-text">
                                <p>
                                    Vous souhaitez vous engager pour une société plus humaine et solidaire ? Vous êtes
                                    sensible aux besoins des <strong>personnes sans-abri&nbsp;</strong>? Participez à
                                    des maraudes pour créer du lien social avec les personnes sans-abri. Au sein d'une
                                    équipe, partez à la rencontre de ces "invisibles" pour le temps d'une soirée, leur
                                    apporter votre soutien, distribuer des cafés, des couvertures et des sourires, et
                                    préserver ainsi leur dignité et favoriser leur retour à l'autonomie.
                                </p>
                            </div>
                        </div>
                        <img
                            src="https://images.ctfassets.net/ksb78y40v1oe/5jQ60q7rGCAwDcojyyuagx/6f43f62ff7bd2227d0d06a25a139143e/Page_carrefour_Don_r__gulier.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                            alt="Aide aux sans-abri"
                            loading="lazy"
                            className="hh-img"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomelessHelpSection;