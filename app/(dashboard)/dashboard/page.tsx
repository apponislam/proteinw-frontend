import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Instrumentpanel",
    description: "Din Kungsbjörnen-instrumentpanel",
};

const Page = () => {
    return <DashboardClient />;
};

export default Page;
