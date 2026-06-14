"use client";
import React, { useState, useEffect } from "react";
import { TCampaign } from "../../../../../redux/features/campaign/campaignApi";
import { useAddMultipleProductsToCampaignMutation, useRemoveMultipleProductsFromCampaignMutation } from "@/redux/features/campaignProduct/campaignProductApi";
import { useGetAllProductsQuery } from "@/redux/features/product/productApi";
import { getImageUrl } from "@/utils/getImageUrl";
import { AlertTriangle, ArrowLeft, User, Mail, Phone, Users, Package, Plus, X, Search, Check, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

interface CardDetailsProps {
    campaign: TCampaign;
}

const CardDetails: React.FC<CardDetailsProps> = ({ campaign }) => {
    const [activeTab, setActiveTab] = useState<"sellers" | "products">("sellers");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

    // Lazy loading state
    const [page, setPage] = useState(1);
    const [accumulatedProducts, setAccumulatedProducts] = useState<any[]>([]);

    const progress = campaign.target > 0 ? Math.min(100, Math.round(((campaign.totalPackagesSold || 0) / campaign.target) * 100)) : 0;

    const endDate = new Date(campaign.endDate);
    const today = new Date();
    const isExpired = !campaign.isActive || endDate.getTime() < today.getTime();

    const formattedEndDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    const getDaysLeft = () => {
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 0) return "Expired";
        if (diffDays === 0) return "Ends today";
        return `In ${diffDays} days`;
    };

    const stats = [
        {
            title: `GOAL: ${campaign.target || 0} PCS (${progress}%)`,
            value: `${campaign.totalPackagesSold || 0} pcs`,
            subtitle: "TOTAL SOLD",
        },
        {
            title: `EST. PROFIT: SEK ${Math.round((campaign.totalRevenueSold || 0) * 0.4).toLocaleString()}`,
            value: `SEK ${(campaign.totalRevenueSold || 0).toLocaleString()}`,
            subtitle: "REVENUE RAISED",
        },
        {
            title: `END DATE: ${formattedEndDate}`,
            value: !isExpired ? getDaysLeft() : "Expired",
            subtitle: "CAMPAIGN STATUS",
        },
    ];

    const sellers = campaign.sellers || [];
    const products = campaign.products || [];
    const admin = campaign.campaignAdmin;

    // Fetch products page by page when modal is open
    const { data: allProductsResponse, isFetching: isFetchingProducts } = useGetAllProductsQuery({ page, limit: 12 }, { skip: !isModalOpen });

    // Reset pagination and items when modal opens
    useEffect(() => {
        if (isModalOpen) {
            setPage(1);
            setAccumulatedProducts([]);
            setSelectedProductIds(products.map((p) => p._id || ""));
        }
    }, [isModalOpen, products]);

    // Append newly fetched products to list
    useEffect(() => {
        if (allProductsResponse?.data) {
            if (page === 1) {
                setAccumulatedProducts(allProductsResponse.data);
            } else {
                setAccumulatedProducts((prev) => {
                    const existingIds = new Set(prev.map((p) => p._id));
                    const newItems = allProductsResponse.data.filter((p) => !existingIds.has(p._id));
                    return [...prev, ...newItems];
                });
            }
        }
    }, [allProductsResponse, page]);

    const hasNextPage = allProductsResponse?.meta?.hasNext || false;

    // Detect scrolling to the bottom of the list
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        // Trigger load 50px before reaching bottom
        if (target.scrollHeight - target.scrollTop <= target.clientHeight + 50) {
            if (hasNextPage && !isFetchingProducts) {
                setPage((prev) => prev + 1);
            }
        }
    };

    const [addMultipleProducts, { isLoading: isAdding }] = useAddMultipleProductsToCampaignMutation();
    const [removeMultipleProducts, { isLoading: isRemoving }] = useRemoveMultipleProductsFromCampaignMutation();

    const handleToggleProduct = (productId: string) => {
        setSelectedProductIds((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));
    };

    const handleSaveChanges = async () => {
        const initialIds = products.map((p) => p._id || "");
        const additions = selectedProductIds.filter((id) => !initialIds.includes(id));
        const deletions = initialIds.filter((id) => !selectedProductIds.includes(id));

        try {
            if (additions.length > 0) {
                await addMultipleProducts({ campaignId: campaign._id!, productIds: additions }).unwrap();
            }
            if (deletions.length > 0) {
                await removeMultipleProducts({ campaignId: campaign._id!, productIds: deletions }).unwrap();
            }
            toast.success("Campaign products updated successfully!");
            setIsModalOpen(false);
        } catch (err) {
            console.error("Failed to update campaign products:", err);
            toast.error("Failed to update products. Please try again.");
        }
    };

    const filteredAvailableProducts = accumulatedProducts.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-8">
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
                <Link href="/dashboard/campaigns" className="inline-flex items-center gap-2 text-sm text-[#78716C] hover:text-[#1A1C1C] transition-colors">
                    <ArrowLeft size={16} />
                    <span>Back to Campaigns</span>
                </Link>
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${!isExpired ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    <span className={`w-2 h-2 rounded-full ${!isExpired ? "bg-green-500" : "bg-red-500"}`}></span>
                    {!isExpired ? "ACTIVE" : "EXPIRED"}
                </span>
            </div>

            {/* Title / Description Area */}
            <div>
                <h1 className="text-2xl font-bold text-[#1A1C1C] tracking-tight">{campaign.name}</h1>
                <p className="text-sm text-[#78716C] mt-1.5 leading-relaxed">{campaign.shortDescription}</p>
            </div>

            {/* Quick Metrics Grid using Native Site Style */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                        <div className="relative z-10">
                            {stat.subtitle && <div className="text-[#D97706] text-xs font-bold mb-2 group-hover:text-[#271900] transition-colors duration-300 tracking-wider uppercase">{stat.subtitle}</div>}
                            <div className="text-3xl font-bold text-[#1A1C1C] mb-2 group-hover:text-[#271900] transition-colors duration-300">{stat.value}</div>
                            <div className="text-[#78716C] text-xs font-medium uppercase tracking-wider group-hover:text-[#271900] transition-colors duration-300">{stat.title}</div>
                        </div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Expired Deletion Warning inline */}
            {isExpired && (
                <div className="flex gap-3 bg-red-50 p-4 rounded-xl border border-red-100">
                    <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={18} />
                    <div>
                        <div className="text-xs font-bold text-red-800 uppercase">Auto-Deletion Warning</div>
                        <p className="text-xs text-red-700 mt-0.5 leading-relaxed">This campaign has ended and is scheduled to be automatically deleted in 2 months.</p>
                    </div>
                </div>
            )}

            {/* Split Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left/Middle Column: Tabs for Sellers & Products */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Tab Header */}
                    <div className="flex items-center justify-between border-b border-[#E7E5E4] pb-0.5">
                        <div className="flex gap-6">
                            <button onClick={() => setActiveTab("sellers")} className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${activeTab === "sellers" ? "text-[#D97706]" : "text-[#78716C] hover:text-[#1A1C1C]"}`}>
                                <Users size={16} />
                                Sellers ({sellers.length}){activeTab === "sellers" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
                            </button>
                            <button onClick={() => setActiveTab("products")} className={`pb-3 text-sm font-bold transition-all relative flex items-center gap-2 cursor-pointer ${activeTab === "products" ? "text-[#D97706]" : "text-[#78716C] hover:text-[#1A1C1C]"}`}>
                                <Package size={16} />
                                Products ({products.length}){activeTab === "products" && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#D97706] rounded-full" />}
                            </button>
                        </div>
                        {activeTab === "products" && (
                            <button onClick={() => setIsModalOpen(true)} className="mb-2 px-3 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs">
                                <Plus size={14} />
                                Manage Products
                            </button>
                        )}
                    </div>

                    {/* Tab Body */}
                    <div className="bg-white rounded-lg border border-[#E7E5E4] overflow-hidden shadow-[0px_4px_10px_rgba(0,0,0,0.03)]">
                        {activeTab === "sellers" ? (
                            sellers.length === 0 ? (
                                <div className="p-8 text-center text-sm text-[#78716C]">No sellers registered in this campaign.</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse">
                                        <thead>
                                            <tr className="bg-[#F8F6F4] text-xs font-bold text-[#78716C] uppercase tracking-wider border-b border-[#E7E5E4]">
                                                <th className="py-3.5 px-6">Name</th>
                                                <th className="py-3.5 px-6">Email</th>
                                                <th className="py-3.5 px-6 text-right">Sold</th>
                                                <th className="py-3.5 px-6 text-right">Revenue</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[#E7E5E4] text-sm text-[#1A1C1C]">
                                            {sellers.map((seller) => (
                                                <tr key={seller._id} className="hover:bg-[#FCFBFA] transition-colors">
                                                    <td className="py-4 px-6 font-semibold">{seller.name}</td>
                                                    <td className="py-4 px-6 text-[#78716C]">{seller.email}</td>
                                                    <td className="py-4 px-6 text-right font-medium">{seller.totalPackagesSold} pcs</td>
                                                    <td className="py-4 px-6 text-right font-bold text-[#D97706]">SEK {seller.totalRevenueSold.toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )
                        ) : products.length === 0 ? (
                            <div className="p-8 text-center text-sm text-[#78716C]">No products associated with this campaign.</div>
                        ) : (
                            <div className="divide-y divide-[#E7E5E4]">
                                {products.map((product) => (
                                    <div key={product._id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:bg-[#FCFBFA] transition-colors">
                                        <div className="w-14 h-14 relative rounded-lg bg-[#F3F3F3] border border-[#E7E5E4] overflow-hidden flex items-center justify-center shrink-0">{product.productImage ? <Image src={getImageUrl(product.productImage)} alt={product.name} fill className="object-cover" /> : <Package className="text-[#A8A29E]" size={24} />}</div>
                                        <div className="grow min-w-0">
                                            <h4 className="font-bold text-base text-[#1A1C1C] truncate">{product.name}</h4>
                                            <p className="text-xs text-[#78716C] uppercase font-semibold mt-0.5">{product.category}</p>
                                        </div>
                                        <div className="flex items-center gap-6 sm:gap-12 shrink-0 w-full sm:w-auto justify-between sm:justify-end mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-[#E7E5E4]">
                                            <div className="text-right">
                                                <span className="text-xs text-[#78716C] block">Price</span>
                                                <span className="font-semibold text-sm text-[#1A1C1C]">SEK {product.price}</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-[#78716C] block">Total Sold</span>
                                                <span className="font-bold text-sm text-[#1A1C1C]">{product.totalSold} pcs</span>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-xs text-[#78716C] block">Total Revenue</span>
                                                <span className="font-bold text-sm text-[#D97706]">SEK {(product.totalSold * product.price).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Campaign Admin / Contact Card */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-[#78716C] uppercase tracking-wider">Campaign Admin</h3>

                    <div className="bg-white rounded-lg border border-[#E7E5E4] p-6 shadow-[0px_4px_10px_rgba(0,0,0,0.03)] space-y-4">
                        {admin ? (
                            <>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#FFDEA8] flex items-center justify-center text-[#D97706] font-bold shrink-0">
                                        <User size={18} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-base text-[#1A1C1C] truncate">{admin.name}</h4>
                                        <span className="text-xs text-[#78716C] font-semibold uppercase">Group Contact</span>
                                    </div>
                                </div>

                                <div className="space-y-3 pt-4 border-t border-[#E7E5E4] text-sm text-[#1A1C1C]">
                                    <a href={`mailto:${admin.email}`} className="flex items-center gap-3.5 text-[#78716C] hover:text-[#D97706] transition-colors">
                                        <Mail size={16} className="shrink-0 text-[#A8A29E]" />
                                        <span className="truncate">{admin.email}</span>
                                    </a>
                                    {admin.phone ? (
                                        <a href={`tel:${admin.phone}`} className="flex items-center gap-3.5 text-[#78716C] hover:text-[#D97706] transition-colors">
                                            <Phone size={16} className="shrink-0 text-[#A8A29E]" />
                                            <span>{admin.phone}</span>
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-3.5 text-[#A8A29E] italic">
                                            <Phone size={16} className="shrink-0" />
                                            <span>No phone number</span>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-[#78716C] italic text-center py-4">No admin user assigned to this campaign.</div>
                        )}
                    </div>
                </div>
            </div>

            {/* Manage Products Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden border border-[#E7E5E4] flex flex-col max-h-[85vh]">
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-[#E7E5E4] flex items-center justify-between">
                            <h3 className="text-lg font-bold text-[#1A1C1C]">Manage Campaign Products</h3>
                            <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-[#F3F3F3] rounded-lg transition-colors text-[#78716C]">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Search */}
                        <div className="px-6 pt-4">
                            <div className="relative">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={16} />
                                <input type="text" placeholder="Search products by name or category..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-[#F3F3F3] border border-[#E7E5E4] rounded-xl text-sm focus:outline-none focus:border-[#D97706] transition-all" />
                            </div>
                        </div>

                        {/* Body - Lazy Loading Product List */}
                        <div onScroll={handleScroll} className="p-6 overflow-y-auto space-y-3 grow min-h-0">
                            {accumulatedProducts.length === 0 && isFetchingProducts ? (
                                <div className="flex items-center justify-center py-8">
                                    <Loader2 className="animate-spin text-[#D97706]" size={24} />
                                    <span className="text-sm text-[#78716C] ml-2">Loading products...</span>
                                </div>
                            ) : filteredAvailableProducts.length === 0 ? (
                                <div className="text-center text-sm text-[#78716C] py-8">No products found matching your search.</div>
                            ) : (
                                <>
                                    {filteredAvailableProducts.map((product) => {
                                        const isSelected = selectedProductIds.includes(product._id || "");
                                        return (
                                            <div key={product._id} onClick={() => handleToggleProduct(product._id || "")} className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${isSelected ? "border-[#D97706] bg-[#FCFBFA]" : "border-[#E7E5E4] bg-white hover:bg-[#F3F3F3]"}`}>
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div className="w-10 h-10 relative rounded-lg bg-[#F3F3F3] border border-[#E7E5E4] overflow-hidden flex items-center justify-center shrink-0">{product.productImage ? <Image src={getImageUrl(product.productImage)} alt={product.name} fill className="object-cover" /> : <Package className="text-[#A8A29E]" size={18} />}</div>
                                                    <div className="min-w-0">
                                                        <h4 className="font-bold text-sm text-[#1A1C1C] truncate">{product.name}</h4>
                                                        <p className="text-xs text-[#78716C] mt-0.5">
                                                            SEK {product.price} • {product.category}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${isSelected ? "bg-[#D97706] border-[#D97706] text-white" : "border-[#A8A29E] bg-white"}`}>{isSelected && <Check size={14} strokeWidth={3} />}</div>
                                            </div>
                                        );
                                    })}
                                    {isFetchingProducts && (
                                        <div className="flex items-center justify-center py-4">
                                            <Loader2 className="animate-spin text-[#D97706]" size={20} />
                                            <span className="text-xs text-[#78716C] ml-2">Loading more...</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-[#E7E5E4] flex items-center justify-between bg-[#F8F6F4]">
                            <span className="text-xs font-semibold text-[#78716C]">{selectedProductIds.length} products selected</span>
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-[#E7E5E4] hover:bg-[#F3F3F3] text-sm font-semibold rounded-xl transition-all cursor-pointer text-[#1A1C1C]" disabled={isAdding || isRemoving}>
                                    Cancel
                                </button>
                                <button onClick={handleSaveChanges} className="px-5 py-2 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50" disabled={isAdding || isRemoving}>
                                    {isAdding || isRemoving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardDetails;
