import React, {FC} from 'react';
import styles from "./SwipeCard.module.scss"
import DislikeButton from "../../UI/buttons/DislikeButton/DislikeButton";
import LikeButton from "../../UI/buttons/LikeButton/LikeButton";
import InterestsInRow from "../../EditProfile/InterestsStore/InterestsInRow/InterestsInRow";
import CardBarHorizontal from "../../UI/bars/CardBarHorizontal";
import CardBar from "../../UI/bars/CardBar";
import ImgSlider from "../../UI/ImgSlider/ImgSlider";
import {TinderUser} from "../../../types/TinderUser";
import SendMessageButton from "../../UI/buttons/SendMessageButton/SendMessageButton";
import {useNavigate} from "react-router-dom";
import {TinderChat} from "../../../types/TinderChat";
import {FirestoreChats} from "../../../firebase/chats";

interface ISwipeCardProps {
    user: TinderUser,
    currUser: TinderUser
    isVisible: boolean,
    like: (e: React.MouseEvent<HTMLButtonElement>) => void,
    dislike: (e: React.MouseEvent<HTMLButtonElement>) => void,
    chats: TinderChat[]
    addChat: (chat: TinderChat) => void
}

const SwipeCard: FC<ISwipeCardProps> = ({addChat, user, currUser, like, dislike, isVisible, chats}) => {

    const navigate = useNavigate()

    const onOpenChat = async () => {
        const chat = chats.find(el => (el.user1.id === user.id || el.user2.id === user.id))
        if (chat) {
            navigate(`/chats/${chat.id}`)
        }
        else {
            const newChat = new TinderChat(user, currUser)
            addChat(newChat)
            await FirestoreChats.addChat(newChat)
            navigate(`/chats/${newChat.id}`)
        }
    }


    return (
        <div className={styles.card} style={{display: isVisible ? "flex" : "none"}}>
            <div className={styles.profile_photo_wrap}>
                <ImgSlider images={[user.mainImage, ...user.images]}/>
                <CardBarHorizontal/>
                <div className={styles.profile_photo__btns}>
                    <DislikeButton className={styles.profile_photo__btn} onclick={like}/>
                    <SendMessageButton onclick={() => onOpenChat()}/>
                    <LikeButton onclick={dislike}/>
                </div>
            </div>
            <div className={styles.profile_description}>
                <div className={styles.profile_description_sub}>
                    <p className={styles.name}>{user.name}, {user.age}</p>
                    <p className={styles.distance}>{user.distance} miles away</p>
                    <p className={styles.town}>{user.town}</p>
                    <InterestsInRow interests={user.interests}/>
                    <p className={styles.text}>{user.description}</p>
                </div>
                <CardBar/>
            </div>

        </div>
    );
};

export default SwipeCard;