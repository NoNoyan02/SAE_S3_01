import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header.js";

import Hero from "../components/Je-deviens/Main/Hero/Hero.js";
import SearchBar from "../components/Je-deviens/Main/SearchBar/SearchBar.js";
import VolunteerRecruitmentSection from "../components/Je-deviens/Main/Section/Volunteer/VolunteerRecruitmentSection.js";
import MissionSection from "../components/Je-deviens/Main/Section/MissionSection/MissionSection.js";
import InternationalMissions from "../components/Je-deviens/Main/Section/InternationalMissions/InternationalMissions.js";
import BecomeVolunteer from "../components/Je-deviens/Main/Section/BecomeVolunteer/BecomeVolunteer.js";
import MissionCard from "../components/Je-deviens/Main/Section/MissionCard/MissionCard.js";
import BenevolatSkillsSection
    from "../components/Je-deviens/Main/Section/BenevolatSkillsSection/BenevolatSkillsSection.js";
import Footer from "../components/Footer/Footer.js";
import AccordionFAQ from "../components/Je-deviens/Main/Section/AccordionFAQ/AccordionFAQ.js";
import VolunteerHeroSection from "../components/Je-deviens/Main/Section/VolunteerHeroSection/VolunteerHeroSection.js";
import ChildrenHelpSection from "../components/Je-deviens/Main/Section/ChildrenHelpSection/ChildrenHelpSection.js";
import HospitalVolunteerSection
    from "../components/Je-deviens/Main/Section/HospitalVolunteerSection/HospitalVolunteerSection.js";
import HomelessHelpSection from "../components/Je-deviens/Main/Section/HomelessHelpSection/HomelessHelpSection.js";
import EmergencyRescueSection
    from "../components/Je-deviens/Main/Section/EmergencyRescueSection/EmergencyRescueSection.js";
import WhyVolunteerSection from "../components/Je-deviens/Main/Section/WhyVolunteerSection/WhyVolunteerSection.js";
import TestimonialSection from "../components/Je-deviens/Main/Section/TestimonialSection/TestimonialSection.js";

import FAQQuestionsSection from "../components/Je-deviens/Main/Section/FAQQuestionsSection/FAQQuestionsSection.js";
import StepsGuideSection from "../components/Je-deviens/Main/Section/StepsGuideSection/StepsGuideSection.js";
import FindAssociationSection
    from "../components/Je-deviens/Main/Section/FindAssociationSection/FindAssociationSection.js";

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