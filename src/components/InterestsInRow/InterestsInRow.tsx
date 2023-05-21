import React, {FC} from 'react';
import styles from "./InterestsInRow.module.scss"
import {InterestClass} from "../../types/InterestClass";
import Interest from "../UI/Interest/Interest";

interface IInterestsInRowProps {
    interests: InterestClass[]
}




const InterestsInRow: FC<IInterestsInRowProps> = ({interests}) => {
    return (
        <ul className={styles.interests}>
            {interests.map(el => <li key={el.id}><Interest key={el.id} id={el.id} color={el.color} hasMarginTop="10px" hasMarginLeft="10px">{el.name}</Interest></li>)}
        </ul>
    );
};

export default InterestsInRow;