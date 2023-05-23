import React, {FC, useState} from 'react';
import styles from "./Chat.module.scss"
import {TinderUser} from "../../../types/TinderUser";
import img1 from "./img/6.png"
import Message from "./Message/Message";
import {TinderMessage} from "../../../types/TinderMessage";
import {TinderChat} from "../../../types/TinderChat";
import MyInput from "../../UI/inputs/MyInput/MyInput";
import MyButton from "../../UI/buttons/MyButton/MyButton";
import {useParams} from "react-router-dom";


interface IChatProps {
    mod: "mini" | "full"
    user: TinderUser
    allUsers: TinderUser[]
    chat?: TinderChat
}



const Chat: FC<IChatProps> = ({mod, user, allUsers, chat}) => {
    const {id} = useParams()
    const chatForFull = user.chats.find(el => el.id === id) || new TinderChat("")
    const [messages, setMessages] = useState<TinderMessage[]>(chatForFull.messages)
    const [newMessage, setNewMessage] = useState<string>("")



    const onSendMessage = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setMessages([new TinderMessage(newMessage, new Date(), user), ...messages])
        setNewMessage("")
        // let userToSendId = null;
        // let userToSendChatId = "";
        // for (chat of user.chats) {
        //     if (chat.id === id) {
        //         chat.messages = messages
        //         userToSendId = chat.userID
        //         userToSendChatId = chat.id
        //     }
        // }
        // await updateUser(user)
        // for (let secondUser of allUsers) {
        //     if (secondUser.id === userToSendId) {
        //         for (chat of secondUser.chats) {
        //             if (chat.id === userToSendChatId) {
        //                 chat.messages = messages
        //             }
        //         }
        //         await updateUser(secondUser)
        //     }
        // }


    }



    return (
        <div>
            {
                mod === "mini"
                ?
                <div className={styles.chat_mini}>
                    <div className={styles.img_wrap}>
                        <img src={(allUsers.find(el => el.id === (chat || new TinderChat("")).userID)||TinderUser.defaultUser).mainImage.src} alt=""/>
                    </div>
                    <div className={styles.message_body}>
                        <div className={styles.name}>{(allUsers.find(el => el.id === (chat || new TinderChat("")).userID)||TinderUser.defaultUser).name}</div>
                        <div className={styles.last_message}>But I must explain to you how all weg3werh3...</div>
                    </div>

                    <div className={styles.last_message_time}>22:00</div>
                </div>
                :
                <div className={styles.chat_full}>
                    <div className={styles.chat_header}>
                        <div className={styles.img_wrap}>
                            <img src={(allUsers.find(el => el.id === (chatForFull || new TinderChat("")).userID)||TinderUser.defaultUser).mainImage.src} alt=""/>
                        </div>
                        <div className={styles.name}>{(allUsers.find(el => el.id === chatForFull.userID)||TinderUser.defaultUser).name}</div>
                    </div>
                    <div className={styles.chat_messages}>

                        {
                            messages.map(el => <Message key={el.dateTime.valueOf()} user={user} message={el}/>)
                        }
                    </div>
                    <form action="">
                        <MyInput value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                        <MyButton hasMarginLeft="15px" onClick={onSendMessage} isDisabled={newMessage === ""}>Send</MyButton>
                    </form>
                </div>
            }
        </div>
    );
};

export default Chat;