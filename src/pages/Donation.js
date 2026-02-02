import React from "react";
import { Helmet } from "react-helmet";

// Composants

export default function Donation() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Soutenez la Croix-Rouge française</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Soutenez notre association en effectuant un don"
                />

                {/* Open Graph */}
                <meta
                    property="og:title" Soutenez notre association en effectuant un don
                    content="Soutenez la Croix-Rouge française"
                />
                <meta
                    property="og:description"
                    content="Soutenez notre association en effectuant un don"
                />
            </Helmet>
        </>
    );
}