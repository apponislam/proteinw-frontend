import ChooseWhy from "@/components/home/ChooseWhy";
import Collection from "@/components/home/Collection";
import EarnSection from "@/components/home/EarnSection";
import { HeroArea } from "@/components/home/HeroArea";
import ProfitValueCards from "@/components/home/ProfitValueCards";
import StepsSection from "@/components/home/StepsSection";
import TestimonialsFAQ from "@/components/home/TestimonialsFAQ";

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
