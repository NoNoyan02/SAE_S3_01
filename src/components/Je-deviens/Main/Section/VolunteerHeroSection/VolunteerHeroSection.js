const VolunteerHeroSection = () => {
    return (
        <div className="vh-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .vh-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .vh-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .vh-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .vh-container-shrink {
          max-width: 312px;
          margin-left: auto;
          margin-right: auto;
          width: 100%;
        }

        @media (min-width: 700px) and (max-width: 1099px) {
          .vh-container-shrink {
            padding: 0 24px;
          }
        }

        @media (min-width: 700px) {
          .vh-container-shrink {
            max-width: 970px;
          }
        }

        .vh-section-head {
          margin-bottom: 3rem;
          text-align: center;
        }

        .vh-section-title {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 700px) {
          .vh-section-title {
            font-size: 2.4rem;
          }
        }

        .vh-section-mark {
          padding: 2px 8px;
          border-radius: 2px;
          color: #fff;
          background-color: #075c68;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          line-height: 1.5;
        }

        .vh-section-subtitle {
          font-weight: 300;
          font-size: 1.8rem;
          line-height: 1.2;
          margin: 0;
        }

        @media (min-width: 700px) {
          .vh-section-subtitle {
            font-size: 2rem;
          }
        }

        .vh-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .vh-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .vh-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .vh-rich-text p {
          width: 100%;
          margin: 0;
        }
      `}</style>

            <section className="vh-wrapper">
                <div className="vh-container">
                    <header className="vh-section-head">
                        <h2 className="vh-section-title">
                            <span className="vh-section-mark">Devenez bénévole</span> pour venir en aide aux personnes
                            vulnérables
                        </h2>
                        <p className="vh-section-subtitle">
                            A quelles personnes souhaitez-vous particulièrement venir en aide ?
                        </p>
                    </header>
                </div>
                <div className="vh-container vh-container-shrink">
                    <div className="vh-rich-text">
                        <p>
                            <strong>
                                Accompagner des enfants, des personnes âgées, devenir bénévole auprès des personnes
                                sans-abri, aider les malades : ils ont besoin de vous ! Choisissez la cause qui vous
                                tient à coeur
                            </strong>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VolunteerHeroSection;