"use client";
import { Info, Truck } from "lucide-react";
import React, { useState } from "react";

const StoreOrder = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        street: "",
        city: "",
        postalCode: "",
        country: "",
        agree: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Order submitted:", formData);
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-8 bg-[#E8E8E8] p-10 rounded-[24px] shadow-md">
                    <div>
                        <h2 className="text-3xl font-extrabold text-[#1A1C1C] mb-4">Completing your support</h2>
                        <p className="text-[#514532]">Thank you for choosing to support Martin's class trip! We keep things simple and local.</p>
                    </div>
                    <div className="bg-[#FEF3C780] border border-[#FDE68A] rounded-[24px] flex items-start gap-4 p-6">
                        <Info size={24} className="text-[#7C5800] text-3xl h-8 w-8" />
                        <div>
                            <h2 className="text-[#7C5800] font-bold text-[18px]">No payment at the actual store</h2>
                            <p>Payment will happen at the door when the seller leaves the product at your address. Swish or cash is accepted by Martin.</p>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center gap-4">
                            <Truck />
                            <p>Free hand-delivery by Martin</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <p>Authentic Kungsbjörnen Quality</p>
                        </div>
                    </div>

                    <div className="bg-[#FAFAF9CC] rounded-3xl p-6 space-y-4">
                        <div>
                            <p className="text-sm text-[#837560] font-bold">Estimated Delivery</p>
                            <p className="text-xl font-bold">2-3 Weeks</p>
                        </div>
                        <div>
                            <p className="text-sm text-[#837560] font-bold">Seller ID</p>
                            <p className="text-xl font-bold">MA-9B-2024</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-8 shadow-sm">
                    <h2 className="text-3xl font-bold text-black mb-8">Your Delivery Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#837560] mb-2">FULL NAME</label>
                                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#837560] mb-2">PHONE NUMBER</label>
                                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+46 00 000 00 00" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#837560] mb-2">EMAIL ADDRESS</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#837560] mb-2">Street</label>
                            <input type="text" name="street" value={formData.street} onChange={handleChange} placeholder="Uttar Badda" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-[#837560] mb-2">City</label>
                                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Dhaka" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#837560] mb-2">Postal Code</label>
                                <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="4545" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#837560] mb-2">Country</label>
                            <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Sweden" className="w-full px-4 py-3 rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                        </div>

                        <div className="flex items-start gap-3">
                            <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="mt-1 w-5 h-5 rounded border-gray-300 text-[#FFB800] focus:ring-[#FFB800]" />
                            <label className="text-sm text-gray-600">I understand that my order will be delivered by Martin personally and that payment is made directly to him upon delivery.</label>
                        </div>

                        <button type="submit" disabled={!formData.agree} className="w-full py-4 font-bold rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            Place Delivery Order
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StoreOrder;
