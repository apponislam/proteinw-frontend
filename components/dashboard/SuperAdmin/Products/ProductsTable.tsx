import React from "react";

const products = [
    {
        name: "Odin Ceramic Vase",
        id: "SKU-20492-W",
        status: "Active",
        price: "$124.00",
        campaigns: ["W", "N", "F", "G"],
    },
    {
        name: "Sol Lounge Chair",
        id: "SKU-11204-O",
        status: "Active",
        price: "$849.00",
        campaigns: ["N"],
    },
    {
        name: "Tid Wall Clock",
        id: "SKU-45521-T",
        status: "Draft",
        price: "$75.00",
        campaigns: [],
    },
    {
        name: "Ull Wool Throw",
        id: "SKU-33091-G",
        status: "Draft",
        price: "$185.00",
        campaigns: ["W", "F", "X"],
    },
];

const campaignColors = ["bg-[#D97706]", "bg-[#7C3AED]", "bg-[#10B981]", "bg-[#3B82F6]"];

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800";
        case "Draft":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

interface ProductsTableProps {
    onEdit?: () => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ onEdit }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Product Archive</h2>
                    <p className="text-[#78716C] text-sm mt-1">LIVE OVERVIEW</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filter</div>
                    <div className="flex items-center gap-3">
                        <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]">
                            <option>Category: All</option>
                        </select>
                        <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]">
                            <option>Status: Active</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-[#FAFAF9]">
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PRODUCT DETAILS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PRICING</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">CAMPAIGNS</th>
                            <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                <td className="px-4 py-4">
                                    <div>
                                        <div className="text-[#1A1C1C] font-medium">{product.name}</div>
                                        <div className="text-[#78716C] text-sm">{product.id}</div>
                                    </div>
                                </td>
                                <td className="px-4 py-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>{product.status}</span>
                                </td>
                                <td className="px-4 py-4">
                                    <span className="text-[#D97706] font-bold">{product.price}</span>
                                </td>
                                <td className="px-4 py-4">
                                    {product.campaigns.length === 0 ? (
                                        <span className="text-[#78716C] text-sm">None assigned</span>
                                    ) : (
                                        <div className="flex items-center relative group">
                                            {product.campaigns.slice(0, 2).map((campaign, idx) => (
                                                <span key={idx} className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white ${campaignColors[idx % campaignColors.length]} ${idx > 0 ? "-ml-2" : ""}`}>
                                                    {campaign}
                                                </span>
                                            ))}
                                            {product.campaigns.length > 2 && <span className={`w-8 h-8 rounded-full bg-[#78716C] text-white flex items-center justify-center font-bold text-xs border-2 border-white ${product.campaigns.length > 2 ? "-ml-2" : ""}`}>+{product.campaigns.length - 2}</span>}
                                            {product.campaigns.length > 2 && (
                                                <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-wrap gap-1 bg-white p-2 rounded-lg shadow-lg border border-[#F5F5F4] z-50">
                                                    {product.campaigns.map((campaign, idx) => (
                                                        <span key={idx} className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs ${campaignColors[idx % campaignColors.length]}`}>
                                                            {campaign}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </td>
                                <td className="px-4 py-4">
                                    <button onClick={onEdit} className="text-[#D97706] hover:underline text-sm">
                                        Edit
                                    </button>
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

export default ProductsTable;
