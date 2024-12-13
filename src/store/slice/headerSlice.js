import { createSlice } from "@reduxjs/toolkit"


const headerSlice = createSlice({
    name: "header",
    initialState: {
        tab: null,
        url: "/dashboard/home",
        search: ""
    },
    reducers: {
        setHeaderDetails: (state, action) => {
            state = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    }
})



export const { setHeaderDetails, setSearch } = headerSlice.actions
export default headerSlice.reducer;