import Image from "next/image";
import { Leaf } from "lucide-react";

export function MissionHero() {
    return (
        <section className="relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-gray-50 min-h-screen flex flex-col">
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-100 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative z-10 flex-1 flex items-center">
                {/* Main Hero Banner */}
                <div className="mx-auto container px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-150">
                        {/* Left Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <button className="bg-[#FFDEA8] text-[#7C5800] text-[10px] font-bold px-4 py-2 rounded-full">ESTABLISHED {new Date().getFullYear()}</button>
                                <h1 className="text-4xl sm:text-[72px] font-extrabold text-[#1A1C1C] leading-tight">
                                    About <br />
                                    <span className="text-transparent bg-clip-text bg-linear-to-r from-[#7C5800] to-[#F59E0B]">Kungsbjörnen</span>
                                </h1>

                                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">We are building a digital sanctuary for generosity. Our mission is to empower local communities through sustainable fundraising, blending Nordic precision with human-centric design.</p>
                            </div>
                        </div>

                        {/* Right Side - Hero Banner Image */}
                        <div className="relative w-full aspect-square">
                            <div className="absolute inset-0 rounded-2xl overflow-hidden">
                                <Image src="/mission/missionbg.png" alt="Kungsbjörnen Premium Products" fill className="object-contain" priority />
                            </div>

                            {/* Profit Box - Absolutely Positioned */}
                            <div
                                className="absolute border border-white/20 rounded-2xl p-6 shadow-md z-20"
                                style={{
                                    bottom: "-1rem",
                                    left: "-1rem",
                                    backgroundColor: "#FFB800",
                                }}
                            >
                                <Leaf style={{ color: "#7C5800" }} />
                                <p style={{ color: "#7C5800", marginTop: "0.5rem", maxWidth: "10rem", fontSize: "0.875rem" }}>100% Sustainable</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
