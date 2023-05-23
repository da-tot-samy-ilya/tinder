import React, {FC, useState} from 'react';
import styles from "./AuthPage.module.scss"
import MyButton from "../UI/buttons/MyButton/MyButton";
import {TinderUser} from "../../types/TinderUser";
import {FirestoreUsers} from "../../firebase/users";

interface IAuthPageProps {
    onSignInSuper: (user: TinderUser) => void
    onSignOutSuper: () => void
}


const AuthPage: FC<IAuthPageProps> = ({onSignInSuper, onSignOutSuper}) => {
    const [user, setUser] = useState(TinderUser.defaultUser)
    const [isLogged, setIsLogged] = useState(false)
    const onClickSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const newUser = await FirestoreUsers.onSignIn(e)
        setUser(newUser)
        onSignInSuper(newUser)
        setIsLogged(true)
    }

    const onClickSignOut = async () => {
        await FirestoreUsers.onSignOut()
        setIsLogged(false)
    }
    return (
        <div className={styles.authPage}>

            {isLogged ?
                <div className={styles.logged}>
                    <h1>Hello, {user.name}!</h1>
                    <br/>
                    <img src={user.mainImage.src} alt=""/>
                    <br/>
                    <MyButton onClick={onClickSignOut}>Sign out</MyButton>
                </div>
                :
                <MyButton onClick={onClickSignIn}>Sign in with Google</MyButton>
            }
        </div>
    );
};

export default AuthPage;