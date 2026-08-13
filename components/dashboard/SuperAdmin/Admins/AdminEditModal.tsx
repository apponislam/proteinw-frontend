"use client";

import React, { useState, useEffect } from "react";
import { useUpdateUserBySuperAdminMutation, TAdminStats } from "../../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminEditModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: TAdminStats | null;
}

const AdminEditModal: React.FC<AdminEditModalProps> = ({ isOpen, onClose, admin }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
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

    const [updateUserBySuperAdmin, { isLoading: isUpdating }] = useUpdateUserBySuperAdminMutation();

    useEffect(() => {
        if (admin) {
            setName(admin.name || "");
            setEmail(admin.email || "");
            setPhone((admin as any).phone || "");
            setProfession((admin as any).profession || "");
            setGoal((admin as any).goal ?? "");

            const addr = (admin as any).address || {};
            setOrganizationName(addr.organizationName || "");
            setOrganizationType(addr.organizationType || "");
            setStreet(addr.street || "");
            setCity(addr.city || "");
            setState(addr.state || "");
            setZipCode(addr.zipCode || "");
            setCountry(addr.country || "");
        }
    }, [admin]);

    if (!isOpen || !admin) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const toastId = toast.loading("Updating admin details...");
        try {
            const bodyObj: Record<string, any> = {};
            if (name) bodyObj.name = name;
            if (email) bodyObj.email = email;
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
                        <p className="text-xs text-[#78716C] mt-0.5">Update full profile information based on user model</p>
                    </div>
                    <button onClick={onClose} className="text-[#78716C] hover:text-[#1A1C1C] cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1">
                    {/* Basic Info */}
                    <div>
                        <h4 className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-3">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#1A1C1C]">Full Name</label>
                                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#1A1C1C]">Email Address</label>
                                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#1A1C1C]">Phone Number</label>
                                <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="h-11 border-[#F5F5F4] focus:border-[#D97706]" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-[#1A1C1C]">Profession</label>
                                <select value={profession} onChange={(e) => setProfession(e.target.value)} className="w-full h-11 px-3 border border-[#F5F5F4] rounded-md text-sm focus:outline-none focus:border-[#D97706] bg-white text-[#1A1C1C]">
                                    <option value="">Select Profession</option>
                                    <option value="LEADER">Leader</option>
                                    <option value="TEACHER">Teacher</option>
                                    <option value="PARENT">Parent</option>
                                    <option value="COACH">Coach</option>
                                </select>
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
            </div>
        </div>
    );
};

export default AdminEditModal;
