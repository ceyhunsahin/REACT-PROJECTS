import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from '@mui/material';
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Signin() {

    const initialValues = {

        email: '',
        password: '',

        
      };
    
      const validationSchema = Yup.object({

        email: Yup.string().email().required(),
        password: Yup.string().trim().required(),

      });
    
    
      const renderError = (message) => <p className="help is-danger">{message}</p>;
        const onSubmit = (values) => {
            alert(JSON.stringify(values, null, 2));
        };
    return (
        <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { resetForm }) => {
                    await onSubmit(values);
                    resetForm();
                }}>
        <Container component="main" maxWidth="xs">
        <div>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <Form >
          <Field as ={TextField}
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
           
          />
          <ErrorMessage name="email" render={renderError} />
            <Field as ={TextField}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
            >
              Sign In
            </Button>
          </Form>
          <Grid container justifyContent="flex-end">
            <Grid item sx = {{mt:3, mb:3}}>
              <Link href="/signup" variant="body2">
                If you don't have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </div>
      </Container>

      </Formik>
    )
}
