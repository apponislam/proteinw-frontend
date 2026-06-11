import { baseApi } from "../../api/baseApi";

export type TGroup = {
    _id?: string;
    name: string;
    shortDescription: string;
    goal: number;
    endDate: Date;
    code: string;
    runningCampaignId?: string;
    createdBy?: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TGroupMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TGroupResponse = {
    data: TGroup[];
    meta: TGroupMeta;
};

const groupApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoints
        getActiveGroups: builder.query<TGroup[], void>({
            query: () => ({
                url: "/groups",
                method: "GET",
            }),
            providesTags: (result) => (result ? [...result.map(({ _id }) => ({ type: "Group" as const, id: _id })), { type: "Group", id: "PUBLIC_LIST" }] : [{ type: "Group", id: "PUBLIC_LIST" }]),
        }),

        getGroupByCode: builder.query<{ data: TGroup }, string>({
            query: (code) => ({
                url: `/groups/code/${code}`,
                method: "GET",
            }),
            providesTags: (_, __, code) => [{ type: "Group", id: code }],
        }),

        getGroupById: builder.query<{ data: TGroup }, string>({
            query: (groupId) => ({
                url: `/groups/${groupId}`,
                method: "GET",
            }),
            providesTags: (_, __, groupId) => [{ type: "Group", id: groupId }],
        }),

        // Admin-only endpoints (SUPER_ADMIN)
        getAllGroups: builder.query<TGroupResponse, { page?: number; limit?: number; isActive?: boolean } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();

                let page = 1;
                let limit = 10;

                if (params) {
                    if (params.page) page = params.page;
                    if (params.limit) limit = params.limit;
                    if (params.isActive !== undefined) queryParams.append("isActive", String(params.isActive));
                }

                queryParams.append("page", String(page));
                queryParams.append("limit", String(limit));

                return {
                    url: `/groups/admin/all?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Group" as const, id: _id })), { type: "Group", id: "ADMIN_LIST" }] : [{ type: "Group", id: "ADMIN_LIST" }]),
        }),

        createGroup: builder.mutation<{ data: TGroup }, { name: string; shortDescription: string; goal: number; endDate: Date }>({
            query: (groupData) => ({
                url: "/groups",
                method: "POST",
                body: groupData,
                credentials: "include",
            }),
            invalidatesTags: [
                { type: "Group", id: "ADMIN_LIST" },
                { type: "Group", id: "PUBLIC_LIST" },
            ],
        }),

        updateGroup: builder.mutation<{ data: TGroup }, { groupId: string; data: Partial<TGroup> }>({
            query: ({ groupId, data }) => ({
                url: `/groups/${groupId}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (_, __, { groupId }) => [
                { type: "Group", id: "ADMIN_LIST" },
                { type: "Group", id: "PUBLIC_LIST" },
                { type: "Group", id: groupId },
            ],
        }),

        toggleGroupStatus: builder.mutation<{ data: TGroup }, string>({
            query: (groupId) => ({
                url: `/groups/${groupId}/toggle-status`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: (_, __, groupId) => [
                { type: "Group", id: "ADMIN_LIST" },
                { type: "Group", id: "PUBLIC_LIST" },
                { type: "Group", id: groupId },
            ],
        }),

        deleteGroup: builder.mutation<void, string>({
            query: (groupId) => ({
                url: `/groups/${groupId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, groupId) => [
                { type: "Group", id: "ADMIN_LIST" },
                { type: "Group", id: "PUBLIC_LIST" },
                { type: "Group", id: groupId },
            ],
        }),
    }),
});

export const { useGetActiveGroupsQuery, useGetGroupByCodeQuery, useGetGroupByIdQuery, useGetAllGroupsQuery, useCreateGroupMutation, useUpdateGroupMutation, useToggleGroupStatusMutation, useDeleteGroupMutation } = groupApi;
