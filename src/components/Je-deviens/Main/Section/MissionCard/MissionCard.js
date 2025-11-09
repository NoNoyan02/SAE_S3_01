import React, {useEffect, useRef, useState} from 'react';
import './MissionCard.css';

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
        }
    ];

    const goToSlide = (index) => {
        setCurrentIndex(index);
        const translateValue = -index * 100;
        setPrevTranslate(translateValue);
        setCurrentTranslate(translateValue);
    };

    const goToPrevious = () => {
        const newIndex = currentIndex === 0 ? missions.length - 1 : currentIndex - 1;
        goToSlide(newIndex);
    };

    const goToNext = () => {
        const newIndex = currentIndex === missions.length - 1 ? 0 : currentIndex + 1;
        goToSlide(newIndex);
    };

    const touchStart = (index) => (e) => {
        setCurrentIndex(index);
        setIsDragging(true);
        setStartPos(e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);
    };

    const touchMove = (e) => {
        if (isDragging) {
            const currentPosition = e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
            const diff = currentPosition - startPos;
            setCurrentTranslate(prevTranslate + (diff / carouselRef.current.offsetWidth) * 100);
        }
    };

    const touchEnd = () => {
        setIsDragging(false);
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -10 && currentIndex < missions.length - 1) {
            goToNext();
        } else if (movedBy > 10 && currentIndex > 0) {
            goToPrevious();
        } else {
            setCurrentTranslate(prevTranslate);
        }
    };

    useEffect(() => {
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.style.transform = `translateX(${currentTranslate}%)`;
        }
    }, [currentTranslate]);

    return (
        <section className="wrapper">
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
                    {missions.map((_, index) => (
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