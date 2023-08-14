// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiUji9gBz9J2xDxPIYWdq30Xhh0_DHEMg",
  authDomain: "project-c010.firebaseapp.com",
  projectId: "project-c010",
  storageBucket: "project-c010.appspot.com",
  messagingSenderId: "903342502311",
  appId: "1:903342502311:web:fc942c28048f3152960682",
  measurementId: "G-52ZR3ZWL59",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const auth = getAuth();

// Register User
export function registerUser(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Registered:", user);

      sendEmailVerification(auth.currentUser).then(() => {
        // Email verification sent!
        // ...
        console.log("Verification Email Sent");
        var userRegisteredEvent = new CustomEvent("email-verification-sent", {
          email: email,
        });

        // Dispatch/Trigger/Fire the event
        document.dispatchEvent(userRegisteredEvent);
      });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      alert("Error while registering user.");
      // ..
    });
}

//sign in user
export function signInUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed In:", user);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      alert("Error while Login.");
    });
}
