"use client";

import React, { useState } from "react";
import { ChevronDown, Check, Eye } from "lucide-react";
import { useGetOrdersByMemberQuery, TOrder, TOrderStatus } from "@/redux/features/order/orderApi";
import Pagination from "@/components/dashboard/Pagination";

const getStatusColor = (status: string) => {
    switch (status) {
        case "confirmed":
        case "delivered":
            return "bg-green-100 text-green-800";
        case "pending":
            return "bg-yellow-100 text-yellow-800";
        case "cancelled":
            return "bg-red-100 text-red-800";
        case "shipped":
            return "bg-blue-100 text-blue-800";
        default:
            return "bg-gray-100 text-gray-800";
    }
};

interface SellerOrdersTableProps {
    campaignId?: string;
}

const SellerOrdersTable: React.FC<SellerOrdersTableProps> = ({ campaignId }) => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const filterOptions = [
        { value: "", label: "All Status", color: "bg-gray-400" },
        { value: "pending", label: "Pending", color: "bg-yellow-500" },
        { value: "confirmed", label: "Confirmed", color: "bg-green-500" },
        { value: "shipped", label: "Shipped", color: "bg-blue-500" },
        { value: "delivered", label: "Delivered", color: "bg-green-600" },
        { value: "cancelled", label: "Cancelled", color: "bg-red-500" },
    ];

    const selectedFilterOption = filterOptions.find((opt) => opt.value === statusFilter) || filterOptions[0];

    const queryParams = {
        page,
        limit: 10,
        status: statusFilter ? (statusFilter as TOrderStatus) : undefined,
        campaignId: campaignId || undefined,
    };

    const { data: sellerOrdersData, isLoading } = useGetOrdersByMemberQuery(queryParams);

    const ordersList = sellerOrdersData?.data || [];
    const pagination = sellerOrdersData?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

    const activeSelectedOrder = selectedOrder ? ordersList.find((o) => o._id === selectedOrder._id) || selectedOrder : null;

    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">My Customer Orders</h2>
                    <p className="text-[#78716C] text-xs mt-1">Track orders placed through your personal referral link</p>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filter:</div>
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
                    <p className="text-[#78716C] text-sm">Loading your orders...</p>
                </div>
            ) : ordersList.length === 0 ? (
                <div className="text-center py-12 text-[#78716C]">No customer orders found.</div>
            ) : (
                <>
                    {/* Mobile & Tablet Cards View (< md) */}
                    <div className="block md:hidden space-y-3">
                        {ordersList.map((order, index) => {
                            const orderIdStr = `#ORD-${order._id?.slice(-8).toUpperCase()}`;
                            const productNames = order.items.map((i) => i.productName).join(", ");
                            const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

                            return (
                                <div key={order._id || index} onClick={() => setSelectedOrder(order)} className="bg-[#FAFAF9] hover:bg-[#FFDEA8] p-4 rounded-xl border border-[#E7E5E4] transition-colors cursor-pointer space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[#D97706] font-bold text-sm">{orderIdStr}</span>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                                    </div>

                                    <div className="flex justify-between items-start text-xs text-[#78716C]">
                                        <div>
                                            <div className="text-[#1A1C1C] font-semibold text-sm">{order.customerName}</div>
                                            <div className="truncate max-w-50">{order.customerEmail}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[#1A1C1C] font-bold text-sm">{order.totalPrice} SEK</div>
                                            <div>
                                                {order.totalPackage} QTY • {dateStr}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#E7E5E4]/60 flex items-center justify-between text-xs">
                                        <span className="text-[#78716C] truncate max-w-45" title={productNames}>
                                            {productNames}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedOrder(order);
                                            }}
                                            className="inline-flex items-center gap-1 text-[#D97706] font-bold shrink-0 hover:underline"
                                        >
                                            <Eye size={14} /> View Details
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Desktop Table View (>= md) */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#FAFAF9]">
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDER ID</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">CUSTOMER</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PRODUCTS</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">QTY</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">TOTAL</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DATE</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((order, index) => {
                                    const orderIdStr = `#ORD-${order._id?.slice(-8).toUpperCase()}`;
                                    const productNames = order.items.map((i) => i.productName).join(", ");
                                    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

                                    return (
                                        <tr key={order._id || index} onClick={() => setSelectedOrder(order)} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200 cursor-pointer">
                                            <td className="px-4 py-4">
                                                <span className="text-[#D97706] font-bold text-sm whitespace-nowrap">{orderIdStr}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-[#1A1C1C] font-medium text-sm">{order.customerName}</div>
                                                <div className="text-[#78716C] text-xs truncate max-w-40">{order.customerEmail}</div>
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium max-w-44 sm:max-w-50 truncate text-sm" title={productNames}>
                                                {productNames}
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium text-sm">{order.totalPackage}</td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-bold text-sm whitespace-nowrap">{order.totalPrice} SEK</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium text-sm whitespace-nowrap">{dateStr}</td>
                                            <td className="px-4 py-4">
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedOrder(order);
                                                    }}
                                                    className="inline-flex items-center gap-1 cursor-pointer text-[#D97706] hover:underline text-sm font-bold"
                                                >
                                                    <Eye size={16} /> View
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

            {/* Seller Order Details Modal */}
            {activeSelectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2.5 sm:p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-2xl sm:rounded-[24px] max-w-2xl w-full max-h-[92vh] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative shadow-2xl">
                        <button onClick={() => setSelectedOrder(null)} className="cursor-pointer absolute top-3.5 right-3.5 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors text-lg p-1 bg-stone-100 hover:bg-stone-200 rounded-full w-8 h-8 flex items-center justify-center">
                            ✕
                        </button>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 mb-6 pr-8">
                            <h3 className="text-lg sm:text-2xl font-bold text-gray-900 break-all">
                                Order Details - <br className="md:hidden" /> <span className="text-[#D97706]">#ORD-{activeSelectedOrder._id?.slice(-8).toUpperCase()}</span>
                            </h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize shrink-0 ${getStatusColor(activeSelectedOrder.status)}`}>{activeSelectedOrder.status}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-4 sm:mb-8">
                            <div className="space-y-2.5 sm:space-y-3.5 bg-stone-50/70 p-3.5 sm:p-4 rounded-xl md:bg-transparent md:p-0">
                                <h4 className="font-bold text-gray-900 border-b pb-2 text-sm sm:text-base">Customer Details</h4>
                                <p className="text-xs sm:text-sm wrap-break-word">
                                    <span className="font-semibold text-gray-600">Name:</span> {activeSelectedOrder.customerName}
                                </p>
                                <p className="text-xs sm:text-sm break-all">
                                    <span className="font-semibold text-gray-600">Email:</span> {activeSelectedOrder.customerEmail}
                                </p>
                                <p className="text-xs sm:text-sm">
                                    <span className="font-semibold text-gray-600">Phone:</span> {activeSelectedOrder.customerPhone || "N/A"}
                                </p>
                                <p className="text-xs sm:text-sm leading-relaxed wrap-break-word">
                                    <span className="font-semibold text-gray-600">Shipping Address:</span> {activeSelectedOrder.address.street}, {activeSelectedOrder.address.city}, {activeSelectedOrder.address.postalCode}, {activeSelectedOrder.address.locality}
                                </p>
                            </div>
                            <div className="space-y-2.5 sm:space-y-3.5 bg-stone-50/70 p-3.5 sm:p-4 rounded-xl md:bg-transparent md:p-0">
                                <h4 className="font-bold text-gray-900 border-b pb-2 text-sm sm:text-base">Order Information</h4>
                                <p className="text-xs sm:text-sm">
                                    <span className="font-semibold text-gray-600">Order Date:</span> {activeSelectedOrder.createdAt ? new Date(activeSelectedOrder.createdAt).toLocaleString() : "N/A"}
                                </p>
                                <p className="text-xs sm:text-sm">
                                    <span className="font-semibold text-gray-600">Group:</span> {(activeSelectedOrder.groupId as any)?.name || "N/A"}
                                </p>
                                <p className="text-xs sm:text-sm">
                                    <span className="font-semibold text-gray-600">Campaign:</span> {(activeSelectedOrder.campaignId as any)?.name || "N/A"}
                                </p>
                                <p className="text-xs sm:text-sm">
                                    <span className="font-semibold text-gray-600">Total Packages:</span> {activeSelectedOrder.totalPackage}
                                </p>
                            </div>
                        </div>

                        <div className="mb-4 sm:mb-8">
                            <h4 className="font-bold text-gray-900 border-b pb-2 mb-3 sm:mb-4 text-sm sm:text-base">Purchased Items</h4>
                            <div className="space-y-2.5 sm:space-y-3">
                                {activeSelectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex flex-row justify-between items-center text-xs sm:text-sm bg-gray-50 p-3 rounded-xl gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-gray-900 truncate">{item.productName}</p>
                                            <p className="text-[11px] sm:text-xs text-gray-500">
                                                Qty: {item.quantity} × {item.singlePrice} SEK
                                            </p>
                                        </div>
                                        <span className="font-bold text-gray-900 whitespace-nowrap text-xs sm:text-sm">{item.lineTotal} SEK</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center font-extrabold text-sm sm:text-base pt-3 border-t">
                                    <span>Total Amount</span>
                                    <span className="text-[#D97706]">{activeSelectedOrder.totalPrice} SEK</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end border-t pt-3 sm:pt-6">
                            <button onClick={() => setSelectedOrder(null)} className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all text-sm cursor-pointer text-center">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerOrdersTable;
