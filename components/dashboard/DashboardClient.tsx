"use client";

import AdminOverview from "@/components/dashboard/SuperAdmin/Home/AdminOverview";
import SellerAdminOverview from "@/components/dashboard/SellerAdmin/Home/SellerAdminOverview";
import SellerOverview from "@/components/dashboard/Seller/Home/SellerOverview";
import { useRole } from "@/components/dashboard/RoleProvider";
import React from "react";

const DashboardClient = () => {
    const { activeRole } = useRole();

    return (
        <div>
            {activeRole === "SUPER_ADMIN" && <AdminOverview />}
            {activeRole === "ADMIN" && <SellerAdminOverview />}
            {activeRole === "SELLER" && <SellerOverview />}
        </div>
    );
};

export default DashboardClient;
