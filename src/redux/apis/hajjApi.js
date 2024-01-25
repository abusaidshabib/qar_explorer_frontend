import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const hajjApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API,
    prepareHeaders: (headers, { getState }) => {
      const token = getState()?.auth?.user?.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "hajjApi",
  tagTypes: ['tentList', 'cameraList', 'userList', 'finetuningList', 'ragdataList'],
  endpoints: (builder) => ({}),
});

export default hajjApi;
