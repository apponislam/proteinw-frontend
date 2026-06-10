import { baseApi } from "../../api/baseApi";

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
        getAllContacts: builder.query<{ data: TContact[]; meta: PaginationMeta }, { page?: number; limit?: number; isRead?: boolean }>({
            query: (params) => ({
                url: "/contact",
                method: "GET",
                params,
                credentials: "include",
            }),
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Contact" as const, id: _id })), { type: "Contact", id: "LIST" }] : [{ type: "Contact", id: "LIST" }]),
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
