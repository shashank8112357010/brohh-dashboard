import { createSlice } from "@reduxjs/toolkit"

const freelancerSlice = createSlice({
    name: "freelancer",
    initialState: {
        data: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            location: "",
            state: "",
            city: "",
            pincode: "",
            profile: "",
        },
        isIndividualOpen: false,
        freelancerData: [],
    },
    reducers: {
        setFreelancerData: (state, action) => {
            state.freelancerData = action.payload
        },

        setFormValue: (state, action) => {
            if (action.payload.type === "fill") {
                const { key, value } = action.payload.data
                state.data[key] = value;
            } else {
                state.data = action.payload.data
            }
        },
        setIndividualOpen: (state, action) => {
            state.isIndividualOpen = action.payload
        }
    }
})


export const { setFormValue, setFreelancerData, setIndividualOpen } = freelancerSlice.actions
export default freelancerSlice.reducer;