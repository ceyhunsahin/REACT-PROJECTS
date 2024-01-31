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
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { initializeApp } from "firebase/app";
import {app, config} from "../Firebase/firebase.utils"
import {CustomErrorHandle} from "./CustomErrorHandle";
import { GoogleAuthProvider } from "firebase/auth";



const Signup = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    

        const initialValues = {
          firstname: '',
          lastname: '',
          username: '',
          email: '',
          password: '',
          repassword: '',
          createdOn: new Date(),
        };
      
        const validationSchema = Yup.object({
          firstname: Yup.string().min(3, 'Must be at least 3 characters long'),
          lastname: Yup.string().min(3, 'Must be at least 3 characters long'),
          username: Yup.string().trim().required('Required'),
          email: Yup.string().email('Invalid email format').required('Required'),
          password: Yup.string()
            .trim()
            .required('Required')
            .min(2, 'Password is too short - should be 8 chars minimum.'),
          repassword: Yup.string()
            .trim()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required'),
        });
      
        const handleSubmit = async (values, { resetForm }) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          console.log(values)
          try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
      
            // Update user profile with additional information
            await updateProfile(user, {
              displayName: values.username,
            });
            console.log('User signed up successfully:', user);
            resetForm();
        } catch (error) {
            
            return CustomErrorHandle
          }
        };
        
        
    
  const renderError = (message) => <p className="help is-danger">{message}</p>;

 /*  const handleGoogleButtonClick = () => {
    //firebase.useGoogleProvider();
    alert(JSON.stringify(values, null, 2));
  }; */


  return (
    <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        >
      <Container component="main" maxWidth="xs">
        <div>
          <Typography variant="h5" align="center">
            Sign Up
          </Typography>
          <Form >
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
              //onClick={handleGoogleButtonClick}
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
