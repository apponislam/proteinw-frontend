import { Home, Users, Settings, BarChart3, Package, CreditCard, ShieldCheck, Store } from "lucide-react";

type MenuItem = {
    title: string;
    url: string;
    icon: any;
};

const superAdminMenu: MenuItem[] = [
    { title: "Dashboard Overview", url: "/dashboard", icon: Home },
    { title: "Admins", url: "/dashboard/admins", icon: Users },
    { title: "Groups", url: "/dashboard/groups", icon: Users },
    { title: "Sellers", url: "/dashboard/sellers", icon: Users },
    { title: "Orders", url: "/dashboard/orders", icon: CreditCard },
    { title: "Products", url: "/dashboard/products", icon: Package },
    { title: "Campaigns", url: "/dashboard/campaigns", icon: BarChart3 },
    { title: "Profit Rules", url: "/dashboard/profit-rules", icon: Settings },
    { title: "Policy Center", url: "/dashboard/policy-center", icon: ShieldCheck },
];

const sellerAdminMenu: MenuItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Team Sales", url: "/dashboard/team-sales", icon: BarChart3 },
    { title: "Storefront", url: "/dashboard/storefront", icon: Store },
    { title: "Orders", url: "/dashboard/orders", icon: CreditCard },
];

const sellerMenu: MenuItem[] = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Orders", url: "/dashboard/orders", icon: CreditCard },
];

export type Role = "SUPER_ADMIN" | "ADMIN" | "SELLER";

export const getMenuByRole = (role: Role): MenuItem[] => {
    switch (role) {
        case "SUPER_ADMIN":
            return superAdminMenu;
        case "ADMIN":
            return sellerAdminMenu;
        case "SELLER":
            return sellerMenu;
        default:
            return [];
    }
};

export default superAdminMenu;
