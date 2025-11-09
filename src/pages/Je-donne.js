import React from "react";
import {Helmet} from "react-helmet";


// Composants
import Header from "../components/Header/Header";
import MainJedonne from "../components/Je-donne/MainJedonne";
import Footer from "../components/Footer/Footer";

export default function Jedonne() {
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
            <MainJedonne/>
            <Footer/>
        </>
    );
}