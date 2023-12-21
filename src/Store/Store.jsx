import { configureStore } from "@reduxjs/toolkit";
import  AllMovieSlice  from "./Thunks/allmovies";
import MoviesSlice from "./Thunks/movies";
export const store = configureStore({
  reducer: {
    movies: MoviesSlice,
    allmovies: AllMovieSlice
  },
});