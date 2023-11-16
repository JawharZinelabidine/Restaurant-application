import { configureStore } from '@reduxjs/toolkit';
import customerReducer from "./customerSlice"
import notificationReducer from "./notificationSlice"
import loggedinReducer from './loggedinSlice';

const store = configureStore({
    reducer: {
        customer: customerReducer,
        notification: notificationReducer,
        loggedin: loggedinReducer

    },
});


export default store;
