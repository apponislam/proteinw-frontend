"use client";

import React from "react";
import OrdersCard from "@/components/dashboard/Admin/Orders/OrdersCard";
import OrdersTable from "@/components/dashboard/Admin/Orders/OrdersTable";

const OrdersPage = () => {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Order Management</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Oversee all transactional activity across the organization with precision and clarity.</p>
                </div>
            </div>

            <OrdersCard />
            <OrdersTable />
        </div>
    );
};

export default OrdersPage;
