import React from "react";
import {Helmet} from "react-helmet";

// import Header from "../components/Header/Header";
// import Hero from "../components/Je-deviens/Main/Hero/Hero";
// import SearchBar from "../components/Je-deviens/Main/SearchBar/SearchBar";
// import VolunteerRecruitmentSection from "../components/Je-deviens/Main/Section/Volunteer/VolunteerRecruitmentSection";
// import MissionSection from "../components/Je-deviens/Main/Section/MissionSection/MissionSection";
// import InternationalMissions from "../components/Je-deviens/Main/Section/InternationalMissions/InternationalMissions";
// import BecomeVolunteer from "../components/Je-deviens/Main/Section/BecomeVolunteer/BecomeVolunteer";

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
            {/*<Header/> {}*/}
            {/*<Hero/>*/}
            {/*<SearchBar/>*/}
            {/*<VolunteerRecruitmentSection/>*/}
            {/*<MissionSection/>*/}
            {/*<InternationalMissions/>*/}
            {/*<BecomeVolunteer/>*/}

        </>
    );
}