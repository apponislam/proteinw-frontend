"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
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
        <Sidebar>
            <SidebarHeader className="p-4">
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
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-2">
                            {menuItems.map((item) => {
                                const isActive = item.url === "/dashboard" ? pathname === "/dashboard" || (pathname.startsWith("/dashboard/") && !menuItems.some((i) => i.url !== "/dashboard" && pathname.startsWith(i.url))) : pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title} className={`relative px-5 py-2 transition-colors rounded-none before:absolute before:right-0 before:top-0 before:h-full before:w-1 before:bg-[#D97706] ${isActive ? "bg-[#F5F5F4] text-[#D97706] hover:text-[#D97706] before:block" : "text-[#78716C] hover:bg-[#F5F5F4] hover:text-[#D97706] before:hidden hover:before:block"}`}>
                                        <SidebarMenuButton asChild isActive={isActive} className="bg-transparent! !hover:bg-transparent p-0!">
                                            <Link href={item.url} className="flex items-center gap-2 text-inherit hover:text-inherit">
                                                <item.icon className="text-inherit" />
                                                <span className="text-inherit">{item.title}</span>
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
