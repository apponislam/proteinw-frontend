import type { Metadata } from "next";
import ForgotPasswordClient from "@/components/auth/ForgotPasswordClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Glömt lösenord",
    description: "Återställ ditt Kungsbjörnen-lösenord",
};

const page = () => {
    return <ForgotPasswordClient />;
};

export default page;
