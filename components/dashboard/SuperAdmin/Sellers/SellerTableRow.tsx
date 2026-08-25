import React from "react";
import { TSellerListItem, TSalesLinkItem } from "@/redux/features/dashboard/dashboardApi";
import { Check, Copy } from "lucide-react";

const getStatusColor = (status: string) => {
    switch (status) {
        case "Active":
            return "bg-green-100 text-green-800";
        case "Inactive":
            return "bg-gray-100 text-gray-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

export const getNormalizedSalesLinks = (seller: TSellerListItem): TSalesLinkItem[] => {
    if (Array.isArray(seller.salesLinks) && seller.salesLinks.length > 0) {
        const result: TSalesLinkItem[] = [];
        seller.salesLinks.forEach((item, idx) => {
            if (typeof item === "string" && item.trim() !== "" && item !== "N/A") {
                result.push({ name: `Store Link #${idx + 1}`, link: item });
            } else if (typeof item === "object" && item && item.link && item.link !== "N/A") {
                result.push({ name: item.name || `Store Link #${idx + 1}`, link: item.link });
            }
        });
        return result;
    }
    if (seller.salesLink && seller.salesLink !== "N/A") {
        return [{ name: "Store Link", link: seller.salesLink }];
    }
    return [];
};

interface SellerTableRowProps {
    seller: TSellerListItem;
    copiedId: string | null;
    onCopy: (id: string, link: string) => void;
    onOpenGroups: (sellerId: string, groups: string[], e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnterGroups: (sellerId: string, groups: string[], e: React.MouseEvent<HTMLElement>) => void;
    onOpenLinksModal: (sellerName: string, sellerEmail: string, links: TSalesLinkItem[]) => void;
    onViewSeller: (seller: TSellerListItem) => void;
}

export const SellerTableRow: React.FC<SellerTableRowProps> = ({
    seller,
    copiedId,
    onCopy,
    onOpenGroups,
    onMouseEnterGroups,
    onOpenLinksModal,
    onViewSeller,
}) => {
    const groupsList = seller.groups && seller.groups.length > 0 ? seller.groups : seller.group ? [seller.group] : [];
    const salesLinksList = getNormalizedSalesLinks(seller);
    const firstLink = salesLinksList[0]?.link;

    return (
        <tr className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
            <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-sm">{seller.code}</span>
                    <div>
                        <div className="text-[#1A1C1C] font-medium">{seller.name}</div>
                        <div className="text-[#78716C] text-sm">{seller.email}</div>
                    </div>
                </div>
            </td>
            <td className="px-4 py-4 text-[#1A1C1C] font-medium">
                {groupsList.length === 0 ? (
                    <span className="text-gray-400 text-sm">N/A</span>
                ) : (
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-[#1A1C1C]">{groupsList[0]}</span>
                        {groupsList.length > 1 && (
                            <button
                                type="button"
                                onClick={(e) => onOpenGroups(seller._id, groupsList, e)}
                                onMouseEnter={(e) => onMouseEnterGroups(seller._id, groupsList, e)}
                                className="inline-flex items-center text-xs bg-amber-100 hover:bg-amber-200 text-[#7C5800] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer border border-amber-300/40 shadow-2xs"
                                title="Click or hover to view all assigned groups"
                            >
                                <span>+{groupsList.length - 1}</span>
                            </button>
                        )}
                    </div>
                )}
            </td>
            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.orders}</td>
            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{seller.packages}</td>
            <td className="px-4 py-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(seller.status)}`}>{seller.status}</span>
            </td>
            <td className="px-4 py-4">
                {!firstLink ? (
                    <span className="text-gray-400 text-sm">N/A</span>
                ) : (
                    <div className="flex items-center gap-2">
                        <button onClick={() => onCopy(seller._id, firstLink)} className="flex items-center gap-1.5 text-[#D97706] hover:text-[#7C5800] transition-colors font-medium text-sm cursor-pointer">
                            {copiedId === seller._id ? (
                                <>
                                    <Check size={14} className="text-green-600" />
                                    <span className="text-green-600">Copied!</span>
                                </>
                            ) : (
                                <>
                                    <Copy size={14} />
                                    <span>Copy Link</span>
                                </>
                            )}
                        </button>
                        {salesLinksList.length > 1 && (
                            <button
                                type="button"
                                onClick={() => onOpenLinksModal(seller.name, seller.email, salesLinksList)}
                                className="inline-flex items-center text-xs bg-amber-100 hover:bg-amber-200 text-[#7C5800] font-bold px-2 py-0.5 rounded-full transition-all cursor-pointer border border-amber-300/40 shadow-2xs"
                                title="Click to view all sales links"
                            >
                                <span>+{salesLinksList.length - 1}</span>
                            </button>
                        )}
                    </div>
                )}
            </td>
            <td className="px-4 py-4">
                <button onClick={() => onViewSeller(seller)} className="text-[#D97706] hover:underline text-sm font-semibold cursor-pointer">
                    View
                </button>
            </td>
        </tr>
    );
};
