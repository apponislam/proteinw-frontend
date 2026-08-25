import { baseApi } from "../../api/baseApi";
import { getSocketInstance } from "@/utils/socket";

export type TDashboardStats = {
    totalPackagesSold: number;
    packageGrowth: number;
    topCategory: string;
    totalAdmins: number;
    totalSellers: number;
    totalGroups: number;
    activeCampaigns: number;
    totalOrders: number;
};

export type TActivityLog = {
    _id: string;
    type: "SALE" | "MILESTONE" | "MEMBER" | "CAMPAIGN";
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
};

export type TDashboardStatus = {
    hasGroup: boolean;
    hasCampaign: boolean;
};

export type TStoreInfo = {
    validation: boolean;
    adminName?: string;
    groupName?: string;
    campaignName?: string;
    campaignProductCount?: number;
};

export type TSellerDashboardStats = {
    totalSales: number;
    totalProfit: number;
    packagesSold: number;
    daysRemaining: number;
    goal: number;
    current?: number;
    remaining?: number;
    groupName?: string;
    shortDescription?: string;
    campaignCode?: string;
    referralCode?: string;
    shopUrl?: string;
};

export type TAsSellerCampaignInfo = {
    campaignId: string;
    name: string;
    shortDescription: string;
    campaignCode: string;
    referralCode: string;
    shopUrl: string;
};

export type TSalesLinkItem = {
    name?: string;
    link: string;
};

export type TSellerListItem = {
    _id: string;
    name: string;
    email: string;
    group?: string;
    groups?: string[];
    orders: number;
    packages: number;
    status: string;
    salesLink?: string;
    salesLinks?: (string | TSalesLinkItem)[];
    code: string;
    groupDetails?: {
        _id: string;
        name: string;
        code: string;
        goal: number;
        endDate: string;
    } | null;
    campaignDetails?: {
        _id: string;
        name: string;
        code: string;
        target: number;
        endDate: string;
    } | null;
};

