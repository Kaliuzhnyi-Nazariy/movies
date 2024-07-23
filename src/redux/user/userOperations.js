import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultAxios } from "../defaultaxios";

// Thunk to create a guest session
export const guestMode = createAsyncThunk("auth/guestMode", async () => {
  try {
    const res = await defaultAxios.get("/authentication/guest_session/new");
    console.log("Guest session id: ", res.data.guest_session_id);
    return res.data.guest_session_id;
  } catch (error) {
    console.log("Error in creating guest session:", error);
    throw error;
  }
});

// Thunk to create a request token
export const createRequestToken = createAsyncThunk(
  "auth/createRequestToken",
  async ({ redirectTo }) => {
    try {
      const res = await defaultAxios.get("/authentication/token/new");
      const requestToken = res.data.request_token;
      // Redirect for authentication with callback URL
      const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${encodeURIComponent(
        redirectTo
      )}`;
      window.location.href = authUrl;
      return requestToken;
    } catch (error) {
      console.log("Error in creating request token:", error);
      throw error;
    }
  }
);

export const createSession = createAsyncThunk(
  "auth/createSession",
  async ({ requestToken }) => {
    try {
      const res = await defaultAxios.post("/authentication/session/new", {
        request_token: requestToken,
      });
      return res.data.session_id;
    } catch (error) {
      console.log("Error in creating session:", error);
      throw error;
    }
  }
);

// Function to redirect for authentication
export const authenticateRequestToken = (requestToken) => {
  const redirectTo = `${window.location.origin}/movies-app`; // Your callback URL
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectTo}`;
  window.location.href = authUrl;
};
