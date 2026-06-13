"use client";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "../ui/sidebar";
import React, { useState } from "react";
import Notifications from "./Notifications";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useGetUnreadCountQuery } from "@/redux/features/contact/contactApi";

const DashBoradHeader = () => {
    const { toggleSidebar } = useSidebar();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    const user = useAppSelector(currentUser);
    const { data: unreadData } = useGetUnreadCountQuery(undefined, {
        skip: !user || user.role !== "SUPER_ADMIN",
    });
    const unreadCount = unreadData?.count || 0;

    return (
        <>
            <div className="bg-white p-4 shadow-[0px_8px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                    <button onClick={toggleSidebar} className="flex items-center justify-center p-2 rounded-none bg-transparent text-[#78716C] hover:text-[#D97706] hover:bg-[#F5F5F4] transition-all duration-200">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-6">
                        {user?.role === "SUPER_ADMIN" && (
                            <>
                                <button onClick={() => setIsNotificationsOpen(true)} className="p-2 rounded-full cursor-pointer hover:bg-[#F5F5F4] transition-all relative">
                                    <Bell className="text-[#A8A29E]" />
                                    {unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />}
                                </button>
                                <div className="w-1 bg-[#F5F5F4] h-8"></div>
                            </>
                        )}
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <h1 className="text-[#1A1C1C] font-bold text-sm">{user?.name || "Erik Sørensen"}</h1>
                                <p className="text-[#A8A29E] text-xs font-semibold uppercase">{user?.role?.replace("_", " ") || "Super Admin"}</p>
                            </div>
                            {user?.profileImage ? (
                                <Image src={user.profileImage} alt="avatar" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow-[2px_8px_14px_0px_rgba(0,0,0,0.05)] object-cover" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-linear-to-r from-[#7C5800] to-[#FFB800] flex items-center justify-center text-white font-bold text-xs shadow-[2px_8px_14px_0px_rgba(0,0,0,0.05)]">{(user?.name || "A").charAt(0).toUpperCase()}</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {user?.role === "SUPER_ADMIN" && (
                <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
            )}
        </>
    );
};

export default DashBoradHeader;
