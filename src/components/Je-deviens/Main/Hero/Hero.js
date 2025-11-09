import "./Hero.css";

export default function Hero() {
    return (
        <>
            <header className="hero with-cover overlay-small large">
                <div className="hero-cover">
                    <img
                        src="https://images.ctfassets.net/ksb78y40v1oe/7M6jXwOfIZTATTav5S7fqc/9e944f29fb492368150e8997e2dd7373/Page_carrefour_Je_deviens_b__n__vole_Hero_2.jpg"
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
