import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const URL = "http://localhost:3001";

export const getMovies = createAsyncThunk(
  "movies/getMovies",
  async ({ page = 1, limit = 6, ...props }, { getState }) => {
    try {
      const prevState = getState().movies;
      // const newArr = props;
      // console.log(newArr);
      const res = await axios.get(
        `${URL}/movies?_page=${page}&_limit=${limit}`
      );
      // const finalArr = [...prevState.movieData.lists, ...res.data].concat(newArr);
      // console.log(finalArr);
      return {
        lists: [...prevState.movieData.lists, ...res.data],
        page: page,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const getMovieLength = createAsyncThunk(
  "movies/getMovieLength",
  async () => {
    try {
      const res = await axios.get(`${URL}/movies`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const getSingleMovie = createAsyncThunk(
  "movies/getSingleMovie",
  async (id) => {
    try {
      // getMovieLength();
      const res = await axios.get(`${URL}/movies/${id}`);
      return res.data;

      //  const resLength = await axios.get(`${URL}/movies`);
      //  return {
      //    singleMovie: res.data,
      //    totalLen: resLength.data.length
      //  }
    } catch (error) {
      throw error;
    }
  }
);

export const getAllMovies = createAsyncThunk(
  "allmovies/getAllMovies",
  async () => {
    try {
      const res = await axios.get(`${URL}/movies`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
);

export const addMovie = createAsyncThunk(
  "movie/addMovie",
  async (data) => {
  try {
    const findMovie = await axios.get(`${URL}/movies?title=${data.title}`);
    // console.log(findMovie);
    if (!findMovie.data.length) {
      const res = await axios({
        method: "POST",
        url: `${URL}/movies`,
        data: data,
      });
      // console.log("res added",res.status)
      return res.status;
    } else {
      // console.log("already added find",findMovie.status);
      return findMovie.status
    }
    // const findTitle = await axios.get(`${URL}/movies?title=${data.title}`)
    // console.log(findTitle);
  } catch (error) {
    throw error;
  }
});

export const UpdateMovieThunk = createAsyncThunk(
  "movies/updateMovieThunk",
  async (data) => {
    // console.log(data); 
    try {
      axios.put(`${URL}/movies/${data.id}`, {
        id: data.id,
        title: data.title,
        image: data.image,
        description: data.description,
        director: data.director,
        rating: parseFloat(data.rating),
      });
      return true
    } catch (err) {}
  }
);

export const deleteMovieThunk = createAsyncThunk(
  "movies/deleteMovieThunk",
  async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete movie?");
      if (confirm) {
        const res = await axios.delete(`${URL}/movies/${id}`);
        // console.log(res)
      }
    } catch (err) {}
  }
);
