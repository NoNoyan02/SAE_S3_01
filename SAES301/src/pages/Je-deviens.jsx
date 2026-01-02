import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header.jsx";

import Hero from "../components/Je-deviens/Main/Hero/Hero.jsx";
import SearchBar from "../components/Je-deviens/Main/SearchBar/SearchBar.jsx";
import VolunteerRecruitmentSection from "../components/Je-deviens/Main/Section/Volunteer/VolunteerRecruitmentSection.jsx";
import MissionSection from "../components/Je-deviens/Main/Section/MissionSection/MissionSection.jsx";
import InternationalMissions from "../components/Je-deviens/Main/Section/InternationalMissions/InternationalMissions.jsx";
import BecomeVolunteer from "../components/Je-deviens/Main/Section/BecomeVolunteer/BecomeVolunteer.jsx";
import MissionCard from "../components/Je-deviens/Main/Section/MissionCard/MissionCard.jsx";
import BenevolatSkillsSection
    from "../components/Je-deviens/Main/Section/BenevolatSkillsSection/BenevolatSkillsSection.jsx";
import Footer from "../components/Footer/Footer.jsx";
import AccordionFAQ from "../components/Je-deviens/Main/Section/AccordionFAQ/AccordionFAQ.jsx";
import VolunteerHeroSection from "../components/Je-deviens/Main/Section/VolunteerHeroSection/VolunteerHeroSection.jsx";
import ChildrenHelpSection from "../components/Je-deviens/Main/Section/ChildrenHelpSection/ChildrenHelpSection.jsx";
import HospitalVolunteerSection
    from "../components/Je-deviens/Main/Section/HospitalVolunteerSection/HospitalVolunteerSection.jsx";
import HomelessHelpSection from "../components/Je-deviens/Main/Section/HomelessHelpSection/HomelessHelpSection.jsx";
import EmergencyRescueSection
    from "../components/Je-deviens/Main/Section/EmergencyRescueSection/EmergencyRescueSection.jsx";
import WhyVolunteerSection from "../components/Je-deviens/Main/Section/WhyVolunteerSection/WhyVolunteerSection.jsx";
import TestimonialSection from "../components/Je-deviens/Main/Section/TestimonialSection/TestimonialSection.jsx";

import FAQQuestionsSection from "../components/Je-deviens/Main/Section/FAQQuestionsSection/FAQQuestionsSection.jsx";
import StepsGuideSection from "../components/Je-deviens/Main/Section/StepsGuideSection/StepsGuideSection.jsx";
import FindAssociationSection
    from "../components/Je-deviens/Main/Section/FindAssociationSection/FindAssociationSection.jsx";

export default function JeDeviens() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Je deviens bénévole | Croix-Rouge française</title>

                {/* Description */}
                <meta
                    name="description"
                    content="Envie de devenir bénévole à la Croix-Rouge, rejoignez notre association. Merci pour votre engagement"
                />

                {/* Open Graph */}
                <meta
                    property="og:title"
                    content="Je deviens bénévole | Croix-Rouge française"
                />
                <meta
                    property="og:description"
                    content="Envie de devenir bénévole à la Croix-Rouge, rejoignez notre association. Merci pour votre engagement"
                />
            </Helmet>
            <Header/>
            <nav className="sousnavbar" aria-label="Fil d'Ariane">
                <ol>
                    <li><a href="/protect/public">Accueil</a></li>
                    <li>Je deviens bénévole</li>
                </ol>
            </nav>
            <Hero/>
            <SearchBar/>

            <VolunteerRecruitmentSection/>
            <MissionSection/>
            <InternationalMissions/>
            <BecomeVolunteer/>
            <MissionCard/>
            <BenevolatSkillsSection/>
            <AccordionFAQ/>
            <VolunteerHeroSection/>
            <ChildrenHelpSection/>
            <HospitalVolunteerSection/>
            <HomelessHelpSection/>
            <EmergencyRescueSection/>
            <WhyVolunteerSection/>
            <TestimonialSection/>
            <StepsGuideSection/>
            <FAQQuestionsSection/>
            <FindAssociationSection/>
            <Footer/>

        </>
    );
}