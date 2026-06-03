import type { Metadata } from "next";
import VerifyCodeClient from "@/components/auth/VerifyCodeClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Verify Code",
    description: "Verify your Kungsbjörnen account",
};

const Page = () => {
    return <VerifyCodeClient />;
};

export default Page;
