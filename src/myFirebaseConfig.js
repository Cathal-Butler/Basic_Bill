/*This code is our SDK taken from the Firebase Console. If we want to change the firebase database, 
We will need to get the new SDK and change it here. */

import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyADS1QwiU5rBg-wrDcK_Oq8aC2zvqz1l70",
  authDomain: "basic-bill-10a24.firebaseapp.com",
  databaseURL:
    "https://basic-bill-10a24-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "basic-bill-10a24",
  storageBucket: "basic-bill-10a24.appspot.com",
  messagingSenderId: "1066855203937",
  appId: "1:1066855203937:web:5d74debba72d06f98a9620",
  measurementId: "G-MXCR61QN9Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
