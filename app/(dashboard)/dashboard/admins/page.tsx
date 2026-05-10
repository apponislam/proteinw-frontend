"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import AdminCreateModal from "@/components/dashboard/Admin/Admins/AdminCreateModal";
import AdminsCards from "@/components/dashboard/Admin/Admins/AdminsCards";

const AdminsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">Internal Governance</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Manage system administrators, their functional boundaries, and monitor operational performance across the archive.</p>
                </div>
                <button className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2" onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Create Admin
                </button>
            </div>

            <AdminsCards />

            <AdminCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default AdminsPage;
