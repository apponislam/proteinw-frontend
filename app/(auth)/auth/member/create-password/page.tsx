import type { Metadata } from "next";
import MemberCreatePasswordClient from "@/components/auth/MemberCreatePasswordClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Member Create New Password",
    description: "Create a new password for your Kungsbjörnen member account",
};

const page = () => {
    return <MemberCreatePasswordClient />;
};

export default page;
