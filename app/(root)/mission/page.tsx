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
        </>
    );
};

export default page;
