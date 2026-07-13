import { CoreVision } from "@/components/mission/CoreVision";
import { MissionHero } from "@/components/mission/MissionHero";
import { SupportMission } from "@/components/mission/SupportMission";
import { MakeDifference } from "@/components/mission/MakeDifference";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Mission",
    description: "Kungsbjörnen mission",
};

const page = () => {
    return (
        <>
            <MissionHero />
            <CoreVision />
            <SupportMission />
            <MakeDifference />
        </>
    );
};

export default page;
