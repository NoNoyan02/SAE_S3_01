const TestimonialSection = () => {
    return (
        <div className="ts-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .ts-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .ts-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .ts-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .ts-section-head {
          margin-bottom: 3rem;
          text-align: center;
        }

        .ts-section-title {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 700px) {
          .ts-section-title {
            font-size: 2.4rem;
          }
        }

        .ts-section-subtitle {
          font-weight: 300;
          font-size: 1.8rem;
          line-height: 1.2;
          margin: 0;
        }

        @media (min-width: 700px) {
          .ts-section-subtitle {
            font-size: 2rem;
          }
        }

        .ts-testimonial-card {
          display: block;
          position: relative;
          margin-left: 10px;
          padding: 20px 20px 20px 64px;
          font-size: 1.4rem;
        }

        @media (min-width: 700px) {
          .ts-testimonial-card {
            padding-left: 80px;
            padding-right: 80px;
            font-size: 1.6rem;
          }
        }

        .ts-testimonial-card:before {
          content: "";
          position: absolute;
          left: 24px;
          height: 100%;
          width: 1px;
          background-color: #cdcdcd;
        }

        @media (min-width: 700px) {
          .ts-testimonial-card:before {
            left: 32px;
          }
        }

        .ts-quote-icon {
          position: absolute;
          top: 0;
          left: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          aspect-ratio: 1;
          border-radius: 50%;
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          background-color: #e3001b;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        @media (min-width: 700px) {
          .ts-quote-icon {
            width: 64px;
          }
        }

        .ts-quote-svg {
          width: 26px;
          height: 16px;
          fill: currentColor;
        }

        .ts-testimonial-text {
          margin: 0;
        }
      `}</style>

            <section className="ts-wrapper">
                <div className="ts-container">
                    <header className="ts-section-head">
                        <h2 className="ts-section-title">
                            Damien, 20 ans, secouriste à Bordeaux (Gironde)
                        </h2>
                        <p className="ts-section-subtitle">
                            témoignage de son engagement bénévole
                        </p>
                    </header>
                    <div>
                        <blockquote className="ts-testimonial-card">
              <span className="ts-quote-icon">
                <svg
                    viewBox="0 0 26 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="ts-quote-svg"
                >
                  <path
                      d="M5.272 16c.816 0 1.568-.464 1.92-1.184l2.272-4.544c.224-.448.336-.928.336-1.424V1.6C9.8.72 9.08 0 8.2 0H1.8C.92 0 .2.72.2 1.6V8c0 .88.72 1.6 1.6 1.6H5l-1.648 3.296C2.632 14.32 3.672 16 5.272 16Zm16 0c.816 0 1.568-.464 1.92-1.184l2.272-4.544c.224-.448.336-.928.336-1.424V1.6c0-.88-.72-1.6-1.6-1.6h-6.4c-.88 0-1.6.72-1.6 1.6V8c0 .88.72 1.6 1.6 1.6H21l-1.648 3.296c-.72 1.424.32 3.104 1.92 3.104Z"
                      fill="currentColor"
                  />
                </svg>
              </span>
                            <p className="ts-testimonial-text">
                                Je suis devenu bénévole à la Croix-Rouge à 17 ans pour suivre les traces de mon père.
                                C'est intéressant d'être jeune à la Croix-Rouge, on grandit plus vite, on voit la vie
                                différemment et on peut découvrir beaucoup sur sa personnalité. Le secourisme est une
                                activité passionnante et je réfléchis sérieusement à une formation d'urgentiste ou
                                d'infirmier enfin un métier dans le domaine de la santé.
                            </p>
                        </blockquote>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TestimonialSection;