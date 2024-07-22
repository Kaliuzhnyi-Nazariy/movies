import { createSlice } from "@reduxjs/toolkit";
import { createRequestToken, guestMode } from "./userOperations";

const initialState = {
  user: {},
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequestToken.fulfilled, (state, action) => {
        console.log(action.payload);
        state.token = action.payload;
      })
      .addCase(guestMode.fulfilled, (state, action) => {
        state.token = action.payload;
      });
  },
});

export const userReducer = userSlice.reducer;
