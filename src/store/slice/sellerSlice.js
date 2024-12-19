import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const sellerSlice = createSlice({
  name: 'seller',
  initialState: {
    data: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      address: null,
      companyName: null,
      location: null,
      state: null,
      city: null,
      pincode: null,
      profile: null,
      adhaar: null,
      companyPan: null,
      blankCheque: null,
      certificate_of_incorporate: null
    },
    isIndividualOpen: false,
    sellerData: []
  },
  reducers: {
    setSellerData: (state, action) => {
      state.sellerData = action.payload
    },

    setFormValue: (state, action) => {
      if (action.payload.type === 'fill') {
        const { key, value } = action.payload.data
        state.data[key] = value
      } else {
        state.data = action.payload.data
      }
    },
    setIndividualOpen: (state, action) => {
      state.isIndividualOpen = action.payload
    }
  }
})

export const { setFormValue, setSellerData, setIndividualOpen } =
  sellerSlice.actions
export default sellerSlice.reducer
