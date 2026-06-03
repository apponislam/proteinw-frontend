import type { Metadata } from "next";
import ResetSuccessfulClient from "@/components/auth/ResetSuccessfulClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Password Reset Successful",
    description: "Your Kungsbjörnen password has been reset successfully",
};

const page = () => {
    return <ResetSuccessfulClient />;
};

export default page;
