const StepsGuideSection = () => {
    const steps = [
        {
            title: "Trouver une association pour faire du bénévolat :",
            description: "la Croix-Rouge recrute, engagez-vous !"
        },
        {
            title: "Renseignez votre département :",
            description: "la Croix-Rouge s'étend à travers un réseau de délégations territoriales et d'unités locales qui nous permet d'être présent sur tout le territoire"
        },
        {
            title: "Sélectionnez le domaine d'activité",
            description: "dans lequel vous voulez devenir bénévole"
        },
        {
            title: "Choisissez votre mission selon vos disponibilités",
            description: "Maraudeur une fois par semaine, secouriste 2 fois par mois, formateur en journée, animateur le temps d'un week-end…"
        }
    ];

    return (
        <div className="sg-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .sg-wrapper {
          margin-bottom: 64px;
          padding: 24px;
          margin-left: 24px;
          margin-right: 24px;
          background-image: linear-gradient(90deg, #e6eff0, #e6eff0);
          background-repeat: no-repeat;
          background-size: 100% calc(100% - 60px);
          background-position: top;
          padding-bottom: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .sg-wrapper {
            margin-bottom: 88px;
            padding: 64px;
            margin-left: 64px;
            margin-right: 64px;
            background-size: 100% calc(100% - 80px);
          }
        }

        .sg-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .sg-steps-list {
          counter-reset: steps;
          text-align: center;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        @media (min-width: 700px) {
          .sg-steps-list {
            display: flex;
            flex-wrap: wrap;
            gap: 30px;
          }
        }

        .sg-step-item {
          flex: 1;
          border: 1px solid #cdcdcd;
          border-radius: 4px;
          padding: 32px;
          background-color: #fff;
          counter-increment: steps;
        }

        @media (max-width: 700px) {
          .sg-step-item {
            margin-bottom: 30px;
          }
        }

        @media (min-width: 700px) {
          .sg-step-item {
            min-width: calc(33% - 30px);
          }
        }

        @media (min-width: 1100px) {
          .sg-step-item {
            min-width: calc(25% - 30px);
          }
        }

        .sg-step-item:before {
          content: counter(steps);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          margin-bottom: 1.5rem;
          border-radius: 50%;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          background-color: #e3001b;
        }

        @media (min-width: 1100px) {
          .sg-step-item:before {
            width: 64px;
            height: 64px;
          }
        }

        .sg-step-title {
          display: block;
          margin: 0 0 1rem 0;
          font-weight: 600;
        }

        .sg-step-description {
          display: block;
          margin: 0;
        }
      `}</style>

            <section className="sg-wrapper">
                <div className="sg-container">
                    <ol className="sg-steps-list">
                        {steps.map((step, index) => (
                            <li key={index} className="sg-step-item">
                                <strong className="sg-step-title">{step.title}</strong>
                                <span className="sg-step-description">{step.description}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </div>
    );
};

export default StepsGuideSection;