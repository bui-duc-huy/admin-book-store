import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyA-jF7D_OHvwSZdU9l3WwDd9c7s4SrO2M8",
  authDomain: "book-store-52017.firebaseapp.com",
  projectId: "book-store-52017",
  storageBucket: "book-store-52017.appspot.com",
  messagingSenderId: "771970511857",
  appId: "1:771970511857:web:e0f4ac7e1a3e9136e40a50",
  measurementId: "G-KT44KB3VH2",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.firestore();
