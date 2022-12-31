import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const adminSlice = createSlice({
    name: 'staffs',
    initialState: JSON.parse(sessionStorage.getItem('staff')) || {},
    reducers: {
        addStaffs: (state, action) => {
            const newData = {
                id: action.payload.id,
                nama: action.payload.nama,
                hospital_id: action.payload.hospital_id,
            }
            sessionStorage.setItem('staff', JSON.stringify(newData));
            return state = newData;
        },
        destroyStaffs: (state, action) => {
            state = {};
            sessionStorage.removeItem('staff')
            Cookies.remove('name');
            Cookies.remove('token');
            Cookies.remove('role');
        }
    }
});

export const { addStaffs, destroyStaffs } = adminSlice.actions;
export default adminSlice.reducer;