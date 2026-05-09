import { Bell } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import Image from "next/image";

const DashBoradHeader = () => {
    return (
        <div className="bg-white p-4 shadow-[0px_8px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex items-center justify-between">
                <SidebarTrigger />
                <div className="flex items-center gap-6">
                    <Bell className="text-[#A8A29E]" />
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
    );
};

export default DashBoradHeader;
