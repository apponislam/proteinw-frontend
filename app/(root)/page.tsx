import ChooseWhy from "@/components/Home/ChooseWhy";
import Collection from "@/components/Home/Collection";
import EarnSection from "@/components/Home/EarnSection";
import { HeroArea } from "@/components/Home/HeroArea";
import ProfitValueCards from "@/components/Home/ProfitValueCards";
import StepsSection from "@/components/Home/StepsSection";
import TestimonialsFAQ from "@/components/Home/TestimonialsFAQ";

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
