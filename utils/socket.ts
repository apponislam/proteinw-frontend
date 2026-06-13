import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocketInstance = (userId?: string): Socket => {
    const socketUrl = process.env.NEXT_PUBLIC_BASE_API || "";
    
    if (!socket) {
        socket = io(socketUrl, {
            auth: { _id: userId },
            transports: ["websocket", "polling"],
            autoConnect: false,
        });
        console.log("🔌 Socket instance created with URL:", socketUrl);
    } else if (userId && socket.auth && (socket.auth as any)._id !== userId) {
        console.log("🔌 Reconnecting socket with new userId:", userId);
        socket.disconnect();
        socket.auth = { _id: userId };
    }

    if (!socket.connected) {
        socket.connect();
    }

    return socket;
};
