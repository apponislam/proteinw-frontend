import { baseApi } from "../../api/baseApi";
import { TProduct } from "../product/productApi";
import { TCampaign } from "../campaign/campaignApi";

export type TCampaignProduct = {
    _id?: string;
    campaignId: string;
    productId: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TCampaignProductMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TCampaignProductResponse = {
    data: TProduct[]; // Returns products when getting by campaign
    meta: TCampaignProductMeta;
};

export type TCampaignsByProductResponse = {
    data: TCampaign[]; // Returns campaigns when getting by product
};

const campaignProductApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Get all products in a campaign (Public)
        getProductsByCampaign: builder.query<TCampaignProductResponse, { campaignId: string; page?: number; limit?: number }>({
            query: ({ campaignId, page = 1, limit = 10 }) => ({
                url: `/campaign-products/campaign/${campaignId}/products?page=${page}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: (result, _, { campaignId }) => (result ? [...result.data.map(({ _id }) => ({ type: "Product" as const, id: _id })), { type: "CampaignProduct", id: `CAMPAIGN_${campaignId}` }] : [{ type: "CampaignProduct", id: `CAMPAIGN_${campaignId}` }]),
        }),

        // Get products of the logged in user's campaign (Auth required)
        getMyCampaignProducts: builder.query<TCampaignProductResponse, { page?: number; limit?: number } | void>({
            query: (params) => {
                const page = params?.page ?? 1;
                const limit = params?.limit ?? 10;
                return {
                    url: `/campaign-products/my-campaign/products?page=${page}&limit=${limit}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "Product" as const, id: _id })),
                          { type: "CampaignProduct", id: "MY_CAMPAIGN" },
                      ]
                    : [{ type: "CampaignProduct", id: "MY_CAMPAIGN" }],
        }),

        // Get all campaigns for a product (Public)
        getCampaignsByProduct: builder.query<TCampaignsByProductResponse, string>({
            query: (productId) => ({
                url: `/campaign-products/product/${productId}/campaigns`,
                method: "GET",
            }),
            providesTags: (_, __, productId) => [{ type: "CampaignProduct", id: `PRODUCT_${productId}` }],
        }),

        // Add single product to campaign (Admin only)
        addProductToCampaign: builder.mutation<{ data: TCampaignProduct }, { campaignId: string; productId: string }>({
            query: ({ campaignId, productId }) => ({
                url: `/campaign-products/campaign/${campaignId}/product/${productId}`,
                method: "POST",
                credentials: "include",
            }),
            invalidatesTags: (_, __, { campaignId, productId }) => [
                { type: "CampaignProduct", id: `CAMPAIGN_${campaignId}` },
                { type: "CampaignProduct", id: `PRODUCT_${productId}` },
                { type: "Campaign", id: campaignId },
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Product", id: "ADMIN_LIST" },
                { type: "Product", id: "PUBLIC_LIST" },
            ],
        }),

        // Add multiple products to campaign (Admin only)
        addMultipleProductsToCampaign: builder.mutation<{ data: any }, { campaignId: string; productIds: string[] }>({
            query: ({ campaignId, productIds }) => ({
                url: `/campaign-products/campaign/${campaignId}/products`,
                method: "POST",
                body: { productIds },
                credentials: "include",
            }),
            invalidatesTags: (result, error, { campaignId }) => [
                { type: "CampaignProduct", id: "LIST" },
                { type: "Campaign", id: campaignId },
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Product", id: "ADMIN_LIST" },
                { type: "Product", id: "PUBLIC_LIST" },
            ],
        }),

        // Remove single product from campaign (Admin only)
        removeProductFromCampaign: builder.mutation<{ data: TCampaignProduct }, { campaignId: string; productId: string }>({
            query: ({ campaignId, productId }) => ({
                url: `/campaign-products/campaign/${campaignId}/product/${productId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, { campaignId, productId }) => [
                { type: "CampaignProduct", id: `CAMPAIGN_${campaignId}` },
                { type: "CampaignProduct", id: `PRODUCT_${productId}` },
                { type: "Campaign", id: campaignId },
                { type: "Campaign", id: "ADMIN_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
                { type: "Product", id: "ADMIN_LIST" },
                { type: "Product", id: "PUBLIC_LIST" },
            ],
        }),

        // Remove multiple products from campaign (Admin only)
        removeMultipleProductsFromCampaign: builder.mutation<{ data: any }, { campaignId: string; productIds: string[] }>({
            query: ({ campaignId, productIds }) => ({
                url: `/campaign-products/campaign/${campaignId}/products`,
                method: "DELETE",
                body: { productIds },
                credentials: "include",
            }),
            invalidatesTags: (result, error, { campaignId, productIds }) => {
                const tags: any[] = [
                    { type: "CampaignProduct", id: `CAMPAIGN_${campaignId}` },
                    { type: "Campaign", id: campaignId },
                    { type: "Campaign", id: "ADMIN_LIST" },
                    { type: "Campaign", id: "PUBLIC_LIST" },
                    { type: "Product", id: "ADMIN_LIST" },
                    { type: "Product", id: "PUBLIC_LIST" },
                ];

                // Safely add product tags if productIds exists and is an array
                if (productIds && Array.isArray(productIds)) {
                    productIds.forEach((productId) => {
                        tags.push({ type: "CampaignProduct", id: `PRODUCT_${productId}` });
                    });
                }

                return tags;
            },
        }),
    }),
});

export const {
    useGetProductsByCampaignQuery,
    useGetCampaignsByProductQuery,
    useAddProductToCampaignMutation,
    useAddMultipleProductsToCampaignMutation,
    useRemoveProductFromCampaignMutation,
    useRemoveMultipleProductsFromCampaignMutation,
    useGetMyCampaignProductsQuery,
} = campaignProductApi;
