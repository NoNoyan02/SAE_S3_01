import React, {useEffect, useRef, useState} from 'react';

// Composants

import Hero from "../components/Je-deviens/Main/Hero/Hero.jsx";
import SearchBar from "../components/Je-deviens/Main/SearchBar/SearchBar.jsx";
import SEO from "@/components/SEO.jsx";

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

export default function JeDeviens() {
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
        <>
            <SEO
                title="Je deviens bénévole"
                description="Envie de devenir bénévole à la Croix-Rouge, rejoignez notre association. Merci pour votre engagement"
                image="/crf_logo.png"
            />

            <Hero/>
            <SearchBar/>
            <section className="volunteer-section">
                {/* DÉBUT DU CSS INTÉGRÉ */}
                <style>{`.volunteer-section {
  box-sizing: border-box;
  margin-bottom: 88px;
  padding-left: 64px;
  padding-right: 64px;
  transition: background-size 0.2s ease-out;
  color: rgb(16, 16, 16);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 22.4px;
  background-color: rgb(255, 255, 255);
}

.volunteer-wrapper {
  box-sizing: border-box;
}

.volunteer-header {
  box-sizing: border-box;
  margin-bottom: 30px;
  text-align: center;
}

.volunteer-header-inner {
  box-sizing: border-box;
}

.volunteer-title {
  box-sizing: border-box;
  font-weight: 700;
  margin: 0 0 10px;
  font-size: 24px;
  line-height: 28.8px;
}

.volunteer-content-wrapper {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 970px;
  width: 100%;
}

.volunteer-content {
  box-sizing: border-box;
  gap: 32px;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  line-height: 23.2px;
}

.volunteer-item {
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.bullet-point {
  box-sizing: border-box;
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  background-color: rgb(16, 16, 16);
  border-radius: 50%;
  margin-top: 8px;
}

.volunteer-paragraph {
  box-sizing: border-box;
  margin: 0;
  flex: 1;
}

.volunteer-strong {
  box-sizing: border-box;
  font-weight: 700;
}

.volunteer-button-wrapper {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
}

.volunteer-button {
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  transition: 0.2s ease-in-out;
  align-items: center;
  appearance: none;
  gap: 8px;
  cursor: pointer;
  display: flex;
  font-weight: 600;
  justify-content: center;
  line-height: 14px;
  max-width: 100%;
  min-height: 32px;
  overflow: hidden;
  padding: 12px 24px;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border-radius: 4px;
  min-width: 140px;
  background-color: rgb(227, 0, 27);
  font-size: 14px;
}

.volunteer-button:hover {
  background-color: rgb(200, 0, 24);
}

.mission-section {
  box-sizing: border-box;
  margin-bottom: 88px;
  padding-left: 64px;
  padding-right: 64px;
  transition: background-size 0.2s ease-out;
  color: rgb(16, 16, 16);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 22.4px;
  background-color: rgb(255, 255, 255);
}

.mission-container {
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  max-width: 1170px;
  width: 100%;
}

.mission-layout {
  box-sizing: border-box;
  align-items: center;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  justify-content: center;
}

.mission-text-block {
  box-sizing: border-box;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.mission-heading {
  box-sizing: border-box;
  font-weight: 700;
  margin: 0 0 24px;
  font-size: 24px;
  line-height: 28.8px;
  max-width: 536px;
}

.mission-description {
  box-sizing: border-box;
  gap: 32px;
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  line-height: 23.2px;
}

.mission-paragraph {
  box-sizing: border-box;
  margin: 0;
  max-width: 536px;
}

.mission-link {
  box-sizing: border-box;
  color: rgb(227, 0, 27);
  transition: 0.2s linear;
  text-decoration: underline;
}

.mission-link:hover {
  color: rgb(200, 0, 24);
}

.mission-button-wrapper {
  box-sizing: border-box;
  margin: 0;
}

.mission-button {
  box-sizing: border-box;
  color: rgb(255, 255, 255);
  transition: 0.2s ease-in-out;
  align-items: center;
  appearance: none;
  gap: 8px;
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  justify-content: center;
  line-height: 14px;
  max-width: 100%;
  min-height: 50px;
  overflow: hidden;
  padding: 2px 24px;
  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  border-radius: 4px;
  min-width: 140px;
  background-color: rgb(227, 0, 27);
  font-size: 14px;
  margin-top: 24px;
}

.mission-button:hover {
  background-color: rgb(200, 0, 24);
}

.mission-image {
  box-sizing: border-box;
  height: 400px;
  vertical-align: middle;
  max-width: 50%;
  object-fit: cover;
  margin-left: 64px;
  min-width: auto;
  width: 570px;
}

.block-content-simple__wrapper {
  margin-bottom: 64px;
  padding: 0 24px;
  transition: background-size 0.2s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.block-content-simple__container {
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 24px;
}

.block-content-simple {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}

.block-content-simple--img-left {
  flex-direction: column-reverse;
}

.block-content-simple__texts {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.block-content-simple__title {
  width: 100%;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  margin-bottom: 16px;
  margin-top: 0;
}

.full-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  grid-gap: 24px;
}

.full-rich-text > p {
  width: 100%;
  margin: 0;
}

.block-content-simple__btn {
  margin-top: 16px;
}

.block-content-simple__img {
  object-fit: cover;
}

.block-content-simple__img--left {
  margin-right: 0;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 24px;
  padding: 2px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  position: relative;
  max-width: 100%;
  vertical-align: middle;
  line-height: 1;
  text-align: center;
  text-shadow: none;
  color: inherit;
  -webkit-appearance: none;
  border: none;
}

.btn--plain {
  min-width: 140px;
  min-height: 50px;
  border-radius: 4px;
  padding: 0 12px;
  color: #fff;
  background-color: #000;
  padding-left: 12px;
  padding-right: 12px;
}

.btn--plain:hover,
                .btn--plain:focus {
  background-color: #767676;
}

.btn--color-primary.btn--plain {
  background-color: #e3001b;
}

.btn--color-primary.btn--plain:hover,
                .btn--color-primary.btn--plain:focus {
  background-color: #970b13;
}

.btn--medium {
  font-size: 1.4rem;
}

.block-content-richtext__wrapper {
  margin-bottom: 88px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.container--shrink {
  max-width: 312px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.section-head {
  margin-bottom: 3rem;
}

.section-head--center {
  text-align: center;
}

.section-head__title {
  margin-bottom: 1rem;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: #000;
}

.section-head__mark {
  padding: 2px 8px;
  border-radius: 2px;
  color: #fff;
  background-color: #e3001b;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  line-height: 1.5;
}

.section-head--secondary .section-head__mark {
  background-color: #075c68;
}

.wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  transition: background-size 0.2s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.wrapper .container {
  padding: 0;
}

.container {
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
}

.btn:disabled {
  border-color: transparent;
  color: #767676;
  cursor: default;
}

.btn--plain:disabled {
  background-color: #f6f7fa;
}

.btn--plain:not([disabled]):focus,
                .btn--plain:not([disabled]):hover {
  background-color: #767676;
}

.btn--color-primary.btn--plain:not([disabled]):focus,
                .btn--color-primary.btn--plain:not([disabled]):hover {
  background-color: #970b13;
}

.btn--medium.btn--plain {
  min-height: 50px;
}

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

.block-cta-list {
  gap: 30px;
}

.block-cta-list__item {
  flex: 0 0 auto;
  max-width: 100%;
  min-width: 100%;
  list-style: none;
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

.block-cta-list__title {
  display: block;
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  line-height: 1.2;
  transition: color 0.2s ease-out;
}

.block-cta-list__card:focus .block-cta-list__title,
                .block-cta-list__card:hover .block-cta-list__title {
  color: #e3001b;
}

.block-cta-list__card:focus .btn--plain.btn--color-primary,
                .block-cta-list__card:hover .btn--plain.btn--color-primary {
  background-color: #970b13;
}

.skills-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  transition: background-size 0.2s ease-out;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}

.skills-wrapper .skills-container {
  padding: 0;
}

.skills-container {
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 24px;
}

.skills-container--narrow {
  max-width: 312px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.skills-richtext {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.skills-richtext > p {
  width: 100%;
  margin: 0;
}

.faq-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

* {
  box-sizing: border-box;
}

.vh-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

.vh-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.vh-rich-text p {
  width: 100%;
  margin: 0;
}

.ch-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

.ch-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
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

.hv-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

.hv-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
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

.hh-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.hh-container {
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.hh-block-content {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}

.hh-texts {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hh-title {
  width: 100%;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.hh-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.hh-rich-text p {
  width: 100%;
  margin: 0;
}

.hh-img {
  object-fit: cover;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

.er-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.er-container {
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.er-block-content {
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
}

.er-texts {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.er-title {
  width: 100%;
  font-size: 2rem;
  line-height: 1.2;
  font-weight: 700;
  margin: 0 0 16px 0;
}

.er-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.er-rich-text p {
  width: 100%;
  margin: 0;
}

.er-img {
  object-fit: cover;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
}

.wv-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.wv-container {
  width: 100%;
  max-width: 1170px;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
}

.wv-container-shrink {
  max-width: 312px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.wv-section-head {
  margin-bottom: 3rem;
  text-align: center;
}

.wv-section-title {
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.wv-rich-text {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.wv-rich-text p,
        .wv-rich-text ul {
  width: 100%;
  margin: 0;
}

.wv-rich-text ul {
  list-style: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.wv-rich-text ul li {
  position: relative;
  margin-left: 23px;
  margin-bottom: 6px;
}

.wv-rich-text ul li:before {
  content: "";
  position: absolute;
  width: 15px;
  height: 2px;
  background-color: #e3001b;
  top: 11px;
  left: -23px;
  border-radius: 2px;
}

.wv-rich-text a {
  color: #e3001b;
  transition: all 0.2s linear;
}

.wv-rich-text a:hover {
  text-decoration: none;
}

.ts-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

.ts-section-subtitle {
  font-weight: 300;
  font-size: 1.8rem;
  line-height: 1.2;
  margin: 0;
}

.ts-testimonial-card {
  display: block;
  position: relative;
  margin-left: 10px;
  padding: 20px 20px 20px 64px;
  font-size: 1.4rem;
}

.ts-testimonial-card:before {
  content: "";
  position: absolute;
  left: 24px;
  height: 100%;
  width: 1px;
  background-color: #cdcdcd;
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

.ts-quote-svg {
  width: 26px;
  height: 16px;
  fill: currentColor;
}

.ts-testimonial-text {
  margin: 0;
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

.sg-step-item {
  flex: 1;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  padding: 32px;
  background-color: #fff;
  counter-increment: steps;
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

.sg-step-title {
  display: block;
  margin: 0 0 1rem 0;
  font-weight: 600;
}

.sg-step-description {
  display: block;
  margin: 0;
}

.fqs-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

.fa-wrapper {
  margin-bottom: 64px;
  padding-left: 24px;
  padding-right: 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
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

.fa-rich-text p {
  width: 100%;
  margin: 0;
}

@media (max-width: 768px) {
  .volunteer-section {
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 48px;
  }
  
  .volunteer-content-wrapper {
    max-width: 100%;
  }
  
  .volunteer-button {
    width: 100%;
  }
}

@media (max-width: 1024px) {
  .mission-layout {
    flex-direction: column;
    gap: 32px;
  }
  
  .mission-image {
    margin-left: 0;
    max-width: 100%;
    width: 100%;
  }
  
  .mission-heading,
                      .mission-paragraph {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .mission-section {
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 48px;
  }
  
  .mission-heading {
    font-size: 20px;
    line-height: 24px;
  }
  
  .mission-button {
    width: 100%;
  }
}

@media (min-width: 1100px) {
  .block-content-simple__wrapper {
    margin-bottom: 88px;
    padding: 0 64px;
  }
}

@media (min-width: 1100px) {
  .block-content-simple__container {
    padding: 0;
  }
}

@media (min-width: 700px) {
  .block-content-simple {
    flex-direction: row;
    font-size: medium;
  }
}

@media (min-width: 700px) {
  .block-content-simple--img-left {
    flex-direction: row-reverse;
  }
}

@media (min-width: 700px) {
  .block-content-simple__title {
    font-size: 2.4rem;
    margin-bottom: 24px;
  }
}

@media (max-width: 699px) {
  .full-rich-text {
    font-size: 1.4rem;
    line-height: 1.5;
  }
}

@media (min-width: 700px) {
  .full-rich-text {
    gap: 32px;
    line-height: 1.45;
  }
}

@media (min-width: 700px) {
  .block-content-simple__btn {
    margin-top: 24px;
  }
}

@media (max-width: 699px) {
  .block-content-simple__img {
    height: 220px;
    margin-bottom: 32px;
  }
}

@media (min-width: 700px) {
  .block-content-simple__img {
    max-width: 50%;
    min-width: 50%;
    margin-left: 64px;
  }
}

@media (min-width: 1100px) {
  .block-content-simple__img {
    width: 570px;
    height: 400px;
  }
}

@media (min-width: 700px) {
  .block-content-simple__img--left {
    margin-right: 64px;
    margin-left: 0;
  }
}

@media (min-width: 700px) and (max-width: 1099px) {
  .container--shrink {
    padding: 0 24px;
  }
}

@media (min-width: 700px) {
  .container--shrink {
    max-width: 970px;
  }
}

@media (max-width: 699px) {
  .full-rich-text {
    font-size: 1.4rem;
    line-height: 1.5;
  }
  
  .section-head {
    text-align: center;
  }
}

@media (min-width: 700px) {
  .full-rich-text {
    gap: 32px;
    grid-gap: 32px;
    line-height: 1.45;
  }
  
  .section-head__title {
    font-size: 2.4rem;
  }
}

@media (min-width: 1100px) {
  .wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 1100px) {
  .container {
    padding: 0;
  }
}

@media (max-width: 699px) {
  .section-head {
    text-align: center;
  }
}

@media (min-width: 700px) {
  .section-head__title {
    font-size: 2.4rem;
  }
}

@media (min-width: 1100px) {
  .btn--plain {
    padding-right: 24px;
    padding-left: 24px;
  }
}

@media (max-width: 1100px) {
  .carousel-btn--prev {
    left: 0;
  }
  
  .carousel-btn--next {
    right: 0;
  }
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

@media (min-width: 1100px) {
  .block-cta-list__cover {
    height: 320px;
  }
}

@media (min-width: 1100px) {
  .block-cta-list__text {
    margin-left: 32px;
    margin-right: 32px;
    margin-top: -64px;
    padding: 24px;
  }
}

@media (min-width: 700px) {
  .block-cta-list__title {
    font-size: 1.8rem;
  }
}

@media (min-width: 1100px) {
  .skills-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 1100px) {
  .skills-container {
    padding: 0;
  }
}

@media (min-width: 700px) and (max-width: 1099px) {
  .skills-container--narrow {
    padding: 0 24px;
  }
}

@media (min-width: 700px) {
  .skills-container--narrow {
    max-width: 970px;
  }
}

@media (max-width: 699px) {
  .skills-richtext {
    font-size: 1.4rem;
    line-height: 1.5;
  }
}

@media (min-width: 700px) {
  .skills-richtext {
    gap: 32px;
    line-height: 1.45;
  }
}

@media (min-width: 1100px) {
  .faq-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .faq-item {
    padding: 16px;
  }
}

@media (min-width: 700px) {
  .faq-content {
    margin-top: 16px;
  }
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

@media (min-width: 1100px) {
  .vh-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
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

@media (min-width: 700px) {
  .vh-section-title {
    font-size: 2.4rem;
  }
}

@media (min-width: 700px) {
  .vh-section-subtitle {
    font-size: 2rem;
  }
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

@media (min-width: 1100px) {
  .ch-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .ch-block-content {
    flex-direction: row-reverse;
    font-size: medium;
  }
}

@media (min-width: 700px) {
  .ch-title {
    font-size: 2.4rem;
    margin-bottom: 24px;
  }
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

@media (min-width: 1100px) {
  .hv-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .hv-block-content {
    flex-direction: row;
    font-size: medium;
  }
}

@media (min-width: 700px) {
  .hv-title {
    font-size: 2.4rem;
    margin-bottom: 24px;
  }
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

@media (min-width: 1100px) {
  .hh-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .hh-block-content {
    flex-direction: row-reverse;
    font-size: medium;
  }
}

@media (min-width: 700px) {
  .hh-title {
    font-size: 2.4rem;
    margin-bottom: 24px;
  }
}

@media (max-width: 699px) {
  .hh-rich-text {
    font-size: 1.4rem;
    line-height: 1.5;
  }
}

@media (min-width: 700px) {
  .hh-rich-text {
    gap: 32px;
    line-height: 1.45;
  }
}

@media (max-width: 699px) {
  .hh-img {
    height: 220px;
    margin-bottom: 32px;
  }
}

@media (min-width: 700px) {
  .hh-img {
    max-width: 50%;
    min-width: 50%;
    margin-right: 64px;
    margin-left: 0;
  }
}

@media (min-width: 1100px) {
  .hh-img {
    min-width: unset;
    width: 570px;
    height: 400px;
  }
}

@media (min-width: 1100px) {
  .er-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .er-block-content {
    flex-direction: row;
    font-size: medium;
  }
}

@media (min-width: 700px) {
  .er-title {
    font-size: 2.4rem;
    margin-bottom: 24px;
  }
}

@media (max-width: 699px) {
  .er-rich-text {
    font-size: 1.4rem;
    line-height: 1.5;
  }
}

@media (min-width: 700px) {
  .er-rich-text {
    gap: 32px;
    line-height: 1.45;
  }
}

@media (max-width: 699px) {
  .er-img {
    height: 220px;
    margin-bottom: 32px;
  }
}

@media (min-width: 700px) {
  .er-img {
    max-width: 50%;
    min-width: 50%;
    margin-left: 64px;
  }
}

@media (min-width: 1100px) {
  .er-img {
    min-width: unset;
    width: 570px;
    height: 400px;
  }
}

@media (min-width: 1100px) {
  .wv-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) and (max-width: 1099px) {
  .wv-container-shrink {
    padding: 0 24px;
  }
}

@media (min-width: 700px) {
  .wv-container-shrink {
    max-width: 970px;
  }
}

@media (min-width: 700px) {
  .wv-section-title {
    font-size: 2.4rem;
  }
}

@media (max-width: 699px) {
  .wv-rich-text {
    font-size: 1.4rem;
    line-height: 1.5;
  }
}

@media (min-width: 700px) {
  .wv-rich-text {
    gap: 32px;
    line-height: 1.45;
  }
}

@media (min-width: 1100px) {
  .ts-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .ts-section-title {
    font-size: 2.4rem;
  }
}

@media (min-width: 700px) {
  .ts-section-subtitle {
    font-size: 2rem;
  }
}

@media (min-width: 700px) {
  .ts-testimonial-card {
    padding-left: 80px;
    padding-right: 80px;
    font-size: 1.6rem;
  }
}

@media (min-width: 700px) {
  .ts-testimonial-card:before {
    left: 32px;
  }
}

@media (min-width: 700px) {
  .ts-quote-icon {
    width: 64px;
  }
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

@media (min-width: 700px) {
  .sg-steps-list {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
  }
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

@media (min-width: 1100px) {
  .sg-step-item:before {
    width: 64px;
    height: 64px;
  }
}

@media (min-width: 1100px) {
  .fqs-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
}

@media (min-width: 700px) {
  .fqs-section-title {
    font-size: 2.4rem;
  }
}

@media (min-width: 700px) {
  .fqs-accordion {
    padding: 16px;
  }
}

@media (min-width: 700px) {
  .fqs-accordion-content {
    margin-top: 16px;
  }
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

@media (min-width: 1100px) {
  .fa-wrapper {
    margin-bottom: 88px;
    padding-left: 64px;
    padding-right: 64px;
  }
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

@media (min-width: 700px) {
  .fa-section-title {
    font-size: 2.4rem;
  }
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

            `}</style>

                <div className="volunteer-wrapper">
                    <header className="volunteer-header">
                        <div className="volunteer-header-inner">
                            <h2 className="volunteer-title">
                                Pourquoi devenir bénévole à la Croix-Rouge ?
                            </h2>
                        </div>
                    </header>
                </div>
                <div className="volunteer-content-wrapper">
                    <div className="volunteer-content">
                        <div className="volunteer-item">
                            <div className="bullet-point"></div>
                            <p className="volunteer-paragraph">
                                Vous avez envie de vous sentir utile ? Vous voulez aider les personnes
                                vulnérables ? Vous souhaitez mener en équipe des projets solidaires
                                valorisants ?
                            </p>
                        </div>

                        <div className="volunteer-item">
                            <div className="bullet-point"></div>
                            <p className="volunteer-paragraph">
                                Autant de bonnes raisons de rejoindre les 60 000 bénévoles de la
                                Croix-Rouge française !
                            </p>
                        </div>

                        <div className="volunteer-item">
                            <div className="bullet-point"></div>
                            <p className="volunteer-paragraph">
                                <strong className="volunteer-strong">
                                    Formateur aux gestes qui sauvent, maraudeur à la rencontre des
                                    personnes sans-abri, secouriste, animateur jeunesse
                                </strong>
                                …, il y a forcément une mission de bénévolat pour vous.
                            </p>
                        </div>

                        <div className="volunteer-item">
                            <div className="bullet-point"></div>
                            <p className="volunteer-paragraph">
                                Devenir bénévole, c'est tout simple : selon vos disponibilités, nous
                                trouvons près de chez vous la mission qui vous correspond, et nous vous
                                formerons en quelques jours.
                            </p>
                        </div>

                        <div className="volunteer-button-wrapper">
                            <a href="/trouver-une-mission-benevole" className="volunteer-button">
                                On vous attend !
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mission-section">

                <div className="mission-container">
                    <div className="mission-layout">
                        <div className="mission-text-block">
                            <h2 className="mission-heading">
                                Des missions bénévoles pour vous réaliser
                            </h2>
                            <div className="mission-description">
                                <p className="mission-paragraph">
                                    Les bénévoles de la Croix-Rouge française agissent pour prévenir et
                                    apaiser les souffrances humaines. Parmi{' '}
                                    <a href="/quelle-mission-est-faite-pour-vous" className="mission-link">
                                        toutes les missions bénévoles
                                    </a>{' '}
                                    proposées par nos structures, il y en a forcément une pour vous.
                                    Rejoignez-nous et mettez vos talents au service d'une belle cause. A
                                    nos côtés vous apprendrez, vous serez formé et accompagné dans vos
                                    activités bénévoles et vos projets.
                                </p>
                            </div>
                            <p className="mission-button-wrapper">
                                <a
                                    href="https://www.croix-rouge.fr/trouver-une-mission-benevole"
                                    className="mission-button"
                                >
                                    Je trouve une mission
                                </a>
                            </p>
                        </div>
                        <img
                            src="https://images.ctfassets.net/ksb78y40v1oe/3tGea9FIguXZzRx8hS0JDq/1d438a62b6908f86dd655ce9ef24aae1/Page_carrefour_Don_patrimoine.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                            alt="Bénévole de la Croix-Rouge"
                            loading="lazy"
                            className="mission-image"
                        />
                    </div>
                </div>
            </section>
            <section
                className="block-content-simple__wrapper"
                id="des-missions-benevoles-a-linternational"
            >

                <div className="block-content-simple__container">
                    <div className="block-content-simple block-content-simple--img-left">
                        <div className="block-content-simple__texts">
                            <h2 className="block-content-simple__title">
                                Des missions bénévoles à l'international
                            </h2>
                            <div className="full-rich-text">
                                <p>
                                    Déployées une soixantaine de fois depuis leur création, les ERU
                                    (Équipes de Réponse aux Urgences) sont intervenues dans des
                                    contextes aussi différents que des tremblements de terre, des
                                    inondations, des épidémies ou encore des déplacements de
                                    population. Les hommes et les femmes qui constituent ces équipes
                                    de techniciens volontaires ont tous suivi une formation
                                    spécifique et sont dotés d’équipements standards conditionnés
                                    et prêts à l’expédition.
                                </p>
                            </div>
                            <p>
                                <a
                                    href="/nos-actions-a-l-international/les-equipes-de-reponses-aux-urgences-humanitaires"
                                    className="btn block-content-simple__btn btn--plain btn--color-primary btn--medium"
                                >
                                    Je me renseigne
                                </a>
                            </p>
                        </div>

                        <img
                            src="https://images.ctfassets.net/ksb78y40v1oe/7lYZ2bRJLWL64bsnqBgo6T/17e13d266291fa080f20c635ca345339/p-HTI2371_ERU_Marko_Kokic-Canadian_Red_Cross-IFRC_700x450.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                            alt="Équipes de Réponse aux Urgences"
                            className="block-content-simple__img block-content-simple__img--left"
                            loading="lazy"
                        />
                    </div>
                </div>
            </section>
            <section
                className="block-content-richtext__wrapper"
                id="Je-deviens-benevole-a-la-Croix-Rouge"
            >

                <div className="block-content-richtext__container">
                    <header className="section-head section-head--center section-head--secondary section-head--medium">
                        <div>
                            <h2 className="section-head__title">
                                Envie de rejoindre notre{" "}
                                <span className="section-head__mark">communauté</span> ?
                            </h2>
                        </div>
                    </header>
                </div>

                <div className="block-content-richtext__container container--shrink">
                    <div className="full-rich-text">
                        <p>
                            Nous vous proposons plus d'une centaine de missions bénévoles. Et
                            il y en a forcément une qui vous correspond,{" "}
                            <strong>près de chez vous</strong> ! Vous engager à nos côtés, c'est
                            rejoindre une association de plus 70 000 bénévoles partageant les
                            mêmes principes et valeurs de solidarité et d’humanité.{" "}
                            <strong>
                                Mais c'est avant tout pouvoir être utile localement en agissant
                                dans un cadre clair et sécurisant.
                            </strong>
                        </p>

                        <p>
                            Quelle que soit votre envie d’agir, <strong>ponctuelle ou plus régulière</strong>, nous vous
                            proposons{" "}
                            <strong>un engagement sur-mesure</strong> car le plus important
                            pour nous est de trouver ensemble l’activité qui vous convienne, nous
                            pourrons ensuite la faire évoluer.{" "}
                            <strong>
                                Chaque bénévole bénéficie d’un accompagnement tout au long de son
                                engagement
                            </strong>{" "}
                            pour lui permettre d’acquérir des compétences, prendre des
                            responsabilités opérationnelles, ou encore s’investir dans la
                            gouvernance de l’association. Tous ces acquis de votre expérience
                            bénévole pourront aussi vous servir en dehors, à titre personnel ou
                            professionnel.
                        </p>
                    </div>
                </div>
            </section>

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
            <div id="competences-benevolat">

                <section className="skills-wrapper" anchor="competences-benevolat">
                    <div className="skills-container"></div>
                    <div className="skills-container skills-container--narrow">
                        <div className="skills-richtext">
                            <p>Faire du bénévolat dans une association est une excellente opportunité <strong>pour mettre
                                vos compétences et votre expérience professionnelle à la disposition des plus
                                démunis.</strong> La valorisation des compétences en bénévolat associatif trouve sa source
                                dans de multiples offres de missions.</p>
                        </div>
                    </div>
                </section>
            </div>
            <div className="faq-wrapper">

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
            <div className="vh-wrapper">
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
            <div className="ch-wrapper">

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
            <div className="hv-wrapper">

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
            <div className="hh-wrapper">
                <section className="hh-wrapper">
                    <div className="hh-container">
                        <div className="hh-block-content">
                            <div className="hh-texts">
                                <h2 className="hh-title">
                                    Venir en aide aux personnes sans-abri
                                </h2>
                                <div className="hh-rich-text">
                                    <p>
                                        Vous souhaitez vous engager pour une société plus humaine et solidaire ? Vous êtes
                                        sensible aux besoins des <strong>personnes sans-abri&nbsp;</strong>? Participez à
                                        des maraudes pour créer du lien social avec les personnes sans-abri. Au sein d'une
                                        équipe, partez à la rencontre de ces "invisibles" pour le temps d'une soirée, leur
                                        apporter votre soutien, distribuer des cafés, des couvertures et des sourires, et
                                        préserver ainsi leur dignité et favoriser leur retour à l'autonomie.
                                    </p>
                                </div>
                            </div>
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/5jQ60q7rGCAwDcojyyuagx/6f43f62ff7bd2227d0d06a25a139143e/Page_carrefour_Don_r__gulier.jpg?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Aide aux sans-abri"
                                loading="lazy"
                                className="hh-img"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div className="er-wrapper">

                <section className="er-wrapper">
                    <div className="er-container">
                        <div className="er-block-content">
                            <div className="er-texts">
                                <h2 className="er-title">
                                    Secourir des personnes victimes de situations d'urgence
                                </h2>
                                <div className="er-rich-text">
                                    <p>
                                        «&nbsp;Porter secours&nbsp;» ça vous tente ? Aider les autres, être là, pour eux,
                                        présents lors de temps forts, qu'ils soient festifs ou critiques. Ça vous dirait ?
                                        Nous avons la solution, devenez bénévole secouriste. Pas besoin d'être médecin ou
                                        soignant, nous vous proposons un parcours de formation qui vous permettra d'agir et
                                        de savoir répondre aux situations d'urgence. Chacun peut agir !
                                    </p>
                                </div>
                            </div>
                            <img
                                src="https://images.ctfassets.net/ksb78y40v1oe/1GMaKLgYfry7WSwoMNtdL4/4a5fdff2eafea9b95c332475fc3f5641/Un_dispositif_pr_visionnel_de_secours___personnes__c_est_quoi_?fm=webp&q=85&w=570&h=400&fit=thumb"
                                alt="Secours d'urgence"
                                loading="lazy"
                                className="er-img"
                            />
                        </div>
                    </div>
                </section>
            </div>
            <div className="wv-wrapper">
                <section className="wv-wrapper">
                    <div className="wv-container">
                        <header className="wv-section-head">
                            <h2 className="wv-section-title">
                                Pourquoi vous engager en tant que bénévole ?
                            </h2>
                        </header>
                    </div>
                    <div className="wv-container wv-container-shrink">
                        <div className="wv-rich-text">
                            <p>
                                Parce que nous avons besoin de vous…, mais pas que ! Être bénévole, c'est donner un peu de
                                son temps pour aider les autres. Et sans même vous en rendre compte, vous avez beaucoup à y
                                gagner !
                            </p>
                            <ul>
                                <li>
                                    <p>
                                        <strong>Un sentiment de satisfaction inégalable</strong>, parce que vos actions sont
                                        totalement désintéressées, et que la gratitude d'autrui ou le sourire d'un enfant
                                        valent toutes les rémunérations du monde.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>De belles rencontres</strong> au sein d'une équipe soudée, parmi des
                                        coéquipiers avec lesquels vous aimez passer du temps et partager vos nouvelles
                                        expériences. Le meilleur moyen de nouer des liens forts…
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>La valorisation de vos compétences et de nouvelles qualifications</strong>,
                                        à acquérir et à développer via les formations gratuites dispensées près de chez vous
                                        par la Croix-Rouge.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Des projets stimulants</strong> : accompagné par <a href="#">notre réseau
                                        partenaire </a>, initiez et mettez en œuvre vos propres actions solidaires, un
                                        challenge édifiant pour contribuer à une cause qui vous tient particulièrement à
                                        cœur.
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <strong>Un emploi du temps à 100 à l'heure !</strong> Il vous restait quelques
                                        disponibilités dans votre planning déjà chargé ? Plus question de s'ennuyer : être
                                        bénévole, c'est vivre sa vie à 200 % ! <em>A noter : pour vous permettre, quel que
                                        soit votre rythme de travail, de faire du bénévolat dans une association, le cadre
                                        juridique en France peut vous permettre d'obtenir un droit d'absence ou de congé
                                        pour vos formations et vos activités de bénévole. Plus d'excuse !</em>
                                    </p>
                                </li>
                            </ul>
                            <p>
                                Majeur ou non, étudiant, retraité, salarié, âme d'entrepreneur, philanthrope, homme ou femme
                                de terrain, geek… votre profil nous intéresse. Vous êtes partant ? Trouvez la mission
                                adaptée à vos envies !
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            <div className="ts-wrapper">

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
            <div className="sg-wrapper">

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
            <div className="fqs-wrapper">

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
            <div className="fa-wrapper">
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


        </>
    );
}