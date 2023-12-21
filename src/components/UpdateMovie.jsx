 import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateMovieThunk, getSingleMovie } from "../Store/Thunks/thunk";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { clearSingleMovie } from "../Store/Thunks/movies";
import { showToast } from "../Tools/ShowToast";
import { PropagateLoader } from "react-spinners";

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.movies.loading)
  // const movie = useSelector((state) => state.movies.movieData.singleMovie);
  const [singleItem, setsingleItem] = useState({
    id: id,
    title: "",
    description: "",
    director: "",
    image: "",
    rating:0
  })

  useEffect(() => {
    dispatch(getSingleMovie(id))
      .unwrap()
      .then((res) => {
        // console.log(res)
        setsingleItem(res)
      })
      .catch((err) => navigate("/404"));
  }, []);

  

  useEffect(() => {
    return () => {
      dispatch(clearSingleMovie())
    }
  },[])

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(30, "Name is too long")
      .uppercase("Must be in uppercase")
      .strict(),
    description: Yup.string().required("Description is required"),
    image: Yup.string().required("Image is required"),
    director: Yup.string()
      .required("Director name is required")
      .max(30, "Name is too long"),
    rating: Yup.number()
      .max(5, "Max rating is five")
      .typeError("Only Numbers Can Be Entered")
      .positive(`Number Can't Be Negative`)
      .required("Rating is required"),
  });


  return (
    <>
      {singleItem.title != "" ? (
        // console.log(singleItem),
        <Formik
          // enableReinitialize={true}
          initialValues={singleItem}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (singleItem === values) {
              showToast(  "ERROR", " 😒 Please Update Something...");
            } else {
              dispatch(UpdateMovieThunk(values))
                .unwrap()
                .then((res) => {
                  // console.log(res);
                  dispatch(clearSingleMovie());
                  navigate(`/allmovies`);
                  showToast("SUCCESS", " 🤝🏻 Movie Updated succesfully...");
                });
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} style={{ margin: "2rem" }}>
              <Field
                fullWidth
                variant="standard"
                as={TextField}
                label="Enter title"
                name="title"
                helperText={<ErrorMessage name="title" />}
                sx={{ mb: 1 }}
              ></Field>
              <Field
                sx={{ mb: 1 }}
                fullWidth
                variant="standard"
                as={TextField}
                label="Enter Director's name"
                name="director"
                helperText={<ErrorMessage name="director" />}
              ></Field>
              <Field
                sx={{ mb: 1 }}
                type="number"
                fullWidth
                variant="standard"
                as={TextField}
                label="Enter Ratings"
                name="rating"
                helperText={<ErrorMessage name="rating" />}
              ></Field>
              <Field
                sx={{ mb: 1 }}
                fullWidth
                variant="standard"
                as={TextField}
                label="Add Image URL"
                name="image"
                helperText={<ErrorMessage name="image" />}
              ></Field>
              <Form.Group>
                <Form.Label>Enter Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...formik.getFieldProps("description")}
                />
                <p>
                  <ErrorMessage name="description" />
                </p>
              </Form.Group>

              <br />

              <Button variant="contained" sx={{ mt: 4 }} type="submit">
                Update Movie
              </Button>
            </form>
          )}
        </Formik>
      ) : null}

      {loading ? (
        <>
          <div className="text-center mt-5">
            <PropagateLoader color="#369cd6" size={27} speedMultiplier={1.5} />
          </div>
        </>
      ) : null}
    </>
  );
};

export default UpdateMovie;
