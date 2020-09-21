import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmbK4MwdXnSWGaiEb3YJcjXioxTJ4WD_k",
  authDomain: "mwlstats-be9a0.firebaseapp.com",
  databaseURL: "https://mwlstats-be9a0.firebaseio.com",
  projectId: "mwlstats-be9a0",
  storageBucket: "mwlstats-be9a0.appspot.com",
  messagingSenderId: "1041175874153",
  appId: "1:1041175874153:web:5e4d6ab5ccfa63bb73f0f8",
  measurementId: "G-JQCGWRR5PR",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export var authApp =
  firebase.apps.length < 2
    ? firebase.initializeApp({ ...firebaseConfig, persistance: false }, "Auth")
    : firebase.app("Auth");

authApp.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

export default firebase;
