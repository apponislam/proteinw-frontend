import { baseApi } from "../../api/baseApi";

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
    }),
});

export const { useGetDashboardStatsQuery } = dashboardApi;
