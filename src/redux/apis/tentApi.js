import { setTentList } from "../slices/tent";
import hajjApi from "./hajjApi";

const tentApi = hajjApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTent: builder.query({
      query: () => {
        return "/tents";
      },
      providesTags: ["tentList"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTentList(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerTent: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/tents",
          body: data,
        };
      },
      invalidatesTags: ["tentList"],
    }),
    deleteTent: builder.mutation({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/tents/${data}`,
        };
      },
      invalidatesTags: ["tentList"],
    }),
    getTentById: builder.query({
      query: (data) => {
        return `/tent/${data.tent_id}/graph-counter-day?start_date=${data.date}&end_date=${data.date}`;
      },
    }),
    getTentCounter: builder.query({
      query: (tentID) => {
        return `/tent-counter?tent=${tentID}`;
      }
    })
  }),
});

export const {
  useGetAllTentQuery,
  useRegisterTentMutation,
  useGetTentByIdQuery,
  useGetTentCounterQuery,
  useDeleteTentMutation
} = tentApi;
