import { baseApi } from "../../api/baseApi";

export type TCampaignSeller = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    totalPackagesSold: number;
    totalRevenueSold: number;
};

export type TCampaignProduct = {
    _id: string;
    name: string;
    price: number;
    shortDescription: string;
    category: string;
    subCategory?: string;
    productImage?: string;
    totalSold: number;
};

export type TCampaignAdmin = {
    _id: string;
    name: string;
    email: string;
    phone?: string;
};

export type TCampaignCreatedBy = {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    phone?: string;
};

export type TTierSummary = {
    _id: string;
    name: string;
    percentage: number;
    minSalesVolume: number;
    maxSalesVolume?: number;
};

export type TCampaign = {
    _id?: string;
    name: string;
    shortDescription: string;
    target: number;
    endDate: Date;
    code: string;
    groupId?: string;
    tierId?: string;
    createdBy?: string | TCampaignCreatedBy;
    status?: "ACTIVE" | "DRAFT" | "FULFILMENT" | "COMPLETED";
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    totalPackagesSold?: number;
    totalRevenueSold?: number;
    campaignAdmin?: TCampaignAdmin | null;
    sellers?: TCampaignSeller[];
    products?: TCampaignProduct[];
    currentTier?: TTierSummary | null;
    nextTier?: TTierSummary | null;
    packagesNeededForNextTier?: number;
    sellersCount?: number;
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
        getCampaignsByGroup: builder.query<TCampaignResponse, { groupId: string; page?: number; limit?: number; status?: string }>({
            query: ({ groupId, page = 1, limit = 10, status }) => {
                const params = new URLSearchParams();
                params.append("page", String(page));
                params.append("limit", String(limit));
                if (status) params.append("status", status);

                return {
                    url: `/campaigns/group/${groupId}?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "GROUP_LIST" }] : [{ type: "Campaign", id: "GROUP_LIST" }]),
        }),

        getRunningCampaignByGroup: builder.query<{ data: TCampaign | null }, string>({
            query: (groupId) => ({
                url: `/campaigns/running-campaign/${groupId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, _, groupId) => [{ type: "Campaign", id: `RUNNING_${groupId}` }],
        }),

        getRunningCampaignForSeller: builder.query<TCampaignResponse, { groupId: string; page?: number; limit?: number; status?: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED" }>({
            query: ({ groupId, page = 1, limit = 9, status }) => {
                const queryParams = new URLSearchParams();
                queryParams.append("page", String(page));
                queryParams.append("limit", String(limit));
                if (status) queryParams.append("status", status);

                return {
                    url: `/campaigns/seller/running-campaign/${groupId}?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result, _, { groupId }) => (result ? [...result.data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: `SELLER_RUNNING_${groupId}` }] : [{ type: "Campaign", id: `SELLER_RUNNING_${groupId}` }]),
        }),

        // Admin-only endpoints
        getAllCampaigns: builder.query<TCampaignResponse, { page?: number; limit?: number; status?: string } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();

                let page = 1;
                let limit = 10;

                if (params) {
                    if (params.page) page = params.page;
                    if (params.limit) limit = params.limit;
                    if (params.status) queryParams.append("status", params.status);
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

        getAllCampaignsWithStats: builder.query<TCampaignResponse, { page?: number; limit?: number; status?: string } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();

                let page = 1;
                let limit = 10;

                if (params) {
                    if (params.page) page = params.page;
                    if (params.limit) limit = params.limit;
                    if (params.status) queryParams.append("status", params.status);
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

        getAllCampaignsSummary: builder.query<TCampaignResponse, { page?: number; limit?: number; status?: string; search?: string } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();

                let page = 1;
                let limit = 10;

                if (params) {
                    if (params.page) page = params.page;
                    if (params.limit) limit = params.limit;
                    if (params.status) queryParams.append("status", params.status);
                    if (params.search) queryParams.append("search", params.search);
                }

                queryParams.append("page", String(page));
                queryParams.append("limit", String(limit));

                return {
                    url: `/campaigns/admin/summary?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "ADMIN_SUMMARY" }] : [{ type: "Campaign", id: "ADMIN_SUMMARY" }]),
        }),

        getMyCampaigns: builder.query<
            TCampaignResponse | { data: TCampaign[] },
            { page?: number; limit?: number; status?: string; search?: string } | void
        >({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params) {
                    if (params.page) queryParams.append("page", String(params.page));
                    if (params.limit) queryParams.append("limit", String(params.limit));
                    if (params.status) queryParams.append("status", params.status);
                    if (params.search) queryParams.append("search", params.search);
                }
                const queryString = queryParams.toString();
                return {
                    url: queryString ? `/campaigns/my-campaigns?${queryString}` : "/campaigns/my-campaigns",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => {
                const data = Array.isArray(result) ? result : result?.data;
                return data && Array.isArray(data)
                    ? [...data.map(({ _id }) => ({ type: "Campaign" as const, id: _id })), { type: "Campaign", id: "MY_CAMPAIGNS" }]
                    : [{ type: "Campaign", id: "MY_CAMPAIGNS" }];
            },
        }),

        createCampaign: builder.mutation<{ data: TCampaign }, { groupId: string; name: string; shortDescription: string; target: number; endDate: Date; addAllGroupSellers?: boolean; sellerIds?: string[] }>({
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

        updateCampaignStatus: builder.mutation<{ data: TCampaign }, { campaignId: string; status: "DRAFT" | "ACTIVE" | "FULFILMENT" | "COMPLETED" }>({
            query: ({ campaignId, status }) => ({
                url: `/campaigns/${campaignId}/status`,
                method: "PATCH",
                body: { status },
                credentials: "include",
            }),
            invalidatesTags: (_, __, { campaignId }) => [
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

        assignTierToCampaign: builder.mutation<{ data: TCampaign }, { campaignId: string; tierId: string }>({
            query: ({ campaignId, tierId }) => ({
                url: `/campaigns/${campaignId}/assign-tier`,
                method: "PATCH",
                body: { tierId },
                credentials: "include",
            }),
            invalidatesTags: (_, __, { campaignId }) => [
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Campaign", id: "GROUP_LIST" },
                { type: "Campaign", id: campaignId },
            ],
        }),
    }),
});

export const {
    useGetActiveCampaignsQuery,
    useGetCampaignByCodeQuery,
    useGetCampaignByIdQuery,
    useGetCampaignsByGroupQuery,
    useGetRunningCampaignByGroupQuery,
    useGetRunningCampaignForSellerQuery,
    useGetAllCampaignsQuery,
    useGetAllCampaignsWithStatsQuery,
    useGetAllCampaignsSummaryQuery,
    useGetMyCampaignsQuery,
    useCreateCampaignMutation,
    useUpdateCampaignMutation,
    useUpdateCampaignStatusMutation,
    useDeleteCampaignMutation,
    useAssignTierToCampaignMutation,
} = campaignApi;
