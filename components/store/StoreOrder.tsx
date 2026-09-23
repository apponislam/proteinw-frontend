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

    const sellerName = storeInfo?.validation ? storeInfo.sellerName : "Okänd";
    const campaignName = storeInfo?.validation ? storeInfo.campaignName : "Okänd";
    const firstName = sellerName && sellerName !== "Okänd" ? sellerName.split(" ")[0] : "Okänd";

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

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) {
            toast.error("Lägg till några produkter i varukorgen innan du beställer.");
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
            toast.success("Beställningen har lagts! Tack för ditt stöd.");

            // Clear cart
            dispatch(clearCart());

            // Reset form & show confirmation modal
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
            setIsSubmitted(true);
        } catch (err: any) {
            console.error("Failed to place order:", err);
            toast.error(err?.data?.message || "Det gick inte att lägga beställningen. Försök igen.");
        }
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
                <div className="flex flex-col justify-between bg-[#E8E8E8] p-5 sm:p-8 md:p-10 rounded-[24px] shadow-xs">
                    <div className="space-y-6 sm:space-y-8 mb-6 sm:mb-8">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1C] mb-3 sm:mb-4">Slutför din beställning</h2>
                            <p className="text-xs sm:text-base text-[#514532] leading-relaxed">
                                Tack för att du väljer att stötta {firstName}s kampanj ({campaignName})! Vi gör det enkelt och lokalt.
                            </p>
                        </div>
                        <div className="bg-[#FEF3C780] border border-[#FDE68A] rounded-[24px] flex items-start gap-3 sm:gap-4 p-4 sm:p-6">
                            <Info size={24} className="text-[#7C5800] shrink-0 h-6 w-6 sm:h-8 sm:w-8 mt-0.5" />
                            <div>
                                <h3 className="text-[#7C5800] font-bold text-base sm:text-lg">Ingen betalning i nätbutiken</h3>
                                <p className="text-xs sm:text-sm text-[#514532] mt-1 leading-relaxed">Betalning sker vid dörren när säljaren levererar produkten till din adress. Swish eller kontanter accepteras av {firstName}.</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-xs sm:text-base text-gray-800">
                            <div className="flex items-center gap-3">
                                <Truck className="shrink-0 text-[#7C5800]" size={20} />
                                <p>Kostnadsfri personlig leverans av {firstName}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="w-5 h-5 rounded-full bg-[#7C5800]/10 text-[#7C5800] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                                <p>Kvalitet Kungsbjörnen står bakom</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#FAFAF9CC] rounded-3xl p-4 sm:p-6 space-y-4">
                        <div>
                            <p className="text-xs sm:text-sm text-[#837560] font-bold">Beräknad leverans</p>
                            <p className="text-sm sm:text-base font-bold text-[#1A1C1C]">Leverans inom 5 dagar efter avslutad insamling.</p>
                            <p className="text-xs text-[#78716C] mt-1.5 leading-relaxed">Undrar du när insamlingen avslutas eller har du frågor? Kontakta mig!</p>
                        </div>

                        <div className="border-t border-gray-200 pt-4">
                            <h3 className="font-bold text-base text-black mb-3">Beställningsöversikt</h3>
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500 text-xs sm:text-sm">Inga produkter i varukorgen. Justera antal ovan för att lägga till produkter.</p>
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
                                        <span>Totalt pris</span>
                                        <span>{totalPrice} SEK</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xs border border-gray-100">
                    <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8">Dina leveransuppgifter</h2>

                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">FULLSTÄNDIGT NAMN</label>
                                <input
                                    type="text"
                                    required
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Erik Johansson"
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">TELEFONNUMMER</label>
                                <input
                                    type="tel"
                                    required
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="+46 70 123 45 67"
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">E-POSTADRESS</label>
                            <input
                                type="email"
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="erik@example.com"
                                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Gatuadress</label>
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
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Stad</label>
                                <input
                                    type="text"
                                    required
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Stockholm"
                                    className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Postnummer</label>
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
                            <label className="block text-xs sm:text-sm font-medium text-[#837560] mb-1.5 sm:mb-2">Ort</label>
                            <input
                                type="text"
                                required
                                name="locality"
                                value={formData.locality}
                                onChange={handleChange}
                                placeholder="Östermalm"
                                className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-[24px] border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:border-transparent transition-all"
                            />
                        </div>

                        <label className="flex items-start gap-3 cursor-pointer select-none">
                            <div className="relative shrink-0 mt-0.5">
                                <input type="checkbox" required name="agree" checked={formData.agree} onChange={handleChange} className="sr-only peer" />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-md peer-checked:border-[#7C5800] peer-checked:bg-[#7C5800] flex items-center justify-center transition-all bg-white shadow-xs">
                                    {formData.agree && (
                                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <span className="text-xs sm:text-sm text-gray-600 leading-relaxed">Jag förstår att min beställning levereras personligen av {firstName} och att betalning sker direkt vid leverans.</span>
                        </label>

                        <button
                            type="submit"
                            disabled={!formData.agree || cartItems.length === 0 || isLoading}
                            className="w-full py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-white hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md cursor-pointer"
                        >
                            {isLoading ? "Lägger beställning..." : "Skicka beställning"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Order Confirmation Modal */}
            {isSubmitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 border border-stone-100 shadow-2xl relative">
                        <div className="mx-auto w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-extrabold text-stone-900">Tack för din order!</h3>
                            <p className="text-stone-600 text-sm leading-relaxed">
                                Din beställning har mottagits framgångsrikt. En orderbekräftelse har skickats till din e-post. {firstName} kommer att leverera dina produkter personligen.
                            </p>
                        </div>
                        <div className="pt-2">
                            <button
                                type="button"
                                onClick={() => setIsSubmitted(false)}
                                className="w-full py-3 bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] text-white font-bold rounded-[24px] transition-all shadow-md cursor-pointer text-sm"
                            >
                                Stäng
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StoreOrder = () => {
    return (
        <Suspense
            fallback={
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                    <p className="text-[#78716C] text-lg">Laddar beställningsformulär...</p>
                </div>
            }
        >
            <StoreOrderContent />
        </Suspense>
    );
};

export default StoreOrder;
