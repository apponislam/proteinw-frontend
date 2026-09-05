"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGetUserByIdQuery, useUpdateUserBySuperAdminMutation, TAdminStats } from "../../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { X, Loader2, ChevronDown, Check, User, Phone, Briefcase, Building2, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: TAdminStats | null;
}

const PROFESSIONS = [
    { label: "Leader", value: "LEADER" },
    { label: "Teacher", value: "TEACHER" },
    { label: "Parent", value: "PARENT" },
    { label: "Coach", value: "COACH" },
];

const AdminEditModal: React.FC<AdminEditModalProps> = ({ isOpen, onClose, admin }) => {
    const adminId = admin?._id || "";

    // Fetch full single user data by ID when modal opens
    const { data: userData, isLoading: isFetchingUser } = useGetUserByIdQuery(adminId, {
        skip: !isOpen || !adminId,
    });

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [profession, setProfession] = useState<string>("");

    // Address fields
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [locality, setLocality] = useState("");

    // Custom Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [updateUserBySuperAdmin, { isLoading: isUpdating }] = useUpdateUserBySuperAdminMutation();

    useEffect(() => {
        const fetchedUser = userData?.data || admin;
        if (fetchedUser) {
            setName(fetchedUser.name || "");
            setPhone((fetchedUser as any).phone || "");
            setProfession((fetchedUser as any).profession || "");

            const addr = (fetchedUser as any).address || {};
            setOrganizationName(addr.organizationName || "");
            setOrganizationType(addr.organizationType || "");
            setStreet(addr.street || "");
            setCity(addr.city || "");
            setState(addr.state || "");
            setZipCode(addr.zipCode || "");
            setLocality(addr.locality || "");
        }
    }, [userData, admin, isOpen]);

    // Close custom dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isOpen || !admin) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const toastId = toast.loading("Updating admin details...");
        try {
            const bodyObj: Record<string, any> = {};
            if (name) bodyObj.name = name;
            if (phone) bodyObj.phone = phone;
            if (profession) bodyObj.profession = profession;

            const addressObj: Record<string, string> = {};
            if (organizationName) addressObj.organizationName = organizationName;
            if (organizationType) addressObj.organizationType = organizationType;
            if (street) addressObj.street = street;
            if (city) addressObj.city = city;
            if (state) addressObj.state = state;
            if (zipCode) addressObj.zipCode = zipCode;
            if (locality) addressObj.locality = locality;

            if (Object.keys(addressObj).length > 0) {
                bodyObj.address = addressObj;
            }

            await updateUserBySuperAdmin({
                userId: admin._id,
                body: bodyObj,
            }).unwrap();

            toast.success("Admin profile updated successfully!", { id: toastId });
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update admin profile", { id: toastId });
        }
    };

    const selectedProfessionLabel = PROFESSIONS.find((p) => p.value === profession)?.label;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
            {/* Glassmorphism Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-200" onClick={onClose} />

            {/* Modal Container */}
            <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-2xl mx-auto max-h-[90vh] flex flex-col border border-[#E7E5E4] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5 border-b border-[#E7E5E4] bg-linear-to-r from-[#FAF9F6] via-white to-[#FCFBFA]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#D97706] to-[#7C5800] text-white flex items-center justify-center font-bold shadow-sm shrink-0">
                            <Sparkles size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#1A1C1C]">Edit Admin Details</h2>
                            <p className="text-xs text-[#78716C] mt-0.5">
                                Update profile information for <span className="font-semibold text-[#D97706]">{admin.name}</span>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#78716C] hover:text-[#1A1C1C] cursor-pointer p-2 rounded-xl hover:bg-[#F3F3F3] transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Body */}
                {isFetchingUser ? (
                    <div className="p-12 sm:p-16 flex flex-col items-center justify-center text-[#78716C] gap-3">
                        <Loader2 className="animate-spin text-[#D97706]" size={30} />
                        <span className="text-sm font-medium">Loading user details...</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-8 space-y-6 sm:space-y-7 flex-1 custom-scrollbar">
                        {/* Basic Info Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-1 border-b border-[#E7E5E4]">
                                <User size={16} className="text-[#D97706]" />
                                <h4 className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider">Basic Information</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Full Name</label>
                                    <Input
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Full Name"
                                        required
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Phone Number</label>
                                    <Input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Phone Number"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>

                                {/* Custom Profession Dropdown */}
                                <div className="space-y-1.5 relative" ref={dropdownRef}>
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Profession</label>
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full h-11 px-3.5 border border-[#E7E5E4] rounded-xl text-sm bg-[#FAFAF9] text-[#1A1C1C] flex items-center justify-between hover:border-[#D97706] focus:outline-none focus:border-[#D97706] transition-all cursor-pointer font-medium"
                                    >
                                        <span className={selectedProfessionLabel ? "text-[#1A1C1C]" : "text-[#78716C]"}>
                                            {selectedProfessionLabel || "Select Profession"}
                                        </span>
                                        <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E7E5E4] rounded-xl shadow-xl z-20 py-1 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-150">
                                            {PROFESSIONS.map((p) => {
                                                const isSelected = profession === p.value;
                                                return (
                                                    <button
                                                        key={p.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setProfession(p.value);
                                                            setIsDropdownOpen(false);
                                                        }}
                                                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between cursor-pointer transition-colors ${
                                                            isSelected ? "bg-[#FFFBEB] text-[#D97706] font-bold" : "text-[#1A1C1C] hover:bg-[#FAFAF9]"
                                                        }`}
                                                    >
                                                        <span>{p.label}</span>
                                                        {isSelected && <Check size={16} className="text-[#D97706]" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Organization & Address Details Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 pb-1 border-b border-[#E7E5E4]">
                                <Building2 size={16} className="text-[#D97706]" />
                                <h4 className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider">Organization & Address</h4>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Organization Name</label>
                                    <Input
                                        value={organizationName}
                                        onChange={(e) => setOrganizationName(e.target.value)}
                                        placeholder="Organization Name"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Organization Type</label>
                                    <Input
                                        value={organizationType}
                                        onChange={(e) => setOrganizationType(e.target.value)}
                                        placeholder="e.g. School, Club"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Street Address</label>
                                    <Input
                                        value={street}
                                        onChange={(e) => setStreet(e.target.value)}
                                        placeholder="Street Address"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">City</label>
                                    <Input
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="City"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">State / Province</label>
                                    <Input
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                        placeholder="State"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Zip Code</label>
                                    <Input
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value)}
                                        placeholder="Zip Code"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#78716C] uppercase">Locality</label>
                                    <Input
                                        value={locality}
                                        onChange={(e) => setLocality(e.target.value)}
                                        placeholder="Locality"
                                        className="h-11 border-[#E7E5E4] focus:border-[#D97706] rounded-xl bg-[#FAFAF9] text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end gap-3 pt-5 border-t border-[#E7E5E4]">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 rounded-xl border border-[#E7E5E4] text-sm font-semibold text-[#1A1C1C] hover:bg-[#F3F3F3] transition-all cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#D97706] hover:bg-[#B45309] px-6 py-2.5 text-sm font-bold text-white shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                            >
                                {isUpdating && <Loader2 size={16} className="animate-spin" />}
                                {isUpdating ? "Saving..." : "Save All Changes"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminEditModal;
