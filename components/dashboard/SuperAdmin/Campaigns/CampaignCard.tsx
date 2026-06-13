import React from "react";
import { TCampaign } from "../../../../redux/features/campaign/campaignApi";

interface CampaignCardProps {
    campaign: TCampaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
    const progress = campaign.target > 0 
        ? Math.min(100, Math.round(((campaign.totalPackagesSold || 0) / campaign.target) * 100)) 
        : 0;

    const renderCampaignStatus = (endDateStr: Date | string, isActive: boolean) => {
        const endDate = new Date(endDateStr);
        const today = new Date();
        
        const formattedEndDate = endDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });

        if (!isActive || endDate.getTime() < today.getTime()) {
            return (
                <div className="space-y-1">
                    <div className="text-red-500 font-bold text-xs uppercase">Ended on {formattedEndDate}</div>
                    <div className="text-[#78716C] text-xs leading-relaxed">This campaign will be automatically deleted in 2 months.</div>
                </div>
            );
        }
        
        const diffTime = endDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const daysText = diffDays === 0 ? "Ends today" : `Deadline: In ${diffDays} days`;
        
        return <span className="text-[#78716C] text-sm group-hover:text-[#271900] transition-colors duration-300 font-medium">{daysText}</span>;
    };

    const isExpired = !campaign.isActive || new Date(campaign.endDate).getTime() < new Date().getTime();

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] hover:translate-y-0.5 relative overflow-hidden group">
            <div className="relative z-10">
                <div className="mb-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${!isExpired ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        <span className={`w-2 h-2 rounded-full ${!isExpired ? "bg-green-500" : "bg-red-500"}`}></span>
                        {!isExpired ? "ACTIVE" : "EXPIRED"}
                    </span>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-bold text-[#1A1C1C] group-hover:text-[#271900] transition-colors duration-300">{campaign.name}</h3>
                    <p className="text-[#78716C] text-sm mt-1 group-hover:text-[#271900] transition-colors duration-300">{campaign.shortDescription}</p>
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
                            <div className="text-[#D97706] font-bold text-lg">{campaign.totalPackagesSold || 0} pcs</div>
                        </div>
                        <div>
                            <div className="text-[#78716C] text-xs group-hover:text-[#271900] transition-colors duration-300 text-right">TARGET</div>
                            <div className="text-[#1A1C1C] font-bold text-lg group-hover:text-[#271900] transition-colors duration-300 text-right">{campaign.target || 0} pcs</div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 min-h-[40px] flex items-center">
                    {renderCampaignStatus(campaign.endDate, campaign.isActive)}
                </div>

                <button className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2">Manage Campaign</button>
            </div>
        </div>
    );
};

export default CampaignCard;
