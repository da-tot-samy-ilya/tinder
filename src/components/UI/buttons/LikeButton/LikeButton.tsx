import React, {MouseEventHandler} from 'react';
import styles from "./LikeButton.module.scss"
import like from "./img/like.svg"
interface IButtonProps {
    onclick: MouseEventHandler<HTMLButtonElement>
}


const LikeButton: React.FC<IButtonProps> = ({onclick}) => {
    return (
        <button className={styles.button} onClick={onclick}><img src={like} alt=""/></button>
    );
};

export default LikeButton;