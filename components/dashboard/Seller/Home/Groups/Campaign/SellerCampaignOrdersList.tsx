"use client";

import React, { useState } from "react";
import { useGetOrdersByCampaignQuery, useUpdateOrderStatusMutation, TOrder, TOrderStatus } from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { ShoppingBag, ChevronDown, Check, Eye, X } from "lucide-react";
import Pagination from "@/components/dashboard/Pagination";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

interface SellerCampaignOrdersListProps {
    campaignId: string;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case "delivered":
            return "bg-green-100 text-green-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

const getInitials = (name: string) => {
    if (!name) return "U";
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

const SellerCampaignOrdersList: React.FC<SellerCampaignOrdersListProps> = ({ campaignId }) => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
    const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
    const user = useAppSelector(currentUser);
    const role = user?.role;

    const filterOptions = [
        { value: "", label: "All Status", color: "bg-gray-400" },
        { value: "pending", label: "Pending", color: "bg-yellow-500" },
        { value: "delivered", label: "Delivered", color: "bg-green-600" },
        { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
    ];

    const selectedFilterOption = filterOptions.find((opt) => opt.value === statusFilter) || filterOptions[0];

    const { data: response, isLoading } = useGetOrdersByCampaignQuery(
        {
            campaignId,
            page,
            limit: 10,
            status: statusFilter ? (statusFilter as TOrderStatus) : undefined,
            mySales: true,
        },
        { skip: !campaignId },
    );

    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const ordersList = response?.data || [];
    const pagination = response?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

    const activeSelectedOrder = selectedOrder ? ordersList.find((o) => o._id === selectedOrder._id) || selectedOrder : null;

    const handleStatusChange = async (orderId: string, newStatus: TOrderStatus) => {
        try {
            await updateOrderStatus({ orderId, status: newStatus }).unwrap();
            toast.success("Order status updated successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update order status");
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-[#D97706] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-[#78716C] text-sm font-medium">Loading campaign orders...</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Filter Header */}
            <div className="p-4 border-b border-[#E7E5E4] bg-[#FAF9F6] rounded-t-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <ShoppingBag size={18} className="text-[#D97706]" />
                    <span className="text-xs font-bold text-[#1A1C1C] uppercase tracking-wider">My Campaign Orders ({pagination.total})</span>
                </div>
                <div className="relative">
                    <button type="button" onClick={() => setIsFilterDropdownOpen((prev) => !prev)} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-xs font-semibold text-[#1A1C1C] shadow-2xs transition-all cursor-pointer">
                        <span className={`w-2 h-2 rounded-full ${selectedFilterOption.color}`}></span>
                        <span>{selectedFilterOption.label}</span>
                        <ChevronDown size={14} className={`text-[#78716C] transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isFilterDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-20" onClick={() => setIsFilterDropdownOpen(false)}></div>
                            <div className="absolute right-0 bottom-full mb-1.5 z-30 w-44 bg-white rounded-xl shadow-xl border border-[#E7E5E4] py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                {filterOptions.map((opt) => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => {
                                            setStatusFilter(opt.value);
                                            setPage(1);
                                            setIsFilterDropdownOpen(false);
                                        }}
                                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-medium transition-colors text-left cursor-pointer hover:bg-amber-50 ${statusFilter === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-stone-700"}`}
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
            </div>

            {/* Table or Empty state */}
            {ordersList.length === 0 ? (
                <div className="p-8 text-center text-sm text-[#78716C]">No sales found for this campaign.</div>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse min-w-150">
                        <thead>
                            <tr className="bg-[#F8F6F4] text-xs font-bold text-[#78716C] uppercase tracking-wider border-b border-[#E7E5E4] whitespace-nowrap">
                                <th className="py-3 px-4">Order ID</th>
                                <th className="py-3 px-4">Seller</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Product</th>
                                <th className="py-3 px-4 text-center">Qty</th>
                                <th className="py-3 px-4 text-center">Status</th>
                                <th className="py-3 px-4 text-right">Date</th>
                                <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E7E5E4] text-sm text-[#1A1C1C]">
                            {ordersList.map((order, index) => {
                                const orderIdStr = `${order._id}`;
                                const sellerName = (order as any).memberId?.name || (order as any).member?.name || "Guest / Direct";
                                const sellerInitials = getInitials(sellerName);
                                const productNames = order.items?.map((i) => i.productName).join(", ") || "";
                                const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

                                return (
                                    <tr key={order._id || index} onClick={() => setSelectedOrder(order)} className="hover:bg-[#FCFBFA] transition-colors whitespace-nowrap cursor-pointer">
                                        <td className="py-3.5 px-4 font-semibold text-xs text-[#D97706] whitespace-nowrap">{orderIdStr}</td>
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-2.5">
                                                <span className="w-7 h-7 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-xs shrink-0">{sellerInitials}</span>
                                                <span className="font-semibold text-xs text-[#1A1C1C]">{sellerName}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 font-medium text-xs text-[#1A1C1C]">{order.customerName}</td>
                                        <td className="py-3.5 px-4 font-medium text-xs text-[#1A1C1C] max-w-40 truncate" title={productNames}>
                                            {productNames}
                                        </td>
                                        <td className="py-3.5 px-4 text-center font-medium text-xs">{order.totalPackage}</td>
                                        <td className="py-3.5 px-4 text-center">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                                        </td>
                                        <td className="py-3.5 px-4 text-right text-xs text-[#78716C]">{dateStr}</td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedOrder(order);
                                                }}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-[#D97706] hover:underline cursor-pointer"
                                            >
                                                <Eye size={14} />
                                                <span>View</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {pagination.totalPages && pagination.totalPages > 1 ? (
                        <div className="p-4 border-t border-[#E7E5E4]">
                            <Pagination meta={pagination} onPageChange={setPage} itemName="ORDERS" />
                        </div>
                    ) : null}
                </div>
            )}

            {/* Order Details Modal */}
            {activeSelectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <button onClick={() => setSelectedOrder(null)} className="cursor-pointer absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                            <X size={20} />
                        </button>

                        <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-6 flex flex-wrap items-center gap-1.5">
                            <span>Order Details -</span>
                            <span className="text-xs sm:text-sm font-semibold font-mono text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 break-all">{activeSelectedOrder._id}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3 bg-[#FAFAF9] p-4 rounded-xl border border-[#E7E5E4]">
                                <h4 className="font-bold text-xs text-[#78716C] uppercase tracking-wider border-b pb-2">Customer Info</h4>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Name:</span> {activeSelectedOrder.customerName}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Email:</span> {activeSelectedOrder.customerEmail}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Phone:</span> {activeSelectedOrder.customerPhone || "N/A"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Address:</span> {(activeSelectedOrder as any).deliveryAddress?.streetAddress || activeSelectedOrder.address?.street}, {(activeSelectedOrder as any).deliveryAddress?.city || activeSelectedOrder.address?.city},{" "}
                                    {(activeSelectedOrder as any).deliveryAddress?.postalCode || activeSelectedOrder.address?.postalCode}
                                </p>
                            </div>
                            <div className="space-y-3 bg-[#FAFAF9] p-4 rounded-xl border border-[#E7E5E4]">
                                <h4 className="font-bold text-xs text-[#78716C] uppercase tracking-wider border-b pb-2">Campaign & Seller</h4>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Seller Name:</span> {(activeSelectedOrder as any).memberId?.name || (activeSelectedOrder as any).member?.name || "Guest / Direct"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Seller Email:</span> {(activeSelectedOrder as any).memberId?.email || (activeSelectedOrder as any).member?.email || "N/A"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Group Name:</span> {(activeSelectedOrder as any).groupId?.name || (activeSelectedOrder as any).group?.name || "N/A"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Campaign Name:</span> {(activeSelectedOrder as any).campaignId?.name || (activeSelectedOrder as any).campaign?.name || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-xs text-[#78716C] uppercase tracking-wider border-b pb-2 mb-3">Items Ordered</h4>
                            <div className="space-y-2">
                                {activeSelectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div>
                                            <p className="font-bold text-gray-900">{item.productName || (item as any).product?.name}</p>
                                            <p className="text-[11px] text-gray-500">
                                                Qty: {item.quantity} x {item.singlePrice || (item as any).price} SEK
                                            </p>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.lineTotal || (item.quantity || 1) * ((item as any).price || item.singlePrice || 0)} SEK</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center font-extrabold text-sm pt-3 border-t">
                                    <span>Total Price</span>
                                    <span className="text-[#D97706]">{(activeSelectedOrder as any).totalAmount || activeSelectedOrder.totalPrice} SEK</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t pt-5">
                            {(role as string) === "SUPER_ADMIN" || (role as string) === "ADMIN" ? (
                                <div className="flex items-center gap-3 relative">
                                    <span className="font-bold text-xs text-gray-700 uppercase">Update Status:</span>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsStatusDropdownOpen((prev) => !prev)}
                                            className="flex items-center gap-2 px-3.5 py-1.5 border rounded-xl text-xs font-semibold focus:outline-none bg-white border-gray-200 shadow-2xs hover:border-[#D97706] transition-all capitalize cursor-pointer"
                                        >
                                            <span className={`inline-block w-2 h-2 rounded-full ${activeSelectedOrder.status === "delivered" ? "bg-green-500" : activeSelectedOrder.status === "pending" ? "bg-yellow-500" : "bg-red-500"}`}></span>
                                            <span className="text-gray-800">{activeSelectedOrder.status}</span>
                                            <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${isStatusDropdownOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {isStatusDropdownOpen && (
                                            <>
                                                <div className="fixed inset-0 z-20" onClick={() => setIsStatusDropdownOpen(false)}></div>
                                                <div className="absolute bottom-full mb-2 left-0 z-30 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                                    {[
                                                        { value: "pending", label: "Pending", color: "bg-yellow-500", bg: "hover:bg-yellow-50 text-yellow-800" },
                                                        { value: "delivered", label: "Delivered", color: "bg-green-600", bg: "hover:bg-green-50 text-green-900" },
                                                        { value: "cancelled", label: "Cancelled", color: "bg-red-500", bg: "hover:bg-red-50 text-red-800" },
                                                    ].map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            type="button"
                                                            onClick={() => {
                                                                handleStatusChange(activeSelectedOrder._id!, opt.value as TOrderStatus);
                                                                setIsStatusDropdownOpen(false);
                                                            }}
                                                            className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-medium transition-colors text-left cursor-pointer ${opt.bg} ${activeSelectedOrder.status === opt.value ? "bg-gray-50 font-bold" : ""}`}
                                                        >
                                                            <span className={`w-2 h-2 rounded-full ${opt.color}`}></span>
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-xs text-gray-700 uppercase">Status:</span>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(activeSelectedOrder.status)}`}>{activeSelectedOrder.status}</span>
                                </div>
                            )}
                            <button onClick={() => setSelectedOrder(null)} className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all text-xs cursor-pointer">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerCampaignOrdersList;
