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

const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getDashboardStats: builder.query<{ data: TDashboardStats }, void>({
            query: () => ({
                url: "/dashboard/stats",
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
            }
        }),
    }),
});

export const { useGetDashboardStatsQuery, useGetActivitiesQuery } = dashboardApi;
