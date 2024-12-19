import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
//APi calls
import { v4 as uuidv4 } from 'uuid'
export const fetchDashboardData = createAsyncThunk(
  'data/fetchDashboardData',
  async () => {
    // Api call over here for dashboardData fetchDashboardData
  }
)

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    popup: {
      message: null,
      id: null,
      type: null
    },
    sellerCount: 0,
    buyerCount: 0,
    siteCount: 0,
    data: [],
    tableData: []
  },
  reducers: {
    setPopup: (state, action) => {
      state.popup.message = action.payload.message
      state.popup.type = action.payload.type
      state.popup.id = uuidv4()
    },
    clearPopup: (state) => {
      state.popup.message = null
      state.popup.type = null
      state.popup.id = null
    },
    setTableData: (state, action) => {
      state.tableData = action.payload
    },
    setSellerCount: (state, action) => {
      state.sellerCount = action.payload
    },
    setBuyerCount: (state, action) => {
      // state.buyerCount = action.payload?.map((item) => item.numBuyers).reduce((acc, curVal) => acc + curVal)
    },
    setSiteCount: (state, action) => {
      state.siteCount = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state, action) => {
        state.data = []
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.data = action.payload
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.data = []
      })
  }
})

export const {
  setTableData,
  setSiteCount,
  setSellerCount,
  setBuyerCount,
  clearPopup,
  setPopup
} = dashboardSlice.actions
export default dashboardSlice.reducer
