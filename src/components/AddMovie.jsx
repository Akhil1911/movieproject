import React from "react";
import { ErrorMessage, Formik, Field } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { addMovie } from "../Store/Thunks/thunk";
import { showToast } from "../Tools/ShowToast";
import { useNavigate } from "react-router-dom";


const AddMovie = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const initialValues = {
    title: "",
    description: "",
    director: "",
    image:"",
    rating: 0,
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .max(30, "Name is too long")
      .uppercase("Must be in uppercase").strict()
    ,
    description: Yup.string().required("Description is required"),
    image:Yup.string().required("Image is required"),
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
      <div className="container mt-5">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            // console.log(values);
            // dispatch(getMovies(values)) thunk get home movie
            dispatch(addMovie(values)) //thunk add movie
              .unwrap()
              .then((res) => {
                if (res === 201) {
                  showToast("SUCCESS", "😀 Movie Added Successfully");
                  navigate("/")
                }
                else if (res === 200) {
                  showToast("ERROR", " 🙁 Movie , Already added");
                }
              })
              .catch((err) => {
                showToast("ERROR", " 🙁 ERROR, Try again later");
              });
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit}>
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
                Add Movie
              </Button>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default AddMovie;
