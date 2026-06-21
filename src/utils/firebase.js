import { initializeApp } from "firebase/app";
// import { getFirestore, doc, setDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "smit-assignment-a0b13.firebaseapp.com",
  projectId: "smit-assignment-a0b13",
  storageBucket: "smit-assignment-a0b13.firebasestorage.app",
  messagingSenderId: "34573114199",
  appId: "1:34573114199:web:aaf5f710336fcfeae13c12",
  measurementId: "G-Y154D1Q0HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
};