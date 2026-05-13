import React from "react";

const orders = [
    {
        id: "#ORD-8821",
        sellerCode: "EB",
        sellerName: "Erik Berg",
        group: "Stockholm North",
        customerName: "Linnéa Forsberg",
        product: "Ceramic Pitcher",
        qty: 2,
        status: "Pending",
        date: "Oct 24, 2023",
    },
    {
        id: "#ORD-8819",
        sellerCode: "ML",
        sellerName: "Maja Lund",
        group: "Oslo Central",
        customerName: "Soren Nielsen",
        product: "Wool Throw",
        qty: 1,
        status: "Approve",
        date: "Oct 23, 2023",
    },
    {
        id: "#ORD-8815",
        sellerCode: "KS",
        sellerName: "Karl Sjöberg",
        group: "Stockholm North",
        customerName: "Astrid Lind",
        product: "Linen Set",
        qty: 4,
        status: "Returned",
        date: "Oct 21, 2023",
    },
    {
        id: "#ORD-8812",
        sellerCode: "EB",
        sellerName: "Erik Berg",
        group: "Stockholm North",
        customerName: "Oskar Varg",
        product: "Oak Bowl",
        qty: 1,
        status: "Approve",
        date: "Oct 20, 2023",
    },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Approve":
            return "bg-green-100 text-green-800";
        case "Pending":
            return "bg-yellow-100 text-yellow-800";
        case "Returned":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const OrdersTable = () => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Orders</h2>
                    <p className="text-[#78716C] text-sm mt-1">LIVE OVERVIEW</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filters:</div>
                    <div className="flex items-center gap-3">
                        <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]">
                            <option>All Groups</option>
                        </select>
                        <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]">
                            <option>All Status</option>
                        </select>
                        <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]">
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDER ID</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLER</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">CUSTOMER NAME</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PRODUCT</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">QTY</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DATE</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                <td className="px-4 py-4">
                                    <span className="text-[#D97706] font-bold">{order.id}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-xs">{order.sellerCode}</span>
                                        <div className="text-[#1A1C1C] font-medium">{order.sellerName}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.group}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.customerName}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.product}</td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.qty}</td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>{order.status}</span>
                                </td>
                                <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.date}</td>
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

export default OrdersTable;
