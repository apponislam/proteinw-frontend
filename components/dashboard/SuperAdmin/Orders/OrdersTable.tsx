"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useGetAllOrdersQuery, useGetRunningCampaignOrdersQuery, useUpdateOrderStatusMutation, TOrder, TOrderStatus } from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/redux/features/auth/authSlice";

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
    const user = useAppSelector(currentUser);
    const isAdminOnly = user?.role === "ADMIN";

    const queryParams = {
        page,
        limit: 10,
        status: statusFilter ? (statusFilter as TOrderStatus) : undefined,
    };

    const { data: superAdminOrdersData, isLoading: isSuperAdminLoading } = useGetAllOrdersQuery(queryParams, {
        skip: isAdminOnly,
    });
    const { data: adminOrdersData, isLoading: isAdminLoading } = useGetRunningCampaignOrdersQuery(queryParams, {
        skip: !isAdminOnly,
    });

    const ordersData = isAdminOnly ? adminOrdersData : superAdminOrdersData;
    const isLoading = isAdminOnly ? isAdminLoading : isSuperAdminLoading;

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
        <div className="bg-white p-6 rounded-lg shadow-[0px_0px_14px_0px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
                <div>
                    <h2 className="text-xl font-bold text-[#1A1C1C]">All Orders</h2>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                    <div className="text-[#78716C] text-sm font-medium">Filters:</div>
                    <div className="flex items-center gap-3">
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setPage(1);
                            }}
                            className="px-3 py-2 border border-[#F5F5F4] rounded-lg text-sm focus:outline-none focus:border-[#D97706] bg-white cursor-pointer"
                        >
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
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
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-[#FAFAF9]">
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ORDER ID</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">SELLER</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">GROUP</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">CUSTOMER NAME</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">PRODUCT</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">QTY</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">STATUS</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">DATE</th>
                                    <th className="px-4 py-3 text-[#78716C] text-xs font-medium uppercase tracking-wider">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ordersList.map((order, index) => {
                                    const orderIdStr = `#ORD-${order._id?.slice(-8).toUpperCase()}`;
                                    const sellerName = (order.memberId as any)?.name || "Guest / Direct";
                                    const sellerInitials = getInitials(sellerName);
                                    const groupName = (order.groupId as any)?.name || "N/A";
                                    const productNames = order.items.map((i) => i.productName).join(", ");
                                    const dateStr = order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A";

                                    return (
                                        <tr key={order._id || index} className="border-b border-[#F5F5F4] last:border-0 hover:bg-[#FFDEA8] transition-colors duration-200">
                                            <td className="px-4 py-4">
                                                <span className="text-[#D97706] font-bold">{orderIdStr}</span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-3">
                                                    <span className="w-8 h-8 rounded-md bg-[#D97706] text-white flex items-center justify-center font-bold text-xs">{sellerInitials}</span>
                                                    <div className="text-[#1A1C1C] font-medium">{sellerName}</div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{groupName}</td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.customerName}</td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium max-w-[200px] truncate" title={productNames}>
                                                {productNames}
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{order.totalPackage}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>{order.status}</span>
                                            </td>
                                            <td className="px-4 py-4 text-[#1A1C1C] font-medium">{dateStr}</td>
                                            <td className="px-4 py-4">
                                                <button onClick={() => setSelectedOrder(order)} className="text-[#D97706] hover:underline text-sm font-bold">
                                                    View
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <div className="text-[#78716C] text-sm">
                            SHOWING {pagination.total > 0 ? (pagination.page - 1) * pagination.limit + 1 : 0} TO {Math.min(pagination.page * pagination.limit, pagination.total)} OF {pagination.total} ORDERS
                        </div>
                        {pagination.totalPages > 1 && (
                            <div className="flex items-center gap-2">
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                                    <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all ${p === page ? "bg-[#D97706] text-white" : "text-[#78716C] hover:bg-[#F5F5F4]"}`}>
                                        {p}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* Order Details & Actions Modal */}
            {activeSelectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
                    <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl">
                        <button onClick={() => setSelectedOrder(null)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors text-lg">
                            ✕
                        </button>

                        <h3 className="text-2xl font-bold text-gray-900 mb-6">
                            Order Details - <span className="text-[#D97706]">#ORD-{activeSelectedOrder._id?.slice(-8).toUpperCase()}</span>
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Customer Info</h4>
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
                                    <span className="font-semibold text-gray-600">Address:</span> {activeSelectedOrder.address.street}, {activeSelectedOrder.address.city}, {activeSelectedOrder.address.postalCode}, {activeSelectedOrder.address.country}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-gray-900 border-b pb-2">Campaign & Seller</h4>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Seller Name:</span> {(activeSelectedOrder.memberId as any)?.name || "Guest / Direct"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Seller Email:</span> {(activeSelectedOrder.memberId as any)?.email || "N/A"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Group Name:</span> {(activeSelectedOrder.groupId as any)?.name || "N/A"}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold text-gray-600">Campaign Name:</span> {(activeSelectedOrder.campaignId as any)?.name || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="font-bold text-gray-900 border-b pb-2 mb-4">Items Ordered</h4>
                            <div className="space-y-3">
                                {activeSelectedOrder.items.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center text-sm bg-gray-50 p-3 rounded-xl">
                                        <div>
                                            <p className="font-semibold text-gray-900">{item.productName}</p>
                                            <p className="text-xs text-gray-500">
                                                Qty: {item.quantity} x {item.singlePrice} SEK
                                            </p>
                                        </div>
                                        <span className="font-bold text-gray-900">{item.lineTotal} SEK</span>
                                    </div>
                                ))}
                                <div className="flex justify-between items-center font-extrabold text-base pt-3 border-t">
                                    <span>Total Price</span>
                                    <span className="text-[#D97706]">{activeSelectedOrder.totalPrice} SEK</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t pt-6">
                            <div className="flex items-center gap-3">
                                <span className="font-bold text-gray-700">Update Status:</span>
                                <select value={activeSelectedOrder.status} onChange={(e) => handleStatusChange(activeSelectedOrder._id!, e.target.value as TOrderStatus)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#D97706] bg-white cursor-pointer">
                                    <option value="pending">Pending</option>
                                    <option value="confirmed">Confirmed</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="px-6 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-all text-sm">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrdersTable;
