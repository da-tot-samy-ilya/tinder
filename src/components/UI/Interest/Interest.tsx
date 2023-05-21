import React from 'react';
import styles from "./Interest.module.scss"

interface IInterestProps {
    children: JSX.Element | string | JSX.Element[],
    color: string
    id: number
    removable?: boolean
    onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void
    hasMarginLeft?: string
    hasMarginTop?: string
}

const Interest: React.FC<IInterestProps> = ({
                                                children,
                                                color,
                                                id,
                                                hasMarginLeft,
                                                hasMarginTop, removable,
                                                onRemove}) => {
    return (
        <div className={!removable ? styles.interest : styles.interest__close} style={{backgroundColor: color, marginLeft: hasMarginLeft, marginTop: hasMarginTop}}>
            {children}
            {removable ? <span id={id.toString()} onClick={onRemove} className={styles.close}></span> : ""}
        </div>
    );
};

export default Interest;