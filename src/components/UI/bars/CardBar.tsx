import React from 'react';
import styles from "./CardBar.module.scss";
import CardBarItem from "./CardBarItem";

const CardBar = () => {
    return (
        <div className={styles.bar}>
            <CardBarItem/>
            <CardBarItem/>
            <CardBarItem/>
            <CardBarItem/>
        </div>
    );
};

export default CardBar;