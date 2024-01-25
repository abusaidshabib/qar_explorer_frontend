import { setAllUsers } from "../slices/user";
import hajjApi from "./hajjApi";

const userApi = hajjApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => {
        return "users/";
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllUsers(data));
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["userList"],
    }),
    registerUser: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "register/",
          body: data,
        };
      },
      invalidatesTags: ["userList"],
    }),
    deleteUser: builder.mutation({
      query: (data) => {
        return {
          method: "DELETE",
          url: `del-users/${data}`,
        };
      },
      invalidatesTags: ["userList"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllUserQuery,
  useRegisterUserMutation,
  useDeleteUserMutation,
} = userApi;
