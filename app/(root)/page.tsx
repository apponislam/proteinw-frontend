import ChooseWhy from "@/components/Home/ChooseWhy";
import { HeroArea } from "@/components/Home/HeroArea";
import StepsSection from "@/components/Home/StepsSection";
import TestimonialsFAQ from "@/components/Home/TestimonialsFAQ";

export default function Home() {
    return (
        <div>
            <HeroArea></HeroArea>
            <ChooseWhy></ChooseWhy>
            <StepsSection></StepsSection>
            <TestimonialsFAQ></TestimonialsFAQ>
        </div>
    );
}
