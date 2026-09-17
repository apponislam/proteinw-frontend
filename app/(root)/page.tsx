import type { Metadata } from "next";
import ChooseWhy from "@/components/home/ChooseWhy";
import Collection from "@/components/home/Collection";
import EarnSection from "@/components/home/EarnSection";
import { HeroArea } from "@/components/home/HeroArea";
import ProfitValueCards from "@/components/home/ProfitValueCards";
import StepsSection from "@/components/home/StepsSection";
import TestimonialsFAQ from "@/components/home/TestimonialsFAQ";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Start",
    description: "Tjäna pengar till klassen, laget eller föreningen med Kungsbjörnen. Enkel digital försäljning och hög förtjänst.",
};

export default function Home() {
    return (
        <div>
            <HeroArea></HeroArea>
            <ChooseWhy></ChooseWhy>
            <Collection></Collection>
            <StepsSection></StepsSection>
            <EarnSection></EarnSection>
            <ProfitValueCards></ProfitValueCards>
            <TestimonialsFAQ></TestimonialsFAQ>
        </div>
    );
}
