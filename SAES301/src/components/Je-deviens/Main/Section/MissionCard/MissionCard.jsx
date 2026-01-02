import React, {useEffect, useRef, useState} from 'react';

const MissionCard = ({href, imageSrc, imageAlt, title}) => (
    <li className="block-cta-list__item">
        <a href={href} className="block-cta-list__card">
      <span className="block-cta-list__cover">
        <img src={imageSrc} alt={imageAlt} loading="lazy"/>
      </span>
            <span className="block-cta-list__text">
        <p className="block-cta-list__title">{title}</p>
        <span className="btn btn--plain btn--color-primary btn--medium">
          Je m'engage
        </span>
      </span>
        </a>
    </li>
);

export default function MissionsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(0);
    const [currentTranslate, setCurrentTranslate] = useState(0);
    const [prevTranslate, setPrevTranslate] = useState(0);
    const [itemsPerSlide, setItemsPerSlide] = useState(1);

    const carouselRef = useRef(null);

    const missions = [
        {
            href: '/trouver-une-mission-benevole?categories=first-aid',
            imageSrc: 'https://images.ctfassets.net/ksb78y40v1oe/5gg2ACz69Ko1F7qLR8fLdA/746c23cff4c2edbc544073c078b7d90a/IMG_1719.jpg?fm=webp&q=85&w=404&h=350&fit=thumb',
            imageAlt: '',
            title: 'Urgence et opérations de secours'
        },
        {
            href: '/trouver-une-mission-benevole?categories=reception,visiting,operator',
            imageSrc: 'https://images.ctfassets.net/ksb78y40v1oe/2xyPhFAGI8D1kqdCVP7CPv/c6e8ac36c44deb3ff5571408f1919818/Aide_alimentaire.jpg?fm=webp&q=85&w=404&h=350&fit=thumb',
            imageAlt: 'Aide alimentaire',
            title: 'Action sociale'
        },
        {
            href: '/trouver-une-mission-benevole?categories=health,psycho-support,operator',
            imageSrc: 'https://images.ctfassets.net/ksb78y40v1oe/4j3oWNvhj4gmfQUtCX3dmr/98f38db1e845ee1f90e22c40400f0b13/Croix-Rouge_Ecoute__25_ans_de_pr_sence?fm=webp&q=85&w=404&h=350&fit=thumb',
            imageAlt: '',
            title: 'Soutien psychologique, médico social et sanitaire'
        },
        {
            href: '/trouver-une-mission-benevole',
            imageSrc: 'https://images.ctfassets.net/ksb78y40v1oe/5NagIe7loPe0vPw6BO3vI7/a6cd7badba969b27e04b3395ccd83bd4/b__nvole_chez_henry.jpg?fm=webp&q=85&w=404&h=350&fit=thumb',
            imageAlt: 'Vos achats permettent de financer nos actions sociales',
            title: "Parcourez tous nos domaines d'activité"
        },
    ];

    const updateItemsPerSlide = () => {
        const width = window.innerWidth;
        if (width >= 1100) setItemsPerSlide(3);
        else if (width >= 700) setItemsPerSlide(2);
        else setItemsPerSlide(1);
    };

    useEffect(() => {
        updateItemsPerSlide();
        window.addEventListener('resize', updateItemsPerSlide);
        return () => window.removeEventListener('resize', updateItemsPerSlide);
    }, []);

    const totalSlides = Math.ceil(missions.length / itemsPerSlide);

    const goToSlide = (index) => {
        setCurrentIndex(index);
        const translateValue = -(index * (100 / itemsPerSlide));
        setPrevTranslate(translateValue);
        setCurrentTranslate(translateValue);
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
        goToSlide(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    };

    const touchStart = (index) => (e) => {
        setCurrentIndex(index);
        setIsDragging(true);
        setStartPos(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
    };

    const touchMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
        const diff = currentPosition - startPos;
        setCurrentTranslate(prevTranslate + (diff / carouselRef.current.offsetWidth) * 100);
    };

    const touchEnd = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -10 && currentIndex < totalSlides - 1) goToNext();
        else if (movedBy > 10 && currentIndex > 0) goToPrevious();
        else setCurrentTranslate(prevTranslate);
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.style.transform = `translateX(${currentTranslate}%)`;
        }
    }, [currentTranslate]);

    return (
        <section className="wrapper">
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                /* Wrapper */
                .wrapper {
                    margin-bottom: 64px;
                    padding-left: 24px;
                    padding-right: 24px;
                    transition: background-size 0.2s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                @media (min-width: 1100px) {
                    .wrapper {
                        margin-bottom: 88px;
                        padding-left: 64px;
                        padding-right: 64px;
                    }
                }

                .wrapper .container {
                    padding: 0;
                }

                /* Container */
                .container {
                    width: 100%;
                    max-width: 1170px;
                    margin-left: auto;
                    margin-right: auto;
                    padding: 24px;
                }

                @media (min-width: 1100px) {
                    .container {
                        padding: 0;
                    }
                }

                /* Section Head */
                .section-head {
                    margin-bottom: 3rem;
                }

                @media (max-width: 699px) {
                    .section-head {
                        text-align: center;
                    }
                }

                .section-head--center {
                    text-align: center;
                }

                .section-head__title {
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                }

                @media (min-width: 700px) {
                    .section-head__title {
                        font-size: 2.4rem;
                    }
                }

                /* Button */
                .btn {
                    overflow: hidden;
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    max-width: 100%;
                    min-height: 24px;
                    padding: 2px;
                    vertical-align: middle;
                    line-height: 1;
                    font-weight: 600;
                    text-decoration: none;
                    text-align: center;
                    text-shadow: none;
                    color: inherit;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    -webkit-appearance: none;
                    border: none;
                }

                .btn:disabled {
                    border-color: transparent;
                    color: #767676;
                    cursor: default;
                }

                .btn--plain {
                    min-width: 140px;
                    min-height: 50px;
                    border-radius: 4px;
                    padding-left: 12px;
                    padding-right: 12px;
                    color: #fff;
                    background-color: #000;
                }

                @media (min-width: 1100px) {
                    .btn--plain {
                        padding-right: 24px;
                        padding-left: 24px;
                    }
                }

                .btn--plain:disabled {
                    background-color: #f6f7fa;
                }

                .btn--plain:not([disabled]):focus,
                .btn--plain:not([disabled]):hover {
                    background-color: #767676;
                }

                .btn--color-primary.btn--plain {
                    background-color: #e3001b;
                }

                .btn--color-primary.btn--plain:not([disabled]):focus,
                .btn--color-primary.btn--plain:not([disabled]):hover {
                    background-color: #970b13;
                }

                .btn--medium {
                    font-size: 1.4rem;
                }

                .btn--medium.btn--plain {
                    min-height: 50px;
                }

                /* Carousel Container */

                .carousel-container {
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .carousel-wrapper {
                    overflow: hidden;
                    position: relative;
                    width: 100%;
                }

                /* Carousel Track */
                .carousel-track {
                    display: flex;
                    transition: transform 0.3s ease-out;
                    cursor: grab;
                    padding: 0;
                    margin: 0;
                    list-style: none;
                }

                .carousel-track:active {
                    cursor: grabbing;
                }

                /* Carousel Buttons */
                .carousel-btn {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 50px;
                    border: none;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.9);
                    color: #e3001b;
                    font-size: 2rem;
                    font-weight: bold;
                    cursor: pointer;
                    z-index: 10;
                    transition: all 0.2s ease-in-out;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .carousel-btn:hover {
                    background-color: #e3001b;
                    color: #fff;
                    transform: translateY(-50%) scale(1.1);
                }

                .carousel-btn--prev {
                    left: -25px;
                }

                .carousel-btn--next {
                    right: -25px;
                }

                @media (max-width: 1100px) {
                    .carousel-btn--prev {
                        left: 0;
                    }

                    .carousel-btn--next {
                        right: 0;
                    }
                }

                /* Carousel Dots */
                .carousel-dots {
                    display: flex;
                    justify-content: center;
                    gap: 10px;
                    margin-top: 30px;
                }

                .carousel-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: 2px solid #e3001b;
                    background-color: transparent;
                    cursor: pointer;
                    transition: all 0.2s ease-in-out;
                    padding: 0;
                }

                .carousel-dot:hover {
                    background-color: rgba(227, 0, 27, 0.5);
                }

                .carousel-dot--active {
                    background-color: #e3001b;
                }

                /* Block CTA List */
                .block-cta-list {
                    gap: 30px;
                }

                .block-cta-list__item {
                    flex: 0 0 auto;
                    max-width: 100%;
                    min-width: 100%;
                    list-style: none;
                }

                @media (min-width: 700px) {
                    .block-cta-list__item {
                        flex: 0 0 calc(50% - 15px);
                        max-width: calc(50% - 15px);
                        min-width: calc(50% - 15px);
                    }
                }

                @media (min-width: 1100px) {
                    .block-cta-list__item {
                        flex: 0 0 calc(33.333% - 20px);
                        max-width: calc(33.333% - 20px);
                        min-width: calc(33.333% - 20px);
                    }
                }

                .block-cta-list__card {
                    display: block;
                    color: inherit;
                    text-align: center;
                    text-decoration: inherit;
                }

                .block-cta-list__cover {
                    display: block;
                    overflow: hidden;
                    height: 220px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    background-color: #f6f7fa;
                }

                @media (min-width: 1100px) {
                    .block-cta-list__cover {
                        height: 320px;
                    }
                }

                .block-cta-list__cover img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .block-cta-list__text {
                    position: relative;
                    display: block;
                    min-height: 120px;
                    margin-left: 16px;
                    margin-right: 16px;
                    margin-top: -40px;
                    padding: 16px;
                    background-color: #fff;
                }

                @media (min-width: 1100px) {
                    .block-cta-list__text {
                        margin-left: 32px;
                        margin-right: 32px;
                        margin-top: -64px;
                        padding: 24px;
                    }
                }

                .block-cta-list__title {
                    display: block;
                    margin-bottom: 1.5rem;
                    font-size: 1.6rem;
                    font-weight: 600;
                    line-height: 1.2;
                    transition: color 0.2s ease-out;
                }

                @media (min-width: 700px) {
                    .block-cta-list__title {
                        font-size: 1.8rem;
                    }
                }

                .block-cta-list__card:focus .block-cta-list__title,
                .block-cta-list__card:hover .block-cta-list__title {
                    color: #e3001b;
                }

                .block-cta-list__card:focus .btn--plain.btn--color-primary,
                .block-cta-list__card:hover .btn--plain.btn--color-primary {
                    background-color: #970b13;
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <div className="container">
                <header className="section-head section-head--center">
                    <h2 className="section-head__title">
                        Trouvez la mission dans le domaine d'activité qui vous emporte !
                    </h2>
                </header>

                <div className="carousel-container">
                    <button
                        className="carousel-btn carousel-btn--prev"
                        onClick={goToPrevious}
                        aria-label="Précédent"
                    >
                        ‹
                    </button>

                    <div className="carousel-wrapper">
                        <ul
                            className="block-cta-list carousel-track"
                            ref={carouselRef}
                            onMouseDown={touchStart(currentIndex)}
                            onMouseMove={touchMove}
                            onMouseUp={touchEnd}
                            onMouseLeave={() => isDragging && touchEnd()}
                            onTouchStart={touchStart(currentIndex)}
                            onTouchMove={touchMove}
                            onTouchEnd={touchEnd}
                        >
                            {missions.map((mission, index) => (
                                <MissionCard key={index} {...mission} />
                            ))}
                        </ul>
                    </div>

                    <button
                        className="carousel-btn carousel-btn--next"
                        onClick={goToNext}
                        aria-label="Suivant"
                    >
                        ›
                    </button>
                </div>

                <div className="carousel-dots">
                    {Array.from({length: totalSlides}).map((_, index) => (
                        <button
                            key={index}
                            className={`carousel-dot ${index === currentIndex ? 'carousel-dot--active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Aller à la slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}