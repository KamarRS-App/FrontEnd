import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const userSlice = createSlice({
    name: 'users',
    initialState: JSON.parse(sessionStorage.getItem('users')) || {},
    reducers: {
        addUsers: (state, action) => {
            const newData = {
                id: action.payload.id,
                nama: action.payload.nama,
                email: action.payload.email,
                nik: action.payload.nik,
                no_kk: action.payload.no_kk,
                no_telpon: action.payload.no_telpon
            }
            sessionStorage.setItem('users', JSON.stringify(newData));
            return state = newData;
        },
        destroyUsers: (state, action) => {
            state = {};
            sessionStorage.removeItem('staff')
            Cookies.remove('name');
            Cookies.remove('token');
        }
    }
});

export const { addUsers, destroyUsers } = userSlice.actions;
export default userSlice.reducer;