"use client";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { useSidebar } from "../ui/sidebar";
import React, { useState } from "react";
import Notifications from "./Notifications";

const DashBoradHeader = () => {
    const { toggleSidebar } = useSidebar();
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

    return (
        <>
            <div className="bg-white p-4 shadow-[0px_8px_14px_0px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between">
                    <button onClick={toggleSidebar} className="flex items-center justify-center p-2 rounded-none bg-transparent text-[#78716C] hover:text-[#D97706] hover:bg-[#F5F5F4] transition-all duration-200">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsNotificationsOpen(true)} className="p-2 rounded-full cursor-pointer hover:bg-[#F5F5F4] transition-all">
                            <Bell className="text-[#A8A29E]" />
                        </button>
                        <div className="w-1 bg-[#F5F5F4] h-8"></div>
                        <div className="flex items-center gap-2">
                            <div className="text-right">
                                <h1 className="text-[#1A1C1C] font-bold text-sm">Erik Sørensen</h1>
                                <p className="text-[#A8A29E] text-sm">Super Admin</p>
                            </div>
                            <Image src="/avatar.jpg" alt="avatar" width={40} height={40} className="w-10 h-10 rounded-full border-2 border-white shadow-[2px_8px_14px_0px_rgba(0,0,0,0.05)]" />
                        </div>
                    </div>
                </div>
            </div>
            <Notifications isOpen={isNotificationsOpen} onClose={() => setIsNotificationsOpen(false)} />
        </>
    );
};

export default DashBoradHeader;
