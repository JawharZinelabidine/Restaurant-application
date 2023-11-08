import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: false,
    notificationBadge: false,
    notificationBody: ''


};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.toast = action.payload;
        },
        setNotificationBadge: (state, action) => {
            state.notificationBadge = action.payload;
        },
        setNotificationBody: (state, action) => {
            state.notificationBadge = action.payload;
        },



    },
});

export const {
    setToast,
    setNotificationBadge,
    setNotificationBody


} = notificationSlice.actions;



export default notificationSlice.reducer;