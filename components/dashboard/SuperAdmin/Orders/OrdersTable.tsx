"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, Check, X } from "lucide-react";
import { useGetAllOrdersQuery, useGetRunningCampaignOrdersQuery, useGetOrdersByMemberQuery, useUpdateOrderStatusMutation, TOrder, TOrderStatus } from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";
import Pagination from "@/components/dashboard/Pagination";

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

const OrdersTable = () => {
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

    const queryParams = {
        page,
        limit: 10,
        status: statusFilter ? (statusFilter as TOrderStatus) : undefined,
    };

    const { data: superAdminOrdersData, isLoading: isSuperAdminLoading } = useGetAllOrdersQuery(queryParams, {
        skip: role !== "SUPER_ADMIN",
    });
    const { data: adminOrdersData, isLoading: isAdminLoading } = useGetRunningCampaignOrdersQuery(queryParams, {
        skip: role !== "ADMIN",
    });
    const { data: sellerOrdersData, isLoading: isSellerLoading } = useGetOrdersByMemberQuery(queryParams, {
        skip: role !== "SELLER",
    });

    const getOrdersData = () => {
        if (role === "SUPER_ADMIN") return { data: superAdminOrdersData, loading: isSuperAdminLoading };
        if (role === "ADMIN") return { data: adminOrdersData, loading: isAdminLoading };
        return { data: sellerOrdersData, loading: isSellerLoading };
    };

    const { data: ordersData, loading: isLoading } = getOrdersData();
    const [updateOrderStatus] = useUpdateOrderStatusMutation();

    const ordersList = ordersData?.data || [];
    const pagination = ordersData?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

    // Sync selected order status if it updates in the list
    const activeSelectedOrder = selectedOrder ? ordersList.find((o) => o._id === selectedOrder._id) || selectedOrder : null;

    const handleStatusChange = async (orderId: string, newStatus: TOrderStatus) => {
        try {
            await updateOrderStatus({ orderId, status: newStatus }).unwrap();
            toast.success("Order status updated successfully!");
        } catch (err: any) {
            toast.error(err?.data?.message || "Failed to update order status");
        }
    };

    return (
        <div className="bg-white p-3 sm:p-4 md:p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Orders</h2>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filters:</div>
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
                            className="flex items-center gap-2.5 px-4 py-2 bg-white border border-[#E7E5E4] hover:border-[#D97706] rounded-xl text-sm font-semibold text-[#1A1C1C] shadow-xs transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D97706]/30"
                        >
                            <span className={`w-2.5 h-2.5 rounded-full ${selectedFilterOption.color}`}></span>
                            <span>{selectedFilterOption.label}</span>
                            <ChevronDown size={16} className={`text-[#78716C] transition-transform duration-200 ${isFilterDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isFilterDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-20" onClick={() => setIsFilterDropdownOpen(false)}></div>
                                <div className="absolute right-0 mt-2 z-30 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                                    {filterOptions.map((opt) => (
                                        <button
                                            key={opt.value}
                                            type="button"
                                            onClick={() => {
                                                setStatusFilter(opt.value);
                                                setPage(1);
                                                setIsFilterDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-3.5 py-2.5 text-sm font-medium transition-colors text-left cursor-pointer hover:bg-amber-50/60 ${statusFilter === opt.value ? "bg-amber-50 text-[#D97706] font-bold" : "text-gray-700"}`}
                                        >
                                            <div className="flex items-center gap-2.5">
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
            </div>

            {isLoading ? (
                <div className="text-center py-12">
                    <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#78716C] text-sm">Loading orders...</p>
                </div>
            ) : ordersList.length === 0 ? (
                <div className="text-center py-12 text-[#78716C]">No orders found matching your filters.</div>
            ) : (
                <>
                    {/* Mobile & Tablet Cards View (< md) */}
                    <div className="block md:hidden space-y-3">
                        {ordersList.map((order, index) => {
                            const orderIdStr = `${order._id}`;
                            const sellerName = (order.memberId as any)?.name || "Guest / Direct";
                            const sellerInitials = getInitials(sellerName);
                            const groupName = (order.groupId as any)?.name || "N/A";
                            const productNames = order.items.map((i) => i.productName).join(", ");
                            const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

                            return (
                                <div key={order._id || index} onClick={() => setSelectedOrder(order)} className="bg-[#FAFAF9] hover:bg-[#FFDEA8] p-3.5 sm:p-4 rounded-xl border border-[#E7E5E4] transition-colors cursor-pointer space-y-3 shadow-2xs">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[#D97706] font-bold text-xs sm:text-sm font-mono truncate max-w-[60%]">{orderIdStr}</span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize shrink-0 ${getStatusColor(order.status)}`}>{order.status}</span>
                                    </div>

                                    <div className="flex justify-between items-start text-xs text-[#78716C] gap-2">
                                        <div className="min-w-0">
                                            <div className="text-[#1A1C1C] font-semibold text-sm truncate">{order.customerName}</div>
                                            <div className="flex items-center gap-1.5 mt-1 min-w-0">
                                                <span className="w-5 h-5 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-[10px] shrink-0">{sellerInitials}</span>
                                                <span className="text-xs text-[#1A1C1C] font-medium truncate">{sellerName}</span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-[#1A1C1C] font-bold text-sm">{order.totalPrice} SEK</div>
                                            <div className="mt-0.5 text-[11px]">
                                                {order.totalPackage} QTY • {dateStr}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#E7E5E4]/60 flex items-center justify-between text-xs gap-2">
                                        <div className="min-w-0 flex-1">
                                            <span className="text-stone-500 font-semibold block text-[10px] truncate">GROUP: {groupName}</span>
                                            <span className="text-[#78716C] truncate block" title={productNames}>
                                                {productNames}
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOrder(order);
                                            }}
                                            className="inline-flex items-center gap-1 text-[#D97706] font-bold shrink-0 hover:underline cursor-pointer px-2 py-1 bg-amber-50 sm:bg-transparent rounded-md sm:rounded-none"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Table View (>= md) */}
                    <div className="hidden md:block overflow-x-auto max-w-full">
                        <table className="w-full min-w-225 text-left text-sm">
                            <thead>
                                <tr className="bg-[#FAFAF9]">
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDER ID</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLER</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">CUSTOMER</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PRODUCT</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">QTY</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DATE</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((order, index) => {
                                    const orderIdStr = `${order._id}`;
                                    const sellerName = (order.memberId as any)?.name || "Guest / Direct";
                                    const sellerInitials = getInitials(sellerName);
                                    const groupName = (order.groupId as any)?.name || "N/A";
                                    const productNames = order.items.map((i) => i.productName).join(", ");
                                    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

                                    return (
                                        <tr key={order._id || index} onClick={() => setSelectedOrder(order)} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200 cursor-pointer">
                                            <td className="px-4 py-3.5">
                                                <span className="text-[#D97706] font-semibold text-xs whitespace-nowrap">{orderIdStr}</span>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <div className="flex items-center gap-2.5 whitespace-nowrap">
                                                    <span className="w-7 h-7 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-[11px] shrink-0">{sellerInitials}</span>
                                                    <div className="text-[#1A1C1C] font-medium">{sellerName}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3.5 text-[#1A1C1C] font-medium whitespace-nowrap">{groupName}</td>
                                            <td className="px-4 py-3.5 text-[#1A1C1C] font-medium whitespace-nowrap">{order.customerName}</td>
                                            <td className="px-4 py-3.5 text-[#1A1C1C] font-medium max-w-50 truncate" title={productNames}>
                                                {productNames}
                                            </td>
                                            <td className="px-4 py-3.5 text-[#1A1C1C] font-medium whitespace-nowrap">{order.totalPackage}</td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                                            </td>
                                            <td className="px-4 py-3.5 text-[#1A1C1C] font-medium whitespace-nowrap">{dateStr}</td>
                                            <td className="px-4 py-3.5 whitespace-nowrap">
                                                <button onClick={() => setSelectedOrder(order)} className="cursor-pointer text-[#D97706] hover:underline text-sm font-bold">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Component */}
                    <Pagination meta={pagination} onPageChange={setPage} itemName="ORDERS" />
                </>
            )}
            {/* Order Details & Actions Modal */}
            {activeSelectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 md:p-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        <button onClick={() => setSelectedOrder(null)} className="cursor-pointer absolute top-5 right-5 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
                            <X size={20} />
                        </button>

                        <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-6 flex flex-wrap items-center gap-1.5">
                            <span>Order Details -</span>
                            <span className="text-xs sm:text-sm font-semibold font-mono text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 break-all">{activeSelectedOrder._id}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-3 bg-[#FAFAF9] p-4 rounded-xl border border-[#E7E5E4]">
                                <h4 className="font-bold text-xs text-[#78716C] uppercase tracking-wider border-b pb-2">Customer Details</h4>
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
                                    <span className="font-semibold text-gray-600">Shipping Address:</span> {activeSelectedOrder.address.street}, {activeSelectedOrder.address.city}, {activeSelectedOrder.address.postalCode}, {activeSelectedOrder.address.locality}
                                </p>
                            </div>
                            <div className="space-y-3 bg-[#FAFAF9] p-4 rounded-xl border border-[#E7E5E4]">
                                <h4 className="font-bold text-xs text-[#78716C] uppercase tracking-wider border-b pb-2">Campaign & Seller</h4>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Seller Name:</span> {(activeSelectedOrder.memberId as any)?.name || "Guest / Direct"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Seller Email:</span> {(activeSelectedOrder.memberId as any)?.email || "N/A"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Group Name:</span> {(activeSelectedOrder.groupId as any)?.name || "N/A"}
                                </p>
                                <p className="text-xs text-[#1A1C1C]">
                                    <span className="font-semibold text-gray-600">Campaign Name:</span> {(activeSelectedOrder.campaignId as any)?.name || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-bold text-xs text-[#78716C] uppercase tracking-wider border-b pb-2 mb-3">Purchased Items</h4>
                            <div className="space-y-2">
                                {activeSelectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-xs bg-gray-50 p-3 rounded-xl border border-gray-100">
                                        <div>
                                            <p className="font-bold text-gray-900">{item.productName}</p>
                                            <p className="text-[11px] text-gray-500">
                                                Qty: {item.quantity} x {item.singlePrice} SEK
                                            </p>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.lineTotal} SEK</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center font-extrabold text-sm pt-3 border-t">
                                    <span>Total Amount</span>
                                    <span className="text-[#D97706]">{activeSelectedOrder.totalPrice} SEK</span>
                                </div>
                            </div>
                        </div>

                        <div className="border-t pt-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
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
                                <button onClick={() => setSelectedOrder(null)} className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all text-xs cursor-pointer">
                                    Close
                                </button>
                            </div>
                            <p className="text-[11px] font-medium text-amber-800 bg-amber-50/80 border border-amber-200/60 p-2.5 rounded-lg mt-3 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D97706] shrink-0"></span>
                                <span>Uppdatera statusen på dina kundbeställningar för att enkelt hålla koll på dina ordrar.</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
