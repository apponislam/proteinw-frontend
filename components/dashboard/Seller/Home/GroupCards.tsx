import React from "react";
import GroupCard from "./GroupCard";

interface Group {
    name: string;
    campaignName: string;
    activeSellers: string;
    totalSales: string;
    nextTierProfit: string;
    untilBonus: string;
    progress: number;
}

const GroupCards = () => {
    const groups: Group[] = [
        {
            name: "Class 9B",
            campaignName: "Annual Sports Trip Fund",
            activeSellers: "26",
            totalSales: "SEK 12,400",
            nextTierProfit: "45%",
            untilBonus: "SEK 7,600 until 15% profit bonus",
            progress: 45,
        },
        {
            name: "Lincoln High Seniors",
            campaignName: "Spring Bake Sale Campaign",
            activeSellers: "42",
            totalSales: "SEK 21,500",
            nextTierProfit: "75%",
            untilBonus: "SEK 3,500 until 15% profit bonus",
            progress: 75,
        },
        {
            name: "Northside Youth Soccer",
            campaignName: "Team Equipment Fund",
            activeSellers: "36",
            totalSales: "SEK 18,900",
            nextTierProfit: "60%",
            untilBonus: "SEK 6,100 until 15% profit bonus",
            progress: 60,
        },
    ];

    return (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, idx) => (
                <GroupCard key={idx} group={group} />
            ))}
        </div>
    );
};

export default GroupCards;
