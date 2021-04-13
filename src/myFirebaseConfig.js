/*This code is our SDK taken from the Firebase Console. If we want to change the firebase database, 
We will need to get the new SDK and change it here. */

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC-QSKgUpmFT96LtfaRhEO5NmQSFr-Sp_4",
  authDomain: "basic-bill-9640e.firebaseapp.com",
  databaseURL:
    "https://basic-bill-9640e-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "basic-bill-9640e",
  storageBucket: "basic-bill-9640e.appspot.com",
  messagingSenderId: "787748213369",
  appId: "1:787748213369:web:e5c92f2fb7eec231a37aa8",
  measurementId: "G-47MFE1R0BG"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
