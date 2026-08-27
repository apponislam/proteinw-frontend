import CustomerServiceContent from "@/components/customer-service/CustomerServiceContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kundservice – Retur, Byte & Reklamation | Kungsbjörnen",
    description: "Information om ångerrätt, returer, produktbyten och reklamationer hos Kungsbjörnen.",
};

export default function CustomerServicePage() {
    return <CustomerServiceContent />;
}
