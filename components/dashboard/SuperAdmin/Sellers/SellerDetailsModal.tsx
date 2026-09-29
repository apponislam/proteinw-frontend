import React from "react";
import { X, Users, PackageCheck, ShoppingBag, Target, Mail, Phone, MapPin, Building2, Calendar, UserCheck } from "lucide-react";
import { TSellerListItem } from "@/redux/features/dashboard/dashboardApi";
import { SellerCampaignOrders } from "./SellerCampaignOrders";
import { useGetUserByIdQuery } from "@/redux/features/auth/authApi";

interface SellerDetailsModalProps {
    seller: TSellerListItem;
    onClose: () => void;
}

export const SellerDetailsModal: React.FC<SellerDetailsModalProps> = ({ seller, onClose }) => {
    const { data: userResponse, isLoading: isUserLoading } = useGetUserByIdQuery(seller._id);
    const userData = userResponse?.data;

    const groupsList = seller.groups && seller.groups.length > 0 ? seller.groups : seller.group ? [seller.group] : [];
    const totalGroupsCount = seller.totalGroups ?? groupsList.length;
    const totalCampaignsCount = seller.totalCampaigns ?? 0;
    const activeCampaignsCount = seller.totalActiveCampaigns ?? 0;

    const address = userData?.address;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm transition-all duration-300">
            <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl sm:rounded-3xl shadow-2xl overflow-y-auto flex flex-col p-5 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-[#F5F5F4] pb-5 mb-6">
                    <div className="flex items-center gap-3.5">
                        <span className="w-12 h-12 rounded-2xl bg-[#D97706] text-white flex items-center justify-center font-extrabold text-lg shadow-xs shrink-0">{seller.code || userData?.name?.charAt(0) || "S"}</span>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap mb-0.5">
                                <h3 className="text-xl font-extrabold text-[#1A1C1C]">{userData?.name || seller.name}</h3>
                                {userData?.role && <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-[#7C5800]">{userData.role}</span>}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-[#78716C] flex-wrap">
                                <span className="flex items-center gap-1">
                                    <Mail size={13} className="text-stone-400" />
                                    {userData?.email || seller.email}
                                </span>
                                {(userData?.phone || seller.status) && (
                                    <span className="flex items-center gap-1">
                                        <Phone size={13} className="text-stone-400" />
                                        {userData?.phone || "Ej angivet"}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#78716C] hover:text-[#1C191C] transition-colors cursor-pointer shrink-0" title="Stäng">
                        <X size={18} />
                    </button>
                </div>

                {/* Thin / Compact Stat Cards Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6">
                    {/* Packages Sold (Highlight Card) */}
                    <div className="bg-amber-50/70 px-3 py-2.5 rounded-xl border border-amber-200/70 flex items-center gap-2.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#D97706] text-white flex items-center justify-center font-bold shrink-0">
                            <PackageCheck size={16} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-sm sm:text-base font-extrabold text-[#1A1C1C] block leading-tight">{seller.packages}</span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-[#7C5800] truncate block">Sålda paket</span>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="bg-[#FAFAF9] px-3 py-2.5 rounded-xl border border-stone-200/80 flex items-center gap-2.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100/80 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                            <ShoppingBag size={16} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-sm sm:text-base font-extrabold text-[#1A1C1C] block leading-tight">{seller.orders}</span>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#78716C] truncate block">Totalt antal order</span>
                        </div>
                    </div>

                    {/* Total Groups */}
                    <div className="bg-[#FAFAF9] px-3 py-2.5 rounded-xl border border-stone-200/80 flex items-center gap-2.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-amber-100/80 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                            <Users size={16} />
                        </div>
                        <div className="min-w-0">
                            <span className="text-sm sm:text-base font-extrabold text-[#1A1C1C] block leading-tight">{totalGroupsCount}</span>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#78716C] truncate block">Tilldelade grupper</span>
                        </div>
                    </div>

                    {/* Campaigns (Total & Active) */}
                    <div className="bg-[#FAFAF9] px-3 py-2.5 rounded-xl border border-stone-200/80 flex items-center gap-2.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold shrink-0">
                            <Target size={16} />
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-sm sm:text-base font-extrabold text-[#1A1C1C] leading-tight">{totalCampaignsCount}</span>
                                {activeCampaignsCount > 0 && <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md truncate">{activeCampaignsCount} Aktiva</span>}
                            </div>
                            <span className="text-[10px] sm:text-[11px] font-semibold text-[#78716C] truncate block">Totalt antal försäljningar</span>
                        </div>
                    </div>
                </div>

                {/* User Info Details Cards */}
                {isUserLoading ? (
                    <div className="p-4 text-center text-xs text-stone-400">Laddar användarinformation...</div>
                ) : userData ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {/* Account & Status Information */}
                        <div className="bg-[#FAFAF9] p-4 sm:p-5 rounded-2xl border border-[#E7E5E4] space-y-3">
                            <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2.5">
                                <UserCheck size={16} className="text-[#D97706]" />
                                <span className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider">Konto- & Medlemsinfo</span>
                            </div>

                            <div className="space-y-3 text-xs">
                                <div>
                                    <span className="text-[#78716C] block font-medium">Telefon</span>
                                    <span className="font-bold text-[#1A1C1C]">{userData.phone || "Ej angivet"}</span>
                                </div>
                                {userData.createdAt && (
                                    <div className="pt-2 border-t border-stone-200/50 flex items-center justify-between text-[#78716C]">
                                        <span className="flex items-center gap-1 font-medium">
                                            <Calendar size={13} className="text-[#D97706]" /> Blev medlem
                                        </span>
                                        <span className="font-bold text-[#1A1C1C]">
                                            {(() => {
                                                const date = new Date(userData.createdAt);
                                                const day = String(date.getDate()).padStart(2, "0");
                                                const month = String(date.getMonth() + 1).padStart(2, "0");
                                                const year = date.getFullYear();
                                                return `${day}/${month}/${year}`;
                                            })()}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Address & Organization Information */}
                        {/* <div className="bg-[#FAFAF9] p-4 sm:p-5 rounded-2xl border border-[#E7E5E4] space-y-3">
                            <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2.5">
                                <MapPin size={16} className="text-[#D97706]" />
                                <span className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider">Adress & Organisation</span>
                            </div>

                            {address && (address.street || address.city || address.organizationName) ? (
                                <div className="space-y-2 text-xs">
                                    {(address.organizationName || address.organizationType) && (
                                        <div className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-stone-200/80">
                                            <Building2 size={16} className="text-[#D97706] shrink-0 mt-0.5" />
                                            <div>
                                                <span className="font-extrabold text-[#1A1C1C] block">{address.organizationName || "Organisation"}</span>
                                                {address.organizationType && <span className="text-[#78716C] text-[11px]">{address.organizationType}</span>}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        {address.street && (
                                            <div>
                                                <span className="text-[#78716C] block font-medium">Gatuadress</span>
                                                <span className="font-bold text-[#1A1C1C]">{address.street}</span>
                                            </div>
                                        )}
                                        {address.locality && (
                                            <div>
                                                <span className="text-[#78716C] block font-medium">Ort</span>
                                                <span className="font-bold text-[#1A1C1C]">{address.locality}</span>
                                            </div>
                                        )}
                                        {(address.city || address.zipCode) && (
                                            <div>
                                                <span className="text-[#78716C] block font-medium">Stad / Postnr</span>
                                                <span className="font-bold text-[#1A1C1C]">
                                                    {address.zipCode ? `${address.zipCode} ` : ""}
                                                    {address.city || ""}
                                                </span>
                                            </div>
                                        )}
                                        {address.state && (
                                            <div>
                                                <span className="text-[#78716C] block font-medium">Län / Region</span>
                                                <span className="font-bold text-[#1A1C1C]">{address.state}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-stone-400 font-medium py-2">Ingen adress- eller organisationsinformation registrerad</p>
                            )}
                        </div> */}
                    </div>
                ) : null}

                {/* Assigned Groups Section */}
                <div className="bg-[#FAFAF9] p-4 sm:p-5 rounded-2xl border border-[#E7E5E4] space-y-3 mb-6">
                    <div className="flex items-center gap-2 border-b border-stone-200/60 pb-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-100 text-[#7C5800] flex items-center justify-center font-bold shrink-0">
                            <Users size={18} />
                        </div>
                        <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider">Tilldelade grupper</span>
                    </div>

                    {groupsList.length === 0 ? (
                        <p className="text-sm text-stone-400 font-medium">Inga grupper tilldelade</p>
                    ) : (
                        <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto pr-1">
                            {groupsList.map((groupName, idx) => (
                                <span key={idx} className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white text-[#1A1C1C] px-3 py-1.5 rounded-xl border border-stone-200 shadow-2xs hover:border-amber-300 transition-colors">
                                    <span className="w-2 h-2 rounded-full bg-[#D97706] shrink-0"></span>
                                    {groupName}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bottom: Seller Orders */}
                <div className="mb-6 border-t border-[#F5F5F4] pt-6">
                    <h4 className="text-sm font-bold text-[#D97706] uppercase tracking-wider mb-3">Säljarens beställningar</h4>
                    <SellerCampaignOrders memberId={seller._id} />
                </div>

                {/* Footer */}
                <div className="flex justify-end pt-4 border-t border-[#F5F5F4] mt-auto">
                    <button onClick={onClose} className="px-5 py-2.5 bg-[#FAFAF9] hover:bg-[#F5F5F4] text-[#1A1C1C] font-semibold rounded-xl border border-[#E7E5E4] transition-colors duration-200 cursor-pointer">
                        Stäng
                    </button>
                </div>
            </div>
        </div>
    );
};
