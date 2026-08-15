import type { Metadata } from "next";
import MemberForgotPasswordClient from "@/components/auth/MemberForgotPasswordClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Member Forgot Password",
    description: "Reset your Kungsbjörnen member password",
};

const page = () => {
    return <MemberForgotPasswordClient />;
};

export default page;
