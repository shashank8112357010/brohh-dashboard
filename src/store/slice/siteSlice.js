import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    data: {
      site_name: '',
      site_image: '',
      site_location: '',
      site_description: '',
      buildings: [
        {
          block: '',
          flats: [
            {
              flat_name: '',
              flat_image: null,
              flat_type: ''
            }
          ]
        }
      ]
    },
    isIndividualOpen: false
  },
  reducers: {
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

export const { setFormValue, setIndividualOpen } = siteSlice.actions
export default siteSlice.reducer
