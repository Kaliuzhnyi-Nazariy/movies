import "../defaultaxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultAxios } from "../defaultaxios";

export const getTopFilms = createAsyncThunk("movies/getAll", async (page) => {
  try {
    const res = await defaultAxios.get(`/discover/movie?page=${page}`);
    return res.data;
  } catch (error) {
    console.log("Error in redux/movie/movieOperations/getTopFilms", error);
  }
});

export const getAdultTopFilms = createAsyncThunk(
  "movies/getAllAdults",
  async (page) => {
    try {
      const res = await defaultAxios.get(`/discover/movie`, {
        params: {
          page,
          include_adult: true,
        },
      });
      return res.data;
    } catch (error) {
      console.log("Error in redux/movie/movieOperations/getTopFilms", error);
    }
  }
);

export const getTopTVSeries = createAsyncThunk(
  "movies/tv/getAll",
  async (page) => {
    try {
      const res = await defaultAxios.get(`/discover/tv?page=${page}`);
      return res.data;
    } catch (error) {
      console.log("Error in redux/movie/movieOperations/getTopFilms", error);
    }
  }
);

export const getTopAdultTVSeries = createAsyncThunk(
  "movies/tv/getAllAdult",
  async () => {
    try {
      const res = await defaultAxios.get(`/discover/tv`, {
        params: {
          include_adult: true,
        },
      });
      return res.data;
    } catch (error) {
      console.log("Error in redux/movie/movieOperations/getTopFilms", error);
    }
  }
);

export const findById = createAsyncThunk("movies/byId", async ({ movieId }) => {
  try {
    const res = await defaultAxios.get(`/movie/${movieId}`);
    return res.data;
  } catch (error) {
    console.log("Error in redux/movie/movieOperations/findById", error);
  }
});

export const findByIdTvSeries = createAsyncThunk(
  "movies/byIdTvSeries",
  async ({ tvSeries }) => {
    try {
      const res = await defaultAxios.get(`/tv/${tvSeries}`);
      return res.data;
    } catch (error) {
      console.log("Error in redux/movie/movieOperations/findById", error);
    }
  }
);

export const genresMovies = createAsyncThunk("movies/genres", async () => {
  try {
    const res = await defaultAxios.get("/genre/movie/list");
    return res.data.genres;
  } catch (error) {
    console.log("Error in redux/movie/movieOperations/findById", error);
  }
});
