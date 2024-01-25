import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allFineTuningData: undefined,
}

const fineTuningSlice = createSlice({
    name: 'finetuning',
    initialState,
    reducers: {
        setAllTune: (state, action) => {
            state.allFineTuningData = action.payload;
        }
    }
});


export default fineTuningSlice;
export const {setAllTune} = fineTuningSlice.actions;