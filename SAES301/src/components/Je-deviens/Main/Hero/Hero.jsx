export default function Hero() {
    return (
        <>
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .hero {
                    position: relative;
                    display: flex;
                    width: 100%;
                    min-height: 100vh;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    flex-direction: column;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }

                @media (min-width: 1100px) {
                    .hero {
                        padding: 24px 64px 0;
                        margin-bottom: 88px;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 64px;
                    }
                }

                .hero-cover {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: -1;
                    background-color: #17363a;
                }

                .hero-cover img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .hero-container {
                    width: 100%;
                    max-width: 1170px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    flex-direction: column;
                    padding: 0 24px;
                }

                @media (min-width: 1100px) {
                    .hero-container {
                        flex-direction: column;
                    }
                }

                .hero-text {
                    flex: 1;
                    text-align: center;
                    line-height: 1.2;
                    color: #fff;
                    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.45);
                    position: relative;
                    z-index: 2;
                    background: radial-gradient(
                            50% 50% at 50% 50%,
                            rgba(0, 0, 0, 0.2) 0,
                            transparent 100%
                    );
                    padding: 24px;
                }

                @media (min-width: 1100px) {
                    .hero-text {
                        max-width: 920px;
                        padding: 0;
                    }
                }

                .hero-title {
                    font-weight: 800;
                    font-size: 2.4rem;
                    line-height: 1.2;
                    margin-bottom: 1rem;
                    margin-top: 0;
                }

                @media (min-width: 700px) {
                    .hero-title {
                        font-size: 4.8rem;
                    }
                }

                .hero-subtitle {
                    font-size: 1.8rem;
                    font-weight: 300;
                    color: #767676;
                    margin: 0;
                }

                .hero-subtitle.in-cover {
                    font-weight: 700;
                }

                @media (min-width: 700px) {
                    .hero-subtitle {
                        font-size: 2rem;
                    }
                }

                .large {
                    min-height: 450px;
                }

                .small {
                    min-height: 180px;
                }

                .overlay-small {
                    margin-bottom: -32px;
                }

                .overlay-large {
                    margin-bottom: -88px;
                }

                @media (max-width: 1099px) {
                    .with-cover,
                    .with-background {
                        margin-bottom: 48px;
                    }

                    .hero-text {
                        padding: 48px 24px;
                    }
                }

                .hero-text.white * {
                    color: inherit !important;
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <header className="hero with-cover overlay-small large">
                <div className="hero-cover">
                    <img
                        src="https://images.ctfassets.net/ksb78y40v1oe/7M6jXwOfIZTATTav5S7fqc/9e944f29fb492368150e8997e2dd7373/Page_carrefour_Je_deviens_b__n__vole_Hero_2.jpg"
                        alt="Envie de vous engager bénévolement près de chez vous ?"
                    />
                </div>

                <div className="hero-container">
                    <div className="hero-text white">
                        <h1 className="hero-title">Je deviens bénévole</h1>
                        <p className="hero-subtitle in-cover">
                            Renseignez votre code postal et retrouvez toutes les missions près de chez vous !
                        </p>
                    </div>
                </div>
            </header>
        </>
    )
}