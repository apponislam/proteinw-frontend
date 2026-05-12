import React from "react";
import ProfitRuleHead from "@/components/dashboard/SuperAdmin/Profit-rules/ProfitRuleHead";
import ProfitCards from "@/components/dashboard/SuperAdmin/Profit-rules/ProfitCards";
import RecentAssigned from "@/components/dashboard/SuperAdmin/Profit-rules/RecentAssigned";

const ProfitRulesPage = () => {
    return (
        <div>
            <ProfitRuleHead />
            <ProfitCards />
            <RecentAssigned />
        </div>
    );
};

export default ProfitRulesPage;