export type TSellersResponse = {
    data: TSellerListItem[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};

export type TSuperAdminSellersStats = {
    totalSellers: number;
    activeGroups: number;
    mtdOrders: number;
    salesRevenue: number;
};

export type TAssignedAdmin = {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
};

export type TSuperAdminGroupStatsItem = {
    _id: string;
    groupCode: string;
    groupName: string;
    assignedAdmin?: string | TAssignedAdmin | null;
    sellers: number;
    activeCampaigns?: number;
    packagesSold: number;
    revenue?: number;
    groupProfit?: number;
    status: boolean;
    createdAt?: string;
};

export type TSuperAdminGroupsStatsResponse = {
    data: TSuperAdminGroupStatsItem[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNext: boolean;
        hasPrev: boolean;
    };
};

export type TSuperAdminGroupsDashboardCardsResponse = {
    data: {
        activeGroups: number;
        packagesSold: number;
        avgProfitTier: number;
        deadlinesThisWeek: number;
    };
};

const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getDashboardStats: builder.query<TDashboardStats, void>({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (response: { data: TDashboardStats }) => response.data,
        }),
        getDashboardStatus: builder.query<TDashboardStatus, void>({
            query: () => ({
                url: "/dashboard/status",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (response: { data: TDashboardStatus }) => response.data,
            providesTags: [{ type: "Group", id: "STATUS" }],
        }),
        getSellerDashboardStats: builder.query<{ data: TSellerDashboardStats }, string | void>({
            query: (campaignId) => {
                const url = campaignId ? `/dashboard/seller-stats?campaignId=${campaignId}` : "/dashboard/seller-stats";
                return {
                    url,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
        getAsSellerDashboardStats: builder.query<{ data: TSellerDashboardStats }, string | void>({
            query: (campaignId) => {
                const url = campaignId ? `/dashboard/as-seller-stats?campaignId=${campaignId}` : "/dashboard/as-seller-stats";
                return {
                    url,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
        getAsSellerCampaignInfo: builder.query<{ data: TAsSellerCampaignInfo }, string | void>({
            query: (campaignId) => {
                const url = campaignId ? `/dashboard/as-seller-campaign-info?campaignId=${campaignId}` : "/dashboard/as-seller-campaign-info";
                return {
                    url,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
        getSuperAdminSellersStats: builder.query<{ data: TSuperAdminSellersStats }, void>({
            query: () => ({
                url: "/dashboard/superadmin-sellers-stats",
                method: "GET",
                credentials: "include",
            }),
        }),
        getSuperAdminSellers: builder.query<TSellersResponse, { page?: number; limit?: number } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params) {
                    if (params.page) queryParams.append("page", String(params.page));
                    if (params.limit) queryParams.append("limit", String(params.limit));
                }
                return {
                    url: `/dashboard/superadmin-sellers?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
        getSuperAdminGroupsStats: builder.query<TSuperAdminGroupsStatsResponse, { page?: number; limit?: number; sortBy?: string } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params) {
                    if (params.page) queryParams.append("page", String(params.page));
                    if (params.limit) queryParams.append("limit", String(params.limit));
                    if (params.sortBy) queryParams.append("sortBy", params.sortBy);
                }
                return {
                    url: `/dashboard/superadmin-groups-stats?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
        getSuperAdminGroupsDashboardCards: builder.query<TSuperAdminGroupsDashboardCardsResponse, void>({
            query: () => ({
                url: "/dashboard/superadmin-groups-cards",
                method: "GET",
                credentials: "include",
            }),
        }),
        getActivities: builder.query<{ data: TActivityLog[]; meta?: { page: number; limit: number; total: number; totalPages: number; hasNext: boolean; hasPrev: boolean } }, { page?: number; limit?: number } | void>({
            query: (params) => {
                const page = params?.page ?? 1;
                const limit = params?.limit ?? 10;
                const queryParams = new URLSearchParams();
                queryParams.append("page", page.toString());
                queryParams.append("limit", limit.toString());

                return {
                    url: `/activities?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            transformResponse: (response: any) => {
                if (Array.isArray(response)) {
                    return { data: response };
                }
                if (response?.data && Array.isArray(response.data)) {
                    return {
                        data: response.data,
                        meta: response.meta,
                    };
                }
                return { data: [] };
            },
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
                try {
                    await cacheDataLoaded;
                    const state = getState() as any;
                    const user = state.auth.user;
                    if (!user?._id) return;

                    const socket = getSocketInstance(user._id);

                    const handleNewActivity = (activity: TActivityLog) => {
                        updateCachedData((draft) => {
                            if (!draft || !draft.data) return;
                            if (draft.data.some((a) => a._id === activity._id)) return;
                            draft.data.unshift(activity);
                            if (draft.data.length > 20) {
                                draft.data.pop();
                            }
                        });
                    };

                    socket.on("activity:new", handleNewActivity);

                    await cacheEntryRemoved;

                    socket.off("activity:new", handleNewActivity);
                } catch (error) {
                    // noop
                }
            },
        }),
        getStoreInfo: builder.query<TStoreInfo, { campaign: string; referral: string }>({
            query: ({ campaign, referral }) => ({
                url: `/dashboard/store-info?campaign=${campaign}&referral=${referral}`,
                method: "GET",
            }),
            transformResponse: (response: { data: TStoreInfo }) => response.data,
        }),
        getSuperAdminAdminsStats: builder.query<{
            data: {
                totalAdmins: number;
                approvedAdmins: number;
                unapprovedAdmins: number;
                unassignedGroupAdmins: number;
            };
        }, void>({
            query: () => ({
                url: "/dashboard/superadmin-admins-stats",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Admin"],
        }),
        getTotalDistributedProfit: builder.query<{ data: { totalDistributedProfit: number } }, void>({
            query: () => ({
                url: "/dashboard/total-distributed-profit",
                method: "GET",
                credentials: "include",
            }),
            providesTags: [{ type: "Campaign", id: "PROFIT_SUMMARY" }, "Order", "Tier"],
        }),
        getActiveCampaignsOverview: builder.query<{ data: { totalGoal: number; activeCampaigns: number; totalSold: number } }, void>({
            query: () => ({
                url: "/dashboard/active-campaigns-overview",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Campaign"],
        }),
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetDashboardStatusQuery,
    useGetSellerDashboardStatsQuery,
    useGetAsSellerDashboardStatsQuery,
    useGetAsSellerCampaignInfoQuery,
    useGetSuperAdminSellersStatsQuery,
    useGetSuperAdminSellersQuery,
    useGetSuperAdminGroupsStatsQuery,
    useGetSuperAdminGroupsDashboardCardsQuery,
    useGetActivitiesQuery,
    useLazyGetActivitiesQuery,
    useGetStoreInfoQuery,
    useGetSuperAdminAdminsStatsQuery,
    useGetTotalDistributedProfitQuery,
    useGetActiveCampaignsOverviewQuery,
} = dashboardApi;
