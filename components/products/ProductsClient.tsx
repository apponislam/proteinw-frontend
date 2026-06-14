"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "@/components/products/ProductCard";
import { Rocket, ChevronDown, Infinity, Leaf, Footprints, Info, Loader2 } from "lucide-react";
import Link from "next/link";
import ProductDetailModal from "@/components/products/ProductDetailModal";
import { useGetActiveProductsQuery } from "@/redux/features/product/productApi";
import { getImageUrl } from "@/utils/getImageUrl";

const ProductsClient = () => {
    const [activeCategory, setActiveCategory] = useState("All Products");
    const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
    const [isCandlesOpen, setIsCandlesOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

    // Lazy loading state
    const [page, setPage] = useState(1);
    const [accumulatedProducts, setAccumulatedProducts] = useState<any[]>([]);

    const categoryParam = activeCategory !== "All Products" ? activeCategory : undefined;
    const subCategoryParam = activeSubCategory || undefined;

    const { data: productsResponse, isFetching, isLoading } = useGetActiveProductsQuery({
        category: categoryParam,
        subCategory: subCategoryParam,
        page,
        limit: 6,
    });

    // Reset pagination and items when filters change
    useEffect(() => {
        setPage(1);
        setAccumulatedProducts([]);
    }, [activeCategory, activeSubCategory]);

    // Append items when results arrive
    useEffect(() => {
        if (productsResponse?.data) {
            if (page === 1) {
                setAccumulatedProducts(productsResponse.data);
            } else {
                setAccumulatedProducts((prev) => {
                    const existingIds = new Set(prev.map((p) => p._id));
                    const newItems = productsResponse.data.filter((p) => !existingIds.has(p._id));
                    return [...prev, ...newItems];
                });
            }
        }
    }, [productsResponse, page]);

    const hasNextPage = productsResponse?.meta?.hasNext || false;

    // Window scroll listener for infinite scroll
    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120 &&
                hasNextPage &&
                !isFetching
            ) {
                setPage((prev) => prev + 1);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [hasNextPage, isFetching]);

    return (
        <div className="bg-[#FAFAF9CC] min-h-screen pb-32">
            <div className="container mx-auto py-6 px-4">
                <div className="mb-6">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">The Archive Collection</h1>
                    <p className="text-[#514532]">
                        Curated high-quality products designed for community fundraising. <br className="none sm:block" /> Handpicked Scandinavian essentials that represent the NordicArchive spirit.
                    </p>
                </div>
                
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Sidebar / Categories */}
                    <div className="w-full lg:w-80 lg:shrink-0">
                        <h3 className="text-[#837560] text-sm font-bold tracking-wider mb-6">CATEGORIES</h3>
                        <ul className="flex lg:flex-col gap-2 lg:gap-3 overflow-x-auto pb-2 lg:pb-0">
                            {/* All Products */}
                            <li
                                onClick={() => {
                                    setActiveCategory("All Products");
                                    setActiveSubCategory(null);
                                }}
                                className={`text-[#5E4200] cursor-pointer px-5 py-3.5 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out font-medium flex items-center gap-3 ${activeCategory === "All Products" && !activeSubCategory ? "bg-[#FFDEA8] shadow-xs -translate-y-0.5" : "hover:bg-[#FFDEA8]/40 hover:-translate-y-0.5"}`}
                            >
                                <Infinity className="w-4 h-4 text-[#837560]" />
                                <span>All Products</span>
                            </li>
                            
                            {/* Scented Candles */}
                            <li className="flex flex-col">
                                <div
                                    onClick={() => {
                                        setActiveCategory("Scented Candles");
                                        setActiveSubCategory(null);
                                        setIsCandlesOpen(!isCandlesOpen);
                                    }}
                                    className={`text-[#5E4200] cursor-pointer px-5 py-3.5 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out font-medium flex items-center justify-between ${activeCategory === "Scented Candles" && !activeSubCategory ? "bg-[#FFDEA8] shadow-xs -translate-y-0.5" : "hover:bg-[#FFDEA8]/40 hover:-translate-y-0.5"}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Leaf className="w-4 h-4 text-[#837560]" />
                                        <span>Scented Candles</span>
                                    </div>
                                    <ChevronDown className={`w-4 h-4 text-[#837560] transition-transform duration-300 ${isCandlesOpen ? "rotate-180" : ""}`} />
                                </div>

                                {/* Sub-category list */}
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isCandlesOpen ? "max-h-20 opacity-100 mt-1 pl-4" : "max-h-0 opacity-0"}`}>
                                    <ul className="border-l-2 border-[#FFDEA8] pl-3 py-1 space-y-1">
                                        <li
                                            onClick={() => {
                                                setActiveCategory("Scented Candles");
                                                setActiveSubCategory("Reed Diffusers");
                                            }}
                                            className={`text-[#5E4200] cursor-pointer py-2 px-4 rounded-[20px] text-sm whitespace-nowrap transition-all duration-200 ${activeSubCategory === "Reed Diffusers" ? "bg-[#FFDEA8] font-semibold shadow-xs" : "hover:bg-[#FFDEA8]/30"}`}
                                        >
                                            Reed Diffusers
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            
                            {/* Premium Socks */}
                            <li
                                onClick={() => {
                                    setActiveCategory("Premium Socks");
                                    setActiveSubCategory(null);
                                }}
                                className={`text-[#5E4200] cursor-pointer px-5 py-3.5 rounded-[32px] whitespace-nowrap transition-all duration-300 ease-out font-medium flex items-center gap-3 ${activeCategory === "Premium Socks" ? "bg-[#FFDEA8] shadow-xs -translate-y-0.5" : "hover:bg-[#FFDEA8]/40 hover:-translate-y-0.5"}`}
                            >
                                <Footprints className="w-4 h-4 text-[#837560]" />
                                <span>Premium Socks</span>
                            </li>
                        </ul>
                        
                        <div className="bg-[#F3F3F3] rounded-[24px] px-5 py-3.5 mt-6">
                            <div className="flex items-center gap-2">
                                <Info className="text-[#7C5800]" size={18} />
                                <span className="font-bold text-xs text-[#7C5800] uppercase tracking-wider">Fundraising Info</span>
                            </div>
                            <p className="text-[#514532] mt-2 text-[14px]">Every purchase supports your local community programs. 180 SEK per package.</p>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 flex flex-col">
                        {isLoading && accumulatedProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-3">
                                <Loader2 className="animate-spin text-[#D97706]" size={32} />
                                <p className="text-sm text-[#78716C]">Loading archive collection...</p>
                            </div>
                        ) : accumulatedProducts.length === 0 ? (
                            <div className="text-center py-20 text-sm text-[#78716C] bg-white rounded-3xl border border-[#E7E5E4]">
                                No products found in this category.
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                                    {accumulatedProducts.map((product) => (
                                        <ProductCard 
                                            key={product._id} 
                                            image={getImageUrl(product.productImage)} 
                                            title={product.name} 
                                            price={`${product.price} SEK`} 
                                            description={product.shortDescription} 
                                            onViewDetails={() => setSelectedProduct({
                                                image: getImageUrl(product.productImage),
                                                title: product.name,
                                                price: `${product.price} SEK`,
                                                description: product.shortDescription,
                                            })}
                                        />
                                    ))}
                                </div>
                                {isFetching && (
                                    <div className="flex items-center justify-center py-6 gap-2">
                                        <Loader2 className="animate-spin text-[#D97706]" size={20} />
                                        <span className="text-xs text-[#78716C]">Loading more products...</span>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Sticky Ready To Fundraise Card */}
            <div className="fixed bottom-0 left-0 right-0 z-40 p-4 md:p-6 bg-linear-to-t from-white via-white/95 to-transparent pointer-events-none">
                <div className="container mx-auto flex justify-center">
                    <div className="w-full sm:w-auto sm:min-w-[560px] lg:min-w-[640px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white/90 backdrop-blur-md rounded-[32px] p-4 sm:p-5 shadow-2xl border border-[#FFDEA8]/40 pointer-events-auto transition-all duration-300 hover:shadow-amber-100 hover:border-[#FFDEA8]">
                        <div className="sm:pl-4">
                            <h2 className="text-xs text-[#837560] font-extrabold uppercase tracking-wider">READY TO FUNDRAISE?</h2>
                            <p className="text-sm font-semibold text-[#1A1C1C] mt-0.5">Join 500+ successful teams</p>
                        </div>
                        <Link href="/auth/register" className="w-full sm:w-auto shrink-0">
                            <button className="w-full sm:w-auto justify-center bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] text-white px-8 py-3 rounded-full flex items-center gap-2 cursor-pointer shadow-md transition-all font-bold text-sm">
                                <Rocket size={16} /> Start Selling These
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ProductDetailModal 
                isOpen={!!selectedProduct} 
                onClose={() => setSelectedProduct(null)} 
                product={selectedProduct} 
            />
        </div>
    );
};

export default ProductsClient;
