"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "jodit/es2021/jodit.min.css";
import { PolicyTypeEnum, useGetPolicyByTypeQuery, useUpsertPolicyMutation } from "@/redux/features/public/publicApi";
import { toast } from "sonner";

const JoditEditor = dynamic(() => import("jodit-react"), {
    ssr: false,
});

const PolicyCenterPage = () => {
    const [activeTab, setActiveTab] = useState("terms");
    const [termsContent, setTermsContent] = useState("");
    const [privacyContent, setPrivacyContent] = useState("");

    const { data: termsData, isLoading: termsLoading, refetch: refetchTerms } = useGetPolicyByTypeQuery(PolicyTypeEnum.TERMS_AND_CONDITIONS);
    const { data: privacyData, isLoading: privacyLoading, refetch: refetchPrivacy } = useGetPolicyByTypeQuery(PolicyTypeEnum.PRIVACY_POLICY);

    const [upsertPolicy, { isLoading: isSaving }] = useUpsertPolicyMutation();

    const config = useMemo(
        () =>
            ({
                disablePlugins: ["image", "file", "video", "media", "uploader", "filebrowser", "drag-and-drop"],
            }) as any,
        [],
    );

    useEffect(() => {
        if (termsData?.data?.content) {
            setTermsContent(termsData.data.content);
        }
    }, [termsData]);

    useEffect(() => {
        if (privacyData?.data?.content) {
            setPrivacyContent(privacyData.data.content);
        }
    }, [privacyData]);

    const handleSaveTerms = async () => {
        try {
            await upsertPolicy({
                type: PolicyTypeEnum.TERMS_AND_CONDITIONS,
                title: "Terms and Conditions",
                content: termsContent,
                publishedAt: new Date().toISOString(),
            }).unwrap();
            toast.success("Terms and Conditions saved successfully!");
            await refetchTerms();
        } catch (error) {
            toast.error("Failed to save Terms and Conditions");
            console.error(error);
        }
    };

    const handleSavePrivacy = async () => {
        try {
            await upsertPolicy({
                type: PolicyTypeEnum.PRIVACY_POLICY,
                title: "Privacy Policy",
                content: privacyContent,
                publishedAt: new Date().toISOString(),
            }).unwrap();
            toast.success("Privacy Policy saved successfully!");
            await refetchPrivacy();
        } catch (error) {
            toast.error("Failed to save Privacy Policy");
            console.error(error);
        }
    };

    if (termsLoading || privacyLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-lg text-gray-600">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Policy Center</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Manage your terms and conditions and privacy policy.</p>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="flex items-center gap-1 p-2 border-b border-[#F5F5F4]">
                    <button onClick={() => setActiveTab("terms")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "terms" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:text-[#1A1C1C] hover:bg-[#F5F5F4]"}`}>
                        Terms and Conditions
                    </button>
                    <button onClick={() => setActiveTab("privacy")} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "privacy" ? "bg-[#D97706] text-white" : "text-[#78716C] hover:text-[#1A1C1C] hover:bg-[#F5F5F4]"}`}>
                        Privacy Policy
                    </button>
                </div>

                <div className="p-6">
                    {activeTab === "terms" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Terms and Conditions</h2>
                            <div>
                                <JoditEditor value={termsContent} config={config} onBlur={(newContent: string) => setTermsContent(newContent)} />
                            </div>
                            <button disabled={isSaving} className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSaveTerms}>
                                {isSaving ? "Saving..." : "Save Terms"}
                            </button>
                        </div>
                    )}

                    {activeTab === "privacy" && (
                        <div className="space-y-4">
                            <h2 className="text-xl font-bold text-[#1A1C1C]">Privacy Policy</h2>
                            <div>
                                <JoditEditor value={privacyContent} config={config} onBlur={(newContent: string) => setPrivacyContent(newContent)} />
                            </div>
                            <button disabled={isSaving} className="h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleSavePrivacy}>
                                {isSaving ? "Saving..." : "Save Privacy Policy"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PolicyCenterPage;
