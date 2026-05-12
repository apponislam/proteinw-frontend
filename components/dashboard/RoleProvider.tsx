"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Role } from "@/utils/menuItems";

interface RoleContextType {
    activeRole: Role;
    setActiveRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const STORAGE_KEY = "active-role";
const validRoles: Role[] = ["SUPER_ADMIN", "SELLER_ADMIN", "SELLER"];

function isValidRole(role: any): role is Role {
    return validRoles.includes(role);
}

export function RoleProvider({ children }: { children: ReactNode }) {
    const [activeRole, setActiveRoleState] = useState<Role>("SUPER_ADMIN");

    useEffect(() => {
        const savedRole = localStorage.getItem(STORAGE_KEY);
        if (savedRole && isValidRole(savedRole)) {
            setActiveRoleState(savedRole);
        }
    }, []);

    const setActiveRole = (role: Role) => {
        setActiveRoleState(role);
        localStorage.setItem(STORAGE_KEY, role);
    };

    return (
        <RoleContext.Provider value={{ activeRole, setActiveRole }}>
            {children}
        </RoleContext.Provider>
    );
}

export function useRole() {
    const context = useContext(RoleContext);
    if (context === undefined) {
        throw new Error("useRole must be used within a RoleProvider");
    }
    return context;
}
