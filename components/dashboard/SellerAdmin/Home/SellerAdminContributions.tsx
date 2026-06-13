import React from "react";
import { ShoppingBag, Trophy, UserPlus, Rocket } from "lucide-react";
import { useGetActivitiesQuery } from "@/redux/features/dashboard/dashboardApi";

interface Contributor {
    initials: string;
    name: string;
    packages: string;
    sales: string;
}

const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

const getActivityIcon = (type: string) => {
    switch (type) {
        case "SALE":
            return <ShoppingBag size={20} className="text-[#D97706]" />;
        case "MILESTONE":
            return <Trophy size={20} className="text-[#D97706]" />;
        case "MEMBER":
            return <UserPlus size={20} className="text-[#D97706]" />;
        case "CAMPAIGN":
            return <Rocket size={20} className="text-[#D97706]" />;
        default:
            return <ShoppingBag size={20} className="text-[#D97706]" />;
    }
};

const SellerAdminContributions = () => {
    const { data: activities = [], isLoading } = useGetActivitiesQuery();

    const contributors: Contributor[] = [
        { initials: "SM", name: "Sofia Mårtensson", packages: "42 Units", sales: "9,240 SEK" },
        { initials: "OL", name: "Oscar Lund", packages: "38 Units", sales: "8,360 SEK" },
        { initials: "AB", name: "Alice Bergqvist", packages: "31 Units", sales: "6,820 SEK" },
        { initials: "LA", name: "Liam Andersson", packages: "29 Units", sales: "6,380 SEK" },
    ];

    return (
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Contributors - 2/3 width */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-[#78716C] text-sm font-medium uppercase tracking-wider">Top Contributors</h3>
                        <button className="text-[#D97706] text-sm font-medium hover:text-[#7C5800] transition-colors">View all team</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-[#E7E5E4]">
                                    <th className="text-left text-[#78716C] text-xs font-medium uppercase tracking-wider pb-4 px-2">NAME</th>
                                    <th className="text-right text-[#78716C] text-xs font-medium uppercase tracking-wider pb-4 px-2">PACKAGES SOLD</th>
                                    <th className="text-right text-[#78716C] text-xs font-medium uppercase tracking-wider pb-4 px-2">TOTAL SALES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {contributors.map((contributor, idx) => (
                                    <tr key={idx} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#F5F5F4] transition-colors duration-200 rounded-md">
                                        <td className="py-4 rounded-l-md px-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">{contributor.initials}</div>
                                                <span className="text-[#1A1C1C] font-medium">{contributor.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 text-right text-[#1A1C1C] px-2">{contributor.packages}</td>
                                        <td className="py-4 text-right text-[#D97706] font-bold rounded-r-md px-2">{contributor.sales}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Recent Activity - 1/3 width */}
            <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden">
                <div className="relative z-10">
                    <h3 className="text-[#78716C] text-sm font-medium uppercase tracking-wider mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="w-6 h-6 border-2 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : activities.length === 0 ? (
                            <p className="text-gray-400 text-sm text-center py-8">No recent activities</p>
                        ) : (
                            activities.slice(0, 10).map((activity) => (
                                <div key={activity._id} className="flex gap-4 p-3 rounded-md hover:bg-[#F5F5F4] transition-colors duration-200">
                                    <div className="w-10 h-10 rounded-full bg-[#F5F5F4] flex items-center justify-center">
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h4 className="text-[#1A1C1C] font-medium">{activity.title}</h4>
                                            <span className="text-[#A8A29E] text-xs">{formatTimeAgo(activity.createdAt)}</span>
                                        </div>
                                        <p className="text-[#78716C] text-sm">{activity.description}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerAdminContributions;
