import { baseApi } from "../../api/baseApi";

export type TProduct = {
    _id?: string;
    name: string;
    price: number;
    shortDescription: string;
    category: string;
    subCategory?: string;
    productImage?: string;
    createdBy?: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
    campaigns?: string[];
};

export type TProductMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TProductResponse = {
    data: TProduct[];
    meta: TProductMeta;
};

export type TProductStats = {
    total: number;
    active: number;
};

const productApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoints
        getActiveProducts: builder.query<TProductResponse, { category?: string; subCategory?: string; page?: number; limit?: number } | string | void>({
            query: (params) => {
                let url = "/products";
                const queryParams = new URLSearchParams();

                // Default values
                let page = 1;
                let limit = 10;

                if (typeof params === "string") {
                    queryParams.append("category", params);
                } else if (params && typeof params === "object") {
                    if (params.category) queryParams.append("category", params.category);
                    if (params.subCategory) queryParams.append("subCategory", params.subCategory);
                    page = params.page ?? 1;
                    limit = params.limit ?? 10;
                }

                queryParams.append("page", String(page));
                queryParams.append("limit", String(limit));

                const queryString = queryParams.toString();
                if (queryString) {
                    url += `?${queryString}`;
                }

                return {
                    url,
                    method: "GET",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Product" as const, id: _id })), { type: "Product", id: "PUBLIC_LIST" }] : [{ type: "Product", id: "PUBLIC_LIST" }]),
        }),

        getProductById: builder.query<{ data: TProduct }, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "GET",
            }),
            providesTags: (_, __, productId) => [{ type: "Product", id: productId }],
        }),

        // Admin-only endpoints (SUPER_ADMIN)
        getProductStats: builder.query<{ data: TProductStats }, void>({
            query: () => ({
                url: "/products/admin/stats",
                method: "GET",
                credentials: "include",
            }),
            providesTags: [{ type: "Product", id: "ADMIN_STATS" }],
        }),

        // getAllProducts: builder.query<TProductResponse, Record<string, any> | void>({
        //     query: (filters) => {
        //         const params = new URLSearchParams();

        //         // Default values
        //         let page = 1;
        //         let limit = 10;

        //         if (filters) {
        //             Object.entries(filters).forEach(([key, value]) => {
        //                 if (value !== undefined && value !== null) {
        //                     if (key === "page") {
        //                         page = Number(value);
        //                     } else if (key === "limit") {
        //                         limit = Number(value);
        //                     } else {
        //                         params.append(key, String(value));
        //                     }
        //                 }
        //             });
        //         }

        //         params.append("page", String(page));
        //         params.append("limit", String(limit));

        //         const queryString = params.toString();
        //         return {
        //             url: queryString ? `/products/admin/all?${queryString}` : "/products/admin/all",
        //             method: "GET",
        //             credentials: "include",
        //         };
        //     },
        //     providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Product" as const, id: _id })), { type: "Product", id: "ADMIN_LIST" }] : [{ type: "Product", id: "ADMIN_LIST" }]),
        // }),

        getAllProducts: builder.query<TProductResponse, Record<string, any> | void>({
            query: (filters) => {
                const params = new URLSearchParams();

                // Default values
                let page = 1;
                let limit = 10;

                if (filters) {
                    Object.entries(filters).forEach(([key, value]) => {
                        if (value !== undefined && value !== null) {
                            if (key === "page") {
                                page = Number(value);
                            } else if (key === "limit") {
                                limit = Number(value);
                            } else {
                                params.append(key, String(value));
                            }
                        }
                    });
                }

                params.append("page", String(page));
                params.append("limit", String(limit));

                const queryString = params.toString();
                return {
                    url: queryString ? `/products/admin/all?${queryString}` : "/products/admin/all",
                    method: "GET",
                    credentials: "include",
                };
            },
            // ✅ ADD THIS - it's the fix
            serializeQueryArgs: ({ queryArgs }) => {
                // Always use the same base key for admin list
                return `ADMIN_LIST_${JSON.stringify(queryArgs || {})}`;
            },
            providesTags: (result) =>
                result
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "Product" as const, id: _id })),
                          { type: "Product", id: "ADMIN_LIST" }, // Keep this
                      ]
                    : [{ type: "Product", id: "ADMIN_LIST" }],
        }),

        createProduct: builder.mutation<{ data: TProduct }, FormData>({
            query: (formData) => ({
                url: "/products",
                method: "POST",
                body: formData,
                credentials: "include",
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "Product", id: "ADMIN_LIST" }, // Invalidate admin product list
                { type: "Product", id: "PUBLIC_LIST" }, // Invalidate public product list
                { type: "Product", id: "ADMIN_STATS" }, // Invalidate stats
            ],
        }),

        updateProduct: builder.mutation<{ data: TProduct }, { productId: string; formData: FormData }>({
            query: ({ productId, formData }) => ({
                url: `/products/${productId}`,
                method: "PATCH",
                body: formData,
                credentials: "include",
            }),
            invalidatesTags: (_, __, { productId }) => [
                { type: "Product", id: "ADMIN_LIST" }, // Invalidate admin list
                { type: "Product", id: "PUBLIC_LIST" }, // Invalidate public list
                { type: "Product", id: "ADMIN_STATS" }, // Invalidate stats
                { type: "Product", id: productId }, // Invalidate specific product
            ],
        }),

        toggleProductStatus: builder.mutation<{ data: TProduct }, string>({
            query: (productId) => ({
                url: `/products/${productId}/toggle-status`,
                method: "PATCH",
                credentials: "include",
            }),
            invalidatesTags: (_, __, productId) => [
                { type: "Product", id: "ADMIN_LIST" }, // Invalidate admin list
                { type: "Product", id: "PUBLIC_LIST" }, // Invalidate public list
                { type: "Product", id: "ADMIN_STATS" }, // Invalidate stats
                { type: "Product", id: productId }, // Invalidate specific product
            ],
        }),

        deleteProduct: builder.mutation<void, string>({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, productId) => [
                { type: "Product", id: "ADMIN_LIST" }, // Invalidate admin list
                { type: "Product", id: "PUBLIC_LIST" }, // Invalidate public list
                { type: "Product", id: "ADMIN_STATS" }, // Invalidate stats
                { type: "Product", id: productId }, // Invalidate specific product
            ],
        }),
    }),
});

export const { useGetActiveProductsQuery, useGetProductByIdQuery, useGetAllProductsQuery, useGetProductStatsQuery, useCreateProductMutation, useUpdateProductMutation, useToggleProductStatusMutation, useDeleteProductMutation } = productApi;
