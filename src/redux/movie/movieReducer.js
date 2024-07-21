import { createSlice } from "@reduxjs/toolkit";
import { findById, getTopFilms, getTopTVSeries } from "./movieOperations";

const initialState = {
  page: null,
  films: [],
  totalPages: null,
  movie: {},
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
      .addCase(getTopTVSeries.fulfilled, (state, action) => {
        state.page = action.payload.page;
        state.films = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(findById.fulfilled, (state, action) => {
        state.movie = action.payload;
      });
  },
});

export const movieReducer = movieSlice.reducer;
