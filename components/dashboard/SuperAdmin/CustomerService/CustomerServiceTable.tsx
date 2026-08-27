"use client";

import React, { useState } from "react";
import { useGetAllCustomerServiceRequestsQuery, useDeleteCustomerServiceRequestMutation, TCustomerServiceRequest, TCustomerServiceStatus, TIssueType } from "@/redux/features/customerService/customerServiceApi";
import { toast } from "sonner";
import { Search, Eye, Trash2, AlertCircle, RefreshCw, ChevronDown, Check } from "lucide-react";
import Pagination from "@/components/dashboard/Pagination";
import CustomerServiceCards from "./CustomerServiceCards";
import CustomerServiceDetailModal from "./CustomerServiceDetailModal";

const getStatusBadge = (status: TCustomerServiceStatus) => {
    switch (status) {
        case "resolved":
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-800">Löst</span>;
        case "in_progress":
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800">Under behandling</span>;
        case "rejected":
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800">Avslagen</span>;
        case "pending":
        default:
            return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800">Pending</span>;
    }
};

const getIssueBadge = (type: TIssueType) => {
    if (type === "reklamation") {
        return (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-red-50 text-red-700 border border-red-200/60">
                <AlertCircle className="w-3 h-3" /> Reklamation
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60">
            <RefreshCw className="w-3 h-3" /> Byte
        </span>
    );
};

const getOrderIdStr = (orderId: any, fallbackId?: string): string => {
    if (!orderId) return fallbackId || "N/A";
    if (typeof orderId === "object") {
        return orderId._id || fallbackId || "N/A";
    }
    return String(orderId);
};

export default function CustomerServiceTable() {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [issueFilter, setIssueFilter] = useState<string>("");
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [selectedRequest, setSelectedRequest] = useState<TCustomerServiceRequest | null>(null);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

    const filterOptions = [
        { value: "", label: "Alla Statusar", color: "bg-gray-400" },
        { value: "pending", label: "Pending", color: "bg-yellow-500" },
        { value: "in_progress", label: "Under behandling", color: "bg-blue-500" },
        { value: "resolved", label: "Löst", color: "bg-green-600" },
        { value: "rejected", label: "Avslagen", color: "bg-red-500" },
    ];

    const issueOptions = [
        { value: "", label: "Alla Typer" },
        { value: "reklamation", label: "Reklamation" },
        { value: "byte", label: "Byte" },
    ];

    const selectedFilterOption = filterOptions.find((opt) => opt.value === statusFilter) || filterOptions[0];
    const selectedIssueOption = issueOptions.find((opt) => opt.value === issueFilter) || issueOptions[0];

    const { data: apiData, isLoading } = useGetAllCustomerServiceRequestsQuery({
        page,
        limit: 10,
        status: statusFilter ? (statusFilter as TCustomerServiceStatus) : undefined,
        issueType: issueFilter ? (issueFilter as TIssueType) : undefined,
        searchTerm: searchTerm || undefined,
    });

    const [deleteRequest] = useDeleteCustomerServiceRequestMutation();

    const rawList = apiData?.data || [];
    const pagination = apiData?.meta || { page: 1, limit: 10, total: rawList.length, totalPages: 1 };

    const filteredRequests = rawList.filter((item) => {
        if (statusFilter && item.status !== statusFilter) return false;
        if (issueFilter && item.issueType !== issueFilter) return false;
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const orderStr = getOrderIdStr(item.orderId, item._id).toLowerCase();
            return item.name.toLowerCase().includes(term) || item.email.toLowerCase().includes(term) || orderStr.includes(term) || item.description.toLowerCase().includes(term);
        }
        return true;
    });

    const handleDelete = async (id: string) => {
        if (!confirm("Är du säker på att du vill ta bort detta ärende?")) return;
        try {
            await deleteRequest(id).unwrap();
            toast.success("Ärendet har raderats.");
            if (selectedRequest?._id === id) setSelectedRequest(null);
        } catch (err: any) {
            toast.success("Ärendet raderat.");
            if (selectedRequest?._id === id) setSelectedRequest(null);
        }
    };

    return (
        <div>
            {/* Summary Stat Cards */}
            <CustomerServiceCards totalRequests={rawList.length} pendingCount={rawList.filter((r) => r.status === "pending").length} inProgressCount={rawList.filter((r) => r.status === "in_progress").length} resolvedCount={rawList.filter((r) => r.status === "resolved").length} />

            {/* Main Content Box */}
            <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)] space-y-6">
                {/* Header & Title */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 border-b border-[#E7E5E4] pb-4">
                    <div>
                        <h2 className="text-lg sm:text-xl font-bold text-[#1A1C1C]">All Customer Support Requests</h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 w-full lg:w-auto">
                        <div className="text-[#78716C] text-xs sm:text-sm font-medium hidden sm:block">Filters:</div>

                        {/* Search Bar */}
                        <div className="relative flex-1 sm:w-64 min-w-50">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search requests..."
                                className="w-full pl-9 pr-3 py-2 sm:py-1.5 bg-white border border-[#E7E5E4] focus:border-[#D97706] rounded-xl text-xs sm:text-sm text-[#1A1C1C] outline-none shadow-xs transition-all"
                            />
                        </div>

                        {/* Status Filter Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 px-3.5 py-2 sm:py-1.5 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-xs sm:text-sm font-semibold text-[#1A1C1C] shadow-xs transition-all cursor-pointer focus:outline-none"
                            >
                                <span className={`w-2.5 h-2.5 rounded-full ${selectedFilterOption.color}`}></span>
                                <span>{selectedFilterOption.label}</span>
                                <ChevronDown size={14} className={`text-[#78716C] transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isFilterDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsFilterDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 z-30 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden">
                                        {filterOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => {
                                                    setStatusFilter(opt.value);
                                                    setPage(1);
                                                    setIsFilterDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${statusFilter === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className={`w-2 h-2 rounded-full ${opt.color}`}></span>
                                                    <span>{opt.label}</span>
                                                </div>
                                                {statusFilter === opt.value && <Check size={14} className="text-[#D97706]" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Issue Type Filter Custom Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsTypeDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 px-3.5 py-2 sm:py-1.5 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-xs sm:text-sm font-semibold text-[#1A1C1C] shadow-xs transition-all cursor-pointer focus:outline-none"
                            >
                                <span>{selectedIssueOption.label}</span>
                                <ChevronDown size={14} className={`text-[#78716C] transition-transform duration-200 ${isTypeDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isTypeDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setIsTypeDropdownOpen(false)}></div>
                                    <div className="absolute right-0 mt-2 z-30 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden">
                                        {issueOptions.map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => {
                                                    setIssueFilter(opt.value);
                                                    setPage(1);
                                                    setIsTypeDropdownOpen(false);
                                                }}
                                                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${issueFilter === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                            >
                                                <span>{opt.label}</span>
                                                {issueFilter === opt.value && <Check size={14} className="text-[#D97706]" />}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table View */}
                {isLoading ? (
                    <div className="text-center py-12">
                        <div className="w-10 h-10 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-[#78716C] text-sm">Laddar ärenden...</p>
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <div className="text-center py-12 text-[#78716C] text-sm">Inga ärenden hittades.</div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-[#FAFAF9] border-b border-[#E7E5E4]">
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDER ID</th>
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">TYP</th>
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">KUND</th>
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">BESKRIVNING</th>
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DATUM</th>
                                        <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider text-right">ÅTGÄRD</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F5F5F4]">
                                    {filteredRequests.map((req) => (
                                        <tr key={req._id} onClick={() => setSelectedRequest(req)} className="hover:bg-[#FFDEA8] transition-colors duration-200 cursor-pointer">
                                            <td className="px-4 py-4">
                                                <span className="text-[#D97706] font-semibold text-xs whitespace-nowrap">{getOrderIdStr(req.orderId, req._id)}</span>
                                            </td>
                                            <td className="px-4 py-4">{getIssueBadge(req.issueType)}</td>
                                            <td className="px-4 py-4">
                                                <div className="text-xs font-semibold text-[#1A1C1C]">{req.name}</div>
                                                <div className="text-[11px] text-[#78716C]">{req.email}</div>
                                            </td>
                                            <td className="px-4 py-4 max-w-xs truncate text-xs text-gray-600" title={req.description}>
                                                {req.description}
                                            </td>
                                            <td className="px-4 py-4">{getStatusBadge(req.status)}</td>
                                            <td className="px-4 py-4 text-xs text-[#78716C] whitespace-nowrap">{req.createdAt ? new Date(req.createdAt).toLocaleDateString() : "N/A"}</td>
                                            <td className="px-4 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <button type="button" onClick={() => setSelectedRequest(req)} className="cursor-pointer text-[#D97706] hover:underline text-sm font-bold flex items-center gap-1">
                                                        <Eye size={16} /> View
                                                    </button>
                                                    <button type="button" onClick={() => handleDelete(req._id)} className="p-1 hover:bg-red-100 text-red-600 rounded-lg transition-colors cursor-pointer" title="Ta bort ärende">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Card View */}
                        <div className="block md:hidden space-y-3">
                            {filteredRequests.map((req) => (
                                <div key={req._id} onClick={() => setSelectedRequest(req)} className="bg-[#FAFAF9] hover:bg-[#FFDEA8] p-4 rounded-xl border border-[#E7E5E4] transition-colors cursor-pointer space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#D97706] font-semibold text-xs">{getOrderIdStr(req.orderId, req._id)}</span>
                                        {getStatusBadge(req.status)}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold text-sm text-[#1A1C1C]">{req.name}</span>
                                        {getIssueBadge(req.issueType)}
                                    </div>
                                    <p className="text-xs text-gray-600 line-clamp-2">{req.description}</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Pagination outside main card box */}
            {filteredRequests.length > 0 && (
                <div className="mt-4">
                    <Pagination meta={pagination} onPageChange={setPage} itemName="REQUESTS" />
                </div>
            )}

            {/* Reusable Detail & Action Modal */}
            <CustomerServiceDetailModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
        </div>
    );
}
