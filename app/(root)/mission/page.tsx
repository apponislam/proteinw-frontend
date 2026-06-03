import { CoreVision } from "@/components/mission/CoreVision";
import { MissionHero } from "@/components/mission/MissionHero";
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
        </>
    );
};

export default page;
