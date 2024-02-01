import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged,
  sendEmailVerification
} from "firebase/auth";
import { app, provider } from "../Firebase/firebase.utils";
//import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../Firebase/AuthContext";
//import {CustomErrorHandle} from "../Firebase/CustomErrorHandler";

const Signup = () => {
  const auth = getAuth(app);
  const { setAuthUser } = useAuth();
  const navigate = useNavigate();

  const initialValues = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    repassword: "",
    createdOn: new Date(),
  };




  const validationSchema = Yup.object({
    firstname: Yup.string().min(3, "Must be at least 3 characters long"),
    lastname: Yup.string().min(3, "Must be at least 3 characters long"),
    username: Yup.string().trim().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .trim()
      .required("Required")
      .min(2, "Password is too short - should be 8 chars minimum."),
    repassword: Yup.string()
      .trim()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    await new Promise((r) => setTimeout(r, 500));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;
      console.log("user", user);

                   // Update user profile with additional information
        await updateProfile(user, {
            displayName: values.username,

            }); 

        // give the user a chance to verify their email address
        sendEmailVerification(auth.currentUser).then(() => {
          
            console.log("email sent");
            //if its not confirmed then navigate to the email verification page
            if (!user.emailVerified) {
                return navigate("/verify-email");
            }
            //if its confirmed then navigate to the home page
            return navigate("/");
            });

      resetForm();
      if (user.emailVerified) {
        console.log("buradaki user ne", user);
        setAuthUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          providerId: user.providerId,
          // Add other user properties you want to share
        });
        // User is signed in
        return navigate("/");
       
      } else {
        // User is signed out
        console.log("User is signed out");
      }
    } catch (error) {
      return console.log("error creating user", error);
    }
  };
  


/*   function sendEmailVerification() {
    // [START auth_send_email_verification]
    auth().currentUser.sendEmailVerification()
      .then(() => {
        // Email verification sent!
        // ...
      });
    // [END auth_send_email_verification]
  }

  function sendPasswordReset() {
    const email = "sam@example.com";
    // [START auth_send_password_reset]
    auth().sendPasswordResetEmail(email)
      .then(() => {
        // Password reset email sent!
        // ..
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    // [END auth_send_password_reset]
  }
 */


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
              label="Confirm Password"
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
            >
              Sign Up
            </Button>
          </Form>
          <Grid container justifyContent="flex-end">
            <Grid item sx={{ mt: 3, mb: 3 }}>
              <Link href="/login" variant="body2">
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
