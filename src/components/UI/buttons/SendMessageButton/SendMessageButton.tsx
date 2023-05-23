import React, {FC, MouseEventHandler} from 'react';
import styles from "./SendMessageButton.module.scss"
import send from "./img/send.svg"


interface IButtonProps {
    onclick: MouseEventHandler<HTMLButtonElement>
}
const SendMessageButton: FC<IButtonProps> = ({onclick}) => {
    return (
        <button className={styles.button} onClick={onclick}><img src={send} alt=""/></button>
    );
};

export default SendMessageButton;