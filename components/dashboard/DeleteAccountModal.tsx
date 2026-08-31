"use client";

import React, { useState } from "react";
import { useDeleteAccountMutation } from "@/redux/features/auth/authApi";
import { performFullLogout } from "@/redux/utils/logout";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Trash2, X, Eye, EyeOff, Loader2, AlertTriangle } from "lucide-react";
import { Input } from "../ui/input";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

    if (!isOpen) return null;

    const handleModalClose = () => {
        setPassword("");
        setConfirmPassword("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password.trim()) {
            toast.error("Please enter your password.");
            return;
        }

        if (!confirmPassword.trim()) {
            toast.error("Please confirm your password.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please re-enter matching passwords.");
            return;
        }

        const toastId = toast.loading("Deleting account...");
        try {
            await deleteAccount({ password }).unwrap();
            toast.success("Account deleted successfully", { id: toastId });
            performFullLogout();
            handleModalClose();
            router.push("/auth/login");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to delete account. Please check your password.", { id: toastId });
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-150 space-y-5">
                <button
                    type="button"
                    onClick={handleModalClose}
                    className="cursor-pointer absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-100 border border-red-200 text-red-600 flex items-center justify-center shrink-0">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[#1A1C1C]">Delete Account</h3>
                        <p className="text-xs text-[#78716C]">This action is permanent and cannot be undone.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Password Field 1 */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#78716C] uppercase tracking-wider">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your current password"
                                required
                                className="h-10 border-[#E7E5E4] focus:border-red-500 text-xs pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                            >
                                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Password Field 2 - Confirm Password */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#78716C] uppercase tracking-wider">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Re-enter your password to confirm"
                                required
                                className="h-10 border-[#E7E5E4] focus:border-red-500 text-xs pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                            >
                                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F5F5F4]">
                        <button
                            type="button"
                            onClick={handleModalClose}
                            disabled={isLoading}
                            className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                        >
                            {isLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                            <span>Delete Permanently</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeleteAccountModal;
