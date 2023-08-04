import { createSlice } from '@reduxjs/toolkit'
import { axiosInstance } from '../../services/axiosServices'

const initialState = {
  value: 0,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  },
})

export const { login } = authSlice.actions

export default authSlice.reducer