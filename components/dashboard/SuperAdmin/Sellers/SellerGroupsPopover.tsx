import React from "react";
import { createPortal } from "react-dom";
import { Users } from "lucide-react";

interface SellerGroupsPopoverProps {
    groups: string[];
    viewportTop: number;
    viewportBottom: number;
    left: number;
    onClose: () => void;
}

export const SellerGroupsPopover: React.FC<SellerGroupsPopoverProps> = ({ groups, viewportTop, viewportBottom, left, onClose }) => {
    if (typeof window === "undefined") return null;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const popoverWidth = Math.min(260, screenWidth - 24);
    const maxLeft = screenWidth - popoverWidth - 12;
    const adjustedLeft = Math.max(12, Math.min(left, maxLeft));

    // Flip upwards only if space below button is less than 200px and space above is larger
    const opensUpward = viewportBottom < 200 && viewportTop > viewportBottom;

    const popoverStyle: React.CSSProperties = {
        position: "fixed",
        left: `${adjustedLeft}px`,
        width: `${popoverWidth}px`,
    };

    if (opensUpward) {
        // Place bottom of popover exactly 6px above top edge of button
        popoverStyle.bottom = `${screenHeight - viewportTop + 6}px`;
    } else {
        // Place top of popover exactly 6px below bottom edge of button
        popoverStyle.top = `${screenHeight - viewportBottom + 6}px`;
    }

    return createPortal(
        <>
            <div className="fixed inset-0 z-9998" onClick={onClose} />
            <div style={popoverStyle} onMouseLeave={onClose} className={`z-9999 bg-white rounded-2xl shadow-2xl border border-stone-200 p-3.5 animate-in fade-in ${opensUpward ? "slide-in-from-bottom-2" : "zoom-in-95"} duration-150`}>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100 mb-2">
                    <div className="flex items-center gap-1.5">
                        <Users size={14} className="text-[#D97706]" />
                        <span className="text-xs font-bold text-[#1A1C1C]">Assigned Groups</span>
                    </div>
                    <span className="text-[10px] font-extrabold bg-amber-100 text-[#7C5800] px-2 py-0.5 rounded-full">{groups.length} total</span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                    {groups.map((grpName, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs font-semibold text-[#1A1C1C] bg-[#FAFAF9] hover:bg-amber-50/70 px-3 py-2 rounded-xl border border-stone-100 transition-colors">
                            <span className="truncate">{grpName}</span>
                            <span className="text-[10px] text-[#78716C] bg-white px-1.5 py-0.5 rounded border border-stone-200/50">#{idx + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>,
        document.body,
    );
};
