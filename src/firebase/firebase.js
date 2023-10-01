import { initializeApp } from "firebase/app";
import {getFirestore , collection} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCMrvGNtVca59EqLNzvImgLWDxa_uhzRXc",
  authDomain: "filmytia-b9f34.firebaseapp.com",
  projectId: "filmytia-b9f34",
  storageBucket: "filmytia-b9f34.appspot.com",
  messagingSenderId: "521711127712",
  appId: "1:521711127712:web:5465e66a594e0c6e590dc5"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db, "movies")
export const reviewRef = collection(db, "revies")
export const usersRef = collection(db, "users")


export default app;