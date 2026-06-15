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
    groupName: string;
    shortDescription: string;
};

export type TSellerListItem = {
    _id: string;
    name: string;
    email: string;
    group: string;
    orders: number;
    packages: number;
    status: string;
    salesLink: string;
    code: string;
    groupDetails: {
        _id: string;
        name: string;
        code: string;
        goal: number;
        endDate: string;
    } | null;
    campaignDetails: {
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

export type TSuperAdminGroupStatsItem = {
    _id: string;
    groupCode: string;
    groupName: string;
    campaignCode: string;
    assignedAdmin: string;
    sellers: number;
    packagesSold: number;
    profitTier: string;
    profitTierStatusText: string;
    status: boolean;
    deadlineDate: string | null;
    deadlineStatusText: string;
    revenue: number;
    groupProfit: number;
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

const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getDashboardStats: builder.query<TDashboardStats, void>({
            query: () => ({
                url: "/dashboard/stats",
                method: "GET",
                credentials: "include",
            }),
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
        getSellerDashboardStats: builder.query<{ data: TSellerDashboardStats }, void>({
            query: () => ({
                url: "/dashboard/seller-stats",
                method: "GET",
                credentials: "include",
            }),
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
        getActivities: builder.query<TActivityLog[], void>({
            query: () => ({
                url: "/activities",
                method: "GET",
                credentials: "include",
            }),
            transformResponse: (response: { data: TActivityLog[] }) => response.data,
            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved, getState }) {
                try {
                    await cacheDataLoaded;
                    const state = getState() as any;
                    const user = state.auth.user;
                    if (!user?._id) return;

                    const socket = getSocketInstance(user._id);

                    const handleNewActivity = (activity: TActivityLog) => {
                        updateCachedData((draft) => {
                            if (!draft) return;
                            if (draft.some((a) => a._id === activity._id)) return;
                            draft.unshift(activity);
                            if (draft.length > 20) {
                                draft.pop();
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
    }),
});

export const {
    useGetDashboardStatsQuery,
    useGetDashboardStatusQuery,
    useGetSellerDashboardStatsQuery,
    useGetSuperAdminSellersStatsQuery,
    useGetSuperAdminSellersQuery,
    useGetSuperAdminGroupsStatsQuery,
    useGetActivitiesQuery,
    useGetStoreInfoQuery,
} = dashboardApi;
