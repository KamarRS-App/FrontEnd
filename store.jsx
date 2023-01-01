import { configureStore } from "@reduxjs/toolkit";

import adminReducer from './src/features/adminSlice';

export default configureStore({
    reducer: {
        staffs: adminReducer,
    }
});