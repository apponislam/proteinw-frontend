import React from "react";
import Image from "next/image";

const AdminOverview = () => {
    return (
        <div>
            <div>
                <h1 className="text-5xl text-[#1A1C1C] mb-3">Welcome back, Erik.</h1>
                <p className="text-[#78716C] text-lg">Kungsbjörnen is currently hosting 214 active campaigns across the Nordic region.</p>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Box 1 (takes 2x2) - Grand Scale Impact */}
                <div className="md:col-span-2 md:row-span-2 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute right-0 bottom-0 h-full w-80">
                        <Image src="/dashboard/superadmin/admindashhome.png" alt="" width={300} height={300} className="w-80 h-80 opacity-90 object-bottom-right" priority />
                        <div className="absolute inset-0 bg-linear-to-l from-transparent to-white"></div>
                    </div>
                    <div className="relative z-10 flex flex-col justify-between h-full w-1/2">
                        <div>
                            <div className="flex items-center gap-3">
                                <span className="text-[#D97706] text-sm font-medium uppercase ">GRAND SCALE IMPACT</span>
                            </div>
                            <div className="text-6xl font-bold text-[#1A1C1C] mb-2">42,100</div>
                            <div className="text-[#78716C] mb-3 text-[18px]">Total Packages Sold</div>
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 bg-[#7C58000D] text-[#7C5800] px-4 py-1 rounded-[16px] text-[12px]">
                                    <p>+12.5% vs last month</p>
                                </div>
                                <div className="flex items-center gap-2 bg-[#00687B0D] text-[#00687B] px-4 py-1 rounded-[16px] text-[12px]">
                                    <p>Top Category: Coffee Blends</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Box 2 - Total Sellers */}
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL SELLERS</div>
                        <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-3 transition-colors duration-300">3,892</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm transition-colors duration-300">Active sellers in the Nordic region.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>

                {/* Box 3 - Total Orders */}
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL ORDERS</div>
                        <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-3 transition-colors duration-300">18,521</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm transition-colors duration-300">Total orders processed in the total archive.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>

                {/* Box 4 - Total Admins */}
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL ADMINS</div>
                        <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-3 transition-colors duration-300">12</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm transition-colors duration-300">Full system privileges granted to verified operators.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>

                {/* Box 5 - Total Groups */}
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">TOTAL GROUPS</div>
                        <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-3 transition-colors duration-300">142</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm transition-colors duration-300">Active organizational clusters within the archive.</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>

                {/* Box 6 - Active Campaigns */}
                <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 hover:bg-[#FFDEA8] relative overflow-hidden group">
                    <div className="relative z-10">
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm font-medium uppercase tracking-wider mb-2 transition-colors duration-300">ACTIVE CAMPAIGNS</div>
                        <div className="text-3xl font-bold text-[#1A1C1C] group-hover:text-[#271900] mb-3 transition-colors duration-300">214</div>
                        <div className="text-[#78716C] group-hover:text-[#271900] text-sm transition-colors duration-300">Live now</div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Image src="/dashboard/superadmin/dashcircle.png" alt="" width={80} height={80} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
