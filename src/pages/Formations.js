import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header";


export default function Formations() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Je me forme aux premiers secours | Croix-Rouge française</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Formez-vous aux premiers secours. N'hésitez plus, trouvez une session de formation près de chez vous et inscrivez-vous !"
                />

                {/* Open Graph */}
                <meta
                    property="og:title" Soutenez notre association en effectuant un don
                    content="Je me forme aux premiers secours | Croix-Rouge française"
                />
                <meta
                    property="og:description"
                    content="Formez-vous aux premiers secours. N'hésitez plus, trouvez une session de formation près de chez vous et inscrivez-vous !"
                />
            </Helmet>
            <Header/>
        </>
    );
}