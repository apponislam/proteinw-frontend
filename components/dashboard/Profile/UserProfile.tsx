"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import UpdateProfileModal from "@/components/dashboard/UpdateProfileModal";
import ChangePasswordUserModal from "@/components/dashboard/ChangePasswordUserModal";
import DeleteAccountModal from "@/components/dashboard/DeleteAccountModal";
import { User, Mail, Phone, Briefcase, Calendar, Edit3, KeyRound, MapPin, Building, Building2, Loader2, Trash2 } from "lucide-react";

export default function UserProfile() {
    const reduxUser = useAppSelector(currentUser);
    const { data: meData, isLoading, refetch } = useGetMeQuery(undefined);

    // Properly extract user whether meData is transformed or raw wrapper object
    const user = (meData as any)?.data || meData || reduxUser;

    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

    if (isLoading && !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-[#D97706]" />
                <p className="text-[#78716C] text-sm font-medium">Loading profile information...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <p className="text-red-500 font-bold">Failed to load profile data.</p>
            </div>
        );
    }

    const initials = user.name
        ? user.name
              .split(" ")
              .map((n: string) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase()
        : "U";

    const isSeller = user.role === "SELLER";
    const isSuperAdmin = user.role === "SUPER_ADMIN";
    const formattedRole = user.role ? user.role.replace("_", " ") : "USER";
    const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "N/A";

    let parsedAddress: any = user.address || {};
    if (typeof user.address === "string") {
        try {
            parsedAddress = JSON.parse(user.address);
        } catch {
            parsedAddress = {};
        }
    }
    const address = parsedAddress;

    return (
        <div className="space-y-6 max-w-6xl mx-auto pb-10">
            {/* Header Banner & Hero Card */}
            <div className="bg-white rounded-2xl border border-[#E7E5E4] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.04)] overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 sm:h-40 bg-linear-to-r from-[#271900] via-[#7C5800] to-[#D97706] relative">
                    <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[16px_16px] opacity-10"></div>
                </div>

                <div className="px-6 pb-6 pt-0 relative">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        {/* Avatar & User Details */}
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                            {/* Avatar image pulled up over cover photo */}
                            <div className="relative shrink-0 -mt-12 sm:-mt-14">
                                {user.profileImage ? (
                                    <Image src={user.profileImage} alt={user.name || "Profile"} width={112} height={112} className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-white shadow-xl object-cover bg-white" />
                                ) : (
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl ring-4 ring-white shadow-xl bg-linear-to-br from-[#7C5800] to-[#FFB800] text-white font-extrabold text-3xl flex items-center justify-center">{initials}</div>
                                )}
                            </div>

                            {/* User details safely in white section */}
                            <div className="pt-2 sm:pt-4 space-y-1.5">
                                <div className="flex items-center gap-2.5 flex-wrap">
                                    <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1C] tracking-tight">{user.name}</h1>
                                    <span className="px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wide bg-amber-50 text-[#D97706] border border-amber-200/80">{formattedRole}</span>
                                    {!isSeller && !isSuperAdmin && user.isApproved !== undefined && (
                                        <span className={`px-3 py-0.5 rounded-full text-xs font-bold border ${user.isApproved ? "bg-green-50 text-green-700 border-green-200" : "bg-yellow-50 text-yellow-800 border-yellow-200"}`}>{user.isApproved ? "Approved" : "Pending Approval"}</span>
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm text-[#78716C] font-semibold flex items-center gap-1.5">
                                    <Mail size={14} className="text-[#D97706] shrink-0" />
                                    <span>{user.email}</span>
                                </p>
                            </div>
                        </div>

                        {/* Action Buttons in white section */}
                        <div className="flex items-center gap-3 pt-2 sm:pt-4 flex-wrap">
                            <button onClick={() => setIsUpdateProfileOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D97706] hover:bg-[#B45309] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer">
                                <Edit3 size={14} />
                                <span>Edit Profile</span>
                            </button>
                            <button onClick={() => setIsChangePasswordOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition-all cursor-pointer">
                                <KeyRound size={14} />
                                <span>Change Password</span>
                            </button>
                            <button onClick={() => setIsDeleteAccountOpen(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200/80 rounded-xl text-xs font-bold transition-all cursor-pointer">
                                <Trash2 size={14} />
                                <span>Delete Account</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card 1: Personal Details */}
                <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.03)] space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#F5F5F4] pb-3">
                        <User size={18} className="text-[#D97706]" />
                        <h3 className="text-sm font-bold text-[#1A1C1C] uppercase tracking-wider">Personal Information</h3>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm">
                        <div className="flex items-center justify-between py-1 border-b border-stone-50">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <User size={14} className="text-stone-400" /> Full Name
                            </span>
                            <span className="font-bold text-[#1A1C1C]">{user.name}</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-stone-50">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <Mail size={14} className="text-stone-400" /> Email Address
                            </span>
                            <span className="font-bold text-[#1A1C1C] truncate max-w-48 sm:max-w-64">{user.email}</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-stone-50">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <Phone size={14} className="text-stone-400" /> Phone Number
                            </span>
                            <span className="font-bold text-[#1A1C1C]">{user.phone || "Not provided"}</span>
                        </div>

                        {!isSeller && !isSuperAdmin && user.profession && (
                            <div className="flex items-center justify-between py-1 border-b border-stone-50">
                                <span className="text-[#78716C] font-medium flex items-center gap-2">
                                    <Briefcase size={14} className="text-stone-400" /> Profession
                                </span>
                                <span className="font-bold text-[#1A1C1C]">{user.profession}</span>
                            </div>
                        )}

                        <div className="flex items-center justify-between py-1">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <Calendar size={14} className="text-stone-400" /> Joined On
                            </span>
                            <span className="font-bold text-[#1A1C1C]">{joinedDate}</span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Address & Organization Details */}
                <div className="bg-white p-6 rounded-2xl border border-[#E7E5E4] shadow-[0px_2px_10px_0px_rgba(0,0,0,0.03)] space-y-4">
                    <div className="flex items-center gap-2 border-b border-[#F5F5F4] pb-3">
                        <MapPin size={18} className="text-[#D97706]" />
                        <h3 className="text-sm font-bold text-[#1A1C1C] uppercase tracking-wider">{isSeller || isSuperAdmin ? "Location & Address" : "Organization & Location"}</h3>
                    </div>

                    <div className="space-y-3.5 text-xs sm:text-sm">
                        {!isSeller && !isSuperAdmin && (
                            <>
                                <div className="flex items-center justify-between py-1 border-b border-stone-50">
                                    <span className="text-[#78716C] font-medium flex items-center gap-2">
                                        <Building size={14} className="text-stone-400" /> Organization Name
                                    </span>
                                    <span className="font-bold text-[#1A1C1C] truncate max-w-48 sm:max-w-64">{address.organizationName || "N/A"}</span>
                                </div>

                                <div className="flex items-center justify-between py-1 border-b border-stone-50">
                                    <span className="text-[#78716C] font-medium flex items-center gap-2">
                                        <Building2 size={14} className="text-stone-400" /> Organization Type
                                    </span>
                                    <span className="font-bold text-[#1A1C1C]">{address.organizationType || "N/A"}</span>
                                </div>
                            </>
                        )}

                        <div className="flex items-center justify-between py-1 border-b border-stone-50">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <MapPin size={14} className="text-stone-400" /> Street Address
                            </span>
                            <span className="font-bold text-[#1A1C1C] truncate max-w-48 sm:max-w-64">{address.street || "N/A"}</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-stone-50">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <Building size={14} className="text-stone-400" /> City / Zip Code
                            </span>
                            <span className="font-bold text-[#1A1C1C]">{address.city ? `${address.city}${address.zipCode ? ` (${address.zipCode})` : ""}` : "N/A"}</span>
                        </div>

                        <div className="flex items-center justify-between py-1">
                            <span className="text-[#78716C] font-medium flex items-center gap-2">
                                <MapPin size={14} className="text-stone-400" /> Country
                            </span>
                            <span className="font-bold text-[#1A1C1C]">{address.country || "Sweden"}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <UpdateProfileModal
                isOpen={isUpdateProfileOpen}
                onClose={() => {
                    setIsUpdateProfileOpen(false);
                    refetch();
                }}
            />
            <ChangePasswordUserModal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
            <DeleteAccountModal isOpen={isDeleteAccountOpen} onClose={() => setIsDeleteAccountOpen(false)} />
        </div>
    );
}
