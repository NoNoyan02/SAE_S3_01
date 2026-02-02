import React from "react";
import {Helmet} from "react-helmet";

// Composants
import Header from "../components/Header/Header";f

import Hero from "../components/Je-deviens/Main/Hero/Hero";
import SearchBar from "../components/Je-deviens/Main/SearchBar/SearchBar";
import VolunteerRecruitmentSection from "../components/Je-deviens/Main/Section/Volunteer/VolunteerRecruitmentSection";
import MissionSection from "../components/Je-deviens/Main/Section/MissionSection/MissionSection";
import InternationalMissions from "../components/Je-deviens/Main/Section/InternationalMissions/InternationalMissions";
import BecomeVolunteer from "../components/Je-deviens/Main/Section/BecomeVolunteer/BecomeVolunteer";
import MissionCard from "../components/Je-deviens/Main/Section/MissionCard/MissionCard";
import BenevolatSkillsSection
    from "../components/Je-deviens/Main/Section/BenevolatSkillsSection/BenevolatSkillsSection";
import Footer from "../components/Footer/Footer";
import AccordionFAQ from "../components/Je-deviens/Main/Section/AccordionFAQ/AccordionFAQ";
import VolunteerHeroSection from "../components/Je-deviens/Main/Section/VolunteerHeroSection/VolunteerHeroSection";
import ChildrenHelpSection from "../components/Je-deviens/Main/Section/ChildrenHelpSection/ChildrenHelpSection";
import HospitalVolunteerSection
    from "../components/Je-deviens/Main/Section/HospitalVolunteerSection/HospitalVolunteerSection";
import HomelessHelpSection from "../components/Je-deviens/Main/Section/HomelessHelpSection/HomelessHelpSection";
import EmergencyRescueSection
    from "../components/Je-deviens/Main/Section/EmergencyRescueSection/EmergencyRescueSection";
import WhyVolunteerSection from "../components/Je-deviens/Main/Section/WhyVolunteerSection/WhyVolunteerSection";
import TestimonialSection from "../components/Je-deviens/Main/Section/TestimonialSection/TestimonialSection";

import FAQQuestionsSection from "../components/Je-deviens/Main/Section/FAQQuestionsSection/FAQQuestionsSection";
import StepsGuideSection from "../components/Je-deviens/Main/Section/StepsGuideSection/StepsGuideSection";
import FindAssociationSection
    from "../components/Je-deviens/Main/Section/FindAssociationSection/FindAssociationSection";

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