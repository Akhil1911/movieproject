import { createSlice } from "@reduxjs/toolkit";
import { getMovies, getMovieLength, getSingleMovie } from "./thunk";

export const MoviesSlice = createSlice({
  name: "movies",
  initialState: {
    movieData: {
      lists: [],
    },
    loading: false,
    totalLength: 0,
  },
  reducers: {
    
    clearHomeMovie: (state) => {
      state.movieData.lists = []
    },
    clearSingleMovie: (state) => {
      state.movieData.singleMovie = {}
    }
  },
  extraReducers: (builder) => {
    builder

      //getMovies
      .addCase(getMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData = action.payload;
      })
      .addCase(getMovies.rejected, (state) => {
        state.loading = false;
      })

      //getMovieLength
      .addCase(getMovieLength.fulfilled, (state, action) => {
        state.totalLength = action.payload.length;
      })

      //getSingleMovie
      .addCase(getSingleMovie.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getSingleMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.movieData.singleMovie = action.payload;
        // state.totalLength = action.payload.totalLen;
      })
      .addCase(getSingleMovie.rejected, (state, action) => {
        state.loading = true;
      });
  },
});
export const { clearHomeMovie, clearSingleMovie } = MoviesSlice.actions;
export default MoviesSlice.reducer;
