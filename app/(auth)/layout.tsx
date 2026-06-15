import { AuthRedirectProvider } from "@/providers/AuthRedirectProvider";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <AuthRedirectProvider>{children}</AuthRedirectProvider>;
}

