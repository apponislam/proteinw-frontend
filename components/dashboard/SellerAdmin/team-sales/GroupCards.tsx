"use client";

import React, { useState } from "react";
import GroupCard from "./GroupCard";
import CreateGroupModal from "./CreateGroupModal";

interface Group {
    name: string;
    campaignName: string;
    activeSellers: string;
    totalSales: string;
    nextTierProfit: string;
    untilBonus: string;
}

const GroupCards = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const groups: Group[] = [
        {
            name: "Class 9A",
            campaignName: "Spring Bake Sale Campaign",
            activeSellers: "26",
            totalSales: "SEK 18,200",
            nextTierProfit: "75%",
            untilBonus: "SEK 1,800 until 15% profit bonus",
        },
        {
            name: "Class 9B",
            campaignName: "Annual Sports Trip Fund",
            activeSellers: "26",
            totalSales: "SEK 12,400",
            nextTierProfit: "45%",
            untilBonus: "SEK 7,600 until 15% profit bonus",
        },
        {
            name: "Class 9B",
            campaignName: "Annual Sports Trip Fund",
            activeSellers: "26",
            totalSales: "SEK 12,400",
            nextTierProfit: "45%",
            untilBonus: "SEK 7,600 until 15% profit bonus",
        },
        {
            name: "Class 9B",
            campaignName: "Annual Sports Trip Fund",
            activeSellers: "26",
            totalSales: "SEK 12,400",
            nextTierProfit: "45%",
            untilBonus: "SEK 7,600 until 15% profit bonus",
        },
    ];

    return (
        <>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group, idx) => (
                    <GroupCard key={idx} className="" name={group.name} campaignName={group.campaignName} activeSellers={group.activeSellers} totalSales={group.totalSales} nextTierProfit={group.nextTierProfit} untilBonus={group.untilBonus} />
                ))}
                <button onClick={() => setIsModalOpen(true)} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group flex flex-col justify-center items-center text-center">
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300 mb-2">Start New Group</h3>
                        <p className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Add your next class or team</p>
                    </div>
                </button>
            </div>

            <CreateGroupModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default GroupCards;
