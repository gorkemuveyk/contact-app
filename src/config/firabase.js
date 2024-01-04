import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBB3TX1j0gRLPs2W5F4TNQ6gSbeFWrAh48",
  authDomain: "contact-app-4d7bc.firebaseapp.com",
  projectId: "contact-app-4d7bc",
  storageBucket: "contact-app-4d7bc.appspot.com",
  messagingSenderId: "171683008503",
  appId: "1:171683008503:web:c99ed6b6c23333d1e568f2",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
