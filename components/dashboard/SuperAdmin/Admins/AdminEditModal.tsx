"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGetUserByIdQuery, useUpdateUserBySuperAdminMutation, TAdminStats } from "../../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { X, Loader2, ChevronDown, Check } from "lucide-react";
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
    const [goal, setGoal] = useState<number | "">("");

    // Address fields
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [country, setCountry] = useState("");

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
            setGoal((fetchedUser as any).goal ?? "");

            const addr = (fetchedUser as any).address || {};
            setOrganizationName(addr.organizationName || "");
            setOrganizationType(addr.organizationType || "");
            setStreet(addr.street || "");
            setCity(addr.city || "");
            setState(addr.state || "");
            setZipCode(addr.zipCode || "");
            setCountry(addr.country || "");
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
            if (goal !== "") bodyObj.goal = Number(goal);

            const addressObj: Record<string, string> = {};
            if (organizationName) addressObj.organizationName = organizationName;
            if (organizationType) addressObj.organizationType = organizationType;
            if (street) addressObj.street = street;
            if (city) addressObj.city = city;
            if (state) addressObj.state = state;
            if (zipCode) addressObj.zipCode = zipCode;
            if (country) addressObj.country = country;

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#F5F5F4]">
                    <div>
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Edit Admin Details</h2>
                        <p className="text-xs text-[#78716C] mt-0.5">Update profile information for {admin.name}</p>
                    </div>
                    <button onClick={onClose} className="text-[#78716C] hover:text-[#1A1C1C] cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                {isFetchingUser ? (
                    <div className="p-12 flex items-center justify-center text-[#78716C] gap-2">
                        <Loader2 className="animate-spin" size={20} />
                        <span>Loading user details...</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
                        {/* Basic Info */}
                        <div>
                            <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-3">Basic Information</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Full Name</label>
                                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Phone Number</label>
                                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>

                                {/* Custom Profession Dropdown */}
                                <div className="space-y-1.5 relative" ref={dropdownRef}>
                                    <label className="text-sm font-medium text-[#1A1C1C]">Profession</label>
                                    <button
                                        type="button"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="w-full h-11 px-3 border border-[#F5F5F4] rounded-md text-sm bg-white text-[#1A1C1C] flex items-center justify-between hover:border-[#D97706] focus:outline-none focus:border-[#D97706] transition-colors cursor-pointer"
                                    >
                                        <span className={selectedProfessionLabel ? "text-[#1A1C1C]" : "text-[#78716C]"}>{selectedProfessionLabel || "Select Profession"}</span>
                                        <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-[#F5F5F4] rounded-lg shadow-lg z-20 py-1 overflow-hidden transition-all animate-in fade-in duration-150">
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
                                                        className={`w-full px-4 py-2.5 text-left text-sm flex items-center justify-between cursor-pointer transition-colors ${isSelected ? "bg-amber-50 text-[#D97706] font-semibold" : "text-[#1A1C1C] hover:bg-[#FAFAF9]"}`}
                                                    >
                                                        <span>{p.label}</span>
                                                        {isSelected && <Check size={16} className="text-[#D97706]" />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Sales Goal ($)</label>
                                    <Input type="number" value={goal} onChange={(e) => setGoal(e.target.value === "" ? "" : Number(e.target.value))} placeholder="Sales Goal" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                            </div>
                        </div>

                        {/* Organization & Address Details */}
                        <div>
                            <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-3">Organization & Address</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Organization Name</label>
                                    <Input value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} placeholder="Organization Name" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Organization Type</label>
                                    <Input value={organizationType} onChange={(e) => setOrganizationType(e.target.value)} placeholder="e.g. School, Club" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5 md:col-span-2">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Street Address</label>
                                    <Input value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street Address" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">City</label>
                                    <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">State / Province</label>
                                    <Input value={state} onChange={(e) => setState(e.target.value)} placeholder="State" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Zip Code</label>
                                    <Input value={zipCode} onChange={(e) => setZipCode(e.target.value)} placeholder="Zip Code" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-sm font-medium text-[#1A1C1C]">Country</label>
                                    <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F5F4]">
                            <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-full border border-gray-300 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-70 cursor-pointer"
                            >
                                {isUpdating && <Loader2 size={16} className="animate-spin" />}
                                Save All Changes
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default AdminEditModal;
