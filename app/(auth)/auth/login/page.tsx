import type { Metadata } from "next";
import LoginClient from "@/components/auth/LoginClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Logga in",
    description: "Logga in på ditt Kungsbjörnen-konto",
};

const page = () => {
    return <LoginClient />;
};

export default page;
