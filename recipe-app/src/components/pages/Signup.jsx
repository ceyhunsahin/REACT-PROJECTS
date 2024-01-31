import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import firebase from "../Firebase/firebase.utils";

const Signup = () => {
  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    createdOn: "",
  };

  const validationSchema = Yup.object({
    firstname: Yup.string()
      .min(3, "must be at least 3 characters long")
      .required(),
    lastname: Yup.string()
      .min(3, "must be at least 3 characters long")
      .required(),
    username: Yup.string().trim().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .trim()
      .required()
      .min(8, "Password is too short - should be 8 chars minimum."),
    repassword: Yup.string()
      .trim()
      .required()
      .min(8, "Password is too short - should be 8 chars minimum."),
    createdOn: Yup.date().default(() => new Date()),
  });

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const handleGoogleButtonClick = () => {
    firebase.useGoogleProvider();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await firebase.register(values.firstname, values.lastname, values.username, values.email, values.password, values.createdOn);
        resetForm();
      }}
    >
      <Container component="main" maxWidth="xs">
        <div>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <Form>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="firstname"
              label="First Name"
              name="firstname"
              autoComplete="firstname"
              autoFocus
            />
            <ErrorMessage name="firstname" render={renderError} />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="lastname"
              label="Last Name"
              name="lastname"
              autoComplete="lastname"
            />
            <ErrorMessage name="lastname" render={renderError} />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
            />
            <ErrorMessage name="username" render={renderError} />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <ErrorMessage name="email" render={renderError} />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ErrorMessage name="password" render={renderError} />
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              name="repassword"
              label="Rewrite your Password"
              type="password"
              id="repassword"
              autoComplete="current-password"
            />
            <ErrorMessage name="repassword" render={renderError} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleGoogleButtonClick}
            >
              Sign Up
            </Button>
          </Form>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{ mt: 3, mb: 3 }}>
              <Link href="/signin" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Formik>
  );
};

export default Signup;
