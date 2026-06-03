import type { Metadata } from "next";
import ForgotPasswordClient from "@/components/auth/ForgotPasswordClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Forgot Password",
    description: "Reset your Kungsbjörnen password",
};

const page = () => {
    return <ForgotPasswordClient />;
};

export default page;
