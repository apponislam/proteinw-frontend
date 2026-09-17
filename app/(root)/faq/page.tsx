import type { Metadata } from "next";
import AboutUsClient from "@/components/faq/AboutUsClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Vanliga frågor & Support",
    description: "Hitta svar på vanliga frågor om Kungsbjörnens försäljning eller kontakta oss för hjälp",
};

const Page = () => {
    return <AboutUsClient />;
};

export default Page;
