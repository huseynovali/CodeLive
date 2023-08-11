import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    video: {},
    category: [],
    allUsers:[]

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
        },
        addAllUser: (state, action) => {
            state.allUsers = action.payload
        }
    },
})

export const { addUserData, addVideoData, addCategoryData,addAllUser } = dataSlice.actions

export default dataSlice.reducer