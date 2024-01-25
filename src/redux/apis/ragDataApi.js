import hajjApi from "./hajjApi";
import { setRagData } from "../slices/RagData";

const ragDataApi = hajjApi.injectEndpoints({
    endpoints: (builder) => ({
        getRagData: builder.query({
            query: () => {
                return "rag-data/";
            },
            providesTags: ['ragdataList'],
            async onQueryStarted(args,{dispatch, queryFulfilled}){
                try{
                    const { data } = await queryFulfilled;
                    dispatch(setRagData(data));
                }
                catch(error){
                    console.log(error)
                }
            }
        }),
        deleteRagData: builder.mutation({
            query: (data) => {
              return {
                method: "DELETE",
                url: `rag-data/${data}/`,
              };
            },
            invalidatesTags: ["ragdataList"],
          }),
    })
})

export const {
    useGetRagDataQuery,
    useDeleteRagDataMutation
} = ragDataApi;