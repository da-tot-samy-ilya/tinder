import {setDoc, collection, updateDoc, doc, getDocs} from "firebase/firestore";
import {signInWithPopup, signOut} from "firebase/auth";
import React from "react";
import {TinderUser} from "../types/TinderUser";
import {TinderImage} from "../types/TinderImage";
import {auth, db, provider} from "./firestore";
import {FirestoreImages} from "./images";


export class FirestoreUsers {
    static getAllUsers = async () => await getDocs(collection(db, "users"))
    static onSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
            mainImage: FirestoreImages.imagesToFirestore(newUser.mainImage),
            id: newUser.id
        }, {
            merge: true
        })
        return newUser
    }
    static onSignOut = async () => {
        await signOut(auth)
            .catch((e) => {
                console.log(e)
            });
    }
    static updateUser = async (user: TinderUser) => {
        await updateDoc(doc(db, "users", user.id), this.userToFirestore(user));
    }
    static userToFirestore = (user: TinderUser) => JSON.parse(JSON.stringify(user))

    static firestoreToUsers = (obj: any) => {
        return new TinderUser(obj.id, obj.name, obj.age, obj.town, obj.interests, obj.description, obj.images, obj.mainImage)
    }
}