import React, {FC} from 'react';
import styles from "./SwipeCard.module.scss"
import DislikeButton from "../UI/buttons/DislikeButton/DislikeButton";
import LikeButton from "../UI/buttons/LikeButton/LikeButton";
import InterestsInRow from "../InterestsInRow/InterestsInRow";
import CardBarHorizontal from "../UI/bars/CardBarHorizontal";
import CardBar from "../UI/bars/CardBar";
import ImgSlider from "../UI/ImgSlider/ImgSlider";
import {TinderUser} from "../../types/TinderUser";

interface ISwipeCardProps {
    user: TinderUser,
    isVisible: boolean,
    like: (e: React.MouseEvent<HTMLButtonElement>) => void,
    dislike: (e: React.MouseEvent<HTMLButtonElement>) => void,
}

const SwipeCard: FC<ISwipeCardProps> = ({user, like, dislike, isVisible}) => {
    return (
        <div className={styles.card} style={{display: isVisible ? "flex" : "none"}}>
            <div className={styles.profile_photo_wrap}>
                <ImgSlider images={[user.mainImage, ...user.images]}/>
                <CardBarHorizontal/>
                <div className={styles.profile_photo__btns}>
                    <DislikeButton className={styles.profile_photo__btn} onclick={like}/>
                    <LikeButton className={styles.profile_photo__btn} onclick={dislike}/>
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