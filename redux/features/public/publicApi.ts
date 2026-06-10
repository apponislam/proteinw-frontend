import { baseApi } from "../../api/baseApi";

export enum PolicyTypeEnum {
    TERMS_AND_CONDITIONS = "terms-and-conditions",
    PRIVACY_POLICY = "privacy-policy",
}

export type TPolicy = {
    _id: string;
    type: PolicyTypeEnum;
    title: string;
    content: string;
    publishedAt?: string;
    isDeleted: boolean;
    createdAt?: string;
    updatedAt?: string;
};

const publicApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Public endpoints
        getAllPolicies: builder.query<{ data: TPolicy[] }, void>({
            query: () => ({
                url: "/public",
                method: "GET",
            }),
            providesTags: (result) => (result ? [...result.data.map(({ type }) => ({ type: "Policy" as const, id: type })), { type: "Policy", id: "LIST" }] : [{ type: "Policy", id: "LIST" }]),
        }),

        getPolicyByType: builder.query<{ data: TPolicy }, PolicyTypeEnum>({
            query: (type) => ({
                url: `/public/${type}`,
                method: "GET",
            }),
            providesTags: (_result, _error, type) => [{ type: "Policy", id: type }],
        }),

        // Admin-only endpoints
        upsertPolicy: builder.mutation<{ data: TPolicy }, { type: PolicyTypeEnum; title: string; content: string; publishedAt?: string }>({
            query: (payload) => ({
                url: "/public",
                method: "POST",
                body: payload,
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, payload) => [
                { type: "Policy", id: "LIST" },
                { type: "Policy", id: payload.type },
            ],
        }),

        deletePolicy: builder.mutation<void, PolicyTypeEnum>({
            query: (type) => ({
                url: `/public/${type}`,
                method: "DELETE",
                credentials: "include",
            }),
            invalidatesTags: (_result, _error, type) => [
                { type: "Policy", id: "LIST" },
                { type: "Policy", id: type },
            ],
        }),
    }),
});

export const { useGetAllPoliciesQuery, useGetPolicyByTypeQuery, useUpsertPolicyMutation, useDeletePolicyMutation } = publicApi;
