import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header";

export default function PageIntrouvable() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Page introuvable | Croix-Rouge française</title>

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="Page introuvable | Croix-Rouge française"
                />
            </Helmet>
            <Header/>
            <p>Introuvable</p>
        </>
    );
}