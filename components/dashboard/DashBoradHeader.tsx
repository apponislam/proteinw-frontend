"use client";
import { Bell, Menu, User, KeyRound, LogOut, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "../ui/sidebar";
import React, { useState, useRef, useEffect } from "react";
import Notifications from "./Notifications";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { currentUser, logOut } from "@/redux/features/auth/authSlice";
import { performFullLogout } from "@/redux/utils/logout";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useGetUnreadCountQuery } from "@/redux/features/contact/contactApi";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UpdateProfileModal from "./UpdateProfileModal";
import ChangePasswordUserModal from "./ChangePasswordUserModal";

const DashBoradHeader = () => {
    const { toggleSidebar } = useSidebar();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Modal States
    const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    const user = useAppSelector(currentUser);
    const [logoutMutation] = useLogoutMutation();

    const { data: unreadData } = useGetUnreadCountQuery(undefined, {
        skip: !user || user.role !== "SUPER_ADMIN",
    });
    const unreadCount = unreadData?.count || 0;

    // Close dropdown on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsDropdownOpen(false);
        const toastId = toast.loading("Logging out...");
        try {
            await logoutMutation().unwrap();
        } catch (err) {
            // Ignore API logout error if token already expired
        } finally {
            performFullLogout();
            toast.success("Logged out successfully", { id: toastId });
            router.push("/auth/login");
        }
    };

    return (
        <>
            <div className="bg-white p-2 shadow-[0px_8px_14px_0px_rgba(0,0,0,0.08)] relative z-30">
                <div className="flex items-center justify-between">
                    <button onClick={toggleSidebar} className="flex items-center justify-center p-2 rounded-none bg-transparent text-[#78716C] hover:text-[#D97706] hover:bg-[#F5F5F4] transition-all duration-200 cursor-pointer">
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-4 sm:gap-6">
                        {user?.role === "SUPER_ADMIN" && (
                            <>
                                <button onClick={() => setIsNotificationsOpen(true)} className="p-2 rounded-full cursor-pointer hover:bg-[#F5F5F4] transition-all relative">
                                    <Bell className="text-[#A8A29E]" />
                                    {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />}
                                </button>
                                <div className="w-px bg-[#E7E5E4] h-8 hidden sm:block"></div>
                            </>
                        )}

                        {/* User Profile & Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <div
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`flex items-center gap-2.5 cursor-pointer px-3 py-1.5 rounded-xl transition-all duration-200 select-none ${isDropdownOpen ? "bg-amber-50 border border-amber-200/60" : "hover:bg-amber-50/70 hover:border hover:border-amber-200/40 border border-transparent"}`}
                            >
                                <div className="text-right hidden sm:block">
                                    <h1 className="text-[#1A1C1C] font-bold text-sm">{user?.name || "User"}</h1>
                                    <p className="text-[#A8A29E] text-xs font-semibold uppercase">{user?.role?.replace("_", " ") || "Admin"}</p>
                                </div>
                                {user?.profileImage ? (
                                    <Image src={user.profileImage} alt="avatar" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow-[2px_8px_14px_0px_rgba(0,0,0,0.05)] object-cover" />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] flex items-center justify-center text-white font-bold text-xs shadow-[2px_8px_14px_0px_rgba(0,0,0,0.05)]">{(user?.name || "A").charAt(0).toUpperCase()}</div>
                                )}
                                <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </div>

                            {/* Custom Compact Styled Dropdown Menu */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-[0px_8px_30px_0px_rgba(0,0,0,0.12)] border border-[#E7E5E4] py-1.5 animate-in fade-in zoom-in-95 duration-150 z-50">
                                    {/* User Info Header Card */}
                                    <div className="px-3 py-2 border-b border-[#F5F5F4] mb-1">
                                        <p className="text-[#1A1C1C] font-bold text-xs truncate">{user?.name || "User"}</p>
                                        <p className="text-[10px] text-[#D97706] font-semibold uppercase mt-0.5">{user?.role?.replace("_", " ") || "Admin"}</p>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="px-1 space-y-0.5">
                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setIsUpdateProfileOpen(true);
                                            }}
                                            className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold text-[#1A1C1C] hover:bg-amber-50 hover:text-[#D97706] flex items-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <User size={14} className="text-[#D97706]" />
                                            <span>Update Profile</span>
                                        </button>

                                        <button
                                            onClick={() => {
                                                setIsDropdownOpen(false);
                                                setIsChangePasswordOpen(true);
                                            }}
                                            className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-semibold text-[#1A1C1C] hover:bg-amber-50 hover:text-[#D97706] flex items-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <KeyRound size={14} className="text-[#D97706]" />
                                            <span>Change Password</span>
                                        </button>
                                    </div>

                                    <div className="my-1 border-t border-[#F5F5F4]"></div>

                                    <div className="px-1">
                                        <button onClick={handleLogout} className="w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-bold text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer">
                                            <LogOut size={14} />
                                            <span>Log Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Panel */}
            {user?.role === "SUPER_ADMIN" && <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />}

            {/* Update Profile Modal */}
            <UpdateProfileModal isOpen={isUpdateProfileOpen} onClose={() => setIsUpdateProfileOpen(false)} />

            {/* Change Password Modal */}
            <ChangePasswordUserModal isOpen={isChangePasswordOpen} onClose={() => setIsChangePasswordOpen(false)} />
        </>
    );
};

export default DashBoradHeader;
