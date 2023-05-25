import React, {FC, useState} from 'react';
import {TinderUser} from "../../types/TinderUser";
import SwipeCard from "./SwipeCard/SwipeCard";
import styles from "./SwipeCards.module.scss"
import {TinderChat} from "../../types/TinderChat";

interface ISwipeUsersProps {
    users: TinderUser[]
    currUser: TinderUser
    chats: TinderChat[]
    addChat: (chat: TinderChat) => void
}
const SwipeCards: FC<ISwipeUsersProps> = ({addChat, users, currUser, chats}) => {

    const [currCardId, setCurrCardId] = useState(0)
    const [isEmptyRecomendations, setIsEmptyRecomendations] = useState(false)
    function swipeNextCard(e: React.MouseEvent<HTMLButtonElement>) {
        if (currCardId === users.length-2) {
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
                users.filter(el => currUser.id !== el.id).map((el, i) =>
                    <SwipeCard
                        addChat={addChat}
                        chats={chats}
                        currUser={currUser}
                        user={el}
                        key={el.id}
                        like={swipeNextCard}
                        dislike={swipeNextCard}
                        isVisible={currCardId === i}/>)

            }
        </div>
    );
};

export default SwipeCards;