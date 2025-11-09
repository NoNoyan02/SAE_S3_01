const HospitalVolunteerSection = () => {
    return (
        <div className="hv-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .hv-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .hv-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .hv-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .hv-block-content {
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
        }

        @media (min-width: 700px) {
          .hv-block-content {
            flex-direction: row;
            font-size: medium;
          }
        }

        .hv-texts {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .hv-title {
          width: 100%;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 700;
          margin: 0 0 16px 0;
        }

        @media (min-width: 700px) {
          .hv-title {
            font-size: 2.4rem;
            margin-bottom: 24px;
          }
        }

        .hv-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .hv-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .hv-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .hv-rich-text p {
          width: 100%;
          margin: 0;
        }

        .hv-img {
          object-fit: cover;
          max-width: 100%;
          height: auto;
          vertical-align: middle;
        }

        @media (max-width: 699px) {
          .hv-img {
            height: 220px;
            margin-bottom: 32px;
          }
        }

        @media (min-width: 700px) {
          .hv-img {
            max-width: 50%;
            min-width: 50%;
            margin-left: 64px;
          }
        }

        @media (min-width: 1100px) {
          .hv-img {
            min-width: unset;
            width: 570px;
            height: 400px;
          }
        }
      `}</style>

            <section className="hv-wrapper">
                <div className="hv-container">
                    <div className="hv-block-content">
                        <div className="hv-texts">
                            <h2 className="hv-title">
                                Faire du bénévolat dans les hôpitaux
                            </h2>
                            <div className="hv-rich-text">
                                <p>
                                    Cela vous permettra, entre autres, d'accompagner des&nbsp;<strong>personnes en fin
                                    de vie</strong>. Le bénévolat à l'hôpital permet aussi d'apporter votre soutien
                                    aux&nbsp;<strong>malades</strong>.
                                </p>
                                <p>
                                    Ou alors, montez vos propres projets solidaires à destination des&nbsp;<strong>personnes
                                    âgées</strong>&nbsp;dans les maisons de retraite. De l'animation à l'écoute, la
                                    Croix-Rouge vous propose plusieurs types de missions selon vos envies.
                                </p>
                            </div>
                        </div>
                        <img
                            src="https://images.ctfassets.net/ksb78y40v1oe/1PJgHgjZWxHI3vbtfRdnYb/7e994678ff76f44825af1aa1d00a7a16/Page_carrefour_Je_deviens_b__n__vole_b__n__volat_dans_les_h__pitaux.webp?fm=webp&q=85&w=570&h=400&fit=thumb"
                            alt="Bénévolat à l'hôpital"
                            loading="lazy"
                            className="hv-img"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HospitalVolunteerSection;