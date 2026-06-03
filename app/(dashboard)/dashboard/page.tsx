import type { Metadata } from "next";
import DashboardClient from "@/components/dashboard/DashboardClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Dashboard",
    description: "Your Kungsbjörnen dashboard",
};

const Page = () => {
    return <DashboardClient />;
};

export default Page;

