import React, { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  deleteMovieThunk, getAllMovies } from "../Store/Thunks/thunk";
import { Link, useNavigate } from "react-router-dom";
import  { clearAllMovie } from "../Store/Thunks/allmovies";
import { Rating } from "@mui/material";
import { showToast } from "../Tools/ShowToast";
import {SyncLoader} from "react-spinners";
const ShowAllMovie = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.allmovies.list);
  const loading = useSelector((state) => state.allmovies.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteMovieThunk(id))
      .unwrap()
      .then((res) => {
        dispatch(getAllMovies());
        showToast("ERROR", "🎈 Movie Deleted Successfully...");
      });
  };

  useEffect(() => {
    return () => {
      dispatch(clearAllMovie())
    };
  }, []);

  return (
    <>
      <Container className="">
        <Row xs={1} md={2} lg={3} xl={3}>
          {movies.map((val, index) => {
            return (
              <Col key={index}>
                <Card
                  style={{ maxWidth: "16rem", height: "29em", margin: "auto" }}
                  className="text-center mt-5"
                >
                  <Card.Img
                    style={{ height: "300px" }}
                    variant="top"
                    src={val.image}
                  />
                  <Card.Body style={{ margin: "auto" }}>
                    <h6>{val.title}</h6>
                    <Rating
                      value={val.rating}
                      readOnly
                      size="large"
                      precision={0.1}
                    />
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      as={Link}
                      to={`/movies/${val.id}`}
                      size="sm"
                      className="me-3"
                      variant="dark"
                    >
                      View
                    </Button>
                    <Button
                      as={Link}
                      to={`/ ateMovie/${val.id}`}
                      size="sm"
                      variant="primary"
                    >
                      Update
                    </Button>
                    <Button
                      size="sm"
                      className="ms-3"
                      onClick={() => {
                        handleDelete(val.id);
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="text-center m-4">
          {loading ? (
            <div className="text-center mt-5">
              <SyncLoader color="#d68336" margin={5} size={17} />
            </div>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default ShowAllMovie;
