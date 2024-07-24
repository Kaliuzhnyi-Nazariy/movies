import { createSlice } from "@reduxjs/toolkit";
import {
  createRequestToken,
  // createSession,
  fetchAccountDetails,
  validateApiKey,
  // guestMode,
} from "./userOperations";

const initialState = {
  user: {},
  token: "",
  sessionId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRequestToken.fulfilled, (state, action) => {
        // console.log(action.payload);
        state.token = action.payload;
      })
      // .addCase(guestMode.fulfilled, (state, action) => {
      //   state.token = action.payload;
      // })
      // .addCase(createSession.fulfilled, (state, action) => {
      //   console.log(action.payload);
      //   state.sessionId = action.payload.sessionId;
      //   state.user = action.payload.user;
      // })
      .addCase(fetchAccountDetails.fulfilled, (state, action) => {
        console.log(action);
        state.user = action.payload;
      })
      .addCase(validateApiKey.pending, (state) => {
        state.apiKeyStatus = null;
        state.error = null;
      })
      .addCase(validateApiKey.fulfilled, (state, action) => {
        state.apiKeyStatus = action.payload;
      })
      .addCase(validateApiKey.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const userReducer = userSlice.reducer;
