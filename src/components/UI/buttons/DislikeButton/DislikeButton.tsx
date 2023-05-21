import React, {MouseEventHandler} from 'react';
import styles from "./DislikeButton.module.scss"
import unlike from "./img/unlike.svg"
interface IButtonProps {
    onclick: MouseEventHandler<HTMLButtonElement>
    className?: string
}


const DislikeButton: React.FC<IButtonProps> = ({onclick}) => {
    return (
        <button className={styles.button} onClick={onclick}><img src={unlike} alt=""/></button>
    );
};

export default DislikeButton;