import { initializeApp } from "firebase/app";
//! Authentication services from firebase
import { getAuth } from "firebase/auth";

//! Database services from firebase
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD7ZR1YRpC-1ako-_TOWhT1Dfa1m6fCKwk",
  authDomain: "music-application-c9350.firebaseapp.com",
  projectId: "music-application-c9350",
  storageBucket: "music-application-c9350.firebasestorage.app",
  messagingSenderId: "469681547110",
  appId: "1:469681547110:web:4612b5751f924feef18aa7"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH=getAuth(firebaseApp);
export let __DB = getFirestore(firebaseApp);

export default firebaseApp;