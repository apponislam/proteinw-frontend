import StoreHeader from "@/components/store/StoreHeader";
import StoreHeroArea from "@/components/store/StoreHeroArea";
import StoreProducts from "@/components/store/StoreProducts";
import React from "react";

const page = () => {
    return (
        <>
            <StoreHeader />
            <StoreHeroArea />
            <StoreProducts />
        </>
    );
};

export default page;
