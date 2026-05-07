// "use client";

// import { useMemo, useState } from "react";

// export default function FundraisingCalculatorLeft() {
//     const [targetProfit, setTargetProfit] = useState(15000);
//     const [students, setStudents] = useState(26);

//     const packagePrice = 180;

//     const calculation = useMemo(() => {
//         let profitPercent = 40;

//         const estimatedPackages = Math.ceil(targetProfit / ((packagePrice * profitPercent) / 100));

//         if (estimatedPackages >= 150 && estimatedPackages < 225) {
//             profitPercent = 45;
//         }

//         if (estimatedPackages >= 225) {
//             profitPercent = 50;
//         }

//         const finalPackages = Math.ceil(targetProfit / ((packagePrice * profitPercent) / 100));

//         const profitPerPackage = (packagePrice * profitPercent) / 100;

//         return {
//             profitPercent,
//             finalPackages,
//             profitPerPackage,
//             perStudent: Math.ceil(finalPackages / students),
//         };
//     }, [targetProfit, students]);

//     return (
//         <div className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">
//             <div className="grid gap-10 lg:grid-cols-2">
//                 {/* LEFT */}
//                 <div className="space-y-8">
//                     {/* TARGET PROFIT */}
//                     <div>
//                         <div className="mb-3 flex items-center justify-between">
//                             <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Target Profit (SEK)</h3>

//                             <span className="text-3xl font-bold text-zinc-900">{targetProfit.toLocaleString()} kr</span>
//                         </div>

//                         <input type="range" min={1} max={80000} value={targetProfit} onChange={(e) => setTargetProfit(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-black" />

//                         <div className="mt-2 flex justify-between text-sm text-zinc-500">
//                             <span>1 KR</span>
//                             <span>40,000 KR</span>
//                             <span>80,000 KR</span>
//                         </div>
//                     </div>

//                     {/* STUDENTS */}
//                     <div>
//                         <div className="mb-3 flex items-center justify-between">
//                             <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Number of Students</h3>

//                             <span className="text-3xl font-bold text-zinc-900">{students} members</span>
//                         </div>

//                         <input type="range" min={1} max={80} value={students} onChange={(e) => setStudents(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-black" />

//                         <div className="mt-2 flex justify-between text-sm text-zinc-500">
//                             <span>1 PERSON</span>
//                             <span>40 PEOPLE</span>
//                             <span>80 PEOPLE</span>
//                         </div>
//                     </div>

//                     {/* INFO */}
//                     <div className="rounded-2xl bg-zinc-100 p-5">
//                         <p className="text-lg font-semibold text-zinc-900">Price per package: {packagePrice} SEK</p>

//                         <div className="mt-4 space-y-2 text-sm text-zinc-600">
//                             <div className="flex justify-between">
//                                 <span>0 - 149 pkgs</span>
//                                 <span>40% Profit</span>
//                             </div>

//                             <div className="flex justify-between">
//                                 <span>150 - 224 pkgs</span>
//                                 <span>45% Profit</span>
//                             </div>

//                             <div className="flex justify-between">
//                                 <span>225+ pkgs</span>
//                                 <span>50% Profit</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* RIGHT */}
//                 <div className="flex flex-col justify-between rounded-3xl bg-black p-8 text-white">
//                     <div>
//                         <p className="text-sm uppercase tracking-[0.2em] text-zinc-400">Estimated Result</p>

//                         <div className="mt-8 space-y-6">
//                             <div>
//                                 <p className="text-sm text-zinc-400">Required Packages</p>

//                                 <h2 className="text-5xl font-bold">{calculation.finalPackages}</h2>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-zinc-400">Profit Margin</p>

//                                 <h2 className="text-4xl font-bold">{calculation.profitPercent}%</h2>
//                             </div>

//                             <div>
//                                 <p className="text-sm text-zinc-400">Packages per Student</p>

//                                 <h2 className="text-4xl font-bold">{calculation.perStudent}</h2>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="mt-10">
//                         <h3 className="text-3xl font-bold">Ready to start?</h3>

//                         <button className="mt-5 w-full rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-black transition hover:scale-[1.02]">Start Fundraising Now</button>

//                         <p className="mt-3 text-sm text-zinc-400">Takes less than 2 minutes to set up.</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

"use client";

import { useState } from "react";

export default function FundraisingCalculatorLeft() {
    const [targetProfit, setTargetProfit] = useState(15000);
    const [students, setStudents] = useState(26);

    const packagePrice = 180;

    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl">
                <div className="space-y-10">
                    {/* TARGET PROFIT */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">TARGET PROFIT (SEK)</h3>

                            <span className="text-3xl font-bold text-zinc-900">{targetProfit.toLocaleString()} kr</span>
                        </div>

                        <input type="range" min={1} max={80000} value={targetProfit} onChange={(e) => setTargetProfit(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-black" />

                        <div className="mt-2 flex justify-between text-sm text-zinc-500">
                            <span>1 KR</span>
                            <span>40,000 KR</span>
                            <span>80,000 KR</span>
                        </div>
                    </div>

                    {/* STUDENTS */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">NUMBER OF STUDENTS</h3>

                            <span className="text-3xl font-bold text-zinc-900">{students} members</span>
                        </div>

                        <input type="range" min={1} max={80} value={students} onChange={(e) => setStudents(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-black" />

                        <div className="mt-2 flex justify-between text-sm text-zinc-500">
                            <span>1 PERSON</span>
                            <span>40 PEOPLE</span>
                            <span>80 PEOPLE</span>
                        </div>
                    </div>

                    {/* PACKAGE INFO */}
                    <div className="rounded-2xl bg-zinc-100 p-5">
                        <p className="text-lg font-semibold text-zinc-900">Price per package: {packagePrice} SEK</p>

                        <div className="mt-4 space-y-2 text-sm text-zinc-600">
                            <div className="flex justify-between">
                                <span>0 - 149 pkgs</span>
                                <span>40% Profit</span>
                            </div>

                            <div className="flex justify-between">
                                <span>150 - 224 pkgs</span>
                                <span>45% Profit</span>
                            </div>

                            <div className="flex justify-between">
                                <span>225+ pkgs</span>
                                <span>50% Profit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-3xl bg-black p-8 text-white">
                <h3 className="text-4xl font-bold leading-tight">Ready to start?</h3>

                <button className="mt-6 rounded-2xl bg-white px-6 py-4 text-lg font-semibold text-black transition hover:scale-[1.02]">Start Fundraising Now</button>

                <p className="mt-4 text-sm leading-relaxed text-zinc-400">Takes less than 2 minutes to set up.</p>
            </div>
        </div>
    );
}
