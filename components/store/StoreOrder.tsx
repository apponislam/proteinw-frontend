"use client";
import { Info, Truck } from "lucide-react";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGetStoreInfoQuery } from "@/redux/features/dashboard/dashboardApi";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";

const StoreOrderContent = () => {
    const searchParams = useSearchParams();
    const campaign = searchParams.get("campaign") || "";
    const referral = searchParams.get("referral") || "";

    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const { data: storeInfo } = useGetStoreInfoQuery({ campaign, referral }, { skip: !campaign || !referral });

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const sellerName = storeInfo?.validation ? storeInfo.sellerName : "Unknown";
    const campaignName = storeInfo?.validation ? storeInfo.campaignName : "Unknown";
    const firstName = sellerName && sellerName !== "Unknown" ? sellerName.split(" ")[0] : "Unknown";

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        street: "",
        city: "",
        postalCode: "",
        locality: "",
        agree: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error("Please add some products to your cart before ordering.");
            return;
        }

        try {
            const orderPayload = {
                customerName: formData.fullName,
                customerEmail: formData.email,
                customerPhone: formData.phoneNumber,
                address: {
                    street: formData.street,
                    city: formData.city,
                    postalCode: formData.postalCode,
                    locality: formData.locality,
                },
                items: cartItems.map((item) => ({
                    productId: item.productId,
                    quantity: item.quantity,
                })),
                campaignCode: campaign,
                referralCode: referral,
            };

            await createOrder(orderPayload).unwrap();
            toast.success("Order placed successfully! Thank you for your support.");

            // Clear cart
            dispatch(clearCart());

            // Reset form
            setFormData({
                fullName: "",
                phoneNumber: "",
                email: "",
                street: "",
                city: "",
                postalCode: "",
                locality: "",
                agree: false,
            });
        } catch (err: any) {
            console.error("Failed to place order:", err);
            toast.error(err?.data?.message || "Failed to place order. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <div className="space-y-6 sm:space-y-8 bg-[#E8E8E8] p-5 sm:p-8 md:p-10 rounded-[24px] shadow-xs">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1C] mb-3 sm:mb-4">Completing your support</h2>
                        <p className="text-xs sm:text-base text-[#514532] leading-relaxed">
                            Thank you for choosing to support {firstName}'s campaign ({campaignName})! We keep things simple and local.
                        </p>
                    </div>
                    <div className="bg-[#FEF3C780] border border-[#FDE68A] rounded-[24px] flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
                        <Info size={24} className="text-[#7C5800] shrink-0 h-6 w-6 sm:h-8 sm:w-8 mt-0.5" />
                        <div>
                            <h3 className="text-[#7C5800] font-bold text-base sm:text-lg">No payment at the actual store</h3>
                            <p className="text-xs sm:text-sm text-[#514532] mt-1 leading-relaxed">Payment will happen at the door when the seller leaves the product at your address. Swish or cash is accepted by {firstName}.</p>
                        </div>
                    </div>

                    <div className="space-y-3 text-xs sm:text-base text-gray-800">
                        <div className="flex items-center gap-3">
                            <Truck className="shrink-0 text-[#7C5800]" size={20} />
                            <p>Free hand-delivery by {firstName}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-5 h-5 rounded-full bg-[#7C5800]/10 text-[#7C5800] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                            <p>Authentic Quality Assurance</p>
                        </div>
                    </div>

                    <div className="bg-[#FAFAF9CC] rounded-3xl p-4 sm:p-6 space-y-4">
                        <div>
                            <p className="text-xs sm:text-sm text-[#837560] font-bold">Estimated Delivery</p>
                            <p className="text-lg sm:text-xl font-bold">2-3 Weeks</p>
                        </div>
                        {referral && (
                            <div>
                                <p className="text-xs sm:text-sm text-[#837560] font-bold">Seller ID (Referral Code)</p>
                                <p className="text-lg sm:text-xl font-bold">{referral}</p>
                            </div>
                        )}

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="font-bold text-base text-black mb-3">Order Summary</h3>
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-xs sm:text-sm">No items in your cart. Adjust product quantities above to add items.</p>
                            ) : (
                                <div className="space-y-2">
                                    {cartItems.map((item) => (
                                        <div key={item.productId} className="flex justify-between text-xs sm:text-sm gap-2">
                                            <span className="text-gray-700 truncate">
                                                {item.name} (x{item.quantity})
                                            </span>
                                            <span className="font-semibold text-black shrink-0">{item.price * item.quantity} SEK</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between font-extrabold text-black text-base sm:text-lg">
                                        <span>Total Price</span>
                                        <span>{totalPrice} SEK</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xs border border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8">Your Delivery Details</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">FULL NAME</label>
                                <input
                                    type="text"
                                    required
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">PHONE NUMBER</label>
                                <input
                                    type="tel"
                                    required
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+46 00 000 00 00"
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">EMAIL ADDRESS</label>
                            <input
                                type="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Street</label>
                            <input
                                type="text"
                                required
                                name="street"
                                value={formData.street}
                                onChange={handleChange}
                                placeholder="Storgatan 12"
                                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">City</label>
                                <input type="text" required name="city" value={formData.city} onChange={handleChange} placeholder="Stockholm" className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all" />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Postal Code</label>
                                <input
                                    type="text"
                                    required
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="111 22"
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Locality</label>
                            <input
                                type="text"
                                required
                                name="locality"
                                value={formData.locality}
                                onChange={handleChange}
                                placeholder="Sweden"
                                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                            />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <div className="relative shrink-0 mt-0.5">
                                <input
                                    type="checkbox"
                                    required
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all bg-white shadow-xs">
                                    {formData.agree && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                I understand that my order will be delivered by {firstName} personally and that payment is made directly to him upon delivery.
                            </span>
                        </label>

                        <button
                            type="submit"
                            disabled={!formData.agree || cartItems.length === 0 || isLoading}
                            className="w-full py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                        >
                            {isLoading ? "Placing Order..." : "Place Delivery Order"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

const StoreOrder = () => {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <p className="text-[#78716C] text-lg">Loading order form...</p>
                </div>
            }
        >
            <StoreOrderContent />
        </Suspense>
    );
};

export default StoreOrder;
