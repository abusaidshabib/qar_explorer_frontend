import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    mode: 'hajj',
    active: 'dashboard',
    statusTime: -3,
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setMode: (state, action) => {
            if(state.mode == 'hajj'){
                state.mode = 'hajj1';
            }else{
                state.mode = 'hajj';
            }
        },
        setActive: (state, action) => {
            state.active = action.payload;
        }
    }
});

export default globalSlice;
export const {setMode, setActive} = globalSlice.actions