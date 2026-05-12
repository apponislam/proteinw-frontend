import React from "react";
import SellerAdminHomeCards from "./SellerAdminHomeCards";
import SellerAdminFundraisingTarget from "./SellerAdminFundraisingTarget";

const SellerAdminOverview = () => {
    return (
        <div>
            <div>
                <h1 className="text-5xl text-[#1A1C1C] mb-3">COORDINATOR DASHBOARD</h1>
                <h2 className="text-4xl text-[#1A1C1C] mb-3">Welcome back, Erik!</h2>
                <p className="text-[#78716C] text-lg">Your Class 2024 campaign is active and performing well.</p>
            </div>
            <SellerAdminHomeCards />
            <SellerAdminFundraisingTarget />
        </div>
    );
};

export default SellerAdminOverview;
