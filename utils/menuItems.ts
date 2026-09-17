import { Home, Users, Settings, BarChart3, Package, CreditCard, ShieldCheck, Store, Headphones } from "lucide-react";

type MenuItem = {
    title: string;
    url: string;
    icon: any;
};

const superAdminMenu: MenuItem[] = [
    { title: "Instrumentpanel", url: "/dashboard", icon: Home },
    { title: "Administratörer", url: "/dashboard/admins", icon: Users },
    { title: "Grupper", url: "/dashboard/groups", icon: Users },
    { title: "Säljare", url: "/dashboard/sellers", icon: Users },
    { title: "Beställningar", url: "/dashboard/orders", icon: CreditCard },
    { title: "Produkter", url: "/dashboard/products", icon: Package },
    { title: "Försäljning", url: "/dashboard/campaigns", icon: BarChart3 },
    { title: "Vinstregler", url: "/dashboard/profit-rules", icon: Settings },
    { title: "Policycenter", url: "/dashboard/policy-center", icon: ShieldCheck },
    { title: "Kundtjänst", url: "/dashboard/customer-service", icon: Headphones },
];

const sellerAdminMenu: MenuItem[] = [
    { title: "Instrumentpanel", url: "/dashboard", icon: Home },
    { title: "Lagförsäljning", url: "/dashboard/team-sales", icon: BarChart3 },
    { title: "Butikssida", url: "/dashboard/storefront", icon: Store },
    { title: "Beställningar", url: "/dashboard/orders", icon: CreditCard },
];

const sellerMenu: MenuItem[] = [
    { title: "Instrumentpanel", url: "/dashboard", icon: Home },
    { title: "Beställningar", url: "/dashboard/orders", icon: CreditCard },
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
