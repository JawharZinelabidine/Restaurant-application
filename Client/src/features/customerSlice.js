import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  fullname: "",
  email: "",
  lat: null,
  lng: null,
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
    setLat: (state, action) => {
      state.lat = action.payload;
    },
    setLng: (state, action) => {
      state.lng = action.payload;
    },
  },
});

export const {
  setId,
  setFullname,
  setEmail,
  getUpcoming,
  getExpired,
  setLat,
  setLng,
} = customerSlice.actions;

export default customerSlice.reducer;
