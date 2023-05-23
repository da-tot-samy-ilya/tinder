import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

export const app = initializeApp({
    apiKey: "AIzaSyDZRQwsPF9YVaq3GDsJiUZC2sKqS2QypqY",
    authDomain: "tinder-eeeb1.firebaseapp.com",
    projectId: "tinder-eeeb1",
    storageBucket: "tinder-eeeb1.appspot.com",
    messagingSenderId: "225722917029",
    appId: "1:225722917029:web:6c0289e53dba8e289b2d4c",
    measurementId: "G-8ZK7TJ40GG"
});
export const provider = new GoogleAuthProvider();
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage();