import type { Metadata } from "next";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Produkter",
    description: "Utforska Kungsbjörnens populära och lättsålda produkter för klasser och lag",
};

const Page = () => {
    return <ProductsClient />;
};

export default Page;
