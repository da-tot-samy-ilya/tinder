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
import {Link} from "react-router-dom";
import {updateDoc} from "firebase/firestore";
import {updateUser} from "../../../firebase";
import Chat from "../../Chats/Chat/Chat";
import {TinderChat} from "../../../types/TinderChat";

interface ISwipeCardProps {
    user: TinderUser,
    currUser: TinderUser
    isVisible: boolean,
    like: (e: React.MouseEvent<HTMLButtonElement>) => void,
    dislike: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const SwipeCard: FC<ISwipeCardProps> = ({user, currUser, like, dislike, isVisible}) => {

    const onOpenChat = async () => {
        const correctChat = currUser.chats.find(el => el.userID === user.id)

        if (!correctChat) {
            currUser.chats.push(new TinderChat(user.id))
            user.chats.push(new TinderChat(currUser.id))
            await updateUser(currUser)
            await updateUser(user)
        }
        console.log(currChatID)
    }

    const currChatID = (currUser.chats.find(el => el.userID === user.id) || new TinderChat("")).id

    return (
        <div className={styles.card} style={{display: isVisible ? "flex" : "none"}}>
            <div className={styles.profile_photo_wrap}>
                <ImgSlider images={[user.mainImage, ...user.images]}/>
                <CardBarHorizontal/>
                <div className={styles.profile_photo__btns}>
                    <DislikeButton className={styles.profile_photo__btn} onclick={like}/>
                    <Link to={`/chats/${currChatID}`}><SendMessageButton onclick={() => onOpenChat()}/></Link>
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