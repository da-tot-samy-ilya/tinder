import React, {FC} from 'react';
import styles from "./Chats.module.scss"
import Chat from "./Chat/Chat";
import {TinderUser} from "../../types/TinderUser";
import {TinderChat} from "../../types/TinderChat";
import ChatsItem from "./ChatsItem/ChatsItem";

interface IChatsProps {
    user: TinderUser
    allUsers: TinderUser[]
    chats: TinderChat[]
}


const Chats: FC<IChatsProps> = ({user, allUsers, chats}) => {
    return (
        <div className={styles.chats}>
            {chats.map(el => <ChatsItem chat={el} key={el.id} currUser={user}/>)}

        </div>
    );
};

export default Chats;