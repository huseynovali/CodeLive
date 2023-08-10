import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    video: {},
    category: []

}

export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        addUserData: (state, action) => {
            state.user = action.payload
        },
        addVideoData: (state, action) => {
            state.video = action.payload
        },
        addCategoryData: (state, action) => {
            state.category = action.payload
        }
    },
})

export const { addUserData, addVideoData, addCategoryData } = dataSlice.actions

export default dataSlice.reducer