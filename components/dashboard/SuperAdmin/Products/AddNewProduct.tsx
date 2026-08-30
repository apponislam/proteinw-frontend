import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check, Plus, Upload, Package, Sparkles, Coins, Leaf, Image as ImageIcon } from "lucide-react";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";

interface AddNewProductProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddNewProduct: React.FC<AddNewProductProps> = ({ isOpen, onClose }) => {
    const [createProduct, { isLoading }] = useCreateProductMutation();

    // Form state
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [marginBenefit, setMarginBenefit] = useState("");
    const [qualityHighlight, setQualityHighlight] = useState("");
    const [ecoHighlight, setEcoHighlight] = useState("");
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewUrls, setPreviewUrls] = useState<string[]>([]);
    const [isDragging, setIsDragging] = useState(false);

    const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
    const [isSubCatDropdownOpen, setIsSubCatDropdownOpen] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

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
            setSelectedFiles((prev) => {
                const combined = [...prev, ...newFiles];
                if (combined.length > 3) {
                    toast.error("Maximum 3 photos allowed per product.");
                    return combined.slice(0, 3);
                }
                return combined;
            });
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            setSelectedFiles((prev) => {
                const combined = [...prev, ...newFiles];
                if (combined.length > 3) {
                    toast.error("Maximum 3 photos allowed per product.");
                    return combined.slice(0, 3);
                }
                return combined;
            });
            e.target.value = "";
        }
    };

    const handleRemoveFile = (index: number) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("shortDescription", shortDescription);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            if (marginBenefit.trim()) formData.append("marginBenefit", marginBenefit.trim());
            if (qualityHighlight.trim()) formData.append("qualityHighlight", qualityHighlight.trim());
            if (ecoHighlight.trim()) formData.append("ecoHighlight", ecoHighlight.trim());

            if (selectedFiles.length > 0) {
                selectedFiles.forEach((file) => {
                    formData.append("images", file);
                });
            }

            const res = (await createProduct(formData).unwrap()) as any;
            toast.success(res?.message || "Product created successfully!");
            onClose();
            // Reset form
            setName("");
            setShortDescription("");
            setCategory("");
            setSubCategory("");
            setMarginBenefit("");
            setQualityHighlight("");
            setEcoHighlight("");
            setSelectedFiles([]);
        } catch (err: any) {
            const errorMessage = err?.data?.message || err?.message || "Failed to create product";
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
                            <Package size={22} />
                        </div>
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold text-stone-900 leading-tight">Add New Product</h2>
                            <p className="text-xs text-stone-500 font-medium">Create a new product listing with up to 3 showcase photos.</p>
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
                                placeholder="e.g. Scented Candle - Lavender & Vanilla"
                                className="w-full h-11 sm:h-12 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 placeholder:text-stone-400 font-medium"
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
                                placeholder="Describe product benefits, aroma notes, or materials..."
                                className="w-full px-4 py-3 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 placeholder:text-stone-400 font-medium resize-none"
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
                                    placeholder="e.g. High-margin product (earn up to 50% profit)"
                                    className="w-full h-11 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 placeholder:text-stone-400 font-medium"
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
                                    placeholder="e.g. Premium Scandinavian quality that sells itself"
                                    className="w-full h-11 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 placeholder:text-stone-400 font-medium"
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
                                    placeholder="e.g. Sustainable soy wax and organic scents"
                                    className="w-full h-11 px-4 text-xs sm:text-sm bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:bg-white focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 transition-all text-stone-900 placeholder:text-stone-400 font-medium"
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
                            <span className="text-xs font-bold text-[#D97706] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">{selectedFiles.length} / 3 Selected</span>
                        </div>

                        <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

                        {/* Image Previews Grid */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-3 gap-3">
                                {previewUrls.map((url, idx) => (
                                    <div key={idx} className="relative group aspect-square rounded-2xl overflow-hidden border border-amber-200 bg-amber-50/50 shadow-sm transition-transform hover:scale-[1.02]">
                                        <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                        {idx === 0 && <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-extrabold px-2 py-0.5 rounded-md uppercase tracking-wider">Cover</span>}
                                        <button type="button" onClick={() => handleRemoveFile(idx)} className="absolute top-2 right-2 w-6 h-6 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer" title="Remove photo">
                                            <X size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Dropzone Box */}
                        {selectedFiles.length < 3 ? (
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
                                    <p className="text-xs sm:text-sm font-bold text-stone-800">Click to upload photos or drag & drop</p>
                                    <p className="text-[11px] text-stone-400 font-medium mt-0.5">Supports PNG, JPG, or WEBP (Up to 3 images max)</p>
                                </div>
                            </div>
                        ) : (
                            <div className="p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl text-center">
                                <p className="text-xs font-semibold text-amber-900">Maximum 3 photos selected. Remove a photo to replace.</p>
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
                                Adding Product...
                            </>
                        ) : (
                            <>
                                <Plus size={16} /> Add Product
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
