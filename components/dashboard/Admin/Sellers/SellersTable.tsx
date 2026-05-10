import React from "react";

const sellers = [
    {
        code: "JS",
        name: "James Sorenson",
        email: "james.s@example.com",
        group: "Oslo Central Scouts",
        orders: 124,
        packages: 452,
        status: "Active",
        salesLink: "fund.me/jsorenson",
    },
    {
        code: "MH",
        name: "Maja Holm",
        email: "m.holm@webmail.no",
        group: "Bergen Youth Soccer",
        orders: 89,
        packages: 210,
        status: "Active",
        salesLink: "fund.me/majaholm",
    },
    {
        code: "EL",
        name: "Elias Larsen",
        email: "elias@larsen.com",
        group: "Trondheim Music Academy",
        orders: 12,
        packages: 24,
        status: "Inactive",
        salesLink: "fund.me/eliasl",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800";
        case "Inactive":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const SellersTable = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Sellers</h2>
                    <p className="text-[#78716C] text-sm mt-1">LIVE OVERVIEW</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-[#78716C] hover:text-[#1A1C1C] text-sm">Filters</button>
                    <button className="text-[#D97706] hover:underline text-sm font-medium">Export CSV</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLER NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDERS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PACKAGES</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SALES LINK</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sellers.map((seller, index) => (
                            <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">{seller.code}</span>
                                        <div>
                                            <div className="text-[#1A1C1C] font-medium">{seller.name}</div>
                                            <div className="text-[#78716C] text-sm">{seller.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.group}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.orders}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.packages}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>{seller.status}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <a href={`https://${seller.salesLink}`} target="_blank" rel="noopener noreferrer" className="text-[#D97706] hover:underline text-sm">
                                        {seller.salesLink}
                                    </a>
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

export default SellersTable;
