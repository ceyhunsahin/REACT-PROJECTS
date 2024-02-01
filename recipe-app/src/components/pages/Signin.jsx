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
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app, provider } from "../Firebase/firebase.utils";
//import { useAuthState } from "react-firebase-hooks/auth";
import { useAuth } from "../Firebase/AuthContext";
import { StyledNavLink, StyledTypo } from "../Navbar/styleNavbar";
import {getParameterByName,handleResetPassword, handleRecoverEmail, handleVerifyEmail} from "../util";

export default function Signin() {

  const [emailValue, setEmailValue] = useState("");

  document.addEventListener('DOMContentLoaded', () => {
  
    // Get the action to complete.
    const mode = getParameterByName('mode');
    // Get the one-time code from the query parameter.
    const actionCode = getParameterByName('oobCode');
    // (Optional) Get the continue URL from the query parameter if available.
    const continueUrl = getParameterByName('continueUrl');
    // (Optional) Get the language code if available.
    const lang = getParameterByName('lang') || 'en';

    // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      handleResetPassword(auth, actionCode, continueUrl, lang);
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      handleRecoverEmail(auth, actionCode, lang);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      handleVerifyEmail(auth, actionCode, continueUrl, lang);
      break;
    default:
      // Error: invalid mode.
  }
}, false);



  const auth = getAuth(app);

  const { setAuthUser } = useAuth();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().trim().required(),
  });

  const renderError = (message) => <p className="help is-danger">{message}</p>;

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      console.log("user", user);

      // Update user profile with additional information
      await updateProfile(user, {
        displayName: values.email,
      });


      resetForm();
      if (user ) {
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

  const handleSubmitWithGoogle = async () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log("google user", user);
          // send an email verification to the user



          if (user && user.emailVerified) {
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

          navigate("/");
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
        });
    } catch (error) {
      return console.log("error creating user", error);
    }
  };
   // forget Password get email

  const handleChangePassword = async () => {
    // get email value

    const actionCodeSettings = {

      url: "http://localhost:3000/login",
    };
    try {
      await sendPasswordResetEmail(auth, emailValue, actionCodeSettings);
    } catch (error) {
      return console.log("error creating user", error);
    }
  };

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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            sx={{ mt: 3 }}
            onClick={() => handleSubmitWithGoogle()}
          >
            Sign In With Google
          </Button>
          <Form>
            <Typography variant="h5" sx={{ my: 4 }} align="center">
              Or{" "}
            </Typography>
            <Field
              as={TextField}
              variant="outlined"
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              disabled={false}  // Ensure it's not set to true
              readOnly={false}
              onBlur={(e) => setEmailValue(e.target.value)}
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
            <Grid item sx={{ mt: 3, mb: 3 }}>
            <StyledNavLink>
              <Typography onClick={handleChangePassword}> {/*  */}
                Forget password?
              </Typography>
              </StyledNavLink>
            </Grid>
          </Grid>
        </div>
      </Container>
    </Formik>
  );
}
