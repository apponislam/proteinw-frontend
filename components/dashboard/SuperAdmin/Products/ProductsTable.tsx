import React, { useState } from "react";
import { useGetAllProductsQuery, useToggleProductStatusMutation, useDeleteProductMutation, type TProduct } from "@/redux/features/product/productApi";
import { toast } from "sonner";

const campaignColors = ["bg-[#D97706]", "bg-[#7C3AED]", "bg-[#10B981]", "bg-[#3B82F6]"];

const getStatusColor = (status: boolean) => {
    if (status) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
};

interface ProductsTableProps {
    onEdit?: (product: TProduct) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ onEdit }) => {
    // State for filters and pagination
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
    const [selectedStatus, setSelectedStatus] = useState<string>("All");
    const [currentPage, setCurrentPage] = useState<number>(1);

    // Define categories and their subcategories
    const categories = [
        { value: "All", label: "Category: All", subcategories: [] },
        { value: "Scented Candles", label: "Category: Scented Candles", subcategories: ["Reed Diffusers"] },
        { value: "Premium Socks", label: "Category: Premium Socks", subcategories: [] },
    ];

    // Get current category data
    const currentCategoryData = categories.find((cat) => cat.value === selectedCategory);
    const currentSubcategories = currentCategoryData?.subcategories || [];

    // Build query params
    const queryParams: Record<string, any> = { page: currentPage };
    if (selectedCategory !== "All") queryParams.category = selectedCategory;
    if (selectedSubcategory !== "All") queryParams.subCategory = selectedSubcategory;
    if (selectedStatus !== "All") queryParams.isActive = selectedStatus === "Active";

    const { data, isLoading, error } = useGetAllProductsQuery(queryParams);
    const [toggleProductStatus] = useToggleProductStatusMutation();
    const [deleteProduct] = useDeleteProductMutation();

    // Handle toggle product status
    const handleToggleStatus = async (productId: string) => {
        try {
            await toggleProductStatus(productId).unwrap();
            toast.success("Product status updated!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product status");
        }
    };

    // Handle delete product
    const handleDelete = async (productId: string) => {
        try {
            await deleteProduct(productId).unwrap();
            toast.success("Product deleted!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to delete product");
        }
    };

    // Generate page numbers for pagination
    const totalPages = data?.meta?.totalPages || 0;
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="animate-pulse h-96" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="text-red-500">Failed to load products</div>
            </div>
        );
    }

    const products = data?.data || [];
    const total = data?.meta?.total || 0;
    const start = (currentPage - 1) * 10 + 1;
    const end = Math.min(currentPage * 10, total);

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Product Archive</h2>
                    <p className="text-[#78716C] text-sm mt-1">LIVE OVERVIEW</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filter</div>
                    <div className="flex flex-wrap items-center gap-3">
                        <select
                            className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]"
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setSelectedSubcategory("All"); // Reset subcategory when category changes
                            }}
                        >
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </option>
                            ))}
                        </select>

                        {currentSubcategories.length > 0 && (
                            <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                                <option value="All">Subcategory: All</option>
                                {currentSubcategories.map((subcat) => (
                                    <option key={subcat} value={subcat}>
                                        Subcategory: {subcat}
                                    </option>
                                ))}
                            </select>
                        )}

                        <select className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706]" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                            <option value="All">Status: All</option>
                            <option value="Active">Status: Active</option>
                            <option value="Inactive">Status: Inactive</option>
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
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-4 py-8 text-center text-[#78716C]">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product._id} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                    <td className="px-4 py-4">
                                        <div>
                                            <div className="text-[#1A1C1C] font-medium">{product.name}</div>
                                            <div className="text-[#78716C] text-sm">{product._id?.slice(0, 8).toUpperCase()}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <button onClick={() => product._id && handleToggleStatus(product._id)} className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.isActive)}`}>
                                            {product.isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-[#D97706] font-bold">${product.price.toFixed(2)}</span>
                                    </td>
                                    <td className="px-4 py-4">
                                        {!product.campaigns || product.campaigns.length === 0 ? (
                                            <span className="text-[#78716C] text-sm">None assigned</span>
                                        ) : (
                                            <div className="flex items-center relative group">
                                                {product.campaigns.slice(0, 2).map((campaign, idx) => (
                                                    <span key={idx} className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white ${campaignColors[idx % campaignColors.length]} ${idx > 0 ? "-ml-2" : ""}`}>
                                                        {campaign.slice(0, 1).toUpperCase()}
                                                    </span>
                                                ))}
                                                {product.campaigns.length > 2 && <span className={`w-8 h-8 rounded-full bg-[#78716C] text-white flex items-center justify-center font-bold text-xs border-2 border-white -ml-2`}>+{product.campaigns.length - 2}</span>}
                                                {product.campaigns.length > 2 && (
                                                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:flex flex-wrap gap-1 bg-white p-2 rounded-lg shadow-lg border border-[#F5F5F4] z-50">
                                                        {product.campaigns.map((campaign, idx) => (
                                                            <span key={idx} className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs ${campaignColors[idx % campaignColors.length]}`}>
                                                                {campaign.slice(0, 1).toUpperCase()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => onEdit && onEdit(product)} className="text-[#D97706] hover:underline text-sm">
                                                Edit
                                            </button>
                                            <button onClick={() => product._id && handleDelete(product._id)} className="text-red-500 hover:underline text-sm">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between mt-6">
                <div className="text-[#78716C] text-sm">
                    SHOWING {start} TO {end} OF {total} PRODUCTS
                </div>
                <div className="flex items-center gap-2">
                    {pageNumbers.map((page) => (
                        <button key={page} onClick={() => setCurrentPage(page)} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${page === currentPage ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsTable;
