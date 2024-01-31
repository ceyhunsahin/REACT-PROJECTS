import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
const devConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
    measurementId: process.env.REACT_MEASUREMENT_ID,
  };
const prodConfig = {};
export const config = process.env.NODE_ENV === "development" ? devConfig : prodConfig;
const app = initializeApp(config);
const analytics = getAnalytics(app);