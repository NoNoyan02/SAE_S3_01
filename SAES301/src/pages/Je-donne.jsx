import React from "react";
import {Helmet} from "react-helmet";


// Composants
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";
import MainJedonne from "../components/Je-donne/MainJedonne.jsx";

export default function JeDonne() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Je fais un don | Croix-Rouge française</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Donner c'est s'engager, faire un don à la Croix-Rouge française c'est financer des actions solidaires et venir en aide aux personnes démunies, isolées, vulnérables"
                />

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="Je fais un don | Croix-Rouge française"
                />
                <meta
                    property="og:description"
                    content="Donner c'est s'engager, faire un don à la Croix-Rouge française c'est financer des actions solidaires et venir en aide aux personnes démunies, isolées, vulnérables"
                />
            </Helmet>
            <Header/>
            <nav className="sousnavbar" aria-label="Fil d'Ariane">
                <ol>
                    <li><a href="/">Accueil</a></li>
                    <li>Grâce à vos dons nous pouvons agir</li>
                </ol>
            </nav>
            <MainJedonne/>
            {/*<iframe*/}
            {/*    src="file:///C:/Users/Donald%20Se/Documents/Projects/SAE_S3_01/src/pages/SAE_S3_01-feature-Aswin/je-donne.html" // ou une URL externe*/}
            {/*    style={{width: "100%", height: "500px", border: "none"}}*/}
            {/*    title="Vue HTML"*/}
            {/*></iframe>*/}
            <Footer/>
        </>
    );
}