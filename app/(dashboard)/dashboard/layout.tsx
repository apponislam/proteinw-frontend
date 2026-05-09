import { AppSidebar } from "@/components/dashboard/app-sidebar";
import DashBoradHeader from "@/components/dashboard/DashBoradHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="bg-[#F9F9F9]">
                <DashBoradHeader></DashBoradHeader>
                <div className="p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
