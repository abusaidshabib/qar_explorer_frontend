import { setTokens } from "../../utils/tokens";
import { setUser } from "../slices/auth";
import hajjApi from "./hajjApi";

const authApi = hajjApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => {
                return {
                    method: 'POST',
                    url: 'login/',
                    body: data,
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled;
                    dispatch(setUser(data));
                    setTokens(data);
                }catch(error){  
                    console.log(error);
                }
            }
        })
    }),
    overrideExisting: true,
})

export const {useLoginMutation} = authApi;