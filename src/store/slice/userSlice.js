import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        data: {
            username: "John Doe",
            profile: ""
        },
        role: "admin"
    },
    reducers: {
        resetUser: (initialState) => initialState,

        setUserProfile: (state, action) => {
            state.data.profile = action.payload;
        },

        setUserDetail: (state, action) => {
            state.data = action.payload;
        },

        setUserName: (state, action) => {
            state.data.username = action.payload;
        },
        setUserRole: (state, action) => {
            state.role = action.payload;
        }
    },
})



export const { setUserDetail, setUserProfile, setUserRole, setUserName, resetUser } = userSlice.actions;
export default userSlice.reducer;