"use client";

import { useState } from "react";
import { useRole } from "./RoleProvider";
import type { Role } from "@/utils/menuItems";

const roleLabels: Record<Role, string> = {
    SUPER_ADMIN: "Super Admin",
    SELLER_ADMIN: "Seller Admin",
    SELLER: "Seller",
};

const roles: Role[] = ["SUPER_ADMIN", "SELLER_ADMIN", "SELLER"];

export default function RoleSwitcher() {
    const { activeRole, setActiveRole } = useRole();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen && (
                <>
                    <div className="fixed inset-0" onClick={() => setIsOpen(false)}></div>
                    <div className="absolute bottom-full right-0 mb-3 w-48 bg-white rounded-lg shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] overflow-hidden">
                        {roles.map((role) => (
                            <button
                                key={role}
                                onClick={() => {
                                    setActiveRole(role);
                                    setIsOpen(false);
                                }}
                                className={`w-full px-4 py-3 text-left hover:bg-[#F5F5F4] transition-all ${activeRole === role ? "bg-[#F5F5F4] text-[#D97706]" : "text-[#1A1C1C]"}`}
                            >
                                {roleLabels[role]}
                            </button>
                        ))}
                    </div>
                </>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#D97706] text-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:bg-[#B45309] transition-all">
                <span className="font-medium">{roleLabels[activeRole]}</span>
            </button>
        </div>
    );
}
