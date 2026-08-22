"use client";

import { Info } from "lucide-react";
import Link from "next/link";

interface Props {
    targetProfit: number;
    setTargetProfit: (val: number) => void;
    students: number;
    setStudents: (val: number) => void;
    profitPercent: number;
}

export default function FundraisingCalculatorLeft({ targetProfit, setTargetProfit, students, setStudents, profitPercent }: Props) {
    const packagePrice = 180;

    return (
        <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-3xl bg-white p-5 sm:p-8 shadow-xl">
                <div className="space-y-8 sm:space-y-10">
                    {/* TARGET PROFIT */}
                    <div>
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#514532]">TARGET PROFIT (SEK)</h3>

                            <span className="text-2xl sm:text-3xl font-bold text-[#7C5800]">
                                {targetProfit.toLocaleString()} <span className="text-xs sm:text-sm font-normal">kr</span>
                            </span>
                        </div>

                        <input
                            type="range"
                            min={1}
                            max={80000}
                            value={targetProfit}
                            onChange={(e) => setTargetProfit(Number(e.target.value))}
                            style={{
                                background: `linear-gradient(to right, #EFAC02 ${(targetProfit / 80000) * 100}%, #E5E7EB ${(targetProfit / 80000) * 100}%)`,
                            }}
                            className="w-full h-2 rounded-full appearance-none outline-none    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4    [&::-webkit-slider-thumb]:h-4    [&::-webkit-slider-thumb]:rounded-full    [&::-webkit-slider-thumb]:bg-[#EFAC02]    [&::-webkit-slider-thumb]:shadow-md"
                        />

                        <div className="mt-2 flex justify-between text-xs sm:text-sm text-[#837560]">
                            <span>1 KR</span>
                            <span>40,000 KR</span>
                            <span>80,000 KR</span>
                        </div>
                    </div>

                    {/* STUDENTS */}
                    <div>
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#514532]">NUMBER OF STUDENTS</h3>

                            <span className="text-2xl sm:text-3xl font-bold text-[#7C5800]">
                                {students} <span className="text-xs sm:text-sm font-normal">members</span>
                            </span>
                        </div>

                        <input
                            type="range"
                            min={1}
                            max={80}
                            value={students}
                            onChange={(e) => setStudents(Number(e.target.value))}
                            style={{
                                background: `linear-gradient(to right, #7C5800 ${(students / 80) * 100}%, #E5E7EB ${(students / 80) * 100}%)`,
                            }}
                            className="w-full h-2 rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#7C5800] [&::-webkit-slider-thumb]:shadow-md"
                        />

                        <div className="mt-2 flex justify-between text-xs sm:text-sm text-[#837560]">
                            <span>1 PERSON</span>
                            <span>40 PEOPLE</span>
                            <span>80 PEOPLE</span>
                        </div>
                    </div>

                    {/* PACKAGE INFO */}
                    <div>
                        <div className="flex items-center gap-2.5 sm:gap-3">
                            <Info className="text-[#7C5800] shrink-0 w-5 h-5" />
                            <p className="text-base sm:text-lg font-semibold text-[#514532]">Price per package: {packagePrice} SEK</p>
                        </div>

                        <div className="mt-4 space-y-2 text-xs sm:text-sm text-zinc-600">
                            <div className={`flex justify-between p-2.5 rounded-lg border-l-4 transition-colors ${profitPercent === 40 ? "bg-[#FFB80033] border-l-[#7C5800]" : "border-l-transparent hover:bg-[#FFB80033] hover:border-l-[#FFB80033]"}`}>
                                <span className="text-[#837560]">0 - 149 pkgs</span>
                                <span className="text-[#1A1C1C] font-bold">40% Profit</span>
                            </div>

                            <div className={`flex justify-between p-2.5 rounded-lg border-l-4 transition-colors ${profitPercent === 45 ? "bg-[#FFB80033] border-l-[#7C5800]" : "border-l-transparent hover:bg-[#FFB80033] hover:border-l-[#FFB80033]"}`}>
                                <span className="text-[#837560]">150 - 224 pkgs</span>
                                <span className="text-[#1A1C1C] font-bold">45% Profit</span>
                            </div>

                            <div className={`flex justify-between p-2.5 rounded-lg border-l-4 transition-colors ${profitPercent === 50 ? "bg-[#FFB80033] border-l-[#7C5800]" : "border-l-transparent hover:bg-[#FFB80033] hover:border-l-[#FFB80033]"}`}>
                                <span className="text-[#837560]">225+ pkgs</span>
                                <span className="text-[#1A1C1C] font-bold">50% Profit</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="mt-6 sm:mt-8 rounded-3xl bg-[#2F3131] p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                    <h3 className="text-lg sm:text-xl font-bold leading-tight">Ready to start?</h3>
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm leading-relaxed text-zinc-400">Takes less than 2 minutes to set up.</p>
                </div>

                <Link href="/auth/register" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto rounded-2xl bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3.5 sm:py-4 text-sm sm:text-lg font-semibold text-white transition hover:scale-[1.02] cursor-pointer">Start Fundraising Now</button>
                </Link>
            </div>
        </div>
    );
}
