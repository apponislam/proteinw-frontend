import { baseApi } from "../../api/baseApi";

export type InvitationStatus = "pending" | "accepted" | "declined";

export type TInvitation = {
    _id?: string;
    groupId: string;
    inviterId: string;
    email: string;
    status: InvitationStatus;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TInvitationMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TInvitationResponse = {
    data: TInvitation[];
    meta: TInvitationMeta;
};

const invitationApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoint - check invitation by email (no auth required)
        getInvitationByEmail: builder.query<{ data: TInvitation }, string>({
            query: (email) => ({
                url: `/invitations/email/${email}`,
                method: "GET",
            }),
            providesTags: (_, __, email) => [{ type: "Invitation", id: email }],
        }),

        // Admin endpoints (ADMIN and SUPER_ADMIN)
        sendInvitation: builder.mutation<{ data: TInvitation }, { groupId: string; email: string }>({
            query: ({ groupId, email }) => ({
                url: "/invitations",
                method: "POST",
                body: { groupId, email },
                credentials: "include",
            }),
            invalidatesTags: [
                { type: "Invitation", id: "ADMIN_LIST" },
                { type: "Group", id: "ADMIN_LIST" },
                { type: "Group", id: "PUBLIC_LIST" },
            ],
        }),

        getInvitationsByGroup: builder.query<TInvitationResponse, { groupId: string; page?: number; limit?: number; status?: InvitationStatus }>({
            query: ({ groupId, page = 1, limit = 10, status }) => {
                const params = new URLSearchParams();
                params.append("page", String(page));
                params.append("limit", String(limit));
                if (status) params.append("status", status);

                return {
                    url: `/invitations/group/${groupId}?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Invitation" as const, id: _id })), { type: "Invitation", id: "ADMIN_LIST" }] : [{ type: "Invitation", id: "ADMIN_LIST" }]),
        }),

        cancelInvitation: builder.mutation<{ data: null }, string>({
            query: (invitationId) => ({
                url: `/invitations/${invitationId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, invitationId) => [
                { type: "Invitation", id: "ADMIN_LIST" },
                { type: "Invitation", id: invitationId },
                { type: "Group", id: "ADMIN_LIST" },
                { type: "Group", id: "PUBLIC_LIST" },
            ],
        }),
    }),
});

export const { useGetInvitationByEmailQuery, useSendInvitationMutation, useGetInvitationsByGroupQuery, useCancelInvitationMutation } = invitationApi;
