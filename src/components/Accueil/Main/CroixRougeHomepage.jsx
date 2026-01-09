import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '@/api/axios';

export default function CroixRougeHomepage() {
    const [searchType, setSearchType] = useState('Toutes');
    const [searchLocation, setSearchLocation] = useState('');
    const [articles, setArticles] = useState([]);
    const formationsCarouselRef = useRef(null);
    const dossiersCarouselRef = useRef(null);
    const articlesCarouselRef = useRef(null);

    useEffect(() => {
        api.get('/articles.php')
            .then(res => {
                if (Array.isArray(res.data)) setArticles(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    const formations = [{
        title: "PSC - Formation premiers secours citoyen (ancien PSC1)",
        duration: "8h",
        image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=200&fit=crop"
    }, {
        title: "Initiation aux premiers secours enfant et nourrisson",
        duration: "4h30",
        image: "https://images.ctfassets.net/ksb78y40v1oe/2lvnw64LL6fbdU60Vsv4cD/bfefe9b8a447adf75b8f5ee4da450412/Les_Espaces_b_b__parents___accompagner_et_soutenir_les_familles?fm=webp&q=85&w=1170&h=450&fit=thumb"
    }, {
        title: "La formation aux gestes qui sauvent (GQS)",
        duration: "2h",
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=200&fit=crop"
    }, {
        title: "Remise à niveau PSC",
        duration: "4h",
        image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?w=400&h=200&fit=crop"
    }, {
        title: "Premiers secours en équipe",
        duration: "35h",
        image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&h=200&fit=crop"
    }];

    const dossiers = [{
        title: "Les attentats du 13 novembre",
        image: "https://images.ctfassets.net/ksb78y40v1oe/2nQwpHbaGULM03cMvn8rZU/8dd2358cc4f7b1c7f2d12ddac4fdf90b/Les_attentats_du_13_novembre__un_an_apr_s?fm=webp&q=85&w=388&h=200&fit=thumb"
    }, {
        title: "Guerre au Soudan : agir aux côtés des réfugiés au Tchad",
        image: "https://images.ctfassets.net/ksb78y40v1oe/5Jevj04wdiVzn0mm5KNefG/fce9b15a2e9366d153953f14afcf4ecb/10-L1010465_Guerre_au_Soudan_r%C3%83_fugi%C3%83_s_soudanais_au_tchad.webp?fm=webp&q=85&w=388&h=200&fit=thumb"
    }, {
        title: "Urgence Proche-Orient",
        image: "https://images.ctfassets.net/ksb78y40v1oe/2JHRAnlfXWmylFCRu7iAqH/4447ec624e9f97ee606bf54932389f6e/p-PSI0379_Palestine_Red_Crescent_Society_copie.jpg?fm=webp&q=85&w=388&h=200&fit=thumb"
    }, {
        title: "Urgence Ukraine",
        image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=200&fit=crop"
    }, {
        title: "Rapport Résilience de la Croix-Rouge française",
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop"
    }];

    const handleScroll = (ref, direction) => {
        if (ref.current) {
            const cardWidth = window.innerWidth <= 480 ? 280 :
                window.innerWidth <= 768 ? 320 : 370;
            const scrollAmount = cardWidth + 20;

            ref.current.scrollBy({
                left: direction === 'right' ? scrollAmount : -scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="page">
            {/* INTÉGRATION DU CSS DIRECTEMENT ICI */}
            <style>{`
                .page {
                    width: 100%;
                    background-color: #fff;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                button {
                    padding: 0;
                    border: none;
                    font: inherit;
                    color: inherit;
                    background-color: transparent;
                    cursor: pointer;
                }

                img {
                    height: auto;
                    vertical-align: middle;
                    max-width: 100%;
                }

                .icon {
                    width: 1em;
                    height: 1em;
                    vertical-align: top;
                    fill: currentColor;
                    pointer-events: none;
                }

                .visually-hidden {
                    border: 0;
                    clip: rect(0 0 0 0);
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    padding: 0;
                    position: absolute;
                    width: 1px;
                }

                /* Sections */
                .section {
                    margin-bottom: 64px;
                    padding: 0 24px;
                }

                .wrapper {
                    margin-bottom: 64px;
                    padding-left: 24px;
                    padding-right: 24px;
                    transition: background-size 0.2s ease-out;
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

                .container--shrink {
                    max-width: 312px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                }

                /* Section Head */
                .section-head {
                    margin-bottom: 3rem;
                    text-align: center;
                }

                .section-head--left {
                    text-align: left;
                }

                .section-head__title {
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                }

                .section-head__mark {
                    padding: 2px 8px;
                    border-radius: 2px;
                    color: #fff;
                    background-color: #e3001b;
                    box-decoration-break: clone;
                    line-height: 1.5;
                }

                .section-head--secondary .section-head__mark {
                    background-color: #075c68;
                }

                .section-head__subtitle {
                    font-weight: 300;
                    font-size: 1.8rem;
                    line-height: 1.2;
                }

                /* CTA Cards */
                .cta-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 30px;
                }

                .cta-card {
                    flex: 1;
                    max-width: 470px;
                    min-width: 300px;
                    text-align: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .cta-card:hover {
                    transform: translateY(-4px);
                }

                .cta-cover {
                    overflow: hidden;
                    height: 320px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    background-color: #f6f7fa;
                }

                .cta-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                .cta-text {
                    position: relative;
                    min-height: 120px;
                    margin: -64px 32px 0;
                    padding: 24px;
                    background-color: #fff;
                }

                .cta-title {
                    display: block;
                    margin-bottom: 1.5rem;
                    font-size: 1.8rem;
                    font-weight: 600;
                    line-height: 1.2;
                }

                /* Buttons */
                .btn-primary {
                    min-width: 140px;
                    min-height: 50px;
                    padding: 12px 24px;
                    border: none;
                    border-radius: 4px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #fff;
                    background-color: #e3001b;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-primary:hover {
                    background-color: #970b13;
                }

                .btn-border {
                    min-width: 140px;
                    min-height: 50px;
                    padding: 12px 24px;
                    border: 1px solid #075c68;
                    border-radius: 4px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #075c68;
                    background-color: transparent;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .btn-border:hover {
                    background-color: #075c68;
                    color: #fff;
                }

                /* Block Formations */
                .block-formations {
                    display: flex;
                    flex-direction: column;
                }

                .block-formations__header {
                    position: relative;
                    z-index: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 10px;
                    background-color: #e6eff0;
                    padding: 24px;
                }

                .block-formations__header::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    right: 100%;
                    bottom: 0;
                    left: -200%;
                    background-color: #e6eff0;
                }

                .block-formations__head {
                    text-align: center;
                }

                .block-formations__search {
                    max-width: 400px;
                    margin-right: 0;
                }

                .block-formations__search-input {
                    display: flex;
                    justify-content: center;
                    margin-top: 24px;
                    align-items: center;
                }

                .block-formations__search-input .search-bar__form-autocomplete-wrapper-column {
                    width: 100%;
                }

                .block-formations__search-input .search-bar__form-autocomplete-wrapper-column input {
                    padding: 14px;
                }

                .block-formations__carrousel {
                    margin-top: 32px;
                    margin-left: 0;
                    overflow: hidden;
                }

                /* Search Bar */
                .search-bar {
                    z-index: 3;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    margin-top: -48px;
                    padding: 16px;
                    background-color: #fff;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                }

                .search-bar--column {
                    display: flex;
                    flex-direction: column;
                }

                .search-bar__form-select {
                    min-width: 250px;
                }

                .search-bar__form-select--with-icon {
                    min-width: 100px;
                }

                .search-bar__form-select-column .form-input {
                    border-right: none;
                    margin-bottom: 0;
                }

                .search-bar__form-select .form-select--no-border {
                    border-bottom: 1px solid #cdcdcd;
                }

                .search-bar__form-select .form-input__input {
                    border: none;
                    font-weight: 600;
                }

                .search-bar__form-autocomplete-wrapper {
                    display: flex;
                    flex-direction: column;
                    flex: 2;
                    align-items: center;
                }

                .search-bar__form-autocomplete-wrapper--with-select {
                    position: relative;
                }

                .search-bar-v2__input {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                }

                .search-bar__form {
                    width: 100%;
                }

                /* Form Input */
                .form-input {
                    display: block;
                    margin-bottom: 24px;
                }

                .form-input__label {
                    display: block;
                    margin-bottom: 8px;
                    padding: 0;
                    font-weight: 600;
                }

                .form-input__field {
                    display: block;
                    position: relative;
                }

                .form-input__input {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    min-height: 50px;
                    padding: 12px 14px;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    outline: 0;
                    vertical-align: middle;
                    text-align: inherit;
                    font-size: 1.4rem;
                    font-weight: 400;
                    font-family: inherit;
                    color: #000;
                    background-color: #fff;
                }

                .form-input__input:not([disabled]):focus,
                .form-input__input:not([disabled]):hover {
                    border-color: #767676;
                }

                .form-input__input::placeholder {
                    font-weight: 400;
                    opacity: 1;
                    color: #767676;
                }

                select.form-input__input {
                    padding-right: 40px;
                    text-indent: 0.01px;
                    cursor: pointer;
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAFCAYAAAB8ZH1oAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAqSURBVHgBjcq3DQAACANBj87mpArJpJe+OwAQX4/DZPJBGybU4RFVTMgAB3gY7dKETngAAAAASUVORK5CYII=");
                    background-position: center right 20px;
                    background-repeat: no-repeat;
                    background-size: 8px;
                    appearance: none;
                }

                select.form-input__input--select-red-arrow {
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAICAYAAADN5B7xAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAB3SURBVHgBhY7BDYAgDEU/HtzAi+gOboSbgJuwEUPAHkitJKAQmpDA73u0QKoAeWBQAcvDTB6rjoBLkurDUkXMjtgpOYLCJNmWxDAsv5iFx2Y8ZKRTSnTPOTGUidzkIOo3PPNU7oprRzC/XctJ35+7VUsDuJba8A1WQztKx79+MgAAAABJRU5ErkJggg==");
                    background-size: 12px;
                }

                .form-select--no-border select {
                    border: none;
                }

                .form-auto-complete-locationV2__form-input {
                    position: relative;
                    max-width: none;
                    margin-bottom: 0;
                    display: flex;
                }

                .form-auto-complete-locationV2__form-input .form-input__input {
                    padding-left: 16px;
                    border: none;
                    font-size: 1.6rem;
                }

                .form-auto-complete-locationV2__form-input__field--text {
                    display: flex;
                    flex: 1;
                }

                .form-auto-complete-locationV2__dropdown {
                    z-index: 1;
                    position: absolute;
                    width: 100%;
                    left: 0;
                    max-height: 0;
                    padding: 0 16px;
                    overflow-y: auto;
                    font-size: 1.4rem;
                    background-color: #fff;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    transition: max-height 0.25s;
                }

                /* Carousel */

                /* Carousel Wrapper */
                .carousel-wrapper {
                    position: relative;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    padding: 0 60px;
                }

                /* Navigation buttons*/
                .carousel-nav {
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.9);
                    border: none;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    font-weight: bold;
                    color: #e3001b;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    z-index: 10;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }

                .carousel-nav:hover {
                    background-color: #e3001b;
                    color: #fff;
                    transform: translateY(-50%) scale(1.1);
                }

                .carousel-nav-left {
                    left: 0;
                }

                .carousel-nav-right {
                    right: 0;
                }


                .ssr-carousel-slides {
                    width: 100%;
                    overflow: hidden;
                    position: relative;
                }

                .ssr-carousel-mask {
                    width: 100%;
                    overflow: hidden;
                    padding: 0 10px;
                }

                /* Track du carousel */

                .ssr-carousel-track {
                    display: flex;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                    will-change: transform;
                    gap: 20px;
                    scroll-behavior: smooth;
                    overflow-x: hidden;
                    justify-content: start;
                }

                .ssr-carousel-slide {
                    flex: 0 0 auto;
                    width: 280px;
                    min-width: 280px;
                    margin-right: 0;
                }

                .ssr-carousel-slide:last-child {
                    margin-right: 0;
                    padding-right: 0;
                }

                .ssr-carousel {
                    touch-action: pan-y;
                }

                .ssr-peek-values {
                    position: absolute;
                }

                .ssr-carousel-visually-hidden {
                    border: 0;
                    clip: rect(0 0 0 0);
                    clip-path: inset(50%);
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    padding: 0;
                    position: absolute;
                    width: 1px;
                    white-space: nowrap;
                }
                /* Training Card */
                .training-card {
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    text-decoration: none;
                    color: inherit;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    background: #fff;
                }

                .training-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                }

                .training-card:focus .training-card__title,
                .training-card:hover .training-card__title {
                    color: #e3001b;
                }

                .training-card__cover {
                    width: 100%;
                    height: 180px;
                    overflow: hidden;
                    background-color: #f6f7fa;
                }

                .training-card__img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .training-card:hover .training-card__img {
                    transform: scale(1.05);
                }

                .training-card__text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    padding: 16px;
                    gap: 12px;
                    min-height: 120px;
                }

                .training-card__title {
                    font-size: 1.4rem;
                    font-weight: 600;
                    line-height: 1.3;
                    margin: 0;
                    transition: color 0.2s ease;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-wrap: break-word;
                }

                .training-card__info {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin-top: auto;
                }

                .training-card__label {
                    color: #e3001b;
                    font-weight: 600;
                }

                .training-card__duration {
                    color: #075c68;
                    font-weight: 600;
                }

                /* Section Blue */
                .section-blue {
                    padding: 64px 24px;
                    margin: 0 24px 64px;
                    background-color: #e6eff0;
                    border-radius: 4px;
                }

                .mark-secondary {
                    padding: 2px 8px;
                    border-radius: 2px;
                    color: #fff;
                    background-color: #075c68;
                    line-height: 1.5;
                }

                .title {
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    font-weight: 700;
                    line-height: 1.2;
                }

                .subtitle {
                    font-weight: 300;
                    font-size: 1.8rem;
                    line-height: 1.2;
                }

                /* Icons */
                .icons-list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 30px;
                }

                .icon-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-width: 150px;
                    min-height: 120px;
                    padding: 16px;
                    border: 1px solid #cdcdcd;
                    border-radius: 4px;
                    background-color: #fff;
                    text-decoration: none;
                    color: inherit;
                    transition: all 0.2s;
                }

                .icon-card:hover {
                    color: #e3001b;
                    transform: translateY(-4px);
                }

                .icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    margin-bottom: 16px;
                    border-radius: 50%;
                    background-color: #e3001b;
                }

                .icon-image {
                    width: 24px;
                    height: 24px;
                    filter: brightness(0) invert(1);
                }

                .icon-title {
                    font-size: 1.4rem;
                    font-weight: 600;
                    text-align: center;
                    line-height: 1.2;
                }

                /*carousel*/
                .dossiers-carousel {
                    display: flex;
                    gap: 20px;
                    overflow-x: hidden;
                    scroll-snap-type: x mandatory;
                    scroll-behavior: smooth;
                    scrollbar-width: none;
                    padding: 0 10px;
                    -webkit-overflow-scrolling: touch;
                    flex: 1;
                }

                .dossiers-carousel::-webkit-scrollbar {
                    display: none;
                }

                .dossiers-carousel::-webkit-scrollbar-track {
                    background: #f6f7fa;
                    border-radius: 4px;
                }

                .dossiers-carousel::-webkit-scrollbar-thumb {
                    background: #cdcdcd;
                    border-radius: 4px;
                }

                .folder-card {
                    flex: 0 0 280px;
                    min-width: 280px;
                    scroll-snap-align: start;
                    text-decoration: none;
                    color: inherit;
                    border-radius: 8px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    background: #fff;
                }

                .folder-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
                }

                .folder-cover {
                    height: 180px;
                    background-color: #f6f7fa;
                    overflow: hidden;
                }

                .folder-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.3s ease;
                }

                .folder-card:hover .folder-image {
                    transform: scale(1.05);
                }

                .folder-text {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 20px;
                    min-height: 120px;
                }

                .folder-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    line-height: 1.3;
                    margin-bottom: 16px;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    word-wrap: break-word;
                }

                .btn-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #e3001b;
                    text-decoration: none;
                    transition: color 0.2s;
                }

                .btn-link:hover {
                    color: #970b13;
                }

                .arrow-icon {
                    width: 16px;
                    height: 16px;
                }

                .extra-folder {
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    margin-top: 48px;
                }

                .folder-line {
                    flex: 1;
                    height: 1px;
                    background-color: #cdcdcd;
                }

                .folder-line {
                    flex: 1;
                    height: 1px;
                    background-color: #cdcdcd;
                }

                /*responsive*/
                @media (max-width: 1024px) {
                    .ssr-carousel-track,
                    .dossiers-carousel {
                        overflow-x: auto;
                    }
                }

                @media (max-width: 699px) {
                    .section-head {
                        text-align: center;
                    }

                    .cta-cover {
                        height: 220px;
                    }

                    .cta-text {
                        margin: -40px 16px 0;
                        padding: 16px;
                    }

                    .form-input__input {
                        font-size: 1.6rem;
                    }

                    .carousel-wrapper {
                        padding: 0 50px;
                    }

                    .carousel-nav {
                        width: 36px;
                        height: 36px;
                        font-size: 16px;
                    }

                    .carousel-nav-left {
                        left: 5px;
                    }

                    .carousel-nav-right {
                        right: 5px;
                    }

                    .ssr-carousel-slide,
                    .folder-card {
                        width: 260px;
                        min-width: 260px;
                    }

                    .training-card__title,
                    .folder-title {
                        font-size: 1.3rem;
                    }
                }

                @media (min-width: 700px) {
                    .section {
                        padding: 0 64px;
                    }

                    .wrapper {
                        padding-left: 64px;
                        padding-right: 64px;
                    }

                    .container--shrink {
                        max-width: 970px;
                    }

                    .section-head__title {
                        font-size: 2.4rem;
                    }

                    .section-head__subtitle {
                        font-size: 2rem;
                    }

                    .title {
                        font-size: 2.4rem;
                    }

                    .subtitle {
                        font-size: 2rem;
                    }

                    .block-formations {
                        flex-direction: row;
                        align-items: center;
                    }

                    .block-formations__header {
                        flex: 1;
                        min-width: 370px;
                        max-width: 45%;
                        min-height: 380px;
                    }

                    .block-formations__header::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        right: 100%;
                        bottom: 0;
                        left: -200%;
                        background-color: #e6eff0;
                    }

                    .block-formations__head {
                        gap: 16px;
                        text-align: left;
                    }

                    .block-formations__head,
                    .block-formations__search {
                        max-width: 400px;
                        margin-right: 0;
                    }

                    .block-formations__search-input {
                        margin-right: 0;
                    }

                    .search-bar {
                        flex-direction: column;
                        align-items: center;
                        padding: 8px 8px 8px 24px;
                        margin-top: -35px;
                    }

                    .search-bar__form-select {
                        min-width: 250px;
                    }

                    .search-bar__form-select--with-icon {
                        min-width: 100px;
                    }

                    .search-bar__form-select .form-select--no-border {
                        margin-bottom: 0;
                        border-bottom: none;
                        border-right: 1px solid #cdcdcd;
                    }

                    .search-bar__form-select-column {
                        margin-bottom: 0;
                        border-bottom: 1px solid #cdcdcd;
                    }

                    .search-bar__form-autocomplete-wrapper {
                        flex-direction: row;
                    }

                    .search-bar-v2__input {
                        margin-bottom: 0;
                    }

                    .form-auto-complete-locationV2__form-input {
                        width: 100%;
                    }

                    .form-auto-complete-locationV2__form-input .form-input__input {
                        padding-left: 24px;
                    }

                    .form-auto-complete-locationV2__dropdown {
                        padding: 0 24px;
                    }

                    .training-card__cover {
                        height: 200px;
                    }

                    .training-card__text {
                        margin-bottom: 0;
                    }

                    .icon-card {
                        min-width: 270px;
                        min-height: 160px;
                        padding: 32px 24px;
                    }

                    .icon-wrapper {
                        width: 64px;
                        height: 64px;
                    }

                    .icon-image {
                        width: 32px;
                        height: 32px;
                    }
                    .ssr-carousel-slide,
                    .folder-card {
                        width: 300px;
                        min-width: 300px;
                    }
                }

                @media (min-width: 1100px) {
                    .section {
                        margin-bottom: 88px;
                    }

                    .wrapper {
                        margin-bottom: 88px;
                    }

                    .container {
                        padding: 0;
                    }

                    .ssr-carousel-slide,
                    .folder-card {
                        width: 350px;
                        min-width: 350px;
                    }

                    .training-card__cover,
                    .folder-cover {
                        height: 200px;
                    }

                    .training-card__title,
                    .folder-title {
                        font-size: 1.6rem;
                    }

                    .training-card__text,
                    .folder-text {
                        min-height: 140px;
                    }
                }


                @media (hover: none) and (pointer: coarse) {
                    .training-card,
                    .folder-card {
                        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.05);
                    }

                    .carousel-nav {
                        width: 48px;
                        height: 48px;
                        font-size: 20px;
                    }
                }


                @media (prefers-reduced-motion: reduce) {
                    .ssr-carousel-track,
                    .training-card,
                    .folder-card,
                    .carousel-nav {
                        transition: none;
                    }

                    .dossiers-carousel {
                        scroll-behavior: auto;
                    }
                }
            `}</style>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">
                            Je veux <span
                                className="mark-secondary">me former aux métiers du sanitaire et du social</span>
                        </h2>
                        <p className="subtitle">
                            Peu importe votre profil, il y a forcément une formation faite pour vous !
                        </p>
                    </header>

                    <div className="cta-list">
                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=350&fit=crop"
                                    alt="Professionnel" className="cta-image" />
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Vous êtes un professionnel ?</p>
                                <button className="btn-primary">Je monte en compétence</button>
                            </div>
                        </div>

                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=350&fit=crop"
                                    alt="Étudiant" className="cta-image" />
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Vous êtes un futur étudiant ?</p>
                                <button className="btn-primary">J'apprends un métier</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="wrapper">
                <div className="container">
                    <div className="block-formations">
                        <div className="block-formations__header">
                            <div className="block-formations__head">
                                <header className="section-head section-head--left section-head--secondary">
                                    <h2 className="section-head__title">
                                        On peut tous <span className="section-head__mark">sauver des vies</span>
                                    </h2>
                                    <p className="section-head__subtitle">Je me forme aux premiers secours</p>
                                </header>
                            </div>

                            <div className="block-formations__search">
                                <div className="block-formations__search-input">
                                    <div className="search-bar-v2">
                                        <div className="container--shrink search-bar search-bar--column">
                                            <div
                                                className="search-bar__form-select search-bar__form-select--with-icon search-bar__form-select-column">
                                                <div className="form-input form-input-- form-select--no-border">
                                                    <span className="form-input__field">
                                                        <select
                                                            id="select_search"
                                                            name="select_search"
                                                            value={searchType}
                                                            onChange={(e) => setSearchType(e.target.value)}
                                                            className="form-input__input form-input__input--select-red-arrow"
                                                        >
                                                            <option value="Toutes">Toutes</option>
                                                            <option value="PSC">PSC</option>
                                                            <option value="Formation aux gestes qui sauvent">Formation aux gestes qui sauvent</option>
                                                            <option
                                                                value="Remise à niveau PSC">Remise à niveau PSC</option>
                                                            <option value="Premiers secours enfants et nourrissons">Premiers secours enfants et nourrissons</option>
                                                        </select>
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                className="search-bar__form-autocomplete-wrapper search-bar__form-autocomplete-wrapper--with-select search-bar__form-autocomplete-wrapper-column">
                                                <div className="search-bar-v2__input">
                                                    <div className="form-auto-complete-locationV2 search-bar__form">
                                                        <div
                                                            className="form-input form-auto-complete-locationV2__form-input">
                                                            <span
                                                                className="form-input__field form-auto-complete-locationV2__form-input__field--text">
                                                                <input
                                                                    id="location-search"
                                                                    name="location-search"
                                                                    placeholder="Code postal ou ville"
                                                                    type="search"
                                                                    value={searchLocation}
                                                                    onChange={(e) => setSearchLocation(e.target.value)}
                                                                    className="form-input__input"
                                                                />
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="block-formations__carrousel">
                            <div className="carousel-wrapper">
                                <button
                                    className="carousel-nav carousel-nav-left"
                                    onClick={() => handleScroll(formationsCarouselRef, 'left')}
                                    aria-label="Précédent"
                                >
                                    ‹
                                </button>
                                <div className="ssr-carousel-slides">
                                    <div className="ssr-carousel-mask">
                                        <ul className="ssr-carousel-track" ref={formationsCarouselRef}>
                                            {formations.map((formation, index) => (
                                                <li key={index} className="ssr-carousel-slide">
                                                    <a href="#" className="training-card">
                                                        <div className="training-card__cover">
                                                            <img src={formation.image} alt={formation.title}
                                                                className="training-card__img" />
                                                        </div>
                                                        <div className="training-card__text">
                                                            <strong
                                                                className="training-card__title">{formation.title}</strong>
                                                            <div className="training-card__info">
                                                                <span className="training-card__label">Durée</span>
                                                                <span
                                                                    className="training-card__duration">{formation.duration}</span>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <button
                                    className="carousel-nav carousel-nav-right"
                                    onClick={() => handleScroll(formationsCarouselRef, 'right')}
                                    aria-label="Suivant"
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">
                            Je veux <span className="mark-secondary">agir</span>
                        </h2>
                    </header>

                    <div className="cta-list">
                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=350&fit=crop"
                                    alt="Emploi" className="cta-image" />
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Trouvez un emploi</p>
                                <button className="btn-primary">Je découvre les métiers</button>
                            </div>
                        </div>

                        <div className="cta-card">
                            <div className="cta-cover">
                                <img
                                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=350&fit=crop"
                                    alt="Bénévole" className="cta-image" />
                            </div>
                            <div className="cta-text">
                                <p className="cta-title">Devenez bénévole</p>
                                <button className="btn-primary">Je trouve une mission</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section-blue">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">
                            Près de <span className="mark-secondary">chez moi</span>
                        </h2>
                    </header>

                    <div className="icons-list">
                        <a href="#" className="icon-card">
                            <div className="icon-wrapper">
                                <img src="https://api.iconify.design/mdi/food-apple.svg" alt="" className="icon-image" />
                            </div>
                            <span className="icon-title">Épiceries sociales</span>
                        </a>

                        <a href="#" className="icon-card">
                            <div className="icon-wrapper">
                                <img src="https://api.iconify.design/mdi/tshirt-crew.svg" alt=""
                                    className="icon-image" />
                            </div>
                            <span className="icon-title">Boutiques solidaires</span>
                        </a>

                        <a href="#" className="icon-card">
                            <div className="icon-wrapper">
                                <img src="https://api.iconify.design/mdi/baby-carriage.svg" alt=""
                                    className="icon-image" />
                            </div>
                            <span className="icon-title">Crèches</span>
                        </a>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">Nos derniers <span className="mark-secondary">Articles</span></h2>
                        <p className="subtitle">L'actualité de nos actions sur le terrain</p>
                    </header>

                    <div className="carousel-wrapper">
                        <button
                            className="carousel-nav carousel-nav-left"
                            onClick={() => handleScroll(articlesCarouselRef, 'left')}
                            aria-label="Précédent"
                        >
                            ‹
                        </button>
                        <div className="dossiers-carousel" ref={articlesCarouselRef}>
                            {articles.map((article, index) => (
                                <Link to={`/article/${article.id}`} key={index} className="folder-card">
                                    <div className="folder-cover">
                                        <img src={article.image_url || "https://placehold.co/600x400?text=Article"} alt={article.title} className="folder-image" />
                                    </div>
                                    <div className="folder-text">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#767676', marginBottom: '8px' }}>
                                            <span>{new Date(article.created_at).toLocaleDateString()}</span>
                                            <span>{article.author}</span>
                                        </div>
                                        <strong className="folder-title" dangerouslySetInnerHTML={{ __html: article.title }}></strong>
                                        <span className="btn-link">
                                            <svg className="arrow-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor" d="M5.727 11.053 8.78 8 5.727 4.94l.94-.94 4 4-4 4-.94-.947Z" />
                                            </svg>
                                            Lire l'article
                                        </span>
                                    </div>
                                </Link>
                            ))}
                            {articles.length === 0 && (
                                <div style={{ width: '100%', textAlign: 'center', padding: '40px', color: '#666', background: '#F8F9FA', borderRadius: 8 }}>
                                    Aucun article publié pour le moment.
                                </div>
                            )}
                        </div>
                        <button
                            className="carousel-nav carousel-nav-right"
                            onClick={() => handleScroll(articlesCarouselRef, 'right')}
                            aria-label="Suivant"
                        >
                            ›
                        </button>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <header className="section-head">
                        <h2 className="title">Nos dossiers</h2>
                    </header>

                    <div className="carousel-wrapper">
                        <button
                            className="carousel-nav carousel-nav-left"
                            onClick={() => handleScroll(dossiersCarouselRef, 'left')}
                            aria-label="Précédent"
                        >
                            ‹
                        </button>
                        <div className="dossiers-carousel" ref={dossiersCarouselRef}>
                            {dossiers.map((dossier, index) => (
                                <a href="#" key={index} className="folder-card">
                                    <div className="folder-cover">
                                        <img src={dossier.image} alt={dossier.title} className="folder-image" />
                                    </div>
                                    <div className="folder-text">
                                        <strong className="folder-title">{dossier.title}</strong>
                                        <span className="btn-link">
                                            <svg className="arrow-icon" viewBox="0 0 16 16"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path fill="currentColor"
                                                    d="M5.727 11.053 8.78 8 5.727 4.94l.94-.94 4 4-4 4-.94-.947Z" />
                                            </svg>
                                            Lire le dossier
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <button
                            className="carousel-nav carousel-nav-right"
                            onClick={() => handleScroll(dossiersCarouselRef, 'right')}
                            aria-label="Suivant"
                        >
                            ›
                        </button>
                    </div>

                    <div className="extra-folder">
                        <div className="folder-line"></div>
                        <button className="btn-border">Voir plus de dossiers</button>
                        <div className="folder-line"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}