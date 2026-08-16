"use client";

import React from "react";
import SellerOrdersCard from "./SellerOrdersCard";
import SellerOrdersTable from "./SellerOrdersTable";
import SellerEmptyOrders from "./SellerEmptyOrders";
import { useGetOrdersByMemberQuery } from "@/redux/features/order/orderApi";

const SellerOrdersView = () => {
    const { data: sellerOrdersData, isLoading } = useGetOrdersByMemberQuery({ page: 1, limit: 10 });
    const ordersList = sellerOrdersData?.data || [];
    const hasOrders = !isLoading && ordersList.length > 0;

    return (
        <div>
            {isLoading ? (
                <div className="text-center py-12">
                    <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#78716C] text-sm">Loading your orders...</p>
                </div>
            ) : hasOrders ? (
                <>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-[#1A1C1C]">My Sales Orders</h1>
                            <p className="text-[#78716C] mt-2 max-w-2xl">View and track all customer orders placed through your personal fundraising sales link.</p>
                        </div>
                    </div>
                    <SellerOrdersCard />
                    <SellerOrdersTable />
                </>
            ) : (
                <SellerEmptyOrders />
            )}
        </div>
    );
};

export default SellerOrdersView;
