"use client";

import React from "react";
import { X, Bell } from "lucide-react";

interface Notification {
    id: number;
    name: string;
    subject: string;
    message: string;
    phone: string;
    email: string;
}

interface NotificationsProps {
    isOpen: boolean;
    onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
    const notifications: Notification[] = [
        {
            id: 1,
            name: "Ibrahim",
            subject: "Product Enquiry",
            message: "I didn’t ask for the output design. I need an input field added to this card so the values can be edited directly. Please keep the existing layout the same and only make the fields editable.",
            phone: "+88 017483674",
            email: "ibrahim12@gmail.com",
        },
        {
            id: 2,
            name: "Ibrahim",
            subject: "Product Enquiry",
            message: "I didn’t ask for the output design. I need an input field added to this card so the values can be edited directly. Please keep the existing layout the same and only make the fields editable.",
            phone: "+88 017483674",
            email: "ibrahim12@gmail.com",
        },
        {
            id: 3,
            name: "Ibrahim",
            subject: "Product Enquiry",
            message: "I didn’t ask for the output design. I need an input field added to this card so the values can be edited directly. Please keep the existing layout the same and only make the fields editable.",
            phone: "+88 017483674",
            email: "ibrahim12@gmail.com",
        },
        {
            id: 4,
            name: "Ibrahim",
            subject: "Product Enquiry",
            message: "I didn’t ask for the output design. I need an input field added to this card so the values can be edited directly. Please keep the existing layout the same and only make the fields editable.",
            phone: "+88 017483674",
            email: "ibrahim12@gmail.com",
        },
    ];

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
            <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] z-50 flex flex-col">
                <div className="flex items-center justify-between p-6 border-b border-[#F5F5F4]">
                    <div className="flex items-center gap-3">
                        <Bell className="text-[#D97706]" />
                        <h2 className="text-xl font-bold text-[#1A1C1C]">Message Notifications</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-[#F5F5F4] transition-all">
                        <X size={20} className="text-[#78716C]" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {notifications.map((notification) => (
                        <div key={notification.id} className="bg-[#FAFAF9] rounded-lg p-4 border border-[#F5F5F4]">
                            <div className="mb-3">
                                <div className="font-bold text-[#1A1C1C]">{notification.name}</div>
                                <div className="text-[#D97706] text-sm font-medium">{notification.subject}</div>
                            </div>
                            <div className="mb-3">
                                <p className="text-[#78716C] text-sm">{notification.message}</p>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm">
                                    <span className="text-[#78716C]">Phone:</span> <span className="text-[#1A1C1C]">{notification.phone}</span>
                                </div>
                                <div className="text-sm">
                                    <span className="text-[#78716C]">Email:</span> <span className="text-[#1A1C1C]">{notification.email}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Notifications;
