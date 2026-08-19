import React from "react";
import SellerTopSection from "./SellerTopSection";
import GroupCards from "./GroupCards";

const SellerOverview = () => {
    return (
        <div className="space-y-6">
            <SellerTopSection />
            <GroupCards />
        </div>
    );
};

export default SellerOverview;
