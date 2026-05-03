// import React from "react";

// const steps = [
//     {
//         number: "1",
//         title: "Choose Products",
//         description: "Select your favorite premium items from our curated Nordic archive.",
//     },
//     {
//         number: "2",
//         title: "Sell & Track",
//         description: "Use our simple digital tools to collect orders and monitor your progress live.",
//     },
//     {
//         number: "3",
//         title: "Receive Profit",
//         description: "Get up to 50% profit delivered directly to your group. It's that easy.",
//     },
// ];

// const StepsSection = () => {
//     return (
//         <section className="py-24 bg-[#EEEEEE]">
//             <div className="container mx-auto px-6">
//                 {/* Header */}
//                 <div className="text-center mb-20">
//                     <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Simple 3-Step Success</h2>
//                     <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We've removed the friction from fundraising so you can focus on your goals.</p>
//                 </div>

//                 {/* Steps */}
//                 <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12">
//                     {/* Background big numbers */}
//                     <div className="absolute inset-0 flex items-center justify-between px-10 pointer-events-none">
//                         <span className="text-[220px] font-extrabold text-white">1</span>
//                         <span className="text-[220px] font-extrabold text-white">2</span>
//                         <span className="text-[220px] font-extrabold text-white">3</span>
//                     </div>

//                     {/* Foreground cards */}
//                     {steps.map((step) => (
//                         <div key={step.number} className="relative z-10 flex flex-col items-center text-center">
//                             {/* 96x96 box */}
//                             <div className="w-24 h-24 bg-white border-4  border-[#EEEEEE] rounded-full flex items-center justify-center shadow-sm">
//                                 <span className="text-4xl font-bold text-[#EFAC02]">{step.number}</span>
//                             </div>

//                             <h3 className="text-xl font-bold text-gray-900 mt-6 mb-2">{step.title}</h3>

//                             <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default StepsSection;

import React from "react";

const steps = [
    {
        number: "1",
        title: "Choose Products",
        description: "Select your favorite premium items from our curated Nordic archive.",
    },
    {
        number: "2",
        title: "Sell & Track",
        description: "Use our simple digital tools to collect orders and monitor your progress live.",
    },
    {
        number: "3",
        title: "Receive Profit",
        description: "Get up to 50% profit delivered directly to your group. It's that easy.",
    },
];

const StepsSection = () => {
    return (
        <section className="py-24 bg-[#EEEEEE]">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Simple 3-Step Success</h2>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">We&apos;ve removed the friction from fundraising so you can focus on your goals.</p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {steps.map((step) => (
                        <div key={step.number} className="relative group flex flex-col items-center text-center">
                            {/* BACK NUMBER (now per card) */}
                            <span className="absolute -top-10 left-0 md:left-12.5 text-[220px] font-extrabold text-white transition-colors duration-300 group-hover:text-[#EFAC02]/20 pointer-events-none">{step.number}</span>
                            {/* 96x96 box */}
                            <div className="w-24 h-24 bg-white border-4 border-[#EEEEEE] rounded-full flex items-center justify-center shadow-sm relative z-10 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-4xl font-bold text-[#EFAC02]">{step.number}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-2 relative z-10">{step.title}</h3>

                            <p className="text-gray-600 text-sm max-w-xs relative z-10">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;
