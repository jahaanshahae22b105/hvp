// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from '@firebase/firestore'
import { GoogleAuthProvider, getAuth } from "@firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHwoAqZcRVd1lUfZDAk-NI348SsgREqpg",
  authDomain: "hackathonportalmvp.firebaseapp.com",
  projectId: "hackathonportalmvp",
  storageBucket: "hackathonportalmvp.appspot.com",
  messagingSenderId: "486098258081",
  appId: "1:486098258081:web:cfafac4a508e34b92788e0",
  measurementId: "G-RXDPJJ4T3G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
//export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

