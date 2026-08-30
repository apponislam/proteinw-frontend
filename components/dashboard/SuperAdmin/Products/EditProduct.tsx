import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check, Plus, Upload, Edit3, Sparkles, Coins, Leaf } from "lucide-react";
import { useUpdateProductMutation, type TProduct } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import { getImageUrl } from "@/utils/getImageUrl";

interface EditProductProps {
    isOpen: boolean;
    onClose: () => void;
    product: TProduct;
}

const MAX_PHOTOS = 3;

const EditProduct: React.FC<EditProductProps> = ({ isOpen, onClose, product }) => {
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    // Form state
    const [name, setName] = useState(product.name);
    const [shortDescription, setShortDescription] = useState(product.shortDescription);
    const [category, setCategory] = useState(product.category);
    const [subCategory, setSubCategory] = useState(product.subCategory || "");
    const [marginBenefit, setMarginBenefit] = useState(product.marginBenefit || "");
    const [qualityHighlight, setQualityHighlight] = useState(product.qualityHighlight || "");
    const [ecoHighlight, setEcoHighlight] = useState(product.ecoHighlight || "");

    // Existing vs New photos vs Removed photos state
    const [keptExistingImages, setKeptExistingImages] = useState<string[]>(product.images || []);
    const [removedImages, setRemovedImages] = useState<string[]>([]);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
    const [isSubCatDropdownOpen, setIsSubCatDropdownOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Total photos combined
    const totalCurrentPhotos = keptExistingImages.length + selectedFiles.length;

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files);
            const availableSlot = MAX_PHOTOS - keptExistingImages.length;
            if (availableSlot <= 0) {
                toast.error(`Maximum ${MAX_PHOTOS} photos reached. Remove an existing photo to upload new ones.`);
                return;
            }
            setSelectedFiles((prev) => {
                const combined = [...prev, ...newFiles];
                if (combined.length > availableSlot) {
                    toast.error(`You can only add ${availableSlot} more photo(s) (Maximum ${MAX_PHOTOS} total).`);
                    return combined.slice(0, availableSlot);
                }
                return combined;
            });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            const availableSlot = MAX_PHOTOS - keptExistingImages.length;
            if (availableSlot <= 0) {
                toast.error(`Maximum ${MAX_PHOTOS} photos reached. Remove an existing photo to upload new ones.`);
                e.target.value = "";
                return;
            }
            setSelectedFiles((prev) => {
                const combined = [...prev, ...newFiles];
                if (combined.length > availableSlot) {
                    toast.error(`You can only add ${availableSlot} more photo(s) (Maximum ${MAX_PHOTOS} total).`);
                    return combined.slice(0, availableSlot);
                }
                return combined;
            });
            e.target.value = "";
        }
    };

    const handleRemoveExistingImage = (index: number) => {
        const removedImg = keptExistingImages[index];
        setKeptExistingImages((prev) => prev.filter((_, i) => i !== index));
        if (removedImg) {
            setRemovedImages((prev) => [...prev, removedImg]);
        }
    };

    const handleRemoveNewFile = (index: number) => {
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (selectedFiles.length > 0) {
            const urls = selectedFiles.map((file) => URL.createObjectURL(file));
            setPreviewUrls(urls);
            return () => {
                urls.forEach((url) => URL.revokeObjectURL(url));
            };
        } else {
            setPreviewUrls([]);
        }
    }, [selectedFiles]);

    // Reset form when product changes
    useEffect(() => {
        setName(product.name);
        setShortDescription(product.shortDescription);
        setCategory(product.category);
        setSubCategory(product.subCategory || "");
        setMarginBenefit(product.marginBenefit || "");
        setQualityHighlight(product.qualityHighlight || "");
        setEcoHighlight(product.ecoHighlight || "");
        setKeptExistingImages(product.images || []);
        setRemovedImages([]);
        setSelectedFiles([]);
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product._id) return;

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("shortDescription", shortDescription);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("marginBenefit", marginBenefit);
            formData.append("qualityHighlight", qualityHighlight);
            formData.append("ecoHighlight", ecoHighlight);

            if (removedImages.length > 0) {
                formData.append("removeImages", JSON.stringify(removedImages));
            }

            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => {
                    formData.append("images", file);
                });
            }

            const res = (await updateProduct({ productId: product._id, formData }).unwrap()) as any;
            toast.success(res?.message || "Product updated successfully!");
            onClose();
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "Failed to update product";
            toast.error(errorMessage);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl mx-auto flex flex-col max-h-[90vh] overflow-hidden border border-stone-100 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-stone-100 bg-stone-50/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100/80 text-[#D97706] flex items-center justify-center shrink-0">
                            <Edit3 size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">Edit Product</h2>
                            <p className="text-xs text-stone-500 font-medium">Update details and manage showcase photos for "{product.name}".</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer" aria-label="Close">
                        <X size={18} />
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
                    {/* Section 1: Basic Information */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800/80 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D97706]" /> Basic Details
                        </h3>

                        <div>
                            <label className="block text-stone-700 text-xs sm:text-sm font-semibold mb-1.5">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full h-11 sm:h-12 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-stone-700 text-xs sm:text-sm font-semibold mb-1.5">
                                Short Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={shortDescription}
                                onChange={(e) => setShortDescription(e.target.value)}
                                required
                                rows={3}
                                className="w-full px-4 py-3 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 font-medium resize-none"
                            />
                        </div>
                    </div>

                    {/* Section 2: Category & Subcategory */}
                    <div className="space-y-4 pt-2 border-t border-stone-100">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800/80 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D97706]" /> Categorization
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Category Dropdown */}
                            <div>
                                <label className="block text-stone-700 text-xs sm:text-sm font-semibold mb-1.5">
                                    Product Category <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsCatDropdownOpen((prev) => !prev);
                                            setIsSubCatDropdownOpen(false);
                                        }}
                                        className="w-full h-11 sm:h-12 px-4 bg-stone-50/50 hover:bg-stone-100/50 border border-stone-200 rounded-xl text-xs sm:text-sm flex items-center justify-between text-stone-900 focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all cursor-pointer font-medium"
                                    >
                                        <span className={category ? "text-stone-900 font-medium" : "text-stone-400"}>{category || "Select category"}</span>
                                        <ChevronDown size={18} className={`text-stone-500 transition-transform duration-200 ${isCatDropdownOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {isCatDropdownOpen && (
                                        <>
                                            <div className="fixed inset-0 z-20" onClick={() => setIsCatDropdownOpen(false)}></div>
                                            <div className="absolute left-0 right-0 mt-1.5 z-30 bg-white rounded-xl shadow-xl border border-stone-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                {["Scented Candles", "Premium Socks"].map((catOption) => (
                                                    <button
                                                        key={catOption}
                                                        type="button"
                                                        onClick={() => {
                                                            setCategory(catOption);
                                                            if (catOption !== "Scented Candles") setSubCategory("");
                                                            setIsCatDropdownOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm transition-colors text-left cursor-pointer hover:bg-amber-50/80 ${category === catOption ? "bg-amber-50 text-[#D97706] font-bold" : "text-stone-700"}`}
                                                    >
                                                        <span>{catOption}</span>
                                                        {category === catOption && <Check size={16} className="text-[#D97706]" />}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Subcategory Dropdown */}
                            {category === "Scented Candles" ? (
                                <div>
                                    <label className="block text-stone-700 text-xs sm:text-sm font-semibold mb-1.5">Subcategory</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsSubCatDropdownOpen((prev) => !prev);
                                                setIsCatDropdownOpen(false);
                                            }}
                                            className="w-full h-11 sm:h-12 px-4 bg-stone-50/50 hover:bg-stone-100/50 border border-stone-200 rounded-xl text-xs sm:text-sm flex items-center justify-between text-stone-900 focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all cursor-pointer font-medium"
                                        >
                                            <span className={subCategory ? "text-stone-900 font-medium" : "text-stone-400"}>{subCategory || "Select subcategory"}</span>
                                            <ChevronDown size={18} className={`text-stone-500 transition-transform duration-200 ${isSubCatDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {isSubCatDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-20" onClick={() => setIsSubCatDropdownOpen(false)}></div>
                                                <div className="absolute left-0 right-0 mt-1.5 z-30 bg-white rounded-xl shadow-xl border border-stone-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                    {["Reed Diffusers"].map((subOption) => (
                                                        <button
                                                            key={subOption}
                                                            type="button"
                                                            onClick={() => {
                                                                setSubCategory(subOption);
                                                                setIsSubCatDropdownOpen(false);
                                                            }}
                                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm transition-colors text-left cursor-pointer hover:bg-amber-50/80 ${subCategory === subOption ? "bg-amber-50 text-[#D97706] font-bold" : "text-stone-700"}`}
                                                        >
                                                            <span>{subOption}</span>
                                                            {subCategory === subOption && <Check size={16} className="text-[#D97706]" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="hidden sm:block" />
                            )}
                        </div>
                    </div>

                    {/* Section 3: Product Highlights */}
                    <div className="space-y-4 pt-2 border-t border-stone-100">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800/80 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#D97706]" /> Selling Point Highlights
                        </h3>

                        <div className="grid grid-cols-1 gap-3.5">
                            <div>
                                <label className="flex items-center gap-1.5 text-stone-700 text-xs font-semibold mb-1">
                                    <Coins size={14} className="text-[#D97706]" /> Margin Benefit
                                </label>
                                <input
                                    type="text"
                                    value={marginBenefit}
                                    onChange={(e) => setMarginBenefit(e.target.value)}
                                    className="w-full h-11 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 font-medium"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1.5 text-stone-700 text-xs font-semibold mb-1">
                                    <Sparkles size={14} className="text-[#D97706]" /> Quality Highlight
                                </label>
                                <input
                                    type="text"
                                    value={qualityHighlight}
                                    onChange={(e) => setQualityHighlight(e.target.value)}
                                    className="w-full h-11 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 font-medium"
                                />
                            </div>

                            <div>
                                <label className="flex items-center gap-1.5 text-stone-700 text-xs font-semibold mb-1">
                                    <Leaf size={14} className="text-[#D97706]" /> Eco Highlight
                                </label>
                                <input
                                    type="text"
                                    value={ecoHighlight}
                                    onChange={(e) => setEcoHighlight(e.target.value)}
                                    className="w-full h-11 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Product Photos */}
                    <div className="space-y-4 pt-2 border-t border-stone-100">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800/80 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#D97706]" /> Showcase Photos
                            </h3>
                            <span className="text-xs font-bold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">{totalCurrentPhotos} / 3 Total</span>
                        </div>

                        {/* Saved Photos */}
                        {keptExistingImages.length > 0 && (
                            <div>
                                <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block mb-2">Saved Photos ({keptExistingImages.length})</span>
                                <div className="grid grid-cols-3 gap-3">
                                    {keptExistingImages.map((imgUrl, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-sm transition-transform hover:scale-[1.02]">
                                            <img src={getImageUrl(imgUrl)} alt={`Existing ${idx + 1}`} className="w-full h-full object-cover" />
                                            {idx === 0 && <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">Cover</span>}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExistingImage(idx)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer"
                                                title="Delete photo"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

                        {/* Newly Selected Upload Previews */}
                        {previewUrls.length > 0 && (
                            <div>
                                <span className="text-[11px] font-bold text-[#D97706] uppercase tracking-wider block mb-2">New Uploads (+{previewUrls.length})</span>
                                <div className="grid grid-cols-3 gap-3">
                                    {previewUrls.map((url, idx) => (
                                        <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-amber-300 bg-amber-50/50 shadow-sm transition-transform hover:scale-[1.02]">
                                            <img src={url} alt={`New Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveNewFile(idx)}
                                                className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer"
                                                title="Remove new photo"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Dropzone Box */}
                        {totalCurrentPhotos < MAX_PHOTOS ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                                    isDragging ? "border-[#D97706] bg-amber-500/10 scale-[1.01]" : "border-stone-200 hover:border-[#D97706] hover:bg-amber-50/40 bg-stone-50/40"
                                }`}
                            >
                                <div className="w-12 h-12 rounded-full bg-amber-100/80 text-[#D97706] flex items-center justify-center shadow-xs">
                                    <Upload size={22} />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-stone-800">Click to upload new photo(s) or drag & drop</p>
                                    <p className="text-[11px] text-stone-400 font-medium mt-0.5">Can add {MAX_PHOTOS - totalCurrentPhotos} more photo(s)</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-center">
                                <p className="text-xs font-semibold text-amber-900">Maximum 3 photos reached. Remove a photo to replace.</p>
                            </div>
                        )}
                    </div>
                </form>

                {/* Footer Buttons */}
                <div className="px-6 py-4 border-t border-stone-100 bg-stone-50/50 flex items-center justify-end gap-3">
                    <button type="button" onClick={onClose} className="px-5 h-11 bg-white hover:bg-stone-100 border border-stone-200 text-stone-700 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer">
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="px-6 h-11 bg-linear-to-r from-[#D97706] to-amber-700 hover:from-[#C06A06] hover:to-amber-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-amber-600/20 transition-all cursor-pointer flex items-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Updating Product...
                            </>
                        ) : (
                            <>Update Product</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
