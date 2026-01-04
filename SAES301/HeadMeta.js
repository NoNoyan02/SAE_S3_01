import React from "react";
import {Helmet} from "react-helmet";

const HeadMeta = () => (
    <Helmet>
        {/* Titre et description */}
        <title>Croix-Rouge française : engagez vous à nos côtés</title>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta name="format-detection" content="telephone=no"/>
        <meta name="theme-color" content="#d71a28"/>
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
);

export default HeadMeta;
