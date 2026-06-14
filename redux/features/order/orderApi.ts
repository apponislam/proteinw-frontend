import { baseApi } from "../../api/baseApi";

export type TOrderItem = {
    productId: string;
    productName: string;
    quantity: number;
    singlePrice: number;
    lineTotal: number;
};

export type TOrderAddress = {
    street: string;
    city: string;
    postalCode: string;
    country: string;
};

export type TOrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export type TOrder = {
    _id?: string;
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    address: TOrderAddress;
    items: TOrderItem[];
    totalPackage: number;
    totalPrice: number;
    memberId?: string;
    campaignId?: string;
    groupId?: string;
    status: TOrderStatus;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TOrderMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TOrderResponse = {
    data: TOrder[];
    meta: TOrderMeta;
};

// Create order payload type
export type TCreateOrderPayload = {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    address: TOrderAddress;
    items: Array<{
        productId: string;
        quantity: number;
    }>;
    memberId?: string;     // Can be user referralCode or user ObjectId
    campaignId?: string;   // Can be campaign code or campaign ObjectId
    referralCode?: string; // Explicit user referral code
    campaignCode?: string; // Explicit campaign code
};

const orderApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoint - create guest order (no auth required)
        createOrder: builder.mutation<{ data: TOrder }, TCreateOrderPayload>({
            query: (orderData) => ({
                url: "/orders",
                method: "POST",
                body: orderData,
            }),
            invalidatesTags: [
                { type: "Order", id: "ADMIN_LIST" },
                { type: "Product", id: "PUBLIC_LIST" },
                { type: "Campaign", id: "PUBLIC_LIST" },
            ],
        }),

        // Protected endpoints (auth required)
        getOrdersByMember: builder.query<TOrderResponse, { page?: number; limit?: number; status?: TOrderStatus }>({
            query: ({ page = 1, limit = 10, status }) => {
                const params = new URLSearchParams();
                params.append("page", String(page));
                params.append("limit", String(limit));
                if (status) params.append("status", status);

                return {
                    url: `/orders/member?${params.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Order" as const, id: _id })), { type: "Order", id: "MEMBER_LIST" }] : [{ type: "Order", id: "MEMBER_LIST" }]),
        }),

        getOrderById: builder.query<{ data: TOrder }, string>({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (_, __, orderId) => [{ type: "Order", id: orderId }],
        }),

        // Admin endpoints (ADMIN and SUPER_ADMIN)
        getAllOrders: builder.query<TOrderResponse, { page?: number; limit?: number; status?: TOrderStatus; memberId?: string; campaignId?: string; groupId?: string } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();

                let page = 1;
                let limit = 10;

                if (params) {
                    if (params.page) page = params.page;
                    if (params.limit) limit = params.limit;
                    if (params.status) queryParams.append("status", params.status);
                    if (params.memberId) queryParams.append("memberId", params.memberId);
                    if (params.campaignId) queryParams.append("campaignId", params.campaignId);
                    if (params.groupId) queryParams.append("groupId", params.groupId);
                }

                queryParams.append("page", String(page));
                queryParams.append("limit", String(limit));

                return {
                    url: `/orders?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
            providesTags: (result) => (result ? [...result.data.map(({ _id }) => ({ type: "Order" as const, id: _id })), { type: "Order", id: "ADMIN_LIST" }] : [{ type: "Order", id: "ADMIN_LIST" }]),
        }),

        updateOrderStatus: builder.mutation<{ data: TOrder }, { orderId: string; status: TOrderStatus }>({
            query: ({ orderId, status }) => ({
                url: `/orders/${orderId}/status`,
                method: "PATCH",
                body: { status },
                credentials: "include",
            }),
            invalidatesTags: (_, __, { orderId }) => [
                { type: "Order", id: "ADMIN_LIST" },
                { type: "Order", id: "MEMBER_LIST" },
                { type: "Order", id: orderId },
            ],
        }),

        deleteOrder: builder.mutation<{ data: TOrder }, string>({
            query: (orderId) => ({
                url: `/orders/${orderId}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_, __, orderId) => [
                { type: "Order", id: "ADMIN_LIST" },
                { type: "Order", id: "MEMBER_LIST" },
                { type: "Order", id: orderId },
            ],
        }),
    }),
});

export const { useCreateOrderMutation, useGetOrdersByMemberQuery, useGetOrderByIdQuery, useGetAllOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } = orderApi;
