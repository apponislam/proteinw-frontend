import { baseApi } from "../../api/baseApi";

export type TCampaign = {
    _id?: string;
    name: string;
    shortDescription: string;
    target: number;
    endDate: Date;
    code: string;
    groupId?: string;
    createdBy?: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    totalPackagesSold?: number;
    totalRevenueSold?: number;
};

export type TCampaignMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TCampaignResponse = {
    data: TCampaign[];
    meta: TCampaignMeta;
};

const campaignApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoints
        getActiveCampaigns: builder.query<TCampaign[], void>({
            query: () => ({
                url: "/campaigns/active",
                method: "GET",
            }),
            providesTags: (result) => (result ? [...result.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "PUBLIC_LIST" }] : [{ type: "Campaign", id: "PUBLIC_LIST" }]),
        }),

        getCampaignByCode: builder.query<{ data: TCampaign }, string>({
            query: (code) => ({
                url: `/campaigns/code/${code}`,
                method: "GET",
            }),
            providesTags: (_, __, code) => [{ type: "Campaign", id: code }],
        }),

        getCampaignById: builder.query<{ data: TCampaign }, string>({
            query: (campaignId) => ({
                url: `/campaigns/${campaignId}`,
                method: "GET",
            }),
            providesTags: (_, __, campaignId) => [{ type: "Campaign", id: campaignId }],
        }),

        // Protected endpoints
        getCampaignsByGroup: builder.query<TCampaignResponse, { groupId: string; page?: number; limit?: number; isActive?: boolean }>({
            query: ({ groupId, page = 1, limit = 10, isActive }) => {
                const params = new URLSearchParams();
                params.append("page", String(page));
                params.append("limit", String(limit));
                if (isActive !== undefined) params.append("isActive", String(isActive));

                return {
                    url: `/campaigns/group/${groupId}?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "GROUP_LIST" }] : [{ type: "Campaign", id: "GROUP_LIST" }]),
        }),

        // Admin-only endpoints
        getAllCampaigns: builder.query<TCampaignResponse, { page?: number; limit?: number; isActive?: boolean } | void>({
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
                    url: `/campaigns?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "ADMIN_LIST" }] : [{ type: "Campaign", id: "ADMIN_LIST" }]),
        }),

        getAllCampaignsWithStats: builder.query<TCampaignResponse, { page?: number; limit?: number; isActive?: boolean } | void>({
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
                    url: `/campaigns/admin/all?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "ADMIN_LIST" }] : [{ type: "Campaign", id: "ADMIN_LIST" }]),
        }),

        createCampaign: builder.mutation<{ data: TCampaign }, { groupId: string; name: string; shortDescription: string; target: number; endDate: Date }>({
            query: (campaignData) => ({
                url: "/campaigns",
                method: "POST",
                body: campaignData,
                credentials: "include",
            }),
            invalidatesTags: [
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Campaign", id: "GROUP_LIST" },
            ],
        }),

        updateCampaign: builder.mutation<{ data: TCampaign }, { campaignId: string; data: Partial<TCampaign> }>({
            query: ({ campaignId, data }) => ({
                url: `/campaigns/${campaignId}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (_, __, { campaignId }) => [
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Campaign", id: "GROUP_LIST" },
                { type: "Campaign", id: campaignId },
            ],
        }),

        toggleCampaignStatus: builder.mutation<{ data: TCampaign }, string>({
            query: (campaignId) => ({
                url: `/campaigns/${campaignId}/toggle-status`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: (_, __, campaignId) => [
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Campaign", id: "GROUP_LIST" },
                { type: "Campaign", id: campaignId },
            ],
        }),

        deleteCampaign: builder.mutation<void, string>({
            query: (campaignId) => ({
                url: `/campaigns/${campaignId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, campaignId) => [
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Campaign", id: "GROUP_LIST" },
                { type: "Campaign", id: campaignId },
            ],
        }),
    }),
});

export const { useGetActiveCampaignsQuery, useGetCampaignByCodeQuery, useGetCampaignByIdQuery, useGetCampaignsByGroupQuery, useGetAllCampaignsQuery, useGetAllCampaignsWithStatsQuery, useCreateCampaignMutation, useUpdateCampaignMutation, useToggleCampaignStatusMutation, useDeleteCampaignMutation } = campaignApi;
