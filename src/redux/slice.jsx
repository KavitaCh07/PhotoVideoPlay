import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photo:[],
    video:[],
}

const PhotoVideoSlice = createSlice({
    name:'photoVideo',
    initialState,
    reducers: {
        AddPhoto: (state, action) => {
            state.photo = action.payload
            console.log("photo hit",state.photo);
        },
        AddVideo: (state, action) => {
            state.video = action.payload
            console.log("video.hit");
        },
    }
})

export const {AddPhoto, AddVideo, AddFav}  = PhotoVideoSlice.actions;
export default PhotoVideoSlice.reducer;