import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultAxios } from "../defaultaxios";

export const guestMode = createAsyncThunk("auth/guessMode", async () => {
  try {
    const res = await defaultAxios.get("/authentication/guest_session/new");
    console.log(res.data);
    return res.data.guest_session_id;
  } catch (error) {
    console.log("Error in redux/movie/movieOperations/findById", error);
  }
});

export const createRequestToken = createAsyncThunk(
  "auth/createRequestToken",
  async () => {
    try {
      const res = await defaultAxios.get("/authentication/token/new");
      return res.data.request_token;
    } catch (error) {
      console.log("Error in redux/movie/movieOperations/findById", error);
    }
  }
);

export const authenticateRequestToken = (requestToken) => {
  const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
  window.location.href = authUrl;
};
