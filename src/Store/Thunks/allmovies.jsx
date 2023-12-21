import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "./thunk";
export const AllMovieSlice = createSlice({
  name: "allMovies",
  initialState: {
    loading: false,
    list: [],
  },
  reducers: {
    clearAllMovie: (state) => {
      state.list = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(getAllMovies.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const {clearAllMovie} = AllMovieSlice.actions
export default AllMovieSlice.reducer;
