import { configureStore } from '@reduxjs/toolkit';
import slice from './slice';

const Store = configureStore({
    reducer:{
        photoVideo: slice,
    },
});

export default Store;