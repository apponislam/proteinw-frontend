import { baseApi } from "../../api/baseApi";
import { TUser } from "./authSlice";

type AuthResponse = {
    data: {
        user: TUser;
        accessToken: string;
    };
};

type RefreshTokenResponse = {
    data: {
        user: TUser;
        accessToken: string;
    };
};

type VerifyOtpResponse = {
    data: {
        token: string;
    };
};

export type TAdminStats = {
    _id: string;
    name: string;
    email: string;
    isActive: boolean;
    groupName: string | null;
    sellerCount: number;
    orderCount: number;
};

export type TAdminStatsMeta = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
};

const authApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, { email: string; password: string }>({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
        }),
        register: builder.mutation<AuthResponse, FormData>({
            query: (userInfo) => ({
                url: "/auth/register",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
        }),
        registerSeller: builder.mutation<AuthResponse, FormData>({
            query: (userInfo) => ({
                url: "/auth/register-seller",
                method: "POST",
                body: userInfo,
                credentials: "include",
            }),
        }),
        refreshToken: builder.mutation<RefreshTokenResponse, void>({
            query: () => ({
                url: "/auth/refresh-token",
                method: "POST",
                credentials: "include",
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
                credentials: "include",
            }),
        }),
        getMe: builder.query<TUser, void>({
            query: () => ({
                url: "/auth/me",
                method: "GET",
                credentials: "include",
            }),
        }),
        // === Email verification endpoints ===
        verifyEmail: builder.query({
            query: ({ email, token, otp }: { email: string; token?: string; otp?: string }) => ({
                url: `/auth/verify-email`,
                method: "GET",
                params: { email, ...(token && { token }), ...(otp && { otp }) },
            }),
        }),
        resendVerificationEmail: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: "/auth/resend-verification",
                method: "POST",
                body,
            }),
        }),
        // === Forgot password endpoints ===
        requestPasswordReset: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: "/auth/forgot-password",
                method: "POST",
                body,
            }),
        }),
        verifyOtp: builder.mutation<VerifyOtpResponse, { email: string; otp: string }>({
            query: (body) => ({
                url: "/auth/verify-otp",
                method: "POST",
                body,
            }),
        }),
        resendOtp: builder.mutation<void, { email: string }>({
            query: (body) => ({
                url: "/auth/resend-otp",
                method: "POST",
                body,
            }),
        }),
        resetPassword: builder.mutation<void, { token: string; newPassword: string }>({
            query: (body) => ({
                url: "/auth/reset-password",
                method: "POST",
                body,
            }),
        }),
        // === Profile endpoints ===
        updateProfile: builder.mutation<{ data: TUser }, FormData>({
            query: (data) => ({
                url: "/auth/profile",
                method: "PATCH",
                body: data,
                credentials: "include",
            }),
        }),
        changePassword: builder.mutation<void, { currentPassword: string; newPassword: string }>({
            query: (body) => ({
                url: "/auth/change-password",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),
        // === Email update endpoints ===
        updateEmail: builder.mutation<void, { email: string; password: string }>({
            query: (body) => ({
                url: "/auth/update-email",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),
        resendEmailUpdate: builder.mutation<void, { password: string }>({
            query: (body) => ({
                url: "/auth/resend-email-update",
                method: "POST",
                body,
                credentials: "include",
            }),
        }),
        verifyNewEmail: builder.query({
            query: ({ token, email }: { token: string; email: string }) => ({
                url: "/auth/verify-new-email",
                method: "GET",
                params: { token, email },
            }),
        }),
        // === Admin endpoints ===
        setUserPassword: builder.mutation<void, { userId: string; password: string }>({
            query: ({ userId, password }) => ({
                url: `/auth/set-password/${userId}`,
                method: "POST",
                body: { password },
                credentials: "include",
            }),
        }),
        createAdmin: builder.mutation<{ data: TUser }, any>({
            query: (adminInfo) => ({
                url: "/auth/create-admin",
                method: "POST",
                body: adminInfo,
                credentials: "include",
            }),
        }),
        getAdminsWithStats: builder.query<{ data: TAdminStats[]; meta: TAdminStatsMeta }, { page?: number; limit?: number } | void>({
            query: (params) => {
                const queryParams = new URLSearchParams();
                if (params?.page) queryParams.append("page", String(params.page));
                if (params?.limit) queryParams.append("limit", String(params.limit));

                return {
                    url: `/auth/admins-with-stats?${queryParams.toString()}`,
                    method: "GET",
                    credentials: "include",
                };
            },
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useRegisterSellerMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
    useGetMeQuery,
    useVerifyEmailQuery,
    useResendVerificationEmailMutation,
    useRequestPasswordResetMutation,
    useVerifyOtpMutation,
    useResendOtpMutation,
    useResetPasswordMutation,
    useUpdateProfileMutation,
    useChangePasswordMutation,
    useUpdateEmailMutation,
    useResendEmailUpdateMutation,
    useVerifyNewEmailQuery,
    useSetUserPasswordMutation,
    useCreateAdminMutation,
    useGetAdminsWithStatsQuery,
} = authApi;
