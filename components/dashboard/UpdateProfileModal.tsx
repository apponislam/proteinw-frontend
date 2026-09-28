"use client";

import React, { useState } from "react";
import { X, Loader2, User, Phone, MapPin, Briefcase, ChevronDown, Check } from "lucide-react";
import { useUpdateProfileMutation, useGetMeQuery } from "@/redux/features/auth/authApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setUser, currentToken, currentUser, UserProfession } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";

interface UpdateProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const professionOptions: { label: string; value: UserProfession }[] = [
    { label: "Ledare", value: "LEADER" },
    { label: "Lärare", value: "TEACHER" },
    { label: "Förälder", value: "PARENT" },
    { label: "Tränare", value: "COACH" },
];

const organizationTypeOptions = ["Skola", "Gymnasium", "Förening", "Annat"];

const UpdateProfileModal: React.FC<UpdateProfileModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(currentToken);
    const reduxUser = useAppSelector(currentUser);
    const { data: meData, refetch } = useGetMeQuery(undefined, { skip: !isOpen });
    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    const me = (meData as any)?.data || meData || reduxUser;

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
    const [isOrgTypeDropdownOpen, setIsOrgTypeDropdownOpen] = useState(false);

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
        const toastId = toast.loading("Uppdaterar profil...");

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
                organizationName,
                organizationType,
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
            toast.success("Profilen uppdaterades framgångsrikt!", { id: toastId });
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Det gick inte att uppdatera profilen.", { id: toastId });
        }
    };

    const selectedProfLabel = professionOptions.find((opt) => opt.value === profession)?.label;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs overflow-y-auto">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-auto overflow-visible">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer z-10">
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Uppdatera profil</h2>
                    <p className="text-sm text-[#78716C] mt-1">Hantera dina kontouppgifter och inställningar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Fullständigt namn</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Ange fullständigt namn" />
                        </div>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Telefonnummer</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Ange telefonnummer" />
                        </div>
                    </div>

                    {/* Profession Section (Hidden for SELLER and SUPER_ADMIN roles) */}
                    {me?.role !== "SELLER" && me?.role !== "SUPER_ADMIN" && (
                        <div>
                            <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Yrke / Roll</label>
                            <div className={`relative ${isProfDropdownOpen ? "z-40" : "z-10"}`}>
                                <button
                                    type="button"
                                    onClick={() => setIsProfDropdownOpen((prev) => !prev)}
                                    className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm flex items-center justify-between text-left focus:outline-none focus:border-[#D97706] text-[#1A1C1C] cursor-pointer transition-colors"
                                >
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                    <span className={selectedProfLabel ? "text-[#1A1C1C] font-medium" : "text-gray-400"}>{selectedProfLabel || "Välj yrke / roll"}</span>
                                    <ChevronDown size={16} className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 ${isProfDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isProfDropdownOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setIsProfDropdownOpen(false)}></div>
                                        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white rounded-xl shadow-2xl border border-[#E7E5E4] py-1.5 overflow-hidden max-h-56 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setProfession("");
                                                    setIsProfDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left cursor-pointer hover:bg-amber-50/60 ${!profession ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-600"}`}
                                            >
                                                <span>Välj yrke / roll</span>
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
                            <MapPin size={14} className="text-[#D97706]" /> Adress- och organisationsuppgifter
                        </h4>

                        <div className="space-y-3">
                            {me?.role !== "SUPER_ADMIN" && (
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Left: Organization Type Selection */}
                                    <div className={`relative ${isOrgTypeDropdownOpen ? "z-40" : "z-10"}`}>
                                        <button
                                            type="button"
                                            onClick={() => setIsOrgTypeDropdownOpen((prev) => !prev)}
                                            className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm flex items-center justify-between text-left focus:outline-none focus:border-[#D97706] text-[#1A1C1C] cursor-pointer transition-colors"
                                        >
                                            <span className={organizationType ? "text-[#1A1C1C] font-medium truncate" : "text-gray-400 truncate"}>{organizationType || "Välj typ"}</span>
                                            <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform duration-200 ${isOrgTypeDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {isOrgTypeDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-40" onClick={() => setIsOrgTypeDropdownOpen(false)}></div>
                                                <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white rounded-xl shadow-2xl border border-[#E7E5E4] py-1.5 max-h-52 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setOrganizationType("");
                                                            setIsOrgTypeDropdownOpen(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left cursor-pointer hover:bg-amber-50/60 ${!organizationType ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-600"}`}
                                                    >
                                                        <span>Välj typ</span>
                                                        {!organizationType && <Check size={14} className="text-[#D97706]" />}
                                                    </button>
                                                    {organizationTypeOptions.map((opt) => (
                                                        <button
                                                            key={opt}
                                                            type="button"
                                                            onClick={() => {
                                                                setOrganizationType(opt);
                                                                setIsOrgTypeDropdownOpen(false);
                                                            }}
                                                            className={`w-full flex items-center justify-between px-4 py-2 text-xs font-medium text-left cursor-pointer hover:bg-amber-50/60 ${organizationType === opt ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                                        >
                                                            <span>{opt}</span>
                                                            {organizationType === opt && <Check size={14} className="text-[#D97706]" />}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    {/* Right: Organization Name Input */}
                                    <div>
                                        {(() => {
                                            let placeholder = "Organisationsnamn";
                                            if (organizationType === "Skola") placeholder = "Skolnamn";
                                            else if (organizationType === "Gymnasium") placeholder = "Gymnasienamn";
                                            else if (organizationType === "Förening") placeholder = "Föreningsnamn";
                                            else if (organizationType === "Annat") placeholder = "Organisationsnamn";

                                            return <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder={placeholder} />;
                                        })()}
                                    </div>
                                </div>
                            )}

                            {me?.role !== "SELLER" && (
                                <>
                                    <div>
                                        <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Gatuadress" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Postnummer" />
                                        <input type="text" value={locality} onChange={(e) => setLocality(e.target.value)} className="w-full px-3 py-2 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]" placeholder="Ort" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F5F4]">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-semibold text-[#78716C] hover:bg-[#F5F5F4] rounded-lg transition-colors cursor-pointer">
                            Avbryt
                        </button>
                        <button type="submit" disabled={isLoading} className="px-5 py-2 text-sm font-semibold bg-[#D97706] hover:bg-[#C06A06] text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50">
                            {isLoading && <Loader2 size={16} className="animate-spin" />}
                            Spara ändringar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfileModal;
