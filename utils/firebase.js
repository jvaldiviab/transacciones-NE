import firebase from "firebase";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAmdEWhmzKm76wKqFky6ULTxAPudRIkmx4",
    authDomain: "transacciones-ne.firebaseapp.com",
    projectId: "transacciones-ne",
    storageBucket: "transacciones-ne.appspot.com",
    messagingSenderId: "502672676404",
    appId: "1:502672676404:web:d503b2ac9162d354f85c61"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
    firebase,
    db
};
