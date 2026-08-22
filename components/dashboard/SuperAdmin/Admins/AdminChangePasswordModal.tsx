"use client";

import React, { useState } from "react";
import { useUpdateUserBySuperAdminMutation, TAdminStats } from "../../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { X, Loader2, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    admin: TAdminStats | null;
}

const AdminChangePasswordModal: React.FC<AdminChangePasswordModalProps> = ({ isOpen, onClose, admin }) => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [updateUserBySuperAdmin, { isLoading: isUpdating }] = useUpdateUserBySuperAdminMutation();

    if (!isOpen || !admin) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        const toastId = toast.loading(`Updating password for ${admin.name}...`);
        try {
            await updateUserBySuperAdmin({
                userId: admin._id,
                body: { password },
            }).unwrap();

            toast.success("Password changed successfully!", { id: toastId });
            setPassword("");
            setConfirmPassword("");
            onClose();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to change password.", { id: toastId });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
            {/* Backdrop */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-5 sm:p-6 flex flex-col max-h-[90vh] overflow-y-auto my-auto">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#F5F5F4]">
                    <div className="flex items-center gap-2 text-[#D97706]">
                        <KeyRound size={20} />
                        <h2 className="text-lg font-bold text-[#1A1C1C]">Change Password</h2>
                    </div>
                    <button onClick={onClose} className="text-[#78716C] hover:text-[#1A1C1C] cursor-pointer p-1 rounded-lg hover:bg-gray-100 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <p className="text-xs text-[#78716C]">
                        Set a new password for <span className="font-semibold text-[#1A1C1C]">{admin.name}</span> ({admin.email}).
                    </p>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#1A1C1C]">New Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter new password (min 8 chars)"
                            required
                            className="h-11 border-[#F5F5F4] focus:border-[#D97706]"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-medium text-[#1A1C1C]">Confirm New Password</label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Re-enter new password"
                            required
                            className="h-11 border-[#F5F5F4] focus:border-[#D97706]"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F5F5F4]">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-full border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all cursor-pointer">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] px-5 py-2 text-xs font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-70 cursor-pointer"
                        >
                            {isUpdating && <Loader2 size={14} className="animate-spin" />}
                            Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminChangePasswordModal;
