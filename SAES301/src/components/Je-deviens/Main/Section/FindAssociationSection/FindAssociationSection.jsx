const FindAssociationSection = () => {
    return (
        <div className="fa-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .fa-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .fa-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .fa-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .fa-container-shrink {
          max-width: 312px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }

        @media (min-width: 700px) and (max-width: 1099px) {
          .fa-container-shrink {
            padding: 0 24px;
          }
        }

        @media (min-width: 700px) {
          .fa-container-shrink {
            max-width: 970px;
          }
        }

        .fa-section-head {
          margin-bottom: 3rem;
          text-align: center;
        }

        .fa-section-title {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 700px) {
          .fa-section-title {
            font-size: 2.4rem;
          }
        }

        .fa-section-mark {
          padding: 2px 8px;
          border-radius: 2px;
          color: #fff;
          background-color: #075c68;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          line-height: 1.5;
        }

        .fa-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .fa-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .fa-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .fa-rich-text p {
          width: 100%;
          margin: 0;
        }
      `}</style>

            <section className="fa-wrapper">
                <div className="fa-container">
                    <header className="fa-section-head">
                        <h2 className="fa-section-title">
                            À qui vous adresser pour <span className="fa-section-mark">trouver une association</span> ?
                        </h2>
                    </header>
                </div>
                <div className="fa-container fa-container-shrink">
                    <div className="fa-rich-text">
                        <p>
                            Vous êtes à la recherche d'une association au sein de laquelle devenir bénévole ? La
                            Croix-Rouge vous propose des missions adaptées à vos envies, vos compétences et votre emploi
                            du temps pour faire du bénévolat à l'étranger ou en France, tout près de chez vous. C'est
                            très facile, suivez le mode d'emploi !
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FindAssociationSection;