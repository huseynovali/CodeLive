import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    video: {}

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
        }
    },
})

export const { addUserData,addVideoData } = dataSlice.actions

export default dataSlice.reducer