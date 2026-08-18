import type { Metadata } from "next";
import VerifyEmailClient from "@/components/auth/VerifyEmailClient";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Verify Email",
    description: "Verify your email address for Kungsbjörnen",
};

const Page = () => {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <VerifyEmailClient />
        </Suspense>
    );
};

export default Page;
