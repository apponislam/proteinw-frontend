import type { Metadata } from "next";
import CreatePasswordClient from "@/components/auth/CreatePasswordClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Create New Password",
    description: "Create a new password for your Kungsbjörnen account",
};

const page = () => {
    return <CreatePasswordClient />;
};

export default page;
