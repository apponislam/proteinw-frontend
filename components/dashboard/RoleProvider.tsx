"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Role } from "@/utils/menuItems";

import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

interface RoleContextType {
    activeRole: Role;
    setActiveRole: (role: Role) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
    const user = useAppSelector(currentUser);
    const [activeRole, setActiveRoleState] = useState<Role>("SELLER");

    useEffect(() => {
        if (user?.role) {
            setActiveRoleState(user.role);
        }
    }, [user]);

    const setActiveRole = (role: Role) => {
        setActiveRoleState(role);
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
