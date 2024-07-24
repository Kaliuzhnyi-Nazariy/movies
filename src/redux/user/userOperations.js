import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiV4Token =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmZjZDU2MTdiYWEyMGJhY2UwMDU2ODhmNDNhMmU2ZiIsIm5iZiI6MTcyMTU2MjU0MS42NzQ4NzEsInN1YiI6IjY2OWNmM2Q5MGUwYmIyYWIyMmRkNTllZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T4QllnMX1G0XTmbQbhoYDtJam1pZYXjpIoouFpOAxms"; // Replace with your actual V4 API token

const defaultAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiV4Token}`,
  },
});

const apiKey = "bffcd5617baa20bace005688f43a2e6f";

export const createRequestToken = createAsyncThunk(
  "auth/createRequestToken",
  async ({ redirectTo }) => {
    try {
      const res = await defaultAxios.post("/auth/request_token", {
        redirect_to: redirectTo,
      });
      const requestToken = res.data.request_token;
      const authUrl = `https://www.themoviedb.org/auth/access?request_token=${requestToken}`;
      window.location.href = authUrl;
      return requestToken;
    } catch (error) {
      console.log("Error in creating request token:", error);
      throw error;
    }
  }
);

export const createAccessToken = createAsyncThunk(
  "auth/createAccessToken",
  async ({ requestToken }) => {
    try {
      const res = await defaultAxios.post("/auth/access_token", {
        request_token: requestToken,
      });
      return res.data.access_token;
    } catch (error) {
      console.log("Error in creating access token:", error);
      throw error;
    }
  }
);

export const fetchAccountDetails = createAsyncThunk(
  "auth/fetchAccountDetails",
  async (accessToken) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/4/account?api_key=${apiKey}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.log("Error in fetching account details:", error);
      throw error;
    }
  }
);

export const validateApiKey = createAsyncThunk(
  "auth/validateApiKey",
  async () => {
    try {
      // Send a request to the validate API key endpoint
      const response = await axios.get("https://api.themoviedb.org/4/account", {
        params: {
          api_key: apiKey,
        },
      });

      // Return the response data
      return response.data;
    } catch (error) {
      // Throw the error to be caught by the thunk's rejected case
      throw new Error("API Key validation failed: " + error.message);
    }
  }
);
