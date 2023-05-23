import React, {FC} from 'react';
import styles from "./Chats.module.scss"
import Chat from "./Chat/Chat";
import {TinderUser} from "../../types/TinderUser";

interface IChatsProps {
    user: TinderUser
    allUsers: TinderUser[]
}


const Chats: FC<IChatsProps> = ({user, allUsers}) => {
    console.log(user)
    return (
        <div className={styles.chats}>
            {user.chats.map(el => <Chat allUsers={allUsers} key={el.userID} mod="mini" user={user}/>)}



        </div>
    );
};

export default Chats;