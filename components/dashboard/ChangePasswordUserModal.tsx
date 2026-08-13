"use client";

import React, { useState } from "react";
import { X, Loader2, KeyRound, Eye, EyeOff } from "lucide-react";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

interface ChangePasswordUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChangePasswordUserModal: React.FC<ChangePasswordUserModalProps> = ({ isOpen, onClose }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [changePassword, { isLoading }] = useChangePasswordMutation();

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        const toastId = toast.loading("Updating password...");

        try {
            await changePassword({ currentPassword, newPassword }).unwrap();
            toast.success("Password changed successfully!", { id: toastId });
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to change password", { id: toastId });
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl max-w-md w-full p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                    <X size={20} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-[#1A1C1C]">Change Password</h2>
                    <p className="text-sm text-[#78716C] mt-1">Update your account password for enhanced security</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Current Password */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Current Password</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type={showCurrent ? "text" : "password"}
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]"
                                placeholder="Enter current password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent(!showCurrent)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">New Password</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type={showNew ? "text" : "password"}
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]"
                                placeholder="Enter new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew(!showNew)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm New Password */}
                    <div>
                        <label className="block text-xs font-semibold text-[#78716C] uppercase mb-1">Confirm New Password</label>
                        <div className="relative">
                            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                            <input
                                type={showConfirm ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-2.5 bg-[#FAFAF9] border border-[#E7E5E4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] text-[#1A1C1C]"
                                placeholder="Confirm new password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F5F4]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-semibold text-[#78716C] hover:bg-[#F5F5F4] rounded-lg transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-5 py-2 text-sm font-semibold bg-[#D97706] hover:bg-[#C06A06] text-white rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {isLoading && <Loader2 size={16} className="animate-spin" />}
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordUserModal;
