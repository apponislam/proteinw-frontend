"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import { useJoinGroupByInvitationCodeMutation } from "@/redux/features/sellerGroup/sellerGroupApi";
import { toast } from "sonner";

export function AuthRedirectProvider({ children }: { children: React.ReactNode }) {
    const user = useAppSelector(currentUser);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isMounted, setIsMounted] = useState(false);
    const [joinGroupByInvitationCode] = useJoinGroupByInvitationCodeMutation();

    const code = searchParams.get("code");

    useEffect(() => {
        setIsMounted(true);
        if (user) {
            if (code) {
                const handleAutoJoin = async () => {
                    const toastId = toast.loading("Joining group with invitation code...");
                    try {
                        await joinGroupByInvitationCode({ code }).unwrap();
                        toast.success("Successfully joined the group!", { id: toastId });
                    } catch (err: any) {
                        toast.error(err?.data?.message || "Failed to join group with code.", { id: toastId });
                    } finally {
                        router.replace("/dashboard");
                    }
                };
                handleAutoJoin();
            } else {
                router.replace("/dashboard");
            }
        }
    }, [user, code, joinGroupByInvitationCode, router]);

    // Show a loading spinner during rehydration or while redirecting logged-in users
    if (!isMounted || user) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-amber-600 border-t-transparent" />
            </div>
        );
    }

    return <>{children}</>;
}
