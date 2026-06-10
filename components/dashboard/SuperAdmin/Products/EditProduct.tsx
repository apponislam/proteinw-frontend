import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useUpdateProductMutation, type TProduct } from "@/redux/features/product/productApi";
import { toast } from "sonner";

interface EditProductProps {
    isOpen: boolean;
    onClose: () => void;
    product: TProduct;
}

const EditProduct: React.FC<EditProductProps> = ({ isOpen, onClose, product }) => {
    const [updateProduct, { isLoading }] = useUpdateProductMutation();

    // Form state
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(String(product.price));
    const [shortDescription, setShortDescription] = useState(product.shortDescription);
    const [category, setCategory] = useState(product.category);
    const [subCategory, setSubCategory] = useState(product.subCategory || "");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Reset form when product changes
    useEffect(() => {
        setName(product.name);
        setPrice(String(product.price));
        setShortDescription(product.shortDescription);
        setCategory(product.category);
        setSubCategory(product.subCategory || "");
        setSelectedFile(null);
    }, [product]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product._id) return;

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("shortDescription", shortDescription);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            if (selectedFile) formData.append("productImage", selectedFile);

            await updateProduct({ productId: product._id, formData }).unwrap();
            toast.success("Product updated!");
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to update product");
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-[#F5F5F4]">
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Edit product</h2>
                    <button onClick={onClose} className="text-[#78716C] hover:text-[#1A1C1C]">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Product name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.01" className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20" />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Short description</label>
                        <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required rows={3} className="w-full px-4 py-3 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 resize-none" />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Product category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20">
                            <option value="Scented Candles">Scented Candles</option>
                            <option value="Premium Socks">Premium Socks</option>
                        </select>
                    </div>

                    {category === "Scented Candles" && (
                        <div>
                            <label className="block text-[#78716C] text-sm font-medium mb-2">Subcategory</label>
                            <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20">
                                <option value="">Select subcategory</option>
                                <option value="Reed Diffusers">Reed Diffusers</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Upload product image</label>
                        <input type="file" accept="image/*" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="hidden" />
                        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-[#F5F5F4] rounded-lg p-8 text-center hover:border-[#D97706] transition-colors cursor-pointer">
                            {selectedFile ? <div className="text-[#1A1C1C] text-sm font-medium">{selectedFile.name}</div> : <div className="text-[#78716C] text-sm">Click to upload or drag and drop</div>}
                        </div>
                    </div>
                </form>

                <div className="p-6 border-t border-[#F5F5F4]">
                    <button onClick={handleSubmit} disabled={isLoading} className="w-full h-12 bg-[#D97706] hover:bg-[#C06A06] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors">
                        {isLoading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
