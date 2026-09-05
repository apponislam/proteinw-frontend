"use client";

import React, { useState } from "react";
import { X, Loader2, User, Phone, MapPin, Briefcase, ChevronDown, Check } from "lucide-react";
import { useUpdateProfileMutation, useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, currentToken, UserProfession } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

interface UpdateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const professionOptions: { label: string; value: UserProfession }[] = [
    { label: "Leader", value: "LEADER" },
    { label: "Teacher", value: "TEACHER" },
    { label: "Parent", value: "PARENT" },
    { label: "Coach", value: "COACH" },
];

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(currentToken);
    const { data: meData, refetch } = useGetMeQuery(undefined, { skip: !isOpen });
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    console.log(meData);

    const me = (meData as any)?.data || meData;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [profession, setProfession] = useState<UserProfession | "">("");
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [street, setStreet] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [locality, setLocality] = useState("");

    const [isProfDropdownOpen, setIsProfDropdownOpen] = useState(false);

    // Populate form when modal opens or meData loads
    React.useEffect(() => {
        if (me) {
            setName(me.name || "");
            setPhone(me.phone || "");
            setProfession(me.profession || "");

            let parsedAddress: any = me.address;
            if (typeof me.address === "string") {
                try {
                    parsedAddress = JSON.parse(me.address);
                } catch {
                    parsedAddress = {};
                }
            }

            setOrganizationName(parsedAddress?.organizationName || "");
            setOrganizationType(parsedAddress?.organizationType || "");
            setStreet(parsedAddress?.street || "");
            setCity(parsedAddress?.city || "");
            setState(parsedAddress?.state || "");
            setZipCode(parsedAddress?.zipCode || "");
            setLocality(parsedAddress?.locality || "");
        }
    }, [me, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const toastId = toast.loading("Updating profile...");

        try {
            const formData = new FormData();
            formData.append("name", name);
            if (phone) formData.append("phone", phone);
            if (profession) formData.append("profession", profession);

            let existingAddressObj: any = {};
            if (typeof me?.address === "string") {
                try {
                    existingAddressObj = JSON.parse(me.address);
                } catch {
                    existingAddressObj = {};
                }
            } else if (me?.address && typeof me.address === "object") {
                existingAddressObj = me.address;
            }

            const addressObj = {
                ...existingAddressObj,
                ...(organizationName && { organizationName }),
                ...(organizationType && { organizationType }),
                street,
                city,
                state,
                zipCode,
                locality,
            };
            formData.append("address", JSON.stringify(addressObj));

            const res = await updateProfile(formData).unwrap();

            if (res?.data && token) {
                dispatch(setUser({ user: res.data, token }));
            }

            refetch();
            toast.success("Profile updated successfully!", { id: toastId });
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update profile", { id: toastId });
        }
    };

    const selectedProfLabel = professionOptions.find((opt) => opt.value === profession)?.label;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Update Profile</h2>
                    <p className="text-sm text-[#78716C] mt-1">Manage your account information and preferences</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Enter full name" />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Enter phone number" />
                        </div>
                    </div>

                    {/* Profession Section (Hidden for SELLER and SUPER_ADMIN roles) */}
                    {me?.role !== "SELLER" && me?.role !== "SUPER_ADMIN" && (
                        <div>
                            <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Profession</label>
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsProfDropdownOpen((prev) => !prev)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm flex items-center justify-between text-left focus:outline-none focus:border-[#D97706] text-[#1A1C1C] cursor-pointer transition-colors"
                                >
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <span className={selectedProfLabel ? "text-[#1A1C1C] font-medium" : "text-gray-400"}>{selectedProfLabel || "Select Profession"}</span>
                                    <ChevronDown size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isProfDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isProfDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-20" onClick={() => setIsProfDropdownOpen(false)}></div>
                                        <div className="absolute left-0 right-0 mt-1.5 z-30 bg-white rounded-xl shadow-xl border border-[#E7E5E4] py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfession("");
                                                    setIsProfDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left cursor-pointer hover:bg-amber-50/60 ${!profession ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-600"}`}
                                            >
                                                <span>Select Profession</span>
                                                {!profession && <Check size={14} className="text-[#D97706]" />}
                                            </button>
                                            {professionOptions.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setProfession(opt.value);
                                                        setIsProfDropdownOpen(false);
                                                    }}
                                                    className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left cursor-pointer hover:bg-amber-50/60 ${profession === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                                >
                                                    <span>{opt.label}</span>
                                                    {profession === opt.value && <Check size={14} className="text-[#D97706]" />}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Address Section */}
                    <div className="pt-2 border-t border-[#F5F5F4]">
                        <h4 className="text-xs font-bold text-[#1A1C1C] uppercase mb-3 flex items-center gap-1.5">
                            <MapPin size={14} className="text-[#D97706]" /> Address Details
                        </h4>

                        <div className="space-y-3">
                            {me?.role !== "SELLER" && me?.role !== "SUPER_ADMIN" && (
                                <div className="grid grid-cols-2 gap-3">
                                    <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Organization Name" />
                                    <input type="text" value={organizationType} onChange={(e) => setOrganizationType(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Organization Type" />
                                </div>
                            )}

                            <div>
                                <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Street Address" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="City" />
                                <input type="text" value={state} onChange={(e) => setState(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="State / Region" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Zip / Postal Code" />
                                <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Locality" />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F5F4]">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#78716C] hover:bg-[#F5F5F4] rounded-lg transition-colors cursor-pointer">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="px-5 py-2 text-sm font-semibold bg-[#D97706] hover:bg-[#C06A06] text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50">
                            {isLoading && <Loader2 size={16} className="animate-spin" />}
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
