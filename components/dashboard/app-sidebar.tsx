"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Home, Users, Settings, BarChart3, Package, CreditCard, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Analytics", url: "/dashboard/analytics", icon: BarChart3 },
    { title: "Products", url: "/dashboard/products", icon: Package },
    { title: "Users", url: "/dashboard/users", icon: Users },
    { title: "Payments", url: "/dashboard/payments", icon: CreditCard },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar className="bg-white">
            <SidebarHeader className="p-4">
                {/* <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">PW</div>
                    <span className="font-semibold text-lg">ProteinW</span>
                </div> */}
                <div className="flex items-center gap-3">
                    <div>
                        <Image src="/dashboard/superadmin/logo.svg" alt="ProteinW" width={40} height={40} />
                    </div>
                    <div>
                        <h1 className="text-[18px] font-bold">Fundraising Pro</h1>
                        <p className="text-[#78716C] text-[10px]">SUPER ADMIN CONSOLE</p>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="p-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
