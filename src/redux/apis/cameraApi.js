import { setAllCamera } from "../slices/camer";
import hajjApi from "./hajjApi";

const cameraApi = hajjApi.injectEndpoints({
  endpoints: (builder) => ({
    getCameraById: builder.query({
      async queryFn(args, query, extraOptions, fetchBWQ) {
        try {
          const prom = await Promise.all(
            args?.map((data) => fetchBWQ(`/cameras?id=${data?.id}`))
          );
          console.log(prom);
          return {
            data: prom?.length
              ? prom?.map((data) => {
                  return data.data[0];
                })
              : [],
          };
        } catch (error) {
          console.log(error);
        }
      },
      providesTags: ["cameraList"],
    }),
    getAllCameraList: builder.query({
      query: () => {
        return "/cameras";
      },
      providesTags: ["tentList", "cameraList"],
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllCamera(data));
        } catch (error) {
          console.log(error);
        }
      },
    }),
    registerCamera: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/register-camera-with-history/",
          body: data,
        };
      },
      invalidatesTags: ["cameraList"],
    }),
    deleteCamera: builder.mutation({
      query: (data) => {
        return {
          method: "DELETE",
          url: `/cameras/${data}/`,
        };
      },
      invalidatesTags: ["cameraList"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCameraByIdQuery,
  useGetAllCameraListQuery,
  useRegisterCameraMutation,
  useDeleteCameraMutation,
} = cameraApi;
