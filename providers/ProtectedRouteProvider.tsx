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

    if (!isMounted) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="relative">
                <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-gray-50/80 backdrop-blur-xs">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
                </div>
                <div className="pointer-events-none opacity-0">{children}</div>
            </div>
        );
    }

    return <>{children}</>;
}
