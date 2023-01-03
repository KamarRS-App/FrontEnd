import { configureStore } from "@reduxjs/toolkit";

import adminReducer from './src/features/adminSlice';
import userReducer from './src/features/userSlice';

export default configureStore({
    reducer: {
        staffs: adminReducer,
        users: userReducer,
    }
});