import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tentList: undefined,
  selectedTent: localStorage.getItem("selectedTent")
    ? JSON.parse(localStorage.getItem("selectedTent"))
    : undefined,
};

const tentSlice = createSlice({
  name: "tent",
  initialState,
  reducers: {
    setTentList: (state, action) => {
      state.tentList = action.payload;
      if (!state?.selectedTent) {
        state.selectedTent = action.payload[0];
      }
    },
    setTent: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.selectedTent = state.tentList.filter((data) => {
          return data.id == action.payload;
        })[0];
        localStorage.setItem(
          "selectedTent",
          JSON.stringify(state.selectedTent)
        );
      }
    },
  },
});

export default tentSlice;
export const { setTentList, setTent } = tentSlice.actions;
