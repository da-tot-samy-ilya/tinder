import React, {FC} from 'react';
import styles from "./Chats.module.scss"
import Chat from "../Chat/Chat";
import {TinderUser} from "../../types/TinderUser";
import {TinderChat} from "../../types/TinderChat";

interface IChatsProps {
    user: TinderUser
}


const Chats: FC<IChatsProps> = ({user}) => {

    return (
        <div className={styles.chats}>
            <Chat chat={new TinderChat([user])} mod="full" user={user}/>


        </div>
    );
};

export default Chats;