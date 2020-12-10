import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyATvQTBtyPwwHNW2FXfNZ4e4WTguf3H_gM",
  authDomain: "test-fast-rewards.firebaseapp.com",
  projectId: "test-fast-rewards",
  storageBucket: "test-fast-rewards.appspot.com",
  messagingSenderId: "621391346370",
  appId: "1:621391346370:web:c5d3a77b3d3cc35ed1d95b",
  measurementId: "G-QKBGQJG4ZK"
});

export default firebaseConfig;