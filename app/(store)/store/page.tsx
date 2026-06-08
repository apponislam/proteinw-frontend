import StoreHeader from "@/components/store/StoreHeader";
import StoreHeroArea from "@/components/store/StoreHeroArea";
import StoreOrder from "@/components/store/StoreOrder";
import StoreProducts from "@/components/store/StoreProducts";
import React from "react";

const page = () => {
    return (
        <>
            <StoreHeader />
            <StoreHeroArea />
            <StoreProducts />
            <StoreOrder />
        </>
    );
};

export default page;
