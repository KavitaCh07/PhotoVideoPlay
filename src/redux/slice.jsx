import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    photo:[],
    video:[],
    // favPhoto: JSON.parse(localStorage.getItem("favPhoto")||[]),
    // favVideo: JSON.parse(localStorage.getItem("favVideo")||[])
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
        // AddFav: (state, action)=>{
        //     state.favPhoto=action.payload
        //     console.log("fav hit",state.favPhoto);
        //     localStorage.setItem("favPhoto",  JSON.stringify(state.favPhoto));
        // }
    }
})

export const {AddPhoto, AddVideo, AddFav}  = PhotoVideoSlice.actions;
export default PhotoVideoSlice.reducer;