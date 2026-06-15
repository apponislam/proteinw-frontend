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
    useGetActivitiesQuery,
    useGetStoreInfoQuery,
} = dashboardApi;
