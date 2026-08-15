import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";
import { TCampaign } from "../campaign/campaignApi";

export type TCampaignSeller = {
    _id?: string;
    campaignId: string;
    sellerId: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TCampaignSellerResponse = {
    data: TUser[];
};

export type TMyJoinedCampaignsResponse = {
    data: TCampaign[];
};

const campaignSellerApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Join campaign (Seller)
        joinCampaign: builder.mutation<{ data: TCampaignSeller; message: string }, { campaignId: string }>({
            query: (body) => ({
                url: "/campaign-sellers/join",
                method: "POST",
                body,
            }),
            invalidatesTags: ["CampaignSeller", "Campaign"],
        }),

        // Get seller's joined campaigns (Seller)
        getMyJoinedCampaigns: builder.query<TMyJoinedCampaignsResponse, void>({
            query: () => ({
                url: "/campaign-sellers/my-campaigns",
                method: "GET",
            }),
            providesTags: ["CampaignSeller"],
        }),

        // Add seller(s) to campaign (Admin & Super Admin)
        addSellersToCampaign: builder.mutation<{ data: any; message: string }, { campaignId: string; sellerId?: string; sellerIds?: string[] }>({
            query: ({ campaignId, sellerId, sellerIds }) => ({
                url: `/campaign-sellers/campaign/${campaignId}/sellers`,
                method: "POST",
                body: { sellerId, sellerIds },
            }),
            invalidatesTags: (_, __, { campaignId }) => [
                "CampaignSeller",
                "Campaign",
                { type: "CampaignSeller", id: `CAMPAIGN_${campaignId}` },
            ],
        }),

        // Remove seller(s) from campaign (Admin & Super Admin)
        removeSellersFromCampaign: builder.mutation<{ data: any; message: string }, { campaignId: string; sellerId?: string; sellerIds?: string[] }>({
            query: ({ campaignId, sellerId, sellerIds }) => ({
                url: `/campaign-sellers/campaign/${campaignId}/sellers`,
                method: "DELETE",
                body: { sellerId, sellerIds },
            }),
            invalidatesTags: (_, __, { campaignId }) => [
                "CampaignSeller",
                "Campaign",
                { type: "CampaignSeller", id: `CAMPAIGN_${campaignId}` },
            ],
        }),

        // Get all sellers in a campaign (Admin & Super Admin)
        getCampaignSellers: builder.query<TCampaignSellerResponse, string>({
            query: (campaignId) => ({
                url: `/campaign-sellers/campaign/${campaignId}`,
                method: "GET",
            }),
            providesTags: (result, _, campaignId) =>
                result
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "User" as const, id: _id })),
                          { type: "CampaignSeller", id: `CAMPAIGN_${campaignId}` },
                      ]
                    : [{ type: "CampaignSeller", id: `CAMPAIGN_${campaignId}` }],
        }),
    }),
});

export const {
    useJoinCampaignMutation,
    useGetMyJoinedCampaignsQuery,
    useAddSellersToCampaignMutation,
    useRemoveSellersFromCampaignMutation,
    useGetCampaignSellersQuery,
} = campaignSellerApi;
