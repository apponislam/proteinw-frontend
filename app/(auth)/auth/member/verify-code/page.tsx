import type { Metadata } from "next";
import MemberVerifyCodeClient from "@/components/auth/MemberVerifyCodeClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Member Verify Code",
    description: "Verify your Kungsbjörnen member code",
};

const page = () => {
    return <MemberVerifyCodeClient />;
};

export default page;
