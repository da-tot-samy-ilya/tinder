import React, {FC} from 'react';
import styles from "./ChatsItem.module.scss"
import {TinderChat} from "../../../types/TinderChat";
import {TinderUser} from "../../../types/TinderUser";
import {Link} from "react-router-dom";

interface ChatsItemProps {
    chat: TinderChat,
    currUser: TinderUser
}
const ChatsItem: FC<ChatsItemProps> = ({currUser, chat}) => {
    const otherUser = chat.user2.id === currUser.id ? chat.user1 : chat.user2
    return (
        <Link to={`/chats/${chat.id}`}>
            <div className={styles.chat_mini}>
                <div className={styles.img_wrap}>
                    <img src={otherUser.mainImage.src} alt=""/>
                </div>
                <div className={styles.message_body}>
                    <div className={styles.name}>{otherUser.name}</div>
                    <div className={styles.last_message}>{chat.messages.length > 0 ? chat.messages[chat.messages.length-1].body : "no messages"}</div>
                </div>

                <div className={styles.last_message_time}>22:00</div>
            </div>
        </Link>
    );
};

export default ChatsItem;