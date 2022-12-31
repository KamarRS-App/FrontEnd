import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
    name: 'staffs',
    initialState: {},
    reducers: {
        addStaffs: (state, action) => {
            const newData = {
                id: action.payload.id,
                nama: action.payload.nama,
                hospital_id: action.payload.hospital_id,
            }
            return state = newData;
            
        }
    }
});

export const { addStaffs } = adminSlice.actions;
export default adminSlice.reducer;