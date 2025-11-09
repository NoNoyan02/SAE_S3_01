const EmergencyRescueSection = () => {
    return (
        <div className="er-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .er-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .er-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .er-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .er-block-content {
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
        }

        @media (min-width: 700px) {
          .er-block-content {
            flex-direction: row;
            font-size: medium;
          }
        }

        .er-texts {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .er-title {
          width: 100%;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 700;
          margin: 0 0 16px 0;
        }

        @media (min-width: 700px) {
          .er-title {
            font-size: 2.4rem;
            margin-bottom: 24px;
          }
        }

        .er-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .er-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .er-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .er-rich-text p {
          width: 100%;
          margin: 0;
        }

        .er-img {
          object-fit: cover;
          max-width: 100%;
          height: auto;
          vertical-align: middle;
        }

        @media (max-width: 699px) {
          .er-img {
            height: 220px;
            margin-bottom: 32px;
          }
        }

        @media (min-width: 700px) {
          .er-img {
            max-width: 50%;
            min-width: 50%;
            margin-left: 64px;
          }
        }

        @media (min-width: 1100px) {
          .er-img {
            min-width: unset;
            width: 570px;
            height: 400px;
          }
        }
      `}</style>

            <section className="er-wrapper">
                <div className="er-container">
                    <div className="er-block-content">
                        <div className="er-texts">
                            <h2 className="er-title">
                                Secourir des personnes victimes de situations d'urgence
                            </h2>
                            <div className="er-rich-text">
                                <p>
                                    «&nbsp;Porter secours&nbsp;» ça vous tente ? Aider les autres, être là, pour eux,
                                    présents lors de temps forts, qu'ils soient festifs ou critiques. Ça vous dirait ?
                                    Nous avons la solution, devenez bénévole secouriste. Pas besoin d'être médecin ou
                                    soignant, nous vous proposons un parcours de formation qui vous permettra d'agir et
                                    de savoir répondre aux situations d'urgence. Chacun peut agir !
                                </p>
                            </div>
                        </div>
                        <img
                            src="https://images.ctfassets.net/ksb78y40v1oe/1GMaKLgYfry7WSwoMNtdL4/4a5fdff2eafea9b95c332475fc3f5641/Un_dispositif_pr_visionnel_de_secours___personnes__c_est_quoi_?fm=webp&q=85&w=570&h=400&fit=thumb"
                            alt="Secours d'urgence"
                            loading="lazy"
                            className="er-img"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EmergencyRescueSection;