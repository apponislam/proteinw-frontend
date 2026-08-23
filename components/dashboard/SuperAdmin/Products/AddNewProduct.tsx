import React, { useState, useRef } from "react";
import { X, ChevronDown, Check } from "lucide-react";
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
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    React.useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreviewUrl(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
        } else {
            setPreviewUrl(null);
        }
    }, [selectedFile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("shortDescription", shortDescription);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            if (selectedFile) formData.append("productImage", selectedFile);

            const res = (await createProduct(formData).unwrap()) as any;
            toast.success(res?.message || "Product created successfully!");
            onClose();
            // Reset form
            setName("");
            setShortDescription("");
            setCategory("");
            setSubCategory("");
            setSelectedFile(null);
        } catch (err: any) {
            // console.error(err);
            const errorMessage = err?.data?.message || err?.message || "Failed to create product";
            toast.error(errorMessage);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
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

                    <div>
                        <label className="block text-[#78716C] text-xs sm:text-sm font-medium mb-1.5 sm:mb-2">Upload product image</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-lg p-3 sm:p-4 text-center transition-colors cursor-pointer flex flex-col items-center justify-center ${isDragging ? "border-[#D97706] bg-[#D97706]/10" : "border-[#F5F5F4] hover:border-[#D97706]"}`}
                        >
                            {previewUrl ? (
                                <>
                                    <img src={previewUrl} alt="Preview" className="h-28 sm:h-32 w-full object-contain mb-2 rounded-lg" />
                                    <div className="text-[#78716C] text-[11px] sm:text-xs font-medium">Click to change image</div>
                                </>
                            ) : (
                                <div className="text-[#78716C] text-xs sm:text-sm py-3 sm:py-4">Click to upload or drag and drop</div>
                            )}
                        </div>
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
