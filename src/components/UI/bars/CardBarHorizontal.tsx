import React from 'react';
import styles from "./CardBarHorizontal.module.scss"
import CardBarHorizontalItem from "./CardBarHorizontalItem";
const CardBarHorizontal = () => {
    return (
        <div className={styles.bar_mobile}>
            <CardBarHorizontalItem/>
            <CardBarHorizontalItem/>
            <CardBarHorizontalItem/>
            <CardBarHorizontalItem/>
            <CardBarHorizontalItem/>
        </div>
    );
};

export default CardBarHorizontal;