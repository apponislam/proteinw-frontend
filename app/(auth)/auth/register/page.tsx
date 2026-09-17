import type { Metadata } from "next";
import RegisterClient from "@/components/auth/RegisterClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Skapa konto",
    description: "Skapa ett nytt Kungsbjörnen-konto",
};

const page = () => {
    return <RegisterClient />;
};

export default page;
