import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashBoradHeader from "@/components/dashboard/DashBoradHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RoleProvider } from "@/components/dashboard/RoleProvider";
import { ProtectedRouteProvider } from "@/providers/ProtectedRouteProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedRouteProvider>
            <RoleProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset className="bg-[#F9F9F9] min-w-0 overflow-hidden">
                        <DashBoradHeader></DashBoradHeader>
                        <div className="p-3 md:p-6 overflow-x-auto min-w-0">{children}</div>
                    </SidebarInset>
                </SidebarProvider>
            </RoleProvider>
        </ProtectedRouteProvider>
    );
}
