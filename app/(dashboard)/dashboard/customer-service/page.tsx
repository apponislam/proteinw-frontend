import CustomerServiceTable from "@/components/dashboard/SuperAdmin/CustomerService/CustomerServiceTable";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Customer Service | Dashboard | Kungsbjörnen",
    description: "Hantera returer, byten och reklamationsärenden.",
};

export default function CustomerServiceDashboardPage() {
    return <CustomerServiceTable />;
}
