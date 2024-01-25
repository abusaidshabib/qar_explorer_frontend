import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allFineTuningData: undefined,
    selectedFineTuneData: undefined,
}

const fineTuningSlice = createSlice({
    name: 'finetuning',
    initialState,
    reducers: {
        setAllTune: (state, action) => {
            state.allFineTuningData = action.payload;
        },
        setSelectedFineTuneData: (state, action) => {
            state.selectedFineTuneData = action.payload;
        }
    }
});


export default fineTuningSlice;
export const {setAllTune, setSelectedFineTuneData} = fineTuningSlice.actions;