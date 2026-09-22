"use client";

import React, { useState } from "react";
import { useGetInvitationsByGroupQuery, useSendInvitationMutation, useCancelInvitationMutation } from "@/redux/features/invitation/invitationApi";
import { Mail, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/dashboard/Pagination";

interface InvitationsProps {
    groupId: string;
}

const formatInviteStatus = (status: string) => {
    switch (status) {
        case "accepted":
            return "Accepterad";
        case "declined":
            return "Avböjd";
        case "pending":
            return "Väntar";
        default:
            return status;
    }
};

export default function Invitations({ groupId }: InvitationsProps) {
    const [email, setEmail] = useState("");
    const [page, setPage] = useState(1);
    const { data: invitationsData, isLoading, refetch } = useGetInvitationsByGroupQuery({ groupId, page, limit: 10 });
    const [sendInvitation, { isLoading: isSending }] = useSendInvitationMutation();
    const [cancelInvitation, { isLoading: isCancelling }] = useCancelInvitationMutation();

    const invitations = invitationsData?.data || [];
    const meta = invitationsData?.meta;

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Vänligen ange en giltig e-postadress.");
            return;
        }

        const toastId = toast.loading("Skickar inbjudan...");
        try {
            await sendInvitation({ groupId, email: email.trim() }).unwrap();
            toast.success("Inbjudan skickades framgångsrikt!", { id: toastId });
            setEmail("");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Misslyckades med att skicka inbjudan.", { id: toastId });
        }
    };

    const handleCancel = async (invitationId: string) => {
        const toastId = toast.loading("Avbryter inbjudan...");
        try {
            await cancelInvitation(invitationId).unwrap();
            toast.success("Inbjudan avbröts framgångsrikt.", { id: toastId });
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Misslyckades med att avbryta inbjudan.", { id: toastId });
        }
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4]">
            <div className="flex flex-col gap-4 border-b border-[#F5F5F4] pb-4 sm:pb-6 mb-4 sm:mb-6">
                <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1A1C1C]">Bjud in medlemmar</h3>
                    <p className="text-xs sm:text-sm text-[#78716C]">Bjud in säljare eller teammedlemmar att gå med i din insamlingsgrupp.</p>
                </div>
                <form onSubmit={handleSend} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-lg">
                    <div className="relative flex-1">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={18} />
                        <Input type="email" placeholder="medlem@epost.se" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 pl-10 border-[#E7E5E4] focus:border-[#D97706] focus:ring-[#D97706]" />
                    </div>
                    <button
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer shrink-0"
                    >
                        {isSending ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                        <span>Bjud in</span>
                    </button>
                </form>
            </div>

            <div>
                <h4 className="text-sm sm:text-base font-semibold text-[#1A1C1C] mb-4">Väntande inbjudningar.</h4>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="animate-spin text-[#D97706]" size={28} />
                    </div>
                ) : !invitations || invitations.length === 0 ? (
                    <div className="text-center py-8 text-[#78716C] text-sm">Inga inbjudningar skickade ännu. Bjud in din första teammedlem ovan!</div>
                ) : (
                    <>
                        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
                            <table className="w-full text-left border-collapse min-w-120">
                                <thead>
                                    <tr className="border-b border-[#F5F5F4] text-xs font-semibold text-[#78716C] uppercase tracking-wider">
                                        <th className="py-3 px-3 sm:px-4">E-postadress</th>
                                        <th className="py-3 px-3 sm:px-4">Status</th>
                                        <th className="py-3 px-3 sm:px-4">Skickad</th>
                                        <th className="py-3 px-3 sm:px-4 text-right">Åtgärder</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5F5F4] text-sm text-[#1C1917]">
                                    {invitations.map((invite) => (
                                        <tr key={invite._id} className="hover:bg-[#FDFDFD] transition-colors">
                                            <td className="py-3 sm:py-4 px-3 sm:px-4 font-medium whitespace-nowrap">{invite.email}</td>
                                            <td className="py-3 sm:py-4 px-3 sm:px-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                                                    ${invite.status === "accepted" ? "bg-green-50 text-green-700 border border-green-200" : invite.status === "declined" ? "bg-red-50 text-red-700 border border-red-200" : "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"}`}
                                                >
                                                    {formatInviteStatus(invite.status)}
                                                </span>
                                            </td>
                                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-[#78716C] whitespace-nowrap">{invite.createdAt ? new Date(invite.createdAt).toLocaleDateString() : "Ej angivet"}</td>
                                            <td className="py-3 sm:py-4 px-3 sm:px-4 text-right whitespace-nowrap">
                                                {invite.status === "pending" && (
                                                    <button
                                                        onClick={() => invite._id && handleCancel(invite._id)}
                                                        disabled={isCancelling}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F5F5F4] text-red-600 hover:bg-red-50 hover:border-red-200 transition-all text-xs font-semibold cursor-pointer disabled:opacity-50"
                                                    >
                                                        <Trash2 size={14} />
                                                        <span>Avbryt</span>
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 sm:mt-6">
                            <Pagination meta={meta} onPageChange={setPage} itemName="INBJUDNINGAR" />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
