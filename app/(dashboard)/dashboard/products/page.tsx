"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import ProductScreenCards from "@/components/dashboard/Admin/Products/ProductScreenCards";
import ProductsTable from "@/components/dashboard/Admin/Products/ProductsTable";
import AddNewProduct from "@/components/dashboard/Admin/Products/AddNewProduct";
import EditProduct from "@/components/dashboard/Admin/Products/EditProduct";

const ProductsPage = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-[#1A1C1C]">INVENTORY MANAGEMENT</h1>
                    <p className="text-[#78716C] mt-2 max-w-2xl">Manage your curated collection of Nordic-inspired goods. Track availability, set premium pricing, and sync across global campaigns.</p>
                </div>
                <button
                    className="inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus size={18} />
                    New Product
                </button>
            </div>

            <ProductScreenCards />
            <ProductsTable onEdit={() => setIsEditModalOpen(true)} />

            <AddNewProduct isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            <EditProduct isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
        </div>
    );
};

export default ProductsPage;
