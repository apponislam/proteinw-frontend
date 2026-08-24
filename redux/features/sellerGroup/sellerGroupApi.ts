import { baseApi } from "../../api/baseApi";
import { TUser } from "../auth/authSlice";
import { TGroup } from "../group/groupApi";

export type TSellerGroup = {
    _id?: string;
    sellerId: string;
    groupId: string;
    isDeleted: boolean;
    createdAt?: Date;
    updatedAt?: Date;
};

export type TSellerGroupResponse = {
    data: TUser[];
};

export type TMyJoinedGroupsResponse = {
    data: TGroup[];
};

const sellerGroupApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Join group by Group ID (Seller)
        joinGroup: builder.mutation<{ data: TSellerGroup; message: string }, { groupId: string }>({
            query: (body) => ({
                url: "/seller-groups/join",
                method: "POST",
                body,
            }),
            invalidatesTags: ["SellerGroup", "Group", { type: "User", id: "LIST" }],
        }),

        // Join group by invitation code (Seller)
        joinGroupByInvitationCode: builder.mutation<{ data: TSellerGroup; message: string }, { code: string }>({
            query: (body) => ({
                url: "/seller-groups/join-code",
                method: "POST",
                body,
            }),
            invalidatesTags: ["SellerGroup", "Group", { type: "User", id: "LIST" }],
        }),

        // Get seller's joined groups (Seller)
        getMyJoinedGroups: builder.query<TMyJoinedGroupsResponse, void>({
            query: () => ({
                url: "/seller-groups/my-groups",
                method: "GET",
            }),
            providesTags: ["SellerGroup"],
        }),

        // Get all sellers in a group (Admin & Super Admin)
        getGroupSellers: builder.query<TSellerGroupResponse, string | Record<string, any>>({
            query: (args) => {
                let groupId = "";
                if (typeof args === "string") {
                    groupId = args;
                } else if (args && typeof args === "object") {
                    groupId = args.groupId || args.id || args._id || "";
                }
                if (!groupId || groupId === "[object Object]") {
                    groupId = "";
                }
                return {
                    url: `/seller-groups/group/${groupId}`,
                    method: "GET",
                };
            },
            providesTags: (result, _, groupId) =>
                result
                    ? [
                          ...result.data.map(({ _id }) => ({ type: "User" as const, id: _id })),
                          { type: "SellerGroup", id: `GROUP_${groupId}` },
                      ]
                    : [{ type: "SellerGroup", id: `GROUP_${groupId}` }],
        }),
    }),
});

export const {
    useJoinGroupMutation,
    useJoinGroupByInvitationCodeMutation,
    useGetMyJoinedGroupsQuery,
    useGetGroupSellersQuery,
} = sellerGroupApi;
