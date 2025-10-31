import {Helmet} from "react-helmet";
import Header from "../components/Header/Header";
import Hero from "../components/Accueil/Main/Hero/Hero";
import Form from "../components/Form/DonationForm";

function Accueil() {
    return (
        <>
        <Helmet>
            {/* Titre */}
            <title>Croix-Rouge française : engagez vous à nos côtés</title>

            {/* Encodage et affichage mobile */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="format-detection" content="telephone=no" />

            {/* Description */}
            <meta
                name="description"
                content="La Croix-Rouge française agit pour protéger et relever sans condition, les personnes en situation de vulnérabilité et construire avec elles leur résilience."
            />
        </Helmet>
            <Header /> {}
            <Hero />
            <Form />
        </>
    );
}

export default Accueil;
