import {ref, uploadBytes} from "firebase/storage";
import {storage} from "./firestore";
import {TinderImage} from "../types/TinderImage";

export class FirestoreImages {
    static uploadImage = async(image: File, userID: string) => {
        uploadBytes(ref(storage, `images/${userID}/${Date.now()}.${image.type.split("/")[1]}`), image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });

    }
    static imagesToFirestore = (image: TinderImage) => JSON.parse(JSON.stringify(image))
}