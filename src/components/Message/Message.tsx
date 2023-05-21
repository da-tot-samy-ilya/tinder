import React, {FC, useState} from 'react';
import styles from "./Message.module.scss"
import {TinderMessage} from "../../types/TinderMessage";
import {TinderUser} from "../../types/TinderUser";

interface IMessageProps {
    user: TinderUser
    message: TinderMessage
}


const Message: FC<IMessageProps> = ({user, message}) => {

    return (
        <div className={user.id === message.from.id ? styles.my_message : styles.other_message}>
            <div className={styles.message_date}>{message.dateTime.getHours()}:{ message.dateTime.getUTCMinutes() < 10 ? "0" + message.dateTime.getUTCMinutes().toString() : message.dateTime.getUTCMinutes()}</div>
            <div className={styles.userName}>{user.id === message.from.id ? "Me" : message.from.name}</div>
            {message.body}
        </div>
    );
};

export default Message;