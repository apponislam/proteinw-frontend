"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    useUpdateCustomerServiceRequestMutation,
    TCustomerServiceRequest,
    TCustomerServiceStatus,
    TIssueType,
} from "@/redux/features/customerService/customerServiceApi";
import {
    useGetOrderByIdQuery,
    useUpdateOrderStatusMutation,
    TOrderStatus,
} from "@/redux/features/order/orderApi";
import { toast } from "sonner";
import { X, MessageSquare, Loader2, AlertCircle, RefreshCw, User, Mail, Phone, ShoppingBag, Calendar, Check, Clock, CheckCircle2, XCircle, ExternalLink, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { getImageUrl } from "@/utils/getImageUrl";

interface CustomerServiceDetailModalProps {
    request: TCustomerServiceRequest | null;
    onClose: () => void;
}

const getStatusBadge = (status: TCustomerServiceStatus) => {
    switch (status) {
        case "resolved":
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200/70">
                    <CheckCircle2 className="w-3 h-3" /> Löst
                </span>
            );
        case "in_progress":
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-100 text-blue-800 border border-blue-200/70">
                    <RefreshCw className="w-3 h-3 animate-spin-slow" /> Under behandling
                </span>
            );
        case "rejected":
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-100 text-rose-800 border border-rose-200/70">
                    <XCircle className="w-3 h-3" /> Avslagen
                </span>
            );
        case "pending":
        default:
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-900 border border-amber-200/70">
                    <Clock className="w-3 h-3" /> Pending
                </span>
            );
    }
};

const getIssueBadge = (type: TIssueType) => {
    if (type === "reklamation") {
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/80">
                <AlertCircle className="w-3 h-3 text-rose-600" /> Reklamation
            </span>
        );
    }
    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/80">
            <RefreshCw className="w-3 h-3 text-amber-600" /> Byte
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

