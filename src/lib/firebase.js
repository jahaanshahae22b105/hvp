import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwZMcfotDKzMgRkvSzMw4i7bgQpShy_RA",
  authDomain: "hackathon-40752.firebaseapp.com",
  projectId: "hackathon-40752",
  storageBucket: "hackathon-40752.appspot.com",
  messagingSenderId: "682701940932",
  appId: "1:682701940932:web:408ed775460708807fc191"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);