import type { Metadata } from "next";
import PrivacyPolicyContent from "@/components/policy/PrivacyPolicyContent";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Privacy Policy",
    description: "Kungsbjörnen privacy policy",
};

export default function PrivacyPolicy() {
    return (
        <main className="bg-[#F5F5F4] text-[#1C1917] py-20">
            <PrivacyPolicyContent />
        </main>
    );
}
