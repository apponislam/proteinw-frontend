import React from "react";

const campaignColors = ["bg-[#D97706]", "bg-[#7C3AED]", "bg-[#10B981]", "bg-[#3B82F6]"];

interface CampaignCardProps {
    title: string;
    description: string;
    status: string;
    progress: number;
    goal: string;
    raised: string;
    daysLeft: string;
    campaigns?: string[];
}

const CampaignCard: React.FC<CampaignCardProps> = ({ title, description, status, progress, goal, raised, daysLeft, campaigns = ["W", "N", "F", "G"] }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden group">
            <div className="relative z-10">
                <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        <span className={`w-2 h-2 rounded-full ${status === "ACTIVE" ? "bg-green-500" : "bg-red-500"}`}></span>
                        {status}
                    </span>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{title}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{description}</p>
                </div>

                <div className="bg-[#F3F3F3] py-4 px-6 rounded-[24px] mb-4">
                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">Progress</span>
                            <span className="text-[#D97706] font-bold">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#E7E5E4] rounded-full overflow-hidden">
                            <div className="h-full bg-linear-to-r from-[#7C5800] to-[#FFB800] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ">
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300">SOLD</div>
                            <div className="text-[#D97706] font-bold text-lg">{raised}</div>
                        </div>
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300 text-right">NEXT TARGET</div>
                            <div className="text-[#1A1C1C] font-bold text-lg group-hover:text-[#271900] transition-colors duration-300 text-right">{goal}</div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <div className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300">{daysLeft}</div>
                    <div className="flex items-center relative group/campaigns">
                        {campaigns.slice(0, 2).map((camp, idx) => (
                            <span key={idx} className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm border-2 border-white ${campaignColors[idx % campaignColors.length]} ${idx > 0 ? "-ml-2" : ""}`}>
                                {camp}
                            </span>
                        ))}
                        {campaigns.length > 2 && <span className={`w-8 h-8 rounded-full bg-[#78716C] text-white flex items-center justify-center font-bold text-xs border-2 border-white ${campaigns.length > 2 ? "-ml-2" : ""}`}>+{campaigns.length - 2}</span>}
                        {campaigns.length > 2 && (
                            <div className="absolute bottom-full right-0 mb-2 hidden group-hover/campaigns:flex flex-wrap gap-1 bg-white p-2 rounded-lg shadow-lg border border-[#F5F5F4] z-50">
                                {campaigns.map((camp, idx) => (
                                    <span key={idx} className={`w-7 h-7 rounded-full text-white flex items-center justify-center font-bold text-xs ${campaignColors[idx % campaignColors.length]}`}>
                                        {camp}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">View Campaign</button>
            </div>
        </div>
    );
};

export default CampaignCard;
