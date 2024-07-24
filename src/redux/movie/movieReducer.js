import { createSlice } from "@reduxjs/toolkit";
import {
  findById,
  findByIdTvSeries,
  genresMovies,
  getAdultTopFilms,
  getTopAdultTVSeries,
  getTopFilms,
  getTopTVSeries,
} from "./movieOperations";

const initialState = {
  page: null,
  films: [],
  totalPages: null,
  movie: {},
  genres: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopFilms.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.films = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getAdultTopFilms.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.films = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getTopTVSeries.fulfilled, (state, action) => {
        state.page = action.payload?.page;
        state.films = action.payload?.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getTopAdultTVSeries.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.films = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.movie = action.payload;
      })
      .addCase(findByIdTvSeries.fulfilled, (state, action) => {
        state.movie = action.payload;
      })
      .addCase(genresMovies.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

export const movieReducer = movieSlice.reducer;
