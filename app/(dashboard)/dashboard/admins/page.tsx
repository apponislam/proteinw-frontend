"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AdminCreateModal from "@/components/dashboard/SuperAdmin/Admins/AdminCreateModal";
import AdminsCards from "@/components/dashboard/SuperAdmin/Admins/AdminsCards";
import AdminList from "@/components/dashboard/SuperAdmin/Admins/AdminList";

const AdminsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1A1C1C]">Internal Governance</h1>
                    <p className="text-[#78716C] text-xs sm:text-sm mt-1 sm:mt-2 max-w-2xl">Manage system administrators, their functional boundaries, and monitor operational performance across the archive.</p>
                </div>
                <button
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:from-[#8B6500] hover:to-[#FFCC00] transition-all shrink-0 w-full sm:w-auto"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={18} />
                    Create Admin
                </button>
            </div>

            <AdminsCards />
            <AdminList />

            <AdminCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AdminsPage;
