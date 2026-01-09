export default function Hero() {
    return (
        <>
            {/* DÉBUT DU CSS INTÉGRÉ */}
            {/* DÉBUT DU CSS INTÉGRÉ SPÉCIFIQUE (Si besoin de légers ajustements) */}
            <style>{`
                .je-deviens-hero .shared-hero-content {
                    padding-bottom: 60px; /* Plus d'espace pour l'input code postal */
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <header className="shared-hero je-deviens-hero">
                <img
                    className="shared-hero-bg"
                    src="https://images.ctfassets.net/ksb78y40v1oe/7M6jXwOfIZTATTav5S7fqc/9e944f29fb492368150e8997e2dd7373/Page_carrefour_Je_deviens_b__n__vole_Hero_2.jpg"
                    alt="Envie de vous engager bénévolement près de chez vous ?"
                />
                <div className="shared-hero-overlay"></div>

                <div className="shared-hero-content">
                    <h1 className="shared-hero-title">Je deviens bénévole</h1>
                    <p className="shared-hero-subtitle">
                        Renseignez votre code postal et retrouvez toutes les missions près de chez vous !
                    </p>
                </div>
            </header>
        </>
    )
}