"use client";

import React from "react";

interface SellersListProps {
    sellers: any[];
}

const SellersList: React.FC<SellersListProps> = ({ sellers }) => {
    if (!sellers || sellers.length === 0) {
        return <div className="p-8 text-center text-sm text-[#78716C]">No sellers registered in this campaign.</div>;
    }

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-125">
                <thead>
                    <tr className="bg-[#F8F6F4] text-xs font-bold text-[#78716C] uppercase tracking-wider border-b border-[#E7E5E4] whitespace-nowrap">
                        <th className="py-3.5 px-6">Name</th>
                        <th className="py-3.5 px-6">Email</th>
                        <th className="py-3.5 px-6 text-right">Sold</th>
                        <th className="py-3.5 px-6 text-right">Revenue</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4] text-sm text-[#1A1C1C]">
                    {sellers.map((seller) => (
                        <tr key={seller._id} className="hover:bg-[#FCFBFA] transition-colors whitespace-nowrap">
                            <td className="py-4 px-6 font-semibold">{seller.name}</td>
                            <td className="py-4 px-6 text-[#78716C] font-mono text-xs">{seller.email}</td>
                            <td className="py-4 px-6 text-right font-medium">{seller.totalPackagesSold || 0} pcs</td>
                            <td className="py-4 px-6 text-right font-bold text-[#D97706]">SEK {(seller.totalRevenueSold || 0).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SellersList;
