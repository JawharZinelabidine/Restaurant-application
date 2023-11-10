import { configureStore } from '@reduxjs/toolkit';
import customerReducer from "./customerSlice"
import notificationReducer from "./notificationSlice"


const store = configureStore({
    reducer: {
        customer: customerReducer,
        notification: notificationReducer,

    },
});


export default store;
