import React from "react";
import FundraisingCalculatorLeft from "./FundraisingCalculatorLeft";
import FundraisingSummary from "./FundraisingSummary";

const Fundraisingcalculator = () => {
    return (
        <div className="grid md:grid-cols-2 gap-4">
            <FundraisingCalculatorLeft></FundraisingCalculatorLeft>
            <FundraisingSummary></FundraisingSummary>
        </div>
    );
};

export default Fundraisingcalculator;
