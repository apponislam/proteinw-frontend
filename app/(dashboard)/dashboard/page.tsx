"use client";

import AdminOverview from "@/components/dashboard/SuperAdmin/Home/AdminOverview";
import SellerAdminOverview from "@/components/dashboard/SellerAdmin/Home/SellerAdminOverview";
import { useRole } from "@/components/dashboard/RoleProvider";
import React from "react";

const Page = () => {
    const { activeRole } = useRole();

    return (
        <div>
            {activeRole === "SUPER_ADMIN" && <AdminOverview />}
            {activeRole === "SELLER_ADMIN" && <SellerAdminOverview />}
            {activeRole === "SELLER" && <div className="text-4xl text-[#1A1C1C]">Seller Dashboard</div>}
        </div>
    );
};

export default Page;
