"use client";

import React from "react";
import { Clock, Mail, CheckCircle2 } from "lucide-react";

const PendingApprovalNotice = () => {
    return (
        <div className="py-10 sm:py-14 max-w-3xl space-y-6 text-left">
            {/* Header Badge */}
            <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#7C5800] border border-amber-200/80 flex items-center gap-1.5 w-fit">
                    <Clock className="w-3.5 h-3.5 text-[#D97706] animate-pulse" /> Konto under granskning
                </span>
            </div>

            {/* Main Swedish Message Header */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1C] tracking-tight">Välkommen till Kungsbjörnen!</h1>

            {/* Clean Typography Body */}
            <div className="space-y-4 text-base sm:text-lg text-[#514532] leading-relaxed">
                <p className="font-semibold text-[#1A1C1C]">
                    Hej och vad roligt att du har skapat ett konto och vill börja sälja tillsammans med oss på Kungsbjörnen!
                </p>
                <p>
                    Vi kommer nu att granska din ansökan och godkänna ditt konto inom 24 timmar. När ditt konto är godkänt kan du skapa din grupp och därefter starta din insamling.
                </p>
                <p>
                    Vill du komma igång tidigare, eller har du några frågor under tiden? Tveka inte att kontakta oss – vi hjälper dig mer än gärna.
                </p>
            </div>

            {/* Signature & Support Info */}
            <div className="pt-6 border-t border-stone-200/80 space-y-4 text-sm sm:text-base">
                <div>
                    <p className="font-medium text-stone-600">Med vänliga hälsningar,</p>
                    <p className="font-bold text-[#D97706] text-lg">Team Kungsbjörnen</p>
                </div>

                <div className="flex items-center gap-2 text-stone-500 pt-2 flex-wrap">
                    <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>Har du några frågor? Maila oss gärna på</span>
                    <a href="mailto:support@kungsbjornen.se" className="font-semibold text-[#D97706] hover:underline">
                        support@kungsbjornen.se
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PendingApprovalNotice;
