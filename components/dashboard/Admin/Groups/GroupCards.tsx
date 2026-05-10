import React from "react";
import Image from "next/image";

const groupStats = [
    {
        title: "ACTIVE GROUPS",
        value: "142",
        subtitle: "+12%",
        color: "#D97706",
    },
    {
        title: "PACKAGES SOLD",
        value: "8,432",
        subtitle: "",
        color: "#D97706",
    },
    {
        title: "AVG. PROFIT TIER",
        value: "45.2%",
        subtitle: "",
        color: "#D97706",
    },
    {
        title: "DEADLINES THIS WEEK",
        value: "18",
        subtitle: "",
        color: "#D97706",
    },
];

const GroupCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {groupStats.map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        {stat.subtitle && <div className="text-[#D97706] text-sm font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.subtitle}</div>}
                        <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                        <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GroupCards;
