import {TinderChat} from "../types/TinderChat";
import {collection, doc, getDocs, setDoc, updateDoc} from "firebase/firestore";
import {db} from "./firestore";
import {TinderUser} from "../types/TinderUser";


export class FirestoreChats {
    static collectionName = "chats"
    static addChat = async (chat: TinderChat) => {
        await setDoc(doc(db, this.collectionName, chat.id), this.chatToFirestore(chat))
    }
    static getAllChatsForUser = async (user: TinderUser)=>{
        const data = await this.getAllChats()
        return data.filter(el => el.user1.id === user.id || el.user2.id === user.id)
    }
    static updateChat = async (chat: TinderChat) => {
        await updateDoc(doc(db, this.collectionName, chat.id), this.chatToFirestore(chat));
    }
    static getAllChats = async () => {
        const data = await getDocs(collection(db, this.collectionName))
        return data
            .docs
            .map(el => ({...el.data(), id: el.id}))
            .map(el => this.firestoreToChat(el))
    }
    static chatToFirestore = (chat: TinderChat) => JSON.parse(JSON.stringify(chat))
    static firestoreToChat = (obj: any) => new TinderChat(obj.user1, obj.user2, obj.id, obj.messages)
}