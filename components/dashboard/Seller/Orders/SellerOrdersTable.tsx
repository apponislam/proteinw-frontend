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

const SellerOrdersTable = () => {
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
    };

    const { data: sellerOrdersData, isLoading } = useGetOrdersByMemberQuery(queryParams);

    const ordersList = sellerOrdersData?.data || [];
    const pagination = sellerOrdersData?.meta || { page: 1, limit: 10, total: 0, totalPages: 1 };

    const activeSelectedOrder = selectedOrder ? ordersList.find((o) => o._id === selectedOrder._id) || selectedOrder : null;

    return (
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
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
                    <div className="overflow-x-auto">
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
                                                <span className="text-[#D97706] font-bold">{orderIdStr}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="text-[#1A1C1C] font-medium">{order.customerName}</div>
                                                <div className="text-[#78716C] text-xs">{order.customerEmail}</div>
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium max-w-50 truncate" title={productNames}>
                                                {productNames}
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.totalPackage}</td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-bold">{order.totalPrice} SEK</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{dateStr}</td>
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
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
                        <button onClick={() => setSelectedOrder(null)} className="cursor-pointer absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors text-lg">
                            ✕
                        </button>

                        <div className="flex items-center justify-between mb-6 pr-8">
                            <h3 className="text-2xl font-bold text-gray-900">
                                Order Details - <span className="text-[#D97706]">#ORD-{activeSelectedOrder._id?.slice(-8).toUpperCase()}</span>
                            </h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(activeSelectedOrder.status)}`}>
                                {activeSelectedOrder.status}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Customer Details</h4>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Name:</span> {activeSelectedOrder.customerName}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Email:</span> {activeSelectedOrder.customerEmail}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Phone:</span> {activeSelectedOrder.customerPhone || "N/A"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Shipping Address:</span> {activeSelectedOrder.address.street}, {activeSelectedOrder.address.city}, {activeSelectedOrder.address.postalCode}, {activeSelectedOrder.address.locality}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Order Information</h4>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Order Date:</span> {activeSelectedOrder.createdAt ? new Date(activeSelectedOrder.createdAt).toLocaleString() : "N/A"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Group:</span> {(activeSelectedOrder.groupId as any)?.name || "N/A"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Campaign:</span> {(activeSelectedOrder.campaignId as any)?.name || "N/A"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Total Packages:</span> {activeSelectedOrder.totalPackage}
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Purchased Items</h4>
                            <div className="space-y-3">
                                {activeSelectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.productName}</p>
                                            <p className="text-xs text-gray-500">
                                                Quantity: {item.quantity} x {item.singlePrice} SEK
                                            </p>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.lineTotal} SEK</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center font-extrabold text-base pt-3 border-t">
                                    <span>Total Amount</span>
                                    <span className="text-[#D97706]">{activeSelectedOrder.totalPrice} SEK</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end border-t pt-6">
                            <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all text-sm cursor-pointer">
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
