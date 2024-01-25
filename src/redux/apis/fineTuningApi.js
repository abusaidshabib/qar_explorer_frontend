import { setAllTune } from "../slices/fineTuning";
import hajjApi from "./hajjApi";

const fineTuningApi = hajjApi.injectEndpoints({
    endpoints: (builder) => ({
        getFineTune: builder.query({
            query: () => {
                return "fine-tuning-qas/";
            },
            providesTags: ['finetuningList'],
            async onQueryStarted(args,{dispatch, queryFulfilled}){
                try{
                    const { data } = await queryFulfilled;
                    dispatch(setAllTune(data));
                }
                catch(error){
                    console.log(error)
                }
            }
        }),
        postFineTune: builder.mutation({
            query: (data) => {
              return {
                method: "POST",
                url: "fine-tuning-qas/",
                body: data,
              };
            },
            invalidatesTags: ["finetuningList"],
          }),
        deleteFineTune: builder.mutation({
            query: (data) => {
              return {
                method: "DELETE",
                url: `fine-tuning-qas/${data}/`,
              };
            },
            invalidatesTags: ["finetuningList"],
          }),
        updateFineTune: builder.mutation({
            query: (data) => {
              return {
                method: "PATCH",
                url: `fine-tuning-qas/${data}/`,
                body: data,
              };
            },
            invalidatesTags: ["finetuningList"],
          }),
    })
})


export const {
    useGetFineTuneQuery,
    useDeleteFineTuneMutation,
    usePostFineTuneMutation,
    useUpdateFineTuneMutation,
} = fineTuningApi;