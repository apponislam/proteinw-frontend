import type { Metadata } from "next";
import RegisterClient from "@/components/auth/RegisterClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Register",
    description: "Create a new Kungsbjörnen account",
};

const page = () => {
    return <RegisterClient />;
};

export default page;
