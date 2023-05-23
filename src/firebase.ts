import {initializeApp} from "firebase/app";
import {setDoc, collection, updateDoc, doc, getFirestore, getDocs} from "firebase/firestore";
import {getAuth, GoogleAuthProvider, signInWithPopup, signOut} from "firebase/auth";
import React from "react";
import {TinderUser} from "./types/TinderUser";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {TinderImage} from "./types/TinderImage";
export const app = initializeApp({
    apiKey: "AIzaSyDZRQwsPF9YVaq3GDsJiUZC2sKqS2QypqY",
    authDomain: "tinder-eeeb1.firebaseapp.com",
    projectId: "tinder-eeeb1",
    storageBucket: "tinder-eeeb1.appspot.com",
    messagingSenderId: "225722917029",
    appId: "1:225722917029:web:6c0289e53dba8e289b2d4c",
    measurementId: "G-8ZK7TJ40GG"
});
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);
const storage = getStorage();

export const getAllUsers = async () => await getDocs(collection(db, "users"))

export const onSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let newUser = TinderUser.defaultUser
    await signInWithPopup(auth, provider)
        .then((result) => {
           const loggedUser = result.user;
           newUser = new TinderUser(loggedUser.uid, String(loggedUser.displayName), 0, "", [], "",[], new TinderImage(loggedUser.photoURL || Date.now().toString()))
        })
        .catch((err) => {
            console.log(err)
        })
    await setDoc(doc(db, "users", newUser.id), {
        name: newUser.name,
        mainImage: customObjToFirestore(newUser.mainImage),
        id: newUser.id
    }, {
        merge: true
    })
    return newUser
}
export const onSignOut = async () => {
    await signOut(auth)
        .catch((e) => {
        console.log(e)
    });
}

export const updateUser = async (user: TinderUser) => {
    await updateDoc(doc(db, "users", user.id), customObjToFirestore(user));
}


export const customObjToFirestore = (user: object) => JSON.parse(JSON.stringify(user))

export const firestoreToUsers = (obj: any) => {
    return new TinderUser(obj.id, obj.name, obj.age, obj.town, obj.interests, obj.description, obj.images, obj.mainImage, obj.chats)
}

export const uploadImage = async(image: File, userID: string) => {
    uploadBytes(ref(storage, `images/${userID}/${Date.now()}.${image.type.split("/")[1]}`), image).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });

}