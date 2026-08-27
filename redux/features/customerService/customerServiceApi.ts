import { baseApi } from "../../api/baseApi";

export type TIssueType = "reklamation" | "byte";
export type TCustomerServiceStatus = "pending" | "in_progress" | "resolved" | "rejected";

export type TCustomerServiceRequest = {
    _id: string;
    issueType: TIssueType;
    orderId?: string | any;
    name: string;
    email: string;
    phone?: string;
    description: string;
    images?: string[];
    status: TCustomerServiceStatus;
    adminNotes?: string;
    isDeleted?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export type TCreateCustomerServicePayload = {
    issueType: TIssueType;
    orderId?: string;
    name: string;
    email: string;
    phone?: string;
    description: string;
    images?: string[];
};

export type TCustomerServiceMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

export type TCustomerServiceResponse = {
    data: TCustomerServiceRequest[];
    meta: TCustomerServiceMeta;
};

export type TGetCustomerServiceParams = {
    page?: number;
    limit?: number;
    status?: TCustomerServiceStatus;
    issueType?: TIssueType;
    searchTerm?: string;
};

export type TCustomerServiceStats = {
    totalRequests: number;
    pendingCount: number;
    inProgressCount: number;
    resolvedCount: number;
    rejectedCount: number;
    reklamationCount: number;
    byteCount: number;
};

const customerServiceApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoint: Submit a customer service (reklamation or byte) request
        createCustomerServiceRequest: builder.mutation<TCustomerServiceRequest, FormData | TCreateCustomerServicePayload>({
            query: (payload) => ({
                url: "/customer-service",
                method: "POST",
                body: payload,
            }),
            invalidatesTags: ["CustomerService"],
        }),

        // Admin dashboard endpoints
        getAllCustomerServiceRequests: builder.query<TCustomerServiceResponse, TGetCustomerServiceParams | void>({
            query: (params) => ({
                url: "/customer-service",
                method: "GET",
                params: params || undefined,
                credentials: "include",
            }),
            providesTags: (result) =>
                result
                    ? [...result.data.map(({ _id }) => ({ type: "CustomerService" as const, id: _id })), { type: "CustomerService", id: "LIST" }]
                    : [{ type: "CustomerService", id: "LIST" }],
        }),

        getCustomerServiceRequestById: builder.query<TCustomerServiceRequest, string>({
            query: (id) => ({
                url: `/customer-service/${id}`,
                method: "GET",
                credentials: "include",
            }),
            providesTags: (result, error, id) => [{ type: "CustomerService", id }],
        }),

        updateCustomerServiceRequest: builder.mutation<
            TCustomerServiceRequest,
            { id: string; status?: TCustomerServiceStatus; adminNotes?: string }
        >({
            query: ({ id, ...payload }) => ({
                url: `/customer-service/${id}`,
                method: "PATCH",
                body: payload,
                credentials: "include",
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "CustomerService", id }, { type: "CustomerService", id: "LIST" }],
        }),

        deleteCustomerServiceRequest: builder.mutation<{ success: boolean; message: string }, string>({
            query: (id) => ({
                url: `/customer-service/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: [{ type: "CustomerService", id: "LIST" }],
        }),

        getCustomerServiceStats: builder.query<{ data: TCustomerServiceStats }, void>({
            query: () => ({
                url: "/customer-service/stats",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["CustomerService"],
        }),
    }),
});

export const {
    useCreateCustomerServiceRequestMutation,
    useGetAllCustomerServiceRequestsQuery,
    useGetCustomerServiceRequestByIdQuery,
    useUpdateCustomerServiceRequestMutation,
    useDeleteCustomerServiceRequestMutation,
    useGetCustomerServiceStatsQuery,
} = customerServiceApi;
