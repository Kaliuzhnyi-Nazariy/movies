// import axios from "axios";
import // defaultMovieAxios,
//   optionsForMovies,
"../defaultaxios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultAxios } from "../defaultaxios";

export const getTopFilms = createAsyncThunk("movies/getAll", async (page) => {
  try {
    const res = await defaultAxios.get(`/discover/movie?page=${page}`);
    console.log(res);
    return res.data;
  } catch (error) {
    console.log("Error in redux/movie/movieOperations/getTopFilms", error);
  }
});

export const getTopTVSeries = createAsyncThunk(
  "movies/tv/getAll",
  async (page) => {
    try {
      const res = await defaultAxios.get(`/discover/tv?page=${page}`);
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("Error in redux/movie/movieOperations/getTopFilms", error);
    }
  }
);

export const findById = createAsyncThunk("movies/byId", async ({ movieId }) => {
  console.log(movieId);
  try {
    const res = await defaultAxios.get(`/movie/${movieId}`);
    return res.data;
  } catch (error) {
    console.log("Error in redux/movie/movieOperations/findById", error);
  }
});
