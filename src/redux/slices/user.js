import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userAll: undefined,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAllUsers: (state, action) => {
            state.userAll = action.payload;
        }
    }
});


export default userSlice;
export const {setAllUsers} = userSlice.actions;