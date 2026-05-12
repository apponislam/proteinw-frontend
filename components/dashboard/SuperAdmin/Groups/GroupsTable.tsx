import React from "react";

const groups = [
    {
        code: "BS",
        name: "Bergens Skolekorps",
        admin: "Lise Johansen",
        sellers: 42,
        packagesSold: 1240,
        profitTier: "50% Tier",
        status: "ACTIVE",
        deadline: "Oct 24, 2023",
        id: "#GK-8829",
        note: "Goal Reached",
        timeLeft: "3 days left",
    },
    {
        code: "TF",
        name: "Tromsø Fotballklubb",
        admin: "Anders Dahl",
        sellers: 128,
        packagesSold: 642,
        profitTier: "40% Tier",
        status: "PAUSED",
        deadline: "Nov 12, 2023",
        id: "#GK-4412",
        note: "158 units to next tier",
        timeLeft: "In 22 days",
    },
    {
        code: "SS",
        name: "Stavanger Svømmeklubb",
        admin: "Mette Karlsen",
        sellers: 18,
        packagesSold: 892,
        profitTier: "45% Tier",
        status: "ACTIVE",
        deadline: "Oct 30, 2023",
        id: "#GK-1022",
        note: "108 units to next tier",
        timeLeft: "In 9 days",
    },
    {
        code: "OH",
        name: "Oslo Håndball",
        admin: "Erik Larsen",
        sellers: 94,
        packagesSold: 2150,
        profitTier: "50% Tier",
        status: "CLOSED",
        deadline: "Oct 15, 2023",
        id: "#GK-2231",
        note: "Goal Reached",
        timeLeft: "Ended",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "ACTIVE":
            return "bg-green-100 text-green-800";
        case "PAUSED":
            return "bg-yellow-100 text-yellow-800";
        case "CLOSED":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const GroupsTable = () => {
    return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Groups</h2>
                    <p className="text-[#78716C] text-sm mt-1">LIVE OVERVIEW</p>
                </div>
                {/* <div className="flex items-center gap-3">
                    <button className="text-[#78716C] hover:text-[#1A1C1C] text-sm">Filters</button>
                    <button className="text-[#D97706] hover:underline text-sm font-medium">Export CSV</button>
                </div> */}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ASSIGNED ADMIN</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PACKAGES SOLD</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PROFIT TIER</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DEADLINE</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.map((group, index) => (
                            <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">{group.code}</span>
                                        <div>
                                            <div className="text-[#1A1C1C] font-medium">{group.name}</div>
                                            <div className="text-[#78716C] text-sm">{group.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.admin}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.sellers}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{group.packagesSold.toLocaleString()}</td>
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="text-[#D97706] font-bold">{group.profitTier}</div>
                                        <div className="text-[#78716C] text-xs">{group.note}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(group.status)}`}>{group.status}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="text-[#1A1C1C] font-medium">{group.deadline}</div>
                                        <div className="text-[#78716C] text-xs">{group.timeLeft}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <button className="text-[#D97706] hover:underline text-sm">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="text-[#78716C] text-sm">SHOWING 1 TO 10 OF 1,248 SELLERS</div>
                <div className="flex items-center gap-2">
                    {[1, 2, 3].map((page) => (
                        <button key={page} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${page === 1 ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupsTable;
