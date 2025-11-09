import {useState} from 'react';

const FAQQuestionsSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqItems = [
        {
            id: 1,
            question: "Comment nous contacter pour devenir bénévole ?",
            answer: (
                <>
                    <p>Tout d'abord, merci pour votre intérêt !</p>
                    <p>Pour découvrir les missions disponibles à la Croix-Rouge, plusieurs options :</p>
                    <ol>
                        <li>
                            <p>Consultez la liste des missions disponibles : <a href="#">toutes les missions de la
                                Croix-Rouge</a></p>
                        </li>
                        <li>
                            <p>Composez le <strong>01 44 43 13 00</strong> (prix d'un appel local), <strong>tapez
                                3</strong> et nous vous aiderons à trouver la mission qui vous conviendra</p>
                        </li>
                        <li>
                            <p>Vous pouvez également vous rendre directement dans une structure Croix-Rouge. Consultez
                                l'adresse et les <strong>horaires d'ouverture</strong> sur notre <a href="#">annuaire en
                                    ligne</a></p>
                        </li>
                    </ol>
                    <p>A très vite !</p>
                </>
            )
        },
        {
            id: 2,
            question: "Quels types de missions bénévoles proposons-nous ?",
            answer: (
                <>
                    <p>Nous proposons une grande diversité d'actions ! Vous pourrez agir auprès de différentes personnes
                        en situation de vulnérabilité : les familles, les enfants, les personnes âgées, les personnes
                        sans-abri, les migrants...</p>
                    <p>Et participer à tous types de missions : missions sociales, de secourisme, d'éducation, et bien
                        d'autres encore...</p>
                    <p>Consultez notre annuaire de mission en cliquant <a href="#">ICI</a></p>
                    <p>N'hésitez pas à nous contacter au <strong>01 44 43 13 00. En tapant</strong>&nbsp;<strong>3, nous
                        vous aiderons à trouver une mission !</strong></p>
                </>
            )
        },
        {
            id: 3,
            question: "Proposons-nous des missions bénévoles à l'étranger ?",
            answer: (
                <>
                    <p>La quasi-totalité de nos missions à l'international sont salariées.</p>
                    <p>Certaines de nos délégations mènent des opérations de coopération dans le cadre de l'aide
                        internationale décentralisée, mais cela reste marginal.</p>
                    <p>Vous pouvez toutefois contacter la&nbsp;<a href="#">délégation territoriale</a>&nbsp;de votre
                        département pour connaître ses activités.</p>
                </>
            )
        },
        {
            id: 4,
            question: "Est-ce possible de s'engager de manière ponctuelle ?",
            answer: (
                <>
                    <p>Nous nous adaptons à vos disponibilités. <strong>De bénévole d'un jour à bénévole
                        régulier</strong>, de quelques heures à un engagement plus conséquent, il y a forcément une
                        mission qui vous ressemble et vous convient.</p>
                    <p>Nous vous invitons à consulter la page : <a href="#">Je deviens bénévole</a>&nbsp;pour découvrir
                        les missions proposées au niveau local. Vous pouvez également nous appeler au <strong>01 44 43
                            13 00 (choix 3)</strong> et nous vous aiderons à trouver une mission près de chez vous !</p>
                </>
            )
        }
    ];

    return (
        <div className="fqs-wrapper">
            <style>{`
        * {
          box-sizing: border-box;
        }

        .fqs-wrapper {
          margin-bottom: 64px;
          padding-left: 24px;
          padding-right: 24px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }

        @media (min-width: 1100px) {
          .fqs-wrapper {
            margin-bottom: 88px;
            padding-left: 64px;
            padding-right: 64px;
          }
        }

        .fqs-container {
          width: 100%;
          max-width: 1170px;
          margin-left: auto;
          margin-right: auto;
          padding: 0;
        }

        .fqs-container-medium {
          max-width: 970px;
          margin-left: auto;
          margin-right: auto;
        }

        .fqs-section-head {
          margin-bottom: 3rem;
          text-align: center;
        }

        .fqs-section-title {
          margin: 0 0 1rem 0;
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.2;
        }

        @media (min-width: 700px) {
          .fqs-section-title {
            font-size: 2.4rem;
          }
        }

        .fqs-section-mark {
          padding: 2px 8px;
          border-radius: 2px;
          color: #fff;
          background-color: #075c68;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
          line-height: 1.5;
        }

        .fqs-accordion {
          margin-bottom: 8px;
          border: 1px solid #cdcdcd;
          border-radius: 4px;
          padding: 12px;
          transition: border-color 0.2s linear;
        }

        @media (min-width: 700px) {
          .fqs-accordion {
            padding: 16px;
          }
        }

        .fqs-accordion:hover {
          border-color: #e3001b;
        }

        .fqs-accordion-header {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          cursor: pointer;
        }

        .fqs-accordion-title {
          font-size: 1.8rem;
          font-weight: 600;
          transition: color 0.2s linear;
          margin: 0;
        }

        .fqs-accordion-header:hover .fqs-accordion-title {
          color: #e3001b;
        }

        .fqs-accordion-btn {
          width: 24px;
          height: 24px;
          min-width: 24px;
          font-size: 2.4rem;
          color: #e3001b;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: transform 0.3s ease;
        }

        .fqs-accordion-btn.open {
          transform: rotate(180deg);
        }

        .fqs-accordion-icon {
          width: 24px;
          height: 24px;
          fill: currentColor;
        }

        .fqs-accordion-content {
          margin-top: 12px;
          overflow: hidden;
          transition: max-height 0.3s ease, opacity 0.3s ease;
        }

        @media (min-width: 700px) {
          .fqs-accordion-content {
            margin-top: 16px;
          }
        }

        .fqs-accordion-content.closed {
          max-height: 0;
          opacity: 0;
          margin-top: 0;
        }

        .fqs-accordion-content.open {
          max-height: 1000px;
          opacity: 1;
        }

        .fqs-rich-text {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
        }

        @media (max-width: 699px) {
          .fqs-rich-text {
            font-size: 1.4rem;
            line-height: 1.5;
          }
        }

        @media (min-width: 700px) {
          .fqs-rich-text {
            gap: 32px;
            line-height: 1.45;
          }
        }

        .fqs-rich-text p,
        .fqs-rich-text ol {
          width: 100%;
          margin: 0;
        }

        .fqs-rich-text ol {
          list-style: none;
          padding-left: 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
          counter-reset: listnum;
        }

        .fqs-rich-text ol li {
          position: relative;
          margin-left: 23px;
        }

        .fqs-rich-text ol li:before {
          content: counters(listnum, ".") ".";
          counter-increment: listnum;
          position: absolute;
          color: #e3001b;
          left: -23px;
        }

        .fqs-rich-text a {
          color: #e3001b;
          transition: all 0.2s linear;
        }

        .fqs-rich-text a:hover {
          text-decoration: none;
        }

        @media print {
          .fqs-accordion-btn {
            display: none;
          }
          .fqs-accordion-content {
            max-height: none !important;
            opacity: 1 !important;
            margin-top: 16px !important;
          }
        }
      `}</style>

            <section className="fqs-wrapper">
                <div className="fqs-container">
                    <header className="fqs-section-head">
                        <h2 className="fqs-section-title">
                            Vous vous posez encore <span className="fqs-section-mark">des questions ?</span>
                        </h2>
                    </header>
                </div>
                <div className="fqs-container fqs-container-medium">
                    {faqItems.map((item, index) => (
                        <article key={item.id} className="fqs-accordion">
                            <div
                                className="fqs-accordion-header"
                                onClick={() => toggleAccordion(index)}
                                role="button"
                                aria-expanded={openIndex === index}
                            >
                                <h3 className="fqs-accordion-title">{item.question}</h3>
                                <button
                                    className={`fqs-accordion-btn ${openIndex === index ? 'open' : ''}`}
                                    aria-label={openIndex === index ? "Fermer" : "Ouvrir"}
                                    tabIndex="-1"
                                >
                                    <svg
                                        className="fqs-accordion-icon"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M7.41 8.58 12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42Z"></path>
                                    </svg>
                                </button>
                            </div>
                            <div className={`fqs-accordion-content ${openIndex === index ? 'open' : 'closed'}`}>
                                <div className="fqs-rich-text">
                                    {item.answer}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default FAQQuestionsSection;