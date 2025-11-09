import {useState} from 'react';

const AccordionFAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            id: 1,
            title: "Vous avez de l'expérience en magasin ?",
            content: "La gestion de planning, les exigences budgétaires et la mise en rayon n'ont pas de secrets pour vous ? Associées à un bon esprit d'équipe et à un sens de l'écoute, ces compétences peuvent servir nos actions en boutique ou encore en aide alimentaire. Pour répondre aux besoins primaires des familles et aider les personnes dans le besoin, participez bénévolement au fonctionnement d'une épicerie sociale ou de tout autre lieu de mixité sociale, le temps de quelques heures par semaine."
        },
        {
            id: 2,
            title: "Vous êtes un as de la communication ?",
            content: "Mettez toutes vos compétences professionnelles au service de la communication ou du développement des ressources au sein d'une délégation territoriale. Vous pourrez ainsi aider à promouvoir l'image et les actions de la Croix-Rouge française."
        },
        {
            id: 3,
            title: "Vous avez ou vous souhaitez acquérir les qualifications requises en secourisme ?",
            content: "La Croix-Rouge vous propose des missions bénévoles variées : secouriste ou formateur aux gestes qui sauvent, c'est vous qui choisissez !"
        }
    ];

    return (
        <div className="faq-wrapper">
            <style>{`

        .faq-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .faq-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .faq-container {
          width: 100%;
          max-width: 970px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .faq-item {
          margin-bottom: 8px;
          border: 1px solid #cdcdcd;
          border-radius: 4px;
          padding: 12px;
          transition: border-color 0.2s linear;
        }

        @media (min-width: 700px) {
          .faq-item {
            padding: 16px;
          }
        }

        .faq-item:hover {
          border-color: #e3001b;
        }

        .faq-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
          user-select: none;
        }

        .faq-title {
          font-size: 1.8rem;
          font-weight: 600;
          transition: color 0.2s linear;
          margin: 0;
        }

        .faq-header:hover .faq-title {
          color: #e3001b;
        }

        .faq-button {
          width: 24px;
          height: 24px;
          min-width: 24px;
          font-size: 2.4rem;
          color: #e3001b;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
        }

        .faq-button.open {
          transform: rotate(180deg);
        }

        .faq-icon {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        .faq-content {
          margin-top: 12px;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }

        @media (min-width: 700px) {
          .faq-content {
            margin-top: 16px;
          }
        }

        .faq-content.closed {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
        }

        .faq-content.open {
          max-height: 500px;
          opacity: 1;
        }

        .faq-text {
          font-size: 1.4rem;
          line-height: 1.5;
          color: #333;
        }

        @media (min-width: 700px) {
          .faq-text {
            font-size: 1.6rem;
            line-height: 1.45;
          }
        }

        @media print {
          .faq-button {
            display: none;
          }
          .faq-content {
            max-height: none !important;
            opacity: 1 !important;
            margin-top: 16px !important;
          }
        }
      `}</style>

            <div className="faq-container">
                {faqData.map((item, index) => (
                    <article key={item.id} className="faq-item">
                        <div
                            className="faq-header"
                            onClick={() => toggleAccordion(index)}
                            role="button"
                            aria-expanded={openIndex === index}
                            aria-controls={`faq-content-${item.id}`}
                        >
                            <h3 className="faq-title">{item.title}</h3>
                            <button
                                className={`faq-button ${openIndex === index ? 'open' : ''}`}
                                aria-label={openIndex === index ? "Fermer" : "Ouvrir"}
                                tabIndex="-1"
                            >
                                <svg
                                    className="faq-icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"></path>
                                </svg>
                            </button>
                        </div>
                        <div
                            id={`faq-content-${item.id}`}
                            className={`faq-content ${openIndex === index ? 'open' : 'closed'}`}
                        >
                            <p className="faq-text">{item.content}</p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default AccordionFAQ;