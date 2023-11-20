import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toast: false,
    toast2: false,
    notificationBadge: false,
    notificationBody: '',
    reviewNotificationBadge: false,
    reviewNotificationBody: '',
    messageNotificationBadge: false,


};


const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        setToast: (state, action) => {
            state.toast = action.payload;
        },
        setToast2: (state, action) => {
            state.toast2 = action.payload;
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
        setMessageNotificationBadge: (state, action) => {
            state.messageNotificationBadge = action.payload;
        },



    },
});

export const {
    setToast,
    setToast2,
    setNotificationBadge,
    setNotificationBody,
    setReviewNotificationBadge,
    setReviewNotificationBody,
    setMessageNotificationBadge


} = notificationSlice.actions;



export default notificationSlice.reducer;