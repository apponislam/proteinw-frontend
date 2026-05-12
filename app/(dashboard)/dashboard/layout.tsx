import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashBoradHeader from "@/components/dashboard/DashBoradHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RoleProvider } from "@/components/dashboard/RoleProvider";
import RoleSwitcher from "@/components/dashboard/RoleSwitcher";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RoleProvider>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="bg-[#F9F9F9]">
                    <DashBoradHeader></DashBoradHeader>
                    <div className="p-6">{children}</div>
                </SidebarInset>
                <RoleSwitcher />
            </SidebarProvider>
        </RoleProvider>
    );
}
