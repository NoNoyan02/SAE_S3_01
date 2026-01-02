const ChildrenHelpSection = () => {
    return (
        <div className="ch-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .ch-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .ch-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .ch-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .ch-block-content {
          display: flex;
          flex-direction: column-reverse;
          justify-content: center;
          align-items: center;
          font-size: 1.4rem;
        }

        @media (min-width: 700px) {
          .ch-block-content {
            flex-direction: row-reverse;
            font-size: medium;
          }
        }

        .ch-texts {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ch-title {
          width: 100%;
          font-size: 2rem;
          line-height: 1.2;
          font-weight: 700;
          margin: 0 0 16px 0;
        }

        @media (min-width: 700px) {
          .ch-title {
            font-size: 2.4rem;
            margin-bottom: 24px;
          }
        }

        .ch-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .ch-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .ch-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .ch-rich-text p {
          width: 100%;
          margin: 0;
        }

        .ch-rich-text a {
          color: #e3001b;
          transition: all 0.2s linear;
        }

        .ch-rich-text a:hover {
          text-decoration: none;
        }

        .ch-img {
          object-fit: cover;
          max-width: 100%;
          height: auto;
          vertical-align: middle;
        }

        @media (max-width: 699px) {
          .ch-img {
            height: 220px;
            margin-bottom: 32px;
          }
        }

        @media (min-width: 700px) {
          .ch-img {
            max-width: 50%;
            min-width: 50%;
            margin-right: 64px;
            margin-left: 0;
          }
        }

        @media (min-width: 1100px) {
          .ch-img {
            min-width: unset;
            width: 570px;
            height: 400px;
          }
        }
      `}</style>

            <section className="ch-wrapper">
                <div className="ch-container">
                    <div className="ch-block-content">
                        <div className="ch-texts">
                            <h2 className="ch-title">
                                Aider et accompagner des enfants et des jeunes
                            </h2>
                            <div className="ch-rich-text">
                                <p>
                                    Vous voulez devenir bénévole auprès d'<strong>enfants&nbsp;</strong>? Nos espaces
                                    bébés-parents accueillent des familles en situation de vulnérabilité. En devenant
                                    bénévole, vous pourrez accompagner les enfants et les jeunes : &nbsp;<a
                                    href="#">mentorat, </a>accompagnement scolaire, alphabétisation, ateliers récréatifs
                                    et animation. Le soutien des bénévoles est précieux, nous soulageons les familles.
                                    Rejoignez-nous !
                                </p>
                            </div>
                        </div>
                        <img
                            src="https://images.ctfassets.net/ksb78y40v1oe/4IcIbazSyVdi9WWsPTfaTl/e64e7e4299afda20133d16d7b90707f3/Hero_CDECORDE4426307-avril-2022.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                            alt="Enfants et bénévoles"
                            loading="lazy"
                            className="ch-img"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ChildrenHelpSection;