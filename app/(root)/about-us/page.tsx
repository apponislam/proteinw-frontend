import type { Metadata } from "next";
import AboutUsClient from "@/components/about-us/AboutUsClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - About Us",
    description: "Learn about Kungsbjörnen's fundraising model and how we help schools and teams",
};

const Page = () => {
    return <AboutUsClient />;
};

export default Page;
