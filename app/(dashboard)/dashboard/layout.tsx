import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <div className="p-4">
                    <SidebarTrigger />
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
