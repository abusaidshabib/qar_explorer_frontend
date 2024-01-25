import hajjApi from "./hajjApi";

const graphApi = hajjApi.injectEndpoints({
  endpoints: (builder) => ({
    getGraphData: builder.query({
      query: ({ type, start_date, end_date, date, tent_id }) => {
        if (type == "day") {
          return `/tent/${tent_id}/graph-counter-${type}?start_date=${start_date}&end_date=${end_date}`;
        } else if (type == "month") {
          return `/tent/${tent_id}/graph-counter-${type}?date=${date}`;
        } else {
          return `/tent/${tent_id}/graph-counter-${type}?date=${date}`;
        }
      },
    }),
  }),
});

export const { useGetGraphDataQuery } = graphApi;
