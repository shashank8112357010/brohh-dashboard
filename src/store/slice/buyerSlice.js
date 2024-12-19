import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const buyerSlice = createSlice({
  name: 'buyer',
  initialState: {
    data: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      city: null,
      state: null,
      pincode: null,
      address: null,
      location: null,
      adhaar: null,
      profile: null,
      individualPan: null,
      blankCheque: null,
      source_of_fund: null,
      siteId: null
    },
    isIndividualOpen: false,
    buyerData: []
  },
  reducers: {
    resetBuyer: () => initialState,
    setBuyerData: (state, action) => {
      state.buyerData = action.payload
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

export const { setFormValue, setIndividualOpen, setBuyerData } =
  buyerSlice.actions
export default buyerSlice.reducer
