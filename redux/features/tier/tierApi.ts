import { baseApi } from "../../api/baseApi";

export type TTier = {
    _id?: string;
    name: string;
    percentage: number;
    minSalesVolume: number;
    maxSalesVolume?: number;
    isPopular?: boolean;
    createdBy?: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

const tierApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoints
        getActiveTiers: builder.query<TTier[], void>({
            query: () => ({
                url: "/tiers",
                method: "GET",
            }),
            providesTags: (result) => (result ? [...result.map(({ _id }) => ({ type: "Tier" as const, id: _id })), { type: "Tier", id: "PUBLIC_LIST" }] : [{ type: "Tier", id: "PUBLIC_LIST" }]),
        }),

        getTierById: builder.query<{ data: TTier }, string>({
            query: (tierId) => ({
                url: `/tiers/${tierId}`,
                method: "GET",
            }),
            providesTags: (_, __, tierId) => [{ type: "Tier", id: tierId }],
        }),

        // Admin-only endpoints (SUPER_ADMIN)
        getAllTiers: builder.query<TTier[], { isActive?: boolean } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params && params.isActive !== undefined) {
                    queryParams.append("isActive", String(params.isActive));
                }
                const queryString = queryParams.toString();
                return {
                    url: queryString ? `/tiers/admin/all?${queryString}` : "/tiers/admin/all",
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.map(({ _id }) => ({ type: "Tier" as const, id: _id })), { type: "Tier", id: "ADMIN_LIST" }] : [{ type: "Tier", id: "ADMIN_LIST" }]),
        }),

        createTier: builder.mutation<{ data: TTier }, { name: string; percentage: number; minSalesVolume: number; maxSalesVolume?: number; isPopular?: boolean }>({
            query: (tierData) => ({
                url: "/tiers",
                method: "POST",
                body: tierData,
                credentials: "include",
            }),
            invalidatesTags: [
                { type: "Tier", id: "ADMIN_LIST" },
                { type: "Tier", id: "PUBLIC_LIST" },
            ],
        }),

        updateTier: builder.mutation<{ data: TTier }, { tierId: string; data: Partial<TTier> }>({
            query: ({ tierId, data }) => ({
                url: `/tiers/${tierId}`,
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
            invalidatesTags: (_, __, { tierId }) => [
                { type: "Tier", id: "ADMIN_LIST" },
                { type: "Tier", id: "PUBLIC_LIST" },
                { type: "Tier", id: tierId },
            ],
        }),

        toggleTierStatus: builder.mutation<{ data: TTier }, string>({
            query: (tierId) => ({
                url: `/tiers/${tierId}/toggle-status`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: (_, __, tierId) => [
                { type: "Tier", id: "ADMIN_LIST" },
                { type: "Tier", id: "PUBLIC_LIST" },
                { type: "Tier", id: tierId },
            ],
        }),

        deleteTier: builder.mutation<void, string>({
            query: (tierId) => ({
                url: `/tiers/${tierId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, tierId) => [
                { type: "Tier", id: "ADMIN_LIST" },
                { type: "Tier", id: "PUBLIC_LIST" },
                { type: "Tier", id: tierId },
            ],
        }),
    }),
});

export const { useGetActiveTiersQuery, useGetTierByIdQuery, useGetAllTiersQuery, useCreateTierMutation, useUpdateTierMutation, useToggleTierStatusMutation, useDeleteTierMutation } = tierApi;
