import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieLength, getMovies } from "../Store/Thunks/thunk";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button, Container } from "react-bootstrap";
import { Dna } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { clearHomeMovie } from "../Store/Thunks/movies";

const Home = () => {
  const movies = useSelector((state) => state.movies.movieData.lists);
  const loading = useSelector((state) => state.movies.loading);
  const totalLength = useSelector((state) => state.movies.totalLength);
  const page = useSelector((state) => state.movies.movieData.page + 1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieLength());
    if (movies.length <= 0) {
      dispatch(getMovies({ page: 1, limit: 6 }));
    }
  }, []);

  useEffect(() => {
    return () => {
      dispatch(clearHomeMovie());
    };
  }, []);

  return (
    <>
      <Container className="text-center mt-4">
        <Row xs={1} md={2} lg={3} xl={3}>
          {movies.map((val, index) => {
            return (
              <Col key={index}>
                <Card
                  style={{ maxWidth: "16rem", height: "27 em", margin: "auto" }}
                  className="text-center mt-5"
                >
                  <Card.Img
                    style={{ height: "300px" }}
                    variant="top"
                    src={val.image}
                  />
                  <Card.Body>
                    <h6>{val.title}</h6>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="dark"
                      as={Link}
                      to={`/movies/${val.id}`}
                      size="sm"
                    >
                      View
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>

        <div className="text-center m-4">
          {loading ? (
            <div className="text-center">
              <Dna
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
              <Dna
                visible={true}
                height="120"
                width="120"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : null}

          {/* {movies.length}
          {totalLength} */}
          {movies.length < totalLength ? (
            <Button
              variant="dark"
              className="m-3"
              onClick={() => dispatch(getMovies({ page, limit: 6 }))}
            >
              Load More
            </Button>
          ) : null}
        </div>
      </Container>
    </>
  );
};

export default Home;
