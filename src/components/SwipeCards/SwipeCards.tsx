import React, {FC, useState} from 'react';
import {TinderUser} from "../../types/TinderUser";
import SwipeCard from "../SwipeCard/SwipeCard";
import styles from "./SwipeCards.module.scss"

interface ISwipeUsersProps {
    users: TinderUser[]
}
const SwipeCards: FC<ISwipeUsersProps> = ({users}) => {

    const [currCardId, setCurrCardId] = useState(0)
    const [isEmptyRecomendations, setIsEmptyRecomendations] = useState(false)
    function swipeNextCard(e: React.MouseEvent<HTMLButtonElement>) {
        if (currCardId === users.length-1) {
            setIsEmptyRecomendations(true)
        }
        else {
            setCurrCardId(currCardId + 1)
        }
    }


    return (
        <div className={styles.swipeCards}>
            {isEmptyRecomendations ?
                <h1>No more recommendations :(</h1>
                :
                users.map((el, i) =>
                    <SwipeCard
                        user={el}
                        key={el.id}
                        like={swipeNextCard}
                        dislike={swipeNextCard}
                        isVisible={currCardId === i}/>)}
        </div>
    );
};

export default SwipeCards;