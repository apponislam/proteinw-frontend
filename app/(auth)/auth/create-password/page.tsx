import type { Metadata } from "next";
import CreatePasswordClient from "@/components/auth/CreatePasswordClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Skapa nytt lösenord",
    description: "Skapa ett nytt lösenord för ditt Kungsbjörnen-konto",
};

const page = () => {
    return <CreatePasswordClient />;
};

export default page;
