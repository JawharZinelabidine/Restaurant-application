import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: false,
    notificationBadge: false,
    notificationBody: '',
    reviewNotificationBadge: false,
    reviewNotificationBody: '',


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
        setReviewNotificationBadge: (state, action) => {
            state.reviewNotificationBadge = action.payload;
        },
        setReviewNotificationBody: (state, action) => {
            state.reviewNotificationBody = action.payload;
        },



    },
});

export const {
    setToast,
    setNotificationBadge,
    setNotificationBody,
    setReviewNotificationBadge,
    setReviewNotificationBody


} = notificationSlice.actions;



export default notificationSlice.reducer;