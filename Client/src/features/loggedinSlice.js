import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loggedin:false



};


const loggedinSlice = createSlice({
    name: "Loggedin",
    initialState,
    reducers: {

       

        setLoggedin: (state, action) => {
            state.loggedin =        !state.loggedin
          },


    },
});

export const {
    setLoggedin,
} = loggedinSlice.actions;



export default loggedinSlice.reducer;