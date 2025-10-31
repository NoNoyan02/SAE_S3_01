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

        {/* Icon et lien*/}
        <link rel="icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
        <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <link rel="canonical" href="https://www.croix-rouge.fr"/>
    </Helmet>
);

export default HeadMeta;
