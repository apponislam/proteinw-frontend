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
