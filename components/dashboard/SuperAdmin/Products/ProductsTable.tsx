import React, { useState } from "react";
import { useGetAllProductsQuery, useToggleProductStatusMutation, useDeleteProductMutation, type TProduct } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { Pencil, Trash2, ChevronDown, Check } from "lucide-react";
import Swal from "sweetalert2";
import Pagination from "@/components/dashboard/Pagination";

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

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSubcategoryOpen, setIsSubcategoryOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);

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
        Swal.fire({
            title: "Are you sure?",
            text: "This product will be permanently deleted.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#D97706",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            customClass: {
                confirmButton: "rounded-lg",
                cancelButton: "rounded-lg",
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteProduct(productId).unwrap();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success",
                        confirmButtonColor: "#D97706",
                    });
                } catch (err) {
                    console.error(err);
                    toast.error("Failed to delete product");
                }
            }
        });
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
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filter</div>
                    <div className="flex flex-wrap items-center gap-3">
                        {/* Category Custom Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCategoryOpen((prev) => !prev);
                                    setIsSubcategoryOpen(false);
                                    setIsStatusOpen(false);
                                }}
                                className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-sm font-semibold text-[#1A1C1C] shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97706]/30"
                            >
                                <span>{categories.find((cat) => cat.value === selectedCategory)?.label}</span>
                                <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isCategoryOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isCategoryOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsCategoryOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 z-30 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.value}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategory(cat.value);
                                                    setSelectedSubcategory("All");
                                                    setCurrentPage(1);
                                                    setIsCategoryOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${selectedCategory === cat.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                            >
                                                <span>{cat.label}</span>
                                                {selectedCategory === cat.value && <Check size={14} className="text-[#D97706]" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Subcategory Custom Dropdown */}
                        {currentSubcategories.length > 0 && (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSubcategoryOpen((prev) => !prev);
                                        setIsCategoryOpen(false);
                                        setIsStatusOpen(false);
                                    }}
                                    className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-sm font-semibold text-[#1A1C1C] shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97706]/30"
                                >
                                    <span>Subcategory: {selectedSubcategory}</span>
                                    <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isSubcategoryOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isSubcategoryOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setIsSubcategoryOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 z-30 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setSelectedSubcategory("All");
                                                    setCurrentPage(1);
                                                    setIsSubcategoryOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${selectedSubcategory === "All" ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                            >
                                                <span>Subcategory: All</span>
                                                {selectedSubcategory === "All" && <Check size={14} className="text-[#D97706]" />}
                                            </button>
                                            {currentSubcategories.map((subcat) => (
                                                <button
                                                    key={subcat}
                                                    type="button"
                                                    onClick={() => {
                                                        setSelectedSubcategory(subcat);
                                                        setCurrentPage(1);
                                                        setIsSubcategoryOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${selectedSubcategory === subcat ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                                >
                                                    <span>Subcategory: {subcat}</span>
                                                    {selectedSubcategory === subcat && <Check size={14} className="text-[#D97706]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* Status Custom Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsStatusOpen((prev) => !prev);
                                    setIsCategoryOpen(false);
                                    setIsSubcategoryOpen(false);
                                }}
                                className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-sm font-semibold text-[#1A1C1C] shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97706]/30"
                            >
                                <span>Status: {selectedStatus}</span>
                                <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isStatusOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isStatusOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsStatusOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 z-30 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                        {["All", "Active", "Inactive"].map((status) => (
                                            <button
                                                key={status}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedStatus(status);
                                                    setCurrentPage(1);
                                                    setIsStatusOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${selectedStatus === status ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                            >
                                                <span>Status: {status}</span>
                                                {selectedStatus === status && <Check size={14} className="text-[#D97706]" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
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
                                        <button onClick={() => product._id && handleToggleStatus(product._id)} className={`cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(product.isActive)}`}>
                                            {product.isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-4">
                                        <span className="text-[#D97706] font-bold">{product.price} SEK</span>
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
                                            <button onClick={() => onEdit && onEdit(product)} className="cursor-pointer w-8 h-8 rounded-full bg-[#FFB80033] text-[#D97706] flex items-center justify-center hover:bg-[#D97706] hover:text-white transition-colors" title="Edit">
                                                <Pencil size={16} />
                                            </button>
                                            <button onClick={() => product._id && handleDelete(product._id)} className="cursor-pointer w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination meta={data?.meta} onPageChange={setCurrentPage} itemName="PRODUCTS" />
        </div>
    );
};

export default ProductsTable;
