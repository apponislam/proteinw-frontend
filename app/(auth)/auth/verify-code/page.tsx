import type { Metadata } from "next";
import VerifyCodeClient from "@/components/auth/VerifyCodeClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Verifiera kod",
    description: "Verifiera ditt Kungsbjörnen-konto",
};

const Page = () => {
    return <VerifyCodeClient />;
};

export default Page;