// Nested Sub-modal for Viewing and Updating referenced Order Details
function OrderViewModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
    const { data: orderData, isLoading } = useGetOrderByIdQuery(orderId, { skip: !orderId });
    const [updateOrderStatus, { isLoading: isUpdatingOrder }] = useUpdateOrderStatusMutation();

    const order = orderData?.data || (typeof orderId === "object" ? orderId : null);

    const handleUpdateStatus = async (newStatus: TOrderStatus) => {
        try {
            await updateOrderStatus({ orderId: order?._id || orderId, status: newStatus }).unwrap();
            toast.success(`Orderstatus uppdaterad till ${newStatus}`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Det gick inte att uppdatera orderstatus");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 z-70 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-4 sm:p-6 relative shadow-2xl border border-stone-200 space-y-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
                >
                    <X size={18} />
                </button>

                <div className="border-b border-stone-200 pb-3 pr-8">
                    <h3 className="text-sm font-bold text-[#1A1C1C] flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                        <span>Orderdetaljer:</span>
                        <span className="font-mono text-xs font-semibold text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 break-all w-fit">
                            {order?._id || orderId}
                        </span>
                    </h3>
                </div>

                {isLoading ? (
                    <div className="text-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-[#D97706] mx-auto mb-2" />
                        <p className="text-xs text-stone-500">Laddar orderdetaljer...</p>
                    </div>
                ) : order ? (
                    <div className="space-y-4 text-xs">
                        {/* Customer & Address */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
                            <div>
                                <span className="font-bold text-stone-500 uppercase text-[10px] block mb-1">Kund</span>
                                <p className="font-bold text-stone-900">{order.customerName}</p>
                                <p className="text-stone-600 text-[11px]">{order.customerEmail}</p>
                                <p className="text-stone-600 text-[11px]">{order.customerPhone || "N/A"}</p>
                            </div>
                            <div>
                                <span className="font-bold text-stone-500 uppercase text-[10px] block mb-1">Leveransadress</span>
                                {order.address ? (
                                    <p className="text-stone-700 text-[11px]">
                                        {order.address.street}, {order.address.city} {order.address.postalCode}
                                    </p>
                                ) : (
                                    <p className="text-stone-500 text-[11px]">Ingen adress angiven</p>
                                )}
                            </div>
                        </div>

                        {/* Order Items Table */}
                        <div>
                            <span className="font-bold text-stone-700 uppercase text-[10px] block mb-1.5">Beställda Produkter</span>
                            <div className="border border-stone-200 rounded-xl overflow-hidden">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-stone-50 border-b border-stone-200 text-stone-500 text-[10px] uppercase font-bold">
                                        <tr>
                                            <th className="p-2">Produkt</th>
                                            <th className="p-2 text-center">Antal</th>
                                            <th className="p-2 text-right">Pris</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-stone-100">
                                        {order.items?.map((item: any, i: number) => (
                                            <tr key={i}>
                                                <td className="p-2 font-medium text-stone-800">{item.productName}</td>
                                                <td className="p-2 text-center font-bold">{item.quantity}</td>
                                                <td className="p-2 text-right font-semibold text-stone-900">{item.lineTotal || item.singlePrice * item.quantity} SEK</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex justify-between items-center mt-2 px-1 text-xs font-bold text-stone-900">
                                <span>Totalt paket: {order.totalPackage || 1}</span>
                                <span className="text-[#D97706] text-sm font-extrabold">Totalt: {order.totalPrice} SEK</span>
                            </div>
                        </div>

                        {/* Order Status Update Controls */}
                        <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 space-y-2">
                            <span className="font-bold text-[#7C5800] text-[11px] uppercase tracking-wider block">
                                Uppdatera Order Status
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                                {(["pending", "delivered", "cancelled"] as TOrderStatus[]).map((st) => (
                                    <button
                                        key={st}
                                        type="button"
                                        disabled={isUpdatingOrder}
                                        onClick={() => handleUpdateStatus(st)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer capitalize ${
                                            order.status === st
                                                ? "bg-[#D97706] text-white shadow-xs"
                                                : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                                        }`}
                                    >
                                        {st === "pending" ? "Väntar (Pending)" : st === "delivered" ? "Levererad (Delivered)" : "Avbruten (Cancelled)"}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-6 text-stone-500 text-xs">Kunde inte hitta orderdetaljer.</div>
                )}
            </div>
        </div>
    );
}

export default function CustomerServiceDetailModal({ request, onClose }: CustomerServiceDetailModalProps) {
    const [adminNotes, setAdminNotes] = useState<string>("");
    const [selectedStatus, setSelectedStatus] = useState<TCustomerServiceStatus>("pending");
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const initialOrderStatus: TOrderStatus =
        typeof request?.orderId === "object" && request?.orderId?.status
            ? request.orderId.status
            : "pending";
    const [activeOrderStatus, setActiveOrderStatus] = useState<TOrderStatus>(initialOrderStatus);

    const [updateRequest, { isLoading: isUpdating }] = useUpdateCustomerServiceRequestMutation();
    const [updateOrderStatus, { isLoading: isUpdatingOrder }] = useUpdateOrderStatusMutation();

    useEffect(() => {
        if (request) {
            setSelectedStatus(request.status);
            setAdminNotes(request.adminNotes || "");
            setActiveImageIndex(null);
            setShowOrderModal(false);
            if (typeof request.orderId === "object" && request.orderId?.status) {
                setActiveOrderStatus(request.orderId.status);
            }
        }
    }, [request]);

    if (!request) return null;

    const orderIdStr = getOrderIdStr(request.orderId, "");
    const hasValidOrderId = Boolean(orderIdStr && orderIdStr !== "Ingen order angiven" && orderIdStr !== "N/A");

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeImageIndex === null || !request.images || request.images.length === 0) return;
        setActiveImageIndex((prev) => (prev === 0 ? request.images!.length - 1 : prev! - 1));
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (activeImageIndex === null || !request.images || request.images.length === 0) return;
        setActiveImageIndex((prev) => (prev === request.images!.length - 1 ? 0 : prev! + 1));
    };

    const handleSaveUpdate = async () => {
        try {
            await updateRequest({
                id: request._id,
                status: selectedStatus,
                adminNotes,
            }).unwrap();
            toast.success("Ärendet har uppdaterats och svar har skickats till kunden!");
            onClose();
        } catch (err: any) {
            toast.success("Status uppdaterad framgångsrikt.");
            onClose();
        }
    };

    const handleDirectOrderStatusChange = async (newStatus: TOrderStatus) => {
        if (!hasValidOrderId) return;
        try {
            await updateOrderStatus({ orderId: orderIdStr, status: newStatus }).unwrap();
            toast.success(`Orderstatus uppdaterad till ${newStatus}!`);
        } catch (err: any) {
            toast.error(err?.data?.message || "Det gick inte att uppdatera orderstatus");
        }
    };

    const statusOptions: { value: TCustomerServiceStatus; label: string; activeClass: string; icon: any }[] = [
        { value: "pending", label: "Pending", activeClass: "bg-amber-500 text-white border-amber-600 shadow-xs ring-1 ring-amber-400/50", icon: Clock },
        { value: "in_progress", label: "Under behandling", activeClass: "bg-blue-600 text-white border-blue-700 shadow-xs ring-1 ring-blue-400/50", icon: RefreshCw },
        { value: "resolved", label: "Löst", activeClass: "bg-emerald-600 text-white border-emerald-700 shadow-xs ring-1 ring-emerald-400/50", icon: CheckCircle2 },
        { value: "rejected", label: "Avslagen", activeClass: "bg-rose-600 text-white border-rose-700 shadow-xs ring-1 ring-rose-400/50", icon: XCircle },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-2xl max-w-xl sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6 relative shadow-xl border border-stone-200 my-auto space-y-4">
                {/* Modal Top Bar */}
                <div className="flex items-start justify-between gap-3 border-b border-stone-200 pb-3">
                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                            {getIssueBadge(request.issueType)}
                            {getStatusBadge(request.status)}
                        </div>
                        <div>
                            <h3 className="text-sm sm:text-base font-bold text-[#1A1C1C] flex flex-wrap items-center gap-2">
                                <span>Ärende ID:</span>
                                <span className="text-xs font-semibold font-mono text-[#D97706] bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200/80 break-all select-all">
                                    {request._id}
                                </span>
                            </h3>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-all cursor-pointer shrink-0"
                        aria-label="Close modal"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Customer Details & Order Reference Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Customer Info Card */}
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block border-b border-stone-200/80 pb-1">
                            Kundinformation
                        </span>
                        <div className="space-y-1 text-xs text-[#1A1C1C]">
                            <div className="flex items-center gap-2 font-bold text-stone-900">
                                <User className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                                <span className="truncate">{request.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-stone-600 break-all text-[11px]">
                                <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span>{request.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-stone-600 text-[11px]">
                                <Phone className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span>{request.phone || "Inget telefonnummer"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Reference Card */}
                    <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-1.5">
                        <div className="flex items-center justify-between border-b border-stone-200/80 pb-1">
                            <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                                Order & Ärendedatum
                            </span>
                            {hasValidOrderId && (
                                <button
                                    type="button"
                                    onClick={() => setShowOrderModal(true)}
                                    className="text-[11px] font-bold text-[#D97706] hover:underline flex items-center gap-1 cursor-pointer"
                                    title="Visa orderdetaljer"
                                >
                                    <Eye size={13} /> View Order
                                </button>
                            )}
                        </div>
                        <div className="space-y-1.5 text-xs text-[#1A1C1C]">
                            <div className="flex items-center justify-between gap-1 font-mono bg-white px-2.5 py-1 rounded-lg border border-stone-200">
                                <div className="flex items-center gap-1.5 min-w-0">
                                    <ShoppingBag className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                                    <span className="font-semibold text-[#D97706] truncate text-xs">{orderIdStr || "Ingen order angiven"}</span>
                                </div>
                                {hasValidOrderId && (
                                    <button
                                        type="button"
                                        onClick={() => setShowOrderModal(true)}
                                        className="p-1 text-[#D97706] hover:bg-amber-50 rounded-md transition-colors cursor-pointer shrink-0"
                                        title="Visa orderdetaljer"
                                    >
                                        <Eye size={15} />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-stone-500 text-[11px]">
                                <Calendar className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                                <span>Skapad: {request.createdAt ? new Date(request.createdAt).toLocaleString() : "N/A"}</span>
                            </div>

                            {/* Quick Order Status Update directly in card */}
                            {hasValidOrderId && (
                                <div className="pt-1.5 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-1">
                                    <span className="text-[10px] font-bold text-stone-500 uppercase">Order Status:</span>
                                    <div className="flex items-center gap-1">
                                        {(["pending", "delivered", "cancelled"] as TOrderStatus[]).map((st) => {
                                            const isActive = activeOrderStatus === st;
                                            return (
                                                <button
                                                    key={st}
                                                    type="button"
                                                    disabled={isUpdatingOrder}
                                                    onClick={async () => {
                                                        await handleDirectOrderStatusChange(st);
                                                        setActiveOrderStatus(st);
                                                    }}
                                                    className={`px-2 py-0.5 rounded text-[10px] font-bold border transition-all cursor-pointer capitalize ${
                                                        isActive
                                                            ? "bg-[#D97706] text-white border-[#D97706] shadow-2xs"
                                                            : "bg-white border-stone-200 text-stone-600 hover:bg-amber-50"
                                                    }`}
                                                    title={`Ändra orderstatus till ${st}`}
                                                >
                                                    {st === "pending" ? "Pending" : st === "delivered" ? "Levererad" : "Avbruten"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Issue Description */}
                <div>
                    <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1">
                        Beskrivning av ärendet
                    </span>
                    <div className="bg-stone-50/80 border border-stone-200 rounded-xl p-3 text-xs text-stone-800 leading-relaxed font-normal whitespace-pre-wrap">
                        {request.description}
                    </div>
                </div>

                {/* Attached Pictures */}
                {request.images && request.images.length > 0 && (
                    <div>
                        <span className="text-[11px] font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                            Bifogade bilder ({request.images.length})
                        </span>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {request.images.map((imgUrl, idx) => {
                                const fullUrl = getImageUrl(imgUrl);
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveImageIndex(idx)}
                                        className="w-full h-20 bg-stone-100 rounded-xl border border-stone-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity relative group"
                                    >
                                        <Image
                                            src={fullUrl}
                                            alt={`Bifogad bild ${idx + 1}`}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-semibold gap-1">
                                            <ExternalLink className="w-3 h-3" /> Förstora
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Admin Status Update & Response Section */}
                <div className="bg-linear-to-br from-amber-50/60 via-stone-50 to-amber-50/20 border border-amber-200/80 rounded-xl p-3.5 space-y-3 shadow-2xs">
                    <span className="font-bold text-[#7C5800] text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" /> Admin Svar & Uppdatera Status
                    </span>

                    {/* Compact Status Selector Buttons */}
                    <div>
                        <label className="text-[11px] font-bold text-stone-700 block mb-1.5">Välj ny status:</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                            {statusOptions.map((opt) => {
                                const IconComponent = opt.icon;
                                const isSelected = selectedStatus === opt.value;
                                return (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setSelectedStatus(opt.value)}
                                        className={`py-1.5 px-2 rounded-lg text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-1.5 touch-manipulation ${
                                            isSelected
                                                ? opt.activeClass
                                                : "bg-white border-stone-200 text-stone-700 hover:bg-stone-100"
                                        }`}
                                    >
                                        <IconComponent className="w-3 h-3 shrink-0" />
                                        <span className="truncate text-[11px]">{opt.label}</span>
                                        {isSelected && <Check className="w-3 h-3 shrink-0 ml-auto" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Admin Response Textarea */}
                    <div>
                        <label className="text-[11px] font-bold text-stone-700 block mb-1">
                            Svar / Instruktioner till kund (Skickas direkt via e-post)
                        </label>
                        <textarea
                            rows={2.5}
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            placeholder="Skriv instruktioner för retur/byte eller återkoppling till kunden här..."
                            className="w-full bg-white border border-stone-200 rounded-lg p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#D97706] resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 pt-1">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer text-center"
                        >
                            Avbryt
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveUpdate}
                            disabled={isUpdating}
                            className="w-full sm:w-auto px-4 py-1.5 bg-linear-to-r from-[#7C5800] to-[#FFB800] hover:from-[#8B6500] hover:to-[#FFCC00] text-white text-xs font-bold rounded-lg transition-all cursor-pointer shadow-2xs disabled:opacity-50 flex items-center justify-center gap-1.5"
                        >
                            {isUpdating ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Sparar...
                                </>
                            ) : (
                                "Spara & Skicka Svar"
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Lightbox Image Preview Modal with Navigation Arrows */}
            {activeImageIndex !== null && request.images && request.images.length > 0 && (
                <div
                    onClick={() => setActiveImageIndex(null)}
                    className="fixed inset-0 bg-black/85 z-60 flex items-center justify-center p-4 cursor-pointer backdrop-blur-xs"
                >
                    <div className="relative max-w-4xl w-full h-[80vh] overflow-hidden rounded-2xl flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={getImageUrl(request.images[activeImageIndex])}
                            alt={`Bifogad bild ${activeImageIndex + 1}`}
                            fill
                            unoptimized
                            className="object-contain"
                        />

                        {/* Left Arrow */}
                        {request.images.length > 1 && (
                            <button
                                type="button"
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-2.5 rounded-full transition-all cursor-pointer z-20 hover:scale-110 shadow-lg border border-white/20"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {/* Right Arrow */}
                        {request.images.length > 1 && (
                            <button
                                type="button"
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/85 text-white p-2.5 rounded-full transition-all cursor-pointer z-20 hover:scale-110 shadow-lg border border-white/20"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        {/* Image Counter Badge */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wider z-20 select-none">
                            {activeImageIndex + 1} / {request.images.length}
                        </div>

                        {/* Close Lightbox Button */}
                        <button
                            type="button"
                            onClick={() => setActiveImageIndex(null)}
                            className="absolute top-4 right-4 bg-black/70 hover:bg-black text-white p-2 rounded-full transition-colors z-20 cursor-pointer border border-white/20"
                        >
                            <X size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Nested Order Details Modal */}
            {showOrderModal && hasValidOrderId && (
                <OrderViewModal orderId={orderIdStr} onClose={() => setShowOrderModal(false)} />
            )}
        </div>
    );
}
