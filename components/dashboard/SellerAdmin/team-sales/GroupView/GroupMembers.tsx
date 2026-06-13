"use client";

import React from "react";
import { useGetGroupSellersQuery } from "@/redux/features/auth/authApi";
import { Users, Mail, Phone, Loader2, User } from "lucide-react";

interface GroupMembersProps {
    groupId: string;
}

export default function GroupMembers({ groupId }: GroupMembersProps) {
    const { data: membersData, isLoading } = useGetGroupSellersQuery(groupId);

    return (
        <div className="bg-white p-6 rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.04)] border border-[#E7E5E4] mt-6">
            <div className="border-b border-[#F5F5F4] pb-6 mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-amber-50 rounded-xl text-[#D97706]">
                        <Users size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#1A1C1C]">Active Sellers / Team Members</h3>
                        <p className="text-sm text-[#78716C]">Sellers actively selling in this fundraising campaign.</p>
                    </div>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-[#D97706]" size={28} />
                </div>
            ) : !membersData?.data || membersData.data.length === 0 ? (
                <div className="text-center py-8 text-[#78716C] text-sm">
                    No active team members yet. Send invitations to invite sellers to your team.
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-[#F5F5F4] text-xs font-semibold text-[#78716C] uppercase tracking-wider">
                                <th className="py-3 px-4">Member</th>
                                <th className="py-3 px-4">Email</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5F5F4] text-sm text-[#1C1917]">
                            {membersData.data.map((member) => (
                                <tr key={member._id} className="hover:bg-[#FDFDFD] transition-colors">
                                    <td className="py-4 px-4 font-medium flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-full bg-amber-100 flex items-center justify-center text-[#D97706] font-bold shrink-0">
                                            {member.profileImage ? (
                                                <img 
                                                    src={member.profileImage} 
                                                    alt={member.name} 
                                                    className="h-9 w-9 rounded-full object-cover" 
                                                />
                                            ) : (
                                                <User size={16} />
                                            )}
                                        </div>
                                        <span>{member.name}</span>
                                    </td>
                                    <td className="py-4 px-4 text-[#78716C]">
                                        <a href={`mailto:${member.email}`} className="hover:text-[#D97706] transition-colors flex items-center gap-1.5">
                                            <Mail size={14} />
                                            <span>{member.email}</span>
                                        </a>
                                    </td>
                                    <td className="py-4 px-4 text-[#78716C]">
                                        {member.phone ? (
                                            <a href={`tel:${member.phone}`} className="hover:text-[#D97706] transition-colors flex items-center gap-1.5">
                                                <Phone size={14} />
                                                <span>{member.phone}</span>
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-1.5 text-stone-400">
                                                <Phone size={14} />
                                                <span>N/A</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-4 font-medium uppercase text-xs tracking-wide text-[#78716C]">
                                        {member.role}
                                    </td>
                                    <td className="py-4 px-4 text-right">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide
                                            ${member.isActive ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
                                        >
                                            {member.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
