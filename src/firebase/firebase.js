import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCDddAKaNXcudOJdsdJXe589E4AAwZ8W3s",
  authDomain: "filmyverse-ac113.firebaseapp.com",
  projectId: "filmyverse-ac113",
  storageBucket: "filmyverse-ac113.appspot.com",
  messagingSenderId: "888469152556",
  appId: "1:888469152556:web:a27c7eb74cc2963ea08289",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export default app;
