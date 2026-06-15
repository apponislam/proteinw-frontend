"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

export function ProtectedRouteProvider({ children }: { children: React.ReactNode }) {
    const user = useAppSelector(currentUser);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && !user) {
            router.replace("/auth/login");
        }
    }, [isMounted, user, router]);

    // Show a loading spinner during rehydration or while redirecting unauthenticated users
    if (!isMounted || !user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
            </div>
        );
    }

    return <>{children}</>;
}
