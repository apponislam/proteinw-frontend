import React, { useState } from "react";
import { useGetAllOrdersQuery } from "@/redux/features/order/orderApi";
import Pagination from "@/components/dashboard/Pagination";

export const SellerCampaignOrders = ({ memberId, campaignId }: { memberId: string; campaignId?: string }) => {
    const [page, setPage] = useState(1);
    const { data: response, isLoading } = useGetAllOrdersQuery({ memberId, campaignId, page, limit: 5 }, { skip: !memberId });

    const orders = response?.data || [];
    const meta = response?.meta;

    if (isLoading) {
        return (
            <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (orders.length === 0) {
        return <div className="text-center py-8 text-[#78716C] bg-[#FAFAF9] rounded-lg border border-dashed border-[#E7E5E4] text-sm">No orders found for this seller.</div>;
    }

    return (
        <div className="mt-4">
            {/* Mobile & Tablet Card Layout */}
            <div className="block md:hidden space-y-3">
                {orders.map((order) => (
                    <div key={order._id} className="p-3.5 rounded-xl border border-[#E7E5E4] bg-[#FAFAF9] space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                                <div className="font-bold text-[#1A1C1C] text-sm truncate">{order.customerName}</div>
                                <div className="text-[#78716C] text-xs truncate">{order.customerEmail}</div>
                            </div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize shrink-0 ${order.status === "delivered" ? "bg-green-100 text-green-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200/60 font-medium text-[#1A1C1C]">
                            <div>
                                <span className="text-[#78716C] font-normal">Packages: </span>
                                <span className="font-bold">{order.totalPackage}</span>
                            </div>
                            <div>
                                <span className="text-[#78716C] font-normal">Total Price: </span>
                                <span className="font-bold text-[#D97706]">{order.totalPrice} SEK</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto border border-[#E7E5E4] rounded-lg">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-[#FAFAF9] border-b border-[#E7E5E4]">
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Customer</th>
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Packages</th>
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Total Price</th>
                            <th className="px-4 py-3 text-[#78716C] font-semibold text-xs uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-150">
                                <td className="px-4 py-3">
                                    <div className="font-semibold text-[#1A1C1C]">{order.customerName}</div>
                                    <div className="text-[#78716C] text-xs">{order.customerEmail}</div>
                                </td>
                                <td className="px-4 py-3 text-[#1A1C1C] font-medium">{order.totalPackage}</td>
                                <td className="px-4 py-3 font-semibold text-[#1A1C1C]">{order.totalPrice} SEK</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${order.status === "delivered" ? "bg-green-100 text-green-800" : order.status === "cancelled" ? "bg-red-100 text-red-800" : "bg-amber-100 text-amber-800"}`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination meta={meta} onPageChange={setPage} itemName="ORDERS" />
        </div>
    );
};
