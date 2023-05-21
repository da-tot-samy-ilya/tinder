import React, {FC, useState} from 'react';
import styles from "./Chat.module.scss"
import {TinderUser} from "../../types/TinderUser";
import img1 from "./img/6.png"
import Message from "../Message/Message";
import {TinderMessage} from "../../types/TinderMessage";
import {TinderChat} from "../../types/TinderChat";
import MyInput from "../UI/inputs/MyInput/MyInput";
import MyButton from "../UI/buttons/MyButton/MyButton";
import {log} from "util";
interface IChatProps {
    mod: "mini" | "full"
    user: TinderUser
    chat: TinderChat
}



const Chat: FC<IChatProps> = ({mod, user, chat}) => {
    const [messages, setMessages] = useState<TinderMessage[]>(chat.messages)

    const [newMessage, setNewMessage] = useState<string>("")

    const onSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setMessages([new TinderMessage(newMessage, new Date(), user), ...messages])
        setNewMessage("")
    }




    return (
        <div>
            {
                mod === "mini"
                ?
                <div className={styles.chat_mini}>
                    <div className={styles.img_wrap}>
                        <img src={img1} alt=""/>
                    </div>
                    <div className={styles.last_message}>But I must explain to you how all weg3werh3...</div>
                    <div className={styles.last_message_time}>22:00</div>
                </div>
                :
                <div className={styles.chat_full}>
                    <form action="">
                        <MyInput value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                        <MyButton hasMarginLeft="15px" onClick={onSendMessage} isDisabled={newMessage === ""}>Send</MyButton>
                    </form>
                    {
                        messages.map(el => <Message key={el.dateTime.valueOf()} user={user} message={el}/>)
                    }
                </div>
            }
        </div>
    );
};

export default Chat;