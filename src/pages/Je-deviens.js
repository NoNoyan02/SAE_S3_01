import {Helmet} from "react-helmet";
import Header from "../components/Header/Header";
import Hero from "../components/Je-deviens/Main/Hero/Hero";
import SearchBar from "../components/Je-deviens/Main/SearchBar/SearchBar";
import VolunteerRecruitmentSection from "../components/Je-deviens/Main/Section/Volunteer/VolunteerRecruitmentSection";
import MissionSection from "../components/Je-deviens/Main/Section/MissionSection/MissionSection";
import InternationalMissions from "../components/Je-deviens/Main/Section/InternationalMissions/InternationalMissions";
import BecomeVolunteer from "../components/Je-deviens/Main/Section/BecomeVolunteer/BecomeVolunteer";

function JeDeviens() {
    return (
        <>
            <Helmet>
                {/* Titre */}
                <title>Je deviens bénévole | Croix-Rouge française</title>

                {/* Encodage et affichage mobile */}
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="format-detection" content="telephone=no"/>

                {/* Description */}
                <meta
                    name="description"
                    content="Envie de devenir bénévole à la Croix-Rouge, rejoignez notre association. Merci pour votre engagement"
                />
            </Helmet>
            <Header/> {}
            <Hero/>
            <SearchBar/>
            <VolunteerRecruitmentSection/>
            <MissionSection/>
            <InternationalMissions/>
            <BecomeVolunteer/>

        </>
    );
}

export default JeDeviens;