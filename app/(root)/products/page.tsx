import type { Metadata } from "next";
import ProductsClient from "@/components/products/ProductsClient";

export const metadata: Metadata = {
    title: "Kungsbjörnen - Products",
    description: "Explore Kungsbjörnen's premium products for fundraising",
};

const Page = () => {
    return <ProductsClient />;
};

export default Page;
