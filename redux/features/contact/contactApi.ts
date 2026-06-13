import { baseApi } from "../../api/baseApi";
import { getSocketInstance } from "@/utils/socket";
import { RootState } from "../../stote";

export type TContact = {
    _id: string;
    name: string;
    email: string;
    subject: string;
    phone?: string;
    message: string;
    isRead: boolean;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
};

type PaginationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

const contactApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoint
        createContact: builder.mutation<TContact, { name: string; email: string; subject: string; phone?: string; message: string }>({
            query: (payload) => ({
                url: "/contact",
                method: "POST",
                body: payload,
            }),
        }),

        // Admin-only endpoints
        getAllContacts: builder.query<{ data: TContact[]; meta: PaginationMeta }, { page?: number; limit?: number; isRead?: boolean } | void>({
            query: (params) => ({
                url: "/contact",
                method: "GET",
                params: params || undefined,
                credentials: "include",
            }),
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Contact" as const, id: _id })), { type: "Contact", id: "LIST" }] : [{ type: "Contact", id: "LIST" }]),
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
                try {
                    await cacheDataLoaded;
                    const state = getState() as RootState;
                    const user = state.auth.user;
                    if (!user?._id) return;

                    const socket = getSocketInstance(user._id);

                    const handleNewContact = (newContact: TContact) => {
                        updateCachedData((draft) => {
                            if (!draft.data) draft.data = [];
                            if (draft.data.some((c) => c._id === newContact._id)) return;
                            draft.data.unshift(newContact);
                            if (draft.meta) {
                                draft.meta.total += 1;
                            }
                        });
                    };

                    const handleReadContact = (updatedContact: TContact) => {
                        updateCachedData((draft) => {
                            if (!draft.data) return;
                            const index = draft.data.findIndex((c) => c._id === updatedContact._id);
                            if (index !== -1) {
                                draft.data[index] = updatedContact;
                            }
                        });
                    };

                    const handleAllRead = () => {
                        updateCachedData((draft) => {
                            if (!draft.data) return;
                            draft.data.forEach((c) => {
                                c.isRead = true;
                            });
                        });
                    };

                    const handleDeleteContact = ({ contactId }: { contactId: string }) => {
                        updateCachedData((draft) => {
                            if (!draft.data) return;
                            const index = draft.data.findIndex((c) => c._id === contactId);
                            if (index !== -1) {
                                draft.data.splice(index, 1);
                                if (draft.meta) {
                                    draft.meta.total -= 1;
                                }
                            }
                        });
                    };

                    socket.on("contact:new", handleNewContact);
                    socket.on("contact:read", handleReadContact);
                    socket.on("contact:allRead", handleAllRead);
                    socket.on("contact:deleted", handleDeleteContact);

                    await cacheEntryRemoved;
                    
                    socket.off("contact:new", handleNewContact);
                    socket.off("contact:read", handleReadContact);
                    socket.off("contact:allRead", handleAllRead);
                    socket.off("contact:deleted", handleDeleteContact);
                } catch (error) {
                    // noop
                }
            }
        }),

        getContactById: builder.query<TContact, string>({
            query: (contactId) => ({
                url: `/contact/${contactId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (_result, _error, id) => [{ type: "Contact", id }],
        }),

        getUnreadCount: builder.query<{ count: number }, void>({
            query: () => ({
                url: "/contact/unread/count",
                method: "GET",
                credentials: "include",
            }),
            providesTags: [{ type: "Contact", id: "UNREAD_COUNT" }],
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
                try {
                    await cacheDataLoaded;
                    const state = getState() as RootState;
                    const user = state.auth.user;
                    if (!user?._id) return;

                    const socket = getSocketInstance(user._id);

                    const handleUnreadCount = (data: { count: number }) => {
                        updateCachedData((draft) => {
                            draft.count = data.count;
                        });
                    };

                    socket.on("contact:unreadCount", handleUnreadCount);

                    await cacheEntryRemoved;

                    socket.off("contact:unreadCount", handleUnreadCount);
                } catch (error) {
                    // noop
                }
            }
        }),

        markAsRead: builder.mutation<TContact, string>({
            query: (contactId) => ({
                url: `/contact/${contactId}/read`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Contact", id },
                { type: "Contact", id: "UNREAD_COUNT" },
            ],
        }),

        markAllAsRead: builder.mutation<{ modifiedCount: number }, void>({
            query: () => ({
                url: "/contact/read/all",
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: [
                { type: "Contact", id: "LIST" },
                { type: "Contact", id: "UNREAD_COUNT" },
            ],
        }),

        deleteContact: builder.mutation<void, string>({
            query: (contactId) => ({
                url: `/contact/${contactId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, id) => [
                { type: "Contact", id },
                { type: "Contact", id: "LIST" },
                { type: "Contact", id: "UNREAD_COUNT" },
            ],
        }),
    }),
});

export const { useCreateContactMutation, useGetAllContactsQuery, useGetContactByIdQuery, useGetUnreadCountQuery, useMarkAsReadMutation, useMarkAllAsReadMutation, useDeleteContactMutation } = contactApi;
