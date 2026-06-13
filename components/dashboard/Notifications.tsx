"use client";

import React from "react";
import { X, Bell, Trash2, MailOpen, Mail } from "lucide-react";
import {
    useGetAllContactsQuery,
    useGetUnreadCountQuery,
    useMarkAsReadMutation,
    useMarkAllAsReadMutation,
    useDeleteContactMutation
} from "@/redux/features/contact/contactApi";
import { toast } from "sonner";

interface NotificationsProps {
    isOpen: boolean;
    onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
    const [limit, setLimit] = React.useState(10);

    const { data: contactsData, isLoading, isFetching, isError } = useGetAllContactsQuery(
        { page: 1, limit },
        { skip: !isOpen }
    );
    const { data: unreadData } = useGetUnreadCountQuery(undefined, {
        skip: !isOpen,
    });
    
    const [markAsRead] = useMarkAsReadMutation();
    const [markAllAsRead] = useMarkAllAsReadMutation();
    const [deleteContact] = useDeleteContactMutation();

    const notifications = contactsData?.data || [];
    const unreadCount = unreadData?.count || 0;

    const containerRef = React.useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight - scrollTop - clientHeight < 30) {
            const hasMore = contactsData?.meta ? contactsData.meta.hasNext : false;
            if (hasMore && !isFetching) {
                setLimit((prev) => prev + 10);
            }
        }
    };

    React.useEffect(() => {
        if (!isOpen) {
            setLimit(10);
        }
    }, [isOpen]);

    const handleMarkAllAsRead = async () => {
        try {
            await markAllAsRead().unwrap();
            toast.success("All messages marked as read");
        } catch (error) {
            toast.error("Failed to mark all messages as read");
        }
    };

    const handleMarkAsRead = async (id: string) => {
        try {
            await markAsRead(id).unwrap();
        } catch (error) {
            toast.error("Failed to mark message as read");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteContact(id).unwrap();
            toast.success("Message deleted successfully");
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] z-50 flex flex-col animate-in slide-in-from-right duration-200">
                <div className="flex items-center justify-between p-6 border-b border-[#F5F5F4]">
                    <div className="flex items-center gap-3">
                        <Bell className="text-[#D97706]" />
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Message Notifications</h2>
                        {unreadCount > 0 && (
                            <span className="bg-[#D97706]/10 text-[#D97706] text-xs font-bold px-2 py-0.5 rounded-full">
                                {unreadCount} new
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F5F5F4] transition-all">
                        <X size={20} className="text-[#78716C]" />
                    </button>
                </div>

                {unreadCount > 0 && (
                    <div className="px-6 py-2 bg-[#D97706]/5 border-b border-[#D97706]/10 flex justify-between items-center">
                        <span className="text-xs text-[#78716C]">You have unread messages</span>
                        <button
                            onClick={handleMarkAllAsRead}
                            className="text-xs font-bold text-[#D97706] hover:text-[#B45309] hover:underline transition-colors"
                        >
                            Mark all as read
                        </button>
                    </div>
                )}

                <div
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex-1 overflow-y-auto p-6 space-y-4"
                >
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center h-48 space-y-2">
                            <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-sm text-gray-500">Loading notifications...</span>
                        </div>
                    ) : isError ? (
                        <div className="text-center text-red-500 py-8">
                            Failed to load notifications. Please try again.
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center space-y-3">
                            <MailOpen className="text-gray-300 w-12 h-12" />
                            <h3 className="font-bold text-gray-600">No message notifications</h3>
                            <p className="text-xs text-gray-400 max-w-[200px]">
                                When clients submit contact forms, they will show up here.
                            </p>
                        </div>
                    ) : (
                        <>
                            {notifications.map((notification) => (
                                <div
                                    key={notification._id}
                                    onClick={() => {
                                        if (!notification.isRead && notification._id) {
                                            handleMarkAsRead(notification._id);
                                        }
                                    }}
                                    className={`rounded-lg p-4 border transition-all relative group cursor-pointer ${
                                        !notification.isRead
                                            ? "bg-[#D97706]/5 border-[#D97706]/20 hover:bg-[#D97706]/10"
                                            : "bg-[#FAFAF9] border-[#F5F5F4] hover:bg-[#F5F5F4]"
                                    }`}
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-[#1A1C1C]">{notification.name}</span>
                                                {!notification.isRead && (
                                                    <span className="w-2 h-2 bg-[#D97706] rounded-full animate-pulse" />
                                                )}
                                            </div>
                                            <div className="text-[#D97706] text-sm font-medium">{notification.subject}</div>
                                        </div>
                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {!notification.isRead && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleMarkAsRead(notification._id!);
                                                    }}
                                                    className="p-1 text-gray-400 hover:text-[#D97706] rounded transition-colors"
                                                    title="Mark as read"
                                                >
                                                    <Mail size={16} />
                                                </button>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDelete(notification._id!);
                                                }}
                                                className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors"
                                                title="Delete notification"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <p className="text-[#78716C] text-sm whitespace-pre-wrap">{notification.message}</p>
                                    </div>
                                    <div className="space-y-1 text-xs border-t border-[#F5F5F4] pt-2 mt-2">
                                        {notification.phone && (
                                            <div>
                                                <span className="text-[#78716C]">Phone:</span>{" "}
                                                <span className="text-[#1A1C1C] font-medium">{notification.phone}</span>
                                            </div>
                                        )}
                                        <div>
                                            <span className="text-[#78716C]">Email:</span>{" "}
                                            <a
                                                href={`mailto:${notification.email}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[#1A1C1C] font-medium hover:text-[#D97706] hover:underline"
                                            >
                                                {notification.email}
                                            </a>
                                        </div>
                                        {notification.createdAt && (
                                            <div className="text-[10px] text-gray-400 pt-1">
                                                {new Date(notification.createdAt).toLocaleString()}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isFetching && (
                                <div className="flex justify-center items-center py-2">
                                    <div className="w-6 h-6 border-2 border-[#D97706] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notifications;
