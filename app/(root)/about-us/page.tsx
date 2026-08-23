import { CoreVision } from "@/components/about-us/CoreVision";
import { MissionHero } from "@/components/about-us/MissionHero";
import { SupportMission } from "@/components/about-us/SupportMission";
import { MakeDifference } from "@/components/about-us/MakeDifference";
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
