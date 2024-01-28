import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allRagData: undefined,
    selectedRagData: undefined,
}

const ragDataSlice = createSlice({
    name: 'ragdata',
    initialState,
    reducers: {
        setRagData:(state, action) => {
            state.allRagData = action.payload.slice().map((data)=>{
                return {
                    ...data,
                    toggle: false
                }
            });
        },
        setSelectedRagData: (state, action) => {
            state.selectedRagData = action.payload
        }
    }
})

export default ragDataSlice;
export const {setRagData, setSelectedRagData} = ragDataSlice.actions