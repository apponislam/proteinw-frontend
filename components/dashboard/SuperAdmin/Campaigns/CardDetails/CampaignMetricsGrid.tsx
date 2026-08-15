"use client";

import React from "react";
import Image from "next/image";

interface CampaignMetricsGridProps {
    stats: Array<{
        title: string;
        value: string;
        subtitle?: string;
    }>;
}

const CampaignMetricsGrid: React.FC<CampaignMetricsGridProps> = ({ stats }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group cursor-pointer"
                >
                    <div className="relative z-10">
                        {stat.subtitle && (
                            <div className="text-[#D97706] text-xs font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300 tracking-wider uppercase">
                                {stat.subtitle}
                            </div>
                        )}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">
                            {stat.value}
                        </div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">
                            {stat.title}
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} style={{ width: "auto", height: "auto" }} className="block" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CampaignMetricsGrid;
