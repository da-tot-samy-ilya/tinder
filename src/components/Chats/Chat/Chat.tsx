import React, {FC, useState} from 'react';
import styles from "./Chat.module.scss"
import {TinderUser} from "../../../types/TinderUser";
import Message from "./Message/Message";
import {TinderMessage} from "../../../types/TinderMessage";
import {TinderChat} from "../../../types/TinderChat";
import MyInput from "../../UI/inputs/MyInput/MyInput";
import MyButton from "../../UI/buttons/MyButton/MyButton";
import {useParams} from "react-router-dom";
import {FirestoreChats} from "../../../firebase/chats";
import chats from "../Chats";

interface IChatProps {
    currUser: TinderUser
    allChats: TinderChat[]
}

const Chat: FC<IChatProps> = ({currUser, allChats}) => {
    const {id} = useParams()
    const [chat, setChat] = useState(JSON.parse(JSON.stringify(allChats.find(el => el.id === id) || new TinderChat(currUser, currUser, ""))))
    const otherUser = chat.user2.id === currUser.id ? chat.user1 : chat.user2

    const [messages, setMessages] = useState<TinderMessage[]>(chat.messages.sort((a: TinderMessage,b: TinderMessage) => new Date(b.dateTime).getTime()- new Date(a.dateTime).getTime()))
    const [newMessageText, setNewMessageText] = useState<string>("")
    const onSendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setMessages([new TinderMessage(newMessageText, new Date(), currUser), ...messages])
        setNewMessageText("")

        setChat(new TinderChat(currUser, otherUser, chat.id, [...messages]))
        await FirestoreChats.updateChat(chat)
    }

    return (
        <div className={styles.chat_full}>
            <div className={styles.chat_header}>
                <div className={styles.img_wrap}>
                    <img src={otherUser.mainImage.src} alt=""/>
                </div>
                <div className={styles.name}>{otherUser.name}</div>
            </div>
            <div className={styles.chat_messages}>
                {
                    messages.map(el => <Message key={el.dateTime.valueOf()} user={currUser} message={el}/>)
                }
            </div>
            <form action="">
                <MyInput value={newMessageText} onChange={(e) => setNewMessageText(e.target.value)}/>
                <MyButton hasMarginLeft="15px" onClick={onSendMessage} isDisabled={newMessageText === ""}>Send</MyButton>
            </form>
        </div>
    );
};

export default Chat;