import { configureStore } from '@reduxjs/toolkit'
import dataSlice from './reducers/dataSlice'

export const store = configureStore({
  reducer: {
    dataSlice
  },
})

