import SupportPage from "@/components/about-us/SupportPage";
import SupportPageTop from "@/components/about-us/SupportPageTop";
import React from "react";

const page = () => {
    return (
        <div className="py-10 md:py-24 bg-[#F3F3F3] flex flex-col gap-16">
            <SupportPageTop></SupportPageTop>
            <SupportPage></SupportPage>
        </div>
    );
};

export default page;
