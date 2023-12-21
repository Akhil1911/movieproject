import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddMovie from "./components/AddMovie";
import Error404 from "./components/Error404";
import Home from "./components/Home";
import ShowAllMovie from "./components/ShowAllMovie";
import ShowSingleMovie from "./components/ShowSingleMovie";
import UpdateMovie from "./components/UpdateMovie";
import MovieNav from "./Tools/MovieNav";
const Routing = () => {
  return (
    <BrowserRouter>
      <MovieNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/addmovie" element={<AddMovie />} />
        <Route exact path="/allmovies" element={<ShowAllMovie />} />
        <Route exact path="movies/:id" element={<ShowSingleMovie />} />
        <Route exact path="updateMovie/:id" element={<UpdateMovie />} />
        <Route exact path="*" element={<Error404 />} />
        <Route exact path="/404" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
