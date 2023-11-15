import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    fullname: "",
    email: "",

};


const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setId: (state, action) => {
            state.id = action.payload;
        },
        setFullname: (state, action) => {
            state.fullname = action.payload;
        },
        setEmail: (state, action) => {
            state.email = action.payload;
        },



    },
});

export const {
    setId,
    setFullname,
    setEmail,
    getUpcoming,
    getExpired,

} = customerSlice.actions;



export default customerSlice.reducer;