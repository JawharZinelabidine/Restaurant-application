import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedin: false,
    token: ''



};


const loggedinSlice = createSlice({
    name: "Loggedin",
    initialState,
    reducers: {



        setLoggedin: (state, action) => {
            state.loggedin = !state.loggedin
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },


    },
});

export const {
    setLoggedin,
    setToken
} = loggedinSlice.actions;



export default loggedinSlice.reducer;