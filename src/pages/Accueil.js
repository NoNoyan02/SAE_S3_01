import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header";
import Main from "../components/Accueil/Main/Main";
import Footer from "../components/Footer/Footer";

export default function Accueil() {
    return (
        <>
        <Helmet>
            {/* Titre */}
            <title>Croix-Rouge française : engagez vous à nos côtés</title>

            {/* Description */}
            <meta
                name="description"
                content="La Croix-Rouge française agit pour protéger et relever sans condition, les personnes en situation de vulnérabilité et construire avec elles leur résilience."
            />

            {/* Open Graph */}
            <meta
                property="og:title"
                content="Croix-Rouge française : engagez vous à nos côtés | Croix-Rouge française"
            />
            <meta
                property="og:description"
                content="La Croix-Rouge française agit pour protéger et relever sans condition, les personnes en situation de vulnérabilité et construire avec elles leur résilience."
            />
        </Helmet>
            <Header/>
            <Main/>
            <Footer/>
        </>
    );
}