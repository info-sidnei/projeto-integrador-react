import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA4KAQBK28C6fxlKxJojmfwZvMGreWiwsk",
  authDomain: "pharmaplain.firebaseapp.com",
  projectId: "pharmaplain",
  storageBucket: "pharmaplain.appspot.com",
  messagingSenderId: "611564053805",
  appId: "1:611564053805:web:4b0d8c13ffc734dbe1dfa4",
  measurementId: "G-GNM2MEVEQ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//Inicialize o firestore
export const db = getFirestore();
export default collection;

