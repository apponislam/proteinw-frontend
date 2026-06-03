import type { Metadata } from "next";
import LoginClient from "@/components/auth/LoginClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Login",
    description: "Login to your Kungsbjörnen account",
};

const page = () => {
    return <LoginClient />;
};

export default page;
