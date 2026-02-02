import React from "react";
import SEO from '@/components/SEO';

import Main from "@/components/Accueil/Main/Main.jsx";


export default function Accueil() {
    return (
        <>
            <SEO
                title="Croix-Rouge française : engagez vous à nos côtés"
                description="La Croix-Rouge française agit pour protéger et relever sans condition, les personnes en situation de vulnérabilité et construire avec elles leur résilience."
                image="/crf_logo.png"
            />
            <Main />
        </>
    );
}