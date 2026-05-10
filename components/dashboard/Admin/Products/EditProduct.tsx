import React from "react";
import { X } from "lucide-react";

interface EditProductProps {
    isOpen: boolean;
    onClose: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ isOpen, onClose }) => {
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

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Product name</label>
                        <input
                            type="text"
                            defaultValue="Class 9B"
                            className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Price</label>
                        <input
                            type="text"
                            defaultValue="SEK 12,400"
                            className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Short description</label>
                        <textarea
                            defaultValue="Annual sports trip fund"
                            rows={3}
                            className="w-full px-4 py-3 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20 resize-none"
                        />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Product category</label>
                        <input
                            type="text"
                            defaultValue="Summer Solstice"
                            className="w-full h-12 px-4 border border-[#F5F5F4] rounded-lg focus:outline-none focus:border-[#D97706] focus:ring-2 focus:ring-[#D97706]/20"
                        />
                    </div>

                    <div>
                        <label className="block text-[#78716C] text-sm font-medium mb-2">Upload product image</label>
                        <div className="border-2 border-dashed border-[#F5F5F4] rounded-lg p-8 text-center hover:border-[#D97706] transition-colors cursor-pointer">
                            <div className="text-[#78716C] text-sm">Click to upload or drag and drop</div>
                        </div>
                    </div>
                </div>

                <div className="p-6 border-t border-[#F5F5F4]">
                    <button
                        onClick={onClose}
                        className="w-full h-12 bg-[#D97706] hover:bg-[#C06A06] text-white font-medium rounded-lg transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
