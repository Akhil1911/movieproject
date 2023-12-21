import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {  getSingleMovie } from "../Store/Thunks/thunk";
import { InfinitySpin } from "react-loader-spinner";
import { Rating } from "@mui/material";
import { clearSingleMovie } from "../Store/Thunks/movies";

const ShowSingleMovie = () => {
  // const totalLength = useSelector((state) => state.movies.movieData.totalLen);

//   useEffect(() => {
//   dispatch(getMovieLength());
// },[])

  // const totalLength = useSelector((state) => state.movies.totalLength);
  const loading = useSelector((state) => state.movies.loading);
  const movie = useSelector((state) => state.movies.movieData.singleMovie);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  // let lenBool = false;

  // console.log("", params.id + " " + totalLength);
  // console.log("LOG BETWEEN TWO USEEFECTS", totalLength);

  useEffect(() => {
    // if (params.id <= totalLength && totalLength != 0) {
    //   dispatch(getSingleMovie(params.id));
    // } else {
    //   navigate("/404");
    // }
    dispatch(getSingleMovie(params.id))
    .unwrap()
    .then((res) => console.log(res))
    .catch((err) => navigate("/404"));
    // console.log("LOG INSIDE USE EFFECT FOR GETTING ID", totalLength);
    // alert(totalLength)
  }, []);
  
  useEffect(() => {
    return () => {
      dispatch(clearSingleMovie())
    }
  },[])

  

  // console.log("LOG FOR LENGTH" , totalLength);

  return (
    <>
      {movie ? (
        <>
          <Container className="text-center mt-4 mb-4">
            {loading ? <InfinitySpin width="200" color="orange" /> : null}
            <Row>
              <div className="col-md-6">
                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    backgroundSize: "contain",
                    width: "350px",
                    height: "450px",
                    margin: "auto",
                    margin: "2rem auto",
                  }}
                />
              </div>
              <div className="col-md-6" style={{ margin: "auto auto" }}>
                <h1>{movie.title}</h1>{" "}
                <div className="text-center">
                  <Rating size="large" value={movie.rating ? movie.rating : 0} readOnly />
                </div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: `Description:  ${movie.description}`,
                  }}
                  className="m-4"
                ></p>
                <h1>Director: {movie.director}</h1>
              </div>
            </Row>
          </Container>
        </>
      ) : (
        <div className="text-center">
          <InfinitySpin width="200" color="blue" />
        </div>
      )}
    </>
  );
};

export default ShowSingleMovie;
