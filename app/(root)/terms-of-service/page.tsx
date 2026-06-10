import type { Metadata } from "next";
import TermsOfServiceContent from "@/components/policy/TermsOfServiceContent";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Terms of Service",
    description: "Kungsbjörnen terms of service",
};

export default function TermsOfService() {
    return (
        <main className="bg-[#F5F5F4] text-[#1C1917] py-20">
            <TermsOfServiceContent />
        </main>
    );
}
