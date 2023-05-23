import React, {ChangeEvent, FC, useState} from 'react';
import styles from "./EditProfile.module.scss"
import MyInput from "../UI/inputs/MyInput/MyInput";
import {TinderUser} from "../../types/TinderUser";
import MyButton from "../UI/buttons/MyButton/MyButton";
import {InterestClasses} from "../../types/InterestClasses";
import InterestsStore from "./InterestsStore/InterestsStore";
import PhotosStore from "./PhotosStore/PhotosStore";

import {TinderImage} from "../../types/TinderImage";
import {FirestoreUsers} from "../../firebase/users";

interface IEditProfileProps {
    user: TinderUser
    onSaveUser: (user: TinderUser) => void
    onLogOut: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const EditProfile: FC<IEditProfileProps> = ({user, onSaveUser, onLogOut}) => {

    const [name, setName] = useState(user.name)
    const [age, setAge] = useState(user.age)
    const [town, setTown] = useState(user.town)
    const [images, setImages] = useState(user.images)
    const [description, setDescription] = useState(user.description)
    const [interests, setInterests] = useState(user.interests)

    const [isCorrectName, setIsCorrectName] = useState(true)
    const [isCorrectAge, setIsCorrectAge] = useState(true)
    const [isCorrectTown, setIsCorrectTown] = useState(true)
    const [isCorrectDescription, setIsCorrectDescription] = useState(true)

    const [isSomethingChanged, setIsSomethingChanged] = useState(false)
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setIsCorrectName(false)
        }
        else {
            setIsCorrectName(true)
            setIsSomethingChanged(true)
            setName(e.target.value)
        }
    }
    const onChangeTown = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === "") {
            setIsCorrectTown(false)
        }
        else{
            setTown(e.target.value)
            setIsCorrectTown(true)
            setIsSomethingChanged(true)
        }
    }
    const onChangeAge = (e: ChangeEvent<HTMLInputElement>) => {
        let age = Number(e.target.value)

        if (isNaN(age) ||  age > 200 || age < 0) {
            setIsCorrectAge(false)
        }
        else {
            setIsCorrectAge(true)
            setIsSomethingChanged(true)
            setAge(age)
        }
    }
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.value === "") {
            setIsCorrectDescription(false)
        }
        else {
            setIsCorrectDescription(true)
            setIsSomethingChanged(true)
            setDescription(e.target.value)
        }
    }
    const onChangeInterests = (e: React.MouseEvent<HTMLButtonElement>, newInterestID: number, type: "add" | "remove") => {
        switch (type) {
            case "add":
                setInterests([...interests, Object.values(InterestClasses).find(el => el.id === newInterestID) || InterestClasses.Pizza])
                break
            case "remove":
                setInterests(interests.filter(el => el.id !== newInterestID))
                break
        }
        setIsSomethingChanged(true)
    }
    const onAddImage = (src: string) => {
        setIsSomethingChanged(true)
        setImages([...images, new TinderImage(src)])
    }


    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsSomethingChanged(false)
        const newUser = new TinderUser(user.id, name, age, town, interests, description, images, user.mainImage)
        onSaveUser(newUser)
        await FirestoreUsers.updateUser(newUser)
    }


    return (
        <div>
            <h1 className={styles.header}>Edit your profile</h1>
            <h3 className={styles.inputLabel}>Name</h3>
            <p className={styles.warning} style={{display: isCorrectName ? "none" : "block"}}>Name can`t be empty</p>
            <MyInput onChange={onChangeName} value={name}/>
            <h3 className={styles.inputLabel}>Town</h3>
            <p className={styles.warning} style={{display: isCorrectTown ? "none" : "block"}}>Town can`t be empty</p>
            <MyInput onChange={onChangeTown} value={town}/>
            <h3 className={styles.inputLabel}>Age</h3>
            <p className={styles.warning} style={{display: isCorrectAge ? "none" : "block"}}>Age can be number from 0 to 200</p>
            <MyInput onChange={onChangeAge} value={age.toString()}/>
            <h3 className={styles.inputLabel}>Photos</h3>
            <PhotosStore userID={user.id} onAddImage={onAddImage} images={images} mainImage={user.mainImage}/>
            <h3 className={styles.inputLabel}>Description</h3>
            <p className={styles.warning} style={{display: isCorrectDescription ? "none" : "block"}}>Description can`t be less than 50 symbols</p>
            <MyInput onChange={onChangeDescription} value={description}/>
            <h3 className={styles.inputLabel}>Interests</h3>
            <InterestsStore interests={interests} onSubmit={onChangeInterests}/>

            <MyButton hasMarginTop="20px" isDisabled={!isSomethingChanged} onClick={onSubmit}>Save</MyButton>
            <MyButton hasMarginTop="40px" onClick={onLogOut}>Log out</MyButton>
        </div>
    );
};

export default EditProfile;