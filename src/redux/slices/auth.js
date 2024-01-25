import { createSlice } from "@reduxjs/toolkit";
import { deleteToken } from "../../utils/tokens";

const initialState = {
    user: undefined,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        deleteUser: (state, action) => {
            state.user = undefined;
            deleteToken();
        }
    }
});

export default authSlice;
export const {setUser, deleteUser} = authSlice.actions;