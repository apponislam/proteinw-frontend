import type { Metadata } from "next";
import ResetSuccessfulClient from "@/components/auth/ResetSuccessfulClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Lösenordet återställt",
    description: "Ditt Kungsbjörnen-lösenord har återställts",
};

const page = () => {
    return <ResetSuccessfulClient />;
};

export default page;
