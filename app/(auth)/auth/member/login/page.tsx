import LoginMemberClient from "@/components/auth/LoginMemberClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Member Login",
    description: "Sign in to your fundraising team account",
};

const page = () => {
    return <LoginMemberClient />;
};

export default page;
