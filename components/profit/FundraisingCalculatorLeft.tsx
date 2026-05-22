"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function FundraisingCalculatorLeft() {
    const [targetProfit, setTargetProfit] = useState(15000);
    const [students, setStudents] = useState(26);

    const packagePrice = 180;

    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-3xl  bg-white p-8 shadow-xl">
                <div className="space-y-10">
                    {/* TARGET PROFIT */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#514532]">TARGET PROFIT (SEK)</h3>

                            <span className="text-3xl font-bold text-[#7C5800]">
                                {targetProfit.toLocaleString()} <span className="text-sm">kr</span>
                            </span>
                        </div>

                        <input type="range" min={1} max={80000} value={targetProfit} onChange={(e) => setTargetProfit(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-black" />

                        <div className="mt-2 flex justify-between text-sm text-[#837560]">
                            <span>1 KR</span>
                            <span>40,000 KR</span>
                            <span>80,000 KR</span>
                        </div>
                    </div>

                    {/* STUDENTS */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-semibold uppercase tracking-wide text-[#514532]">NUMBER OF STUDENTS</h3>

                            <span className="text-3xl font-bold text-[#7C5800]">
                                {students} <span className="text-sm">members</span>
                            </span>
                        </div>

                        <input type="range" min={1} max={80} value={students} onChange={(e) => setStudents(Number(e.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-black" />

                        <div className="mt-2 flex justify-between text-sm text-[#837560]">
                            <span>1 PERSON</span>
                            <span>40 PEOPLE</span>
                            <span>80 PEOPLE</span>
                        </div>
                    </div>

                    {/* PACKAGE INFO */}
                    <div className="">
                        <div className="flex items-center gap-3">
                            <Info className="text-[#7C5800]" />
                            <p className="text-lg font-semibold text-[#514532]">Price per package: {packagePrice} SEK</p>
                        </div>

                        <div className="mt-4 space-y-2 text-sm text-zinc-600">
                            <div className="flex justify-between p-2 hover:bg-[#FFB80033] hover:border-l-[#FFB80033] border-l-4 border-l-transparent rounded-sm">
                                <span className="text-[#837560]">0 - 149 pkgs</span>
                                <span className="text-[#1A1C1C] font-bold">40% Profit</span>
                            </div>

                            <div className="flex justify-between p-2 hover:bg-[#FFB80033] hover:border-l-[#FFB80033] border-l-4 border-l-transparent rounded-sm">
                                <span className="text-[#837560]">150 - 224 pkgs</span>
                                <span className="text-[#1A1C1C] font-bold">45% Profit</span>
                            </div>

                            <div className="flex justify-between p-2 hover:bg-[#FFB80033] hover:border-l-[#FFB80033] border-l-4 border-l-transparent rounded-sm">
                                <span className="text-[#837560]">225+ pkgs</span>
                                <span className="text-[#1A1C1C] font-bold">50% Profit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-3xl bg-[#2F3131] p-8 text-white flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-bold leading-tight">Ready to start?</h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">Takes less than 2 minutes to set up.</p>
                </div>

                <Link href="/auth/register">
                    <button className="rounded-2xl bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-4 text-lg font-semibold text-white transition hover:scale-[1.02] cursor-pointer">Start Fundraising Now</button>
                </Link>
            </div>
        </div>
    );
}
