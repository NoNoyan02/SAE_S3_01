import "./Hero.css";

export default function Hero() {
    return (
        <>
            <header className="hero with-cover overlay-small large">
                <div className="hero-cover">
                    <img
                        src=""
                        alt="Envie de vous engager bénévolement près de chez vous ?"/>
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
