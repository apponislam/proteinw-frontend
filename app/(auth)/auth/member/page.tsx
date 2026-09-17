import type { Metadata } from "next";
import RegisterSellerClient from "@/components/auth/RegisterSellerClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Registrera säljare",
    description: "Gå med i din försäljningsgrupp som säljare",
};

const page = () => {
    return <RegisterSellerClient />;
};

export default page;
