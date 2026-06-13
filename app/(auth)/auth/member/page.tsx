import type { Metadata } from "next";
import RegisterSellerClient from "@/components/auth/RegisterSellerClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Register Seller",
    description: "Join your fundraising group as a seller",
};

const page = () => {
    return <RegisterSellerClient />;
};

export default page;
