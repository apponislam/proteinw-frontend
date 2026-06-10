"use client";

import { PolicyTypeEnum, useGetPolicyByTypeQuery } from "@/redux/features/public/publicApi";

export default function TermsOfServiceContent() {
    const { data: policyData, isLoading } = useGetPolicyByTypeQuery(PolicyTypeEnum.TERMS_AND_CONDITIONS);

    if (isLoading) {
        return (
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold mb-4 text-[#1C1917]">Terms of Service</h1>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 max-w-4xl">
            <div className="mb-12">
                <h1 className="text-5xl font-bold mb-4 text-[#1C1917]">{policyData?.data?.title || "Terms of Service"}</h1>
                {policyData?.data?.publishedAt && (
                    <p className="text-gray-600">
                        Last updated:{" "}
                        {new Date(policyData.data.publishedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                )}
            </div>
            <div
                className="space-y-8 rich-text-content"
                dangerouslySetInnerHTML={{
                    __html: policyData?.data?.content || "<p>Terms of service content not available yet.</p>",
                }}
            />
        </div>
    );
}
