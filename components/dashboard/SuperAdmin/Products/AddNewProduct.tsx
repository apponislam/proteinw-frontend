import React, { useState, useRef, useEffect } from "react";
import { X, ChevronDown, Check, Plus, Image as ImageIcon } from "lucide-react";
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={onClose} />
            <div className="relative bg-white rounded-xl sm:rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[90vh] flex flex-col">
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#F5F5F4]">
                    <h2 className="text-lg sm:text-xl font-bold text-[#1A1C1C]">Add new product</h2>
                    <button onClick={onClose} className="p-1 text-[#78716C] hover:text-[#1A1C1C] cursor-pointer">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
                    <div>
                        <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Product name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Short description</label>
                        <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required rows={3} className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 resize-none" />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Product category</label>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCatDropdownOpen((prev) => !prev);
                                    setIsSubCatDropdownOpen(false);
                                }}
                                className="w-full h-11 sm:h-12 px-3.5 sm:px-4 bg-white border border-[#F5F5F4] rounded-lg text-xs sm:text-sm flex items-center justify-between text-[#1A1C1C] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
                            >
                                <span className={category ? "text-[#1A1C1C] font-medium" : "text-[#78716C]"}>{category || "Select category"}</span>
                                <ChevronDown size={18} className={`text-[#78716C] transition-transform duration-200 ${isCatDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isCatDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsCatDropdownOpen(false)}></div>
                                    <div className="absolute left-0 right-0 mt-1 z-30 bg-white rounded-lg shadow-lg border border-[#F5F5F4] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                        {["Scented Candles", "Premium Socks"].map((catOption) => (
                                            <button
                                                key={catOption}
                                                type="button"
                                                onClick={() => {
                                                    setCategory(catOption);
                                                    if (catOption !== "Scented Candles") setSubCategory("");
                                                    setIsCatDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${category === catOption ? "bg-amber-50 text-[#D97706] font-bold" : "text-[#1A1C1C]"}`}
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

                    {category === "Scented Candles" && (
                        <div>
                            <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Subcategory</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSubCatDropdownOpen((prev) => !prev);
                                        setIsCatDropdownOpen(false);
                                    }}
                                    className="w-full h-11 sm:h-12 px-3.5 sm:px-4 bg-white border border-[#F5F5F4] rounded-lg text-xs sm:text-sm flex items-center justify-between text-[#1A1C1C] focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 transition-all cursor-pointer"
                                >
                                    <span className={subCategory ? "text-[#1A1C1C] font-medium" : "text-[#78716C]"}>{subCategory || "Select subcategory"}</span>
                                    <ChevronDown size={18} className={`text-[#78716C] transition-transform duration-200 ${isSubCatDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isSubCatDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setIsSubCatDropdownOpen(false)}></div>
                                        <div className="absolute left-0 right-0 mt-1 z-30 bg-white rounded-lg shadow-lg border border-[#F5F5F4] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                            {["Reed Diffusers"].map((subOption) => (
                                                <button
                                                    key={subOption}
                                                    type="button"
                                                    onClick={() => {
                                                        setSubCategory(subOption);
                                                        setIsSubCatDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-2.5 text-xs sm:text-sm transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${subCategory === subOption ? "bg-amber-50 text-[#D97706] font-bold" : "text-[#1A1C1C]"}`}
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
                    )}

                    <div className="pt-2 border-t border-[#F5F5F4] space-y-3 sm:space-y-4">
                        <h4 className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Product Highlights (Why Easy To Sell)</h4>
                        <div>
                            <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Margin Benefit</label>
                            <input
                                type="text"
                                value={marginBenefit}
                                onChange={(e) => setMarginBenefit(e.target.value)}
                                placeholder="e.g. High-margin product (earn up to 50% profit)"
                                className="w-full h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
                            />
                        </div>

                        <div>
                            <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Quality Highlight</label>
                            <input
                                type="text"
                                value={qualityHighlight}
                                onChange={(e) => setQualityHighlight(e.target.value)}
                                placeholder="e.g. Premium Scandinavian quality that sells itself"
                                className="w-full h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
                            />
                        </div>

                        <div>
                            <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Eco Highlight</label>
                            <input
                                type="text"
                                value={ecoHighlight}
                                onChange={(e) => setEcoHighlight(e.target.value)}
                                placeholder="e.g. Sustainable soy wax and organic scents"
                                className="w-full h-11 sm:h-12 px-3.5 sm:px-4 text-xs sm:text-sm border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                            <label className="block text-[#78716C] text-xs sm:text-sm font-medium">Upload product images (Max 3)</label>
                            {selectedFiles.length > 0 && <span className="text-xs font-bold text-[#D97706]">{selectedFiles.length} / 3 photo(s) selected</span>}
                        </div>

                        <input type="file" accept="image/*" multiple ref={fileInputRef} onChange={handleFileSelect} className="hidden" />

                        {/* Image Previews Grid */}
                        {previewUrls.length > 0 && (
                            <div className="grid grid-cols-3 gap-2.5 mb-3">
                                {previewUrls.map((url, idx) => (
                                    <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                                        <img src={url} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(idx)}
                                            className="absolute top-1 right-1 w-5 h-5 bg-black/70 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer"
                                            title="Remove photo"
                                        >
                                            <X size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Dropzone (Only shown if < 3 photos selected) */}
                        {selectedFiles.length < 3 ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-lg p-4 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                    isDragging ? "border-[#D97706] bg-[#D97706]/10" : "border-[#E7E5E4] hover:border-[#D97706] hover:bg-stone-50"
                                }`}
                            >
                                <div className="w-8 h-8 rounded-full bg-amber-50 text-[#D97706] flex items-center justify-center">
                                    <Plus size={18} />
                                </div>
                                <p className="text-xs font-semibold text-stone-700">Click to add photos or drag & drop</p>
                                <p className="text-[10px] text-stone-400">Up to 3 photos max (PNG, JPG, WEBP)</p>
                            </div>
                        ) : (
                            <p className="text-center text-xs text-stone-500 font-medium py-2 bg-stone-50 border border-stone-200 rounded-lg">Maximum 3 photos reached. Remove a photo to replace.</p>
                        )}
                    </div>
                </form>

                <div className="p-4 sm:p-6 border-t border-[#F5F5F4]">
                    <button onClick={handleSubmit} disabled={isLoading} className="cursor-pointer w-full h-11 sm:h-12 bg-[#D97706] hover:bg-[#C06A06] disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs sm:text-base font-medium rounded-lg transition-colors">
                        {isLoading ? "Adding Product..." : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNewProduct;
