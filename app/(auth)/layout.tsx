import { Suspense } from "react";
import { AuthRedirectProvider } from "@/providers/AuthRedirectProvider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <AuthRedirectProvider>{children}</AuthRedirectProvider>
        </Suspense>
    );
}
