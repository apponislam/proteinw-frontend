"use client";

import React, { useState } from "react";
import { useGetInvitationsByGroupQuery, useSendInvitationMutation, useCancelInvitationMutation } from "@/redux/features/invitation/invitationApi";
import { Mail, Trash2, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

interface InvitationsProps {
    groupId: string;
}

export default function Invitations({ groupId }: InvitationsProps) {
    const [email, setEmail] = useState("");
    const { data: invitationsData, isLoading, refetch } = useGetInvitationsByGroupQuery({ groupId });
    const [sendInvitation, { isLoading: isSending }] = useSendInvitationMutation();
    const [cancelInvitation, { isLoading: isCancelling }] = useCancelInvitationMutation();

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error("Please enter a valid email address.");
            return;
        }

        const toastId = toast.loading("Sending invitation...");
        try {
            await sendInvitation({ groupId, email: email.trim() }).unwrap();
            toast.success("Invitation sent successfully!", { id: toastId });
            setEmail("");
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to send invitation.", { id: toastId });
        }
    };

    const handleCancel = async (invitationId: string) => {
        const toastId = toast.loading("Cancelling invitation...");
        try {
            await cancelInvitation(invitationId).unwrap();
            toast.success("Invitation cancelled successfully.", { id: toastId });
            refetch();
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to cancel invitation.", { id: toastId });
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#F5F5F4] pb-6 mb-6">
                <div>
                    <h3 className="text-xl font-bold text-[#1A1C1C]">Invite Members</h3>
                    <p className="text-sm text-[#78716C]">Invite sellers or team members to join your fundraising group.</p>
                </div>
                <form onSubmit={handleSend} className="flex items-center gap-2 max-w-md w-full">
                    <div className="relative flex-1">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A8A29E]" size={18} />
                        <Input 
                            type="email"
                            placeholder="member@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-11 pl-10 border-[#E7E5E4] focus:border-[#D97706] focus:ring-[#D97706]"
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={isSending}
                        className="inline-flex items-center gap-2 h-11 px-5 rounded-[24px] bg-linear-to-r from-[#7C5800] to-[#FFB800] text-sm font-bold text-white shadow-sm hover:from-[#8B6500] hover:to-[#FFCC00] transition-all disabled:opacity-50 cursor-pointer shrink-0"
                    >
                        {isSending ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
                        <span>Invite</span>
                    </button>
                </form>
            </div>

            <div>
                <h4 className="text-base font-semibold text-[#1A1C1C] mb-4">Active & Pending Invitations</h4>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="animate-spin text-[#D97706]" size={28} />
                    </div>
                ) : !invitationsData?.data || invitationsData.data.length === 0 ? (
                    <div className="text-center py-8 text-[#78716C] text-sm">
                        No invitations sent yet. Invite your first team member above!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#F5F5F4] text-xs font-semibold text-[#78716C] uppercase tracking-wider">
                                    <th className="py-3 px-4">Email Address</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Sent At</th>
                                    <th className="py-3 px-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F5F5F4] text-sm text-[#1C1917]">
                                {invitationsData.data.map((invite) => (
                                    <tr key={invite._id} className="hover:bg-[#FDFDFD] transition-colors">
                                        <td className="py-4 px-4 font-medium">{invite.email}</td>
                                        <td className="py-4 px-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                                                ${invite.status === "accepted" ? "bg-green-50 text-green-700 border border-green-200" : 
                                                  invite.status === "declined" ? "bg-red-50 text-red-700 border border-red-200" : 
                                                  "bg-amber-50 text-amber-700 border border-amber-200 animate-pulse"}`}
                                            >
                                                {invite.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-[#78716C]">
                                            {invite.createdAt ? new Date(invite.createdAt).toLocaleDateString() : "N/A"}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            {invite.status === "pending" && (
                                                <button 
                                                    onClick={() => invite._id && handleCancel(invite._id)}
                                                    disabled={isCancelling}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#F5F5F4] text-red-600 hover:bg-red-50 hover:border-red-200 transition-all text-xs font-semibold cursor-pointer disabled:opacity-50"
                                                >
                                                    <Trash2 size={14} />
                                                    <span>Cancel</span>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
