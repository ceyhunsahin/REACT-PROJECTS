// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/app";
import "firebase/auth";
import { CustomErrorHandler } from "./CustomErrorHandler";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_MEASUREMENT_ID,
};
const prodConfig = {};
//const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

class Firebase {
    constructor() {
      if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }
      this.firebaseAuth = firebase.auth();
    }
    // register registerWithEmailAndPassword
    async register(displayName, email, password) {
      try {
        await this.firebaseAuth.createUserWithEmailAndPassword(email, password);
        this.firebaseAuth.currentUser.updateProfile({
          displayName,
        });
      } catch (err) {
        console.log("F. Error:", err);
      }
    }
  
    // sign in/up with google GoogleAuthProvider
    useGoogleProvider() {
      const googleProvider = new firebase.auth.GoogleAuthProvider();
      googleProvider.setCustomParameters({ prompt: "select_account" });
      this.firebaseAuth.signInWithPopup(googleProvider);
    }
  
    // login  signInWithEmailAndPassword
    async signIn(email, password) {
      try {
        await this.firebaseAuth.signInWithEmailAndPassword(email, password);
      } catch (error) {
        return customErrorHandler(error);
      }
    }
  
    // logout signOut
    signOut() {
      this.firebaseAuth.signOut();
    }
  
    // forgot password sendPasswordResetEmail
    async forgotPassword(email) {
      try {
        await this.firebaseAuth.sendPasswordResetEmail(email);
        window.location.href = "/";
      } catch (error) {
        return customErrorHandler(error);
      }
    }
  }
  
  export default new Firebase();